import { PluginArrayMethods, latest, loadPlugin, markChanged, prepareCopy, handleCrossReference, ProxyArrayState } from "../internal";
type MutatingArrayMethod = "push" | "pop" | "shift" | "unshift" | "splice" | "reverse" | "sort";
type NonMutatingArrayMethod = "filter" | "slice" | "concat" | "flat" | "find" | "findIndex" | "findLast" | "findLastIndex" | "some" | "every" | "indexOf" | "lastIndexOf" | "includes" | "join" | "toString" | "toLocaleString";
export type ArrayOperationMethod = MutatingArrayMethod | NonMutatingArrayMethod;
export function enableArrayMethods() {
    const SHIFTING_METHODS = new Set<MutatingArrayMethod>(["shift", "unshift"]);
    const QUEUE_METHODS = new Set<MutatingArrayMethod>(["push", "pop"]);
    const RESULT_RETURNING_METHODS = new Set<MutatingArrayMethod>([
        ...QUEUE_METHODS,
        ...SHIFTING_METHODS
    ]);
    const REORDERING_METHODS = new Set<MutatingArrayMethod>(["reverse", "sort"]);
    const MUTATING_METHODS = new Set<MutatingArrayMethod>([
        ...RESULT_RETURNING_METHODS,
        ...REORDERING_METHODS,
        "splice"
    ]);
    const FIND_METHODS = new Set<NonMutatingArrayMethod>(["find", "findLast"]);
    const NON_MUTATING_METHODS = new Set<NonMutatingArrayMethod>([
        "filter",
        "slice",
        "concat",
        "flat",
        ...FIND_METHODS,
        "findIndex",
        "findLastIndex",
        "some",
        "every",
        "indexOf",
        "lastIndexOf",
        "includes",
        "join",
        "toString",
        "toLocaleString"
    ]);
    function isMutatingArrayMethod(method: string): method is MutatingArrayMethod {
        return MUTATING_METHODS.has(method as any);
    }
    function isNonMutatingArrayMethod(method: string): method is NonMutatingArrayMethod {
        return NON_MUTATING_METHODS.has(method as any);
    }
    function isArrayOperationMethod(method: string): method is ArrayOperationMethod {
        return isMutatingArrayMethod(method) || isNonMutatingArrayMethod(method);
    }
    function enterOperation(state: ProxyArrayState, method: ArrayOperationMethod) {
        state.operationMethod = method;
    }
    function exitOperation(state: ProxyArrayState) {
        state.operationMethod = undefined;
    }
    function executeArrayMethod<T>(state: ProxyArrayState, operation: () => T, markLength = true): T {
        prepareCopy(state);
        const result = operation();
        markArrayChanged(state, markLength);
        return result;
    }
    function markArrayChanged(state: ProxyArrayState, markLength = true) {
        markChanged(state);
        if (markLength)
            state.assigned_!.set("length", true);
    }
    function markAllIndicesReassigned(state: ProxyArrayState) {
        state.allIndicesReassigned_ = true;
        state.baseRefs_ = new Set(state.base_);
    }
    function normalizeSliceIndex(index: number, length: number): number {
        if (index < 0) {
            return Math.max(length + index, 0);
        }
        return Math.min(index, length);
    }
    function handleInsertedValues(state: ProxyArrayState, startIndex: number, values: any[]) {
        for (let i = 0; i < values.length; i++) {
            const index = "" + (startIndex + i);
            state.assigned_!.set(index, true);
            handleCrossReference(state, index, values[i]);
        }
    }
    function handleSimpleOperation(state: ProxyArrayState, method: string, args: any[]) {
        const isInsert = method === "push" || method === "unshift";
        if (isInsert ? args.length === 0 : latest(state).length === 0) {
            return isInsert ? latest(state).length : undefined;
        }
        prepareCopy(state);
        const lengthBefore = state.copy_!.length;
        const result = (state.copy_! as any)[method](...args);
        markArrayChanged(state);
        if (SHIFTING_METHODS.has(method as MutatingArrayMethod)) {
            markAllIndicesReassigned(state);
        }
        if (method === "push") {
            handleInsertedValues(state, lengthBefore, args);
        }
        else if (method === "unshift") {
            handleInsertedValues(state, 0, args);
        }
        return RESULT_RETURNING_METHODS.has(method as MutatingArrayMethod)
            ? result
            : state.draft_;
    }
    function handleReorderingOperation(state: ProxyArrayState, method: string, args: any[]) {
        if (latest(state).length <= 1)
            return state.draft_;
        return executeArrayMethod(state, () => {
            ;
            (state.copy_! as any)[method](...args);
            markAllIndicesReassigned(state);
            return state.draft_;
        }, false);
    }
    function createMethodInterceptor(state: ProxyArrayState, originalMethod: string) {
        return function interceptedMethod(...args: any[]) {
            const method = originalMethod as ArrayOperationMethod;
            if (method === "splice") {
                const previousOperation = state.operationMethod;
                state.operationMethod = undefined;
                try {
                    return Reflect.apply(Array.prototype[method], state.draft_, args);
                }
                finally {
                    state.operationMethod = previousOperation;
                }
            }
            if (method === "pop" || method === "shift") {
                const length = latest(state).length;
                if (length > 0) {
                    const previousOperation = state.operationMethod;
                    state.operationMethod = undefined;
                    try {
                        state.draft_[method === "pop" ? length - 1 : 0];
                    }
                    finally {
                        state.operationMethod = previousOperation;
                    }
                }
            }
            enterOperation(state, method);
            try {
                if (isMutatingArrayMethod(method)) {
                    if (RESULT_RETURNING_METHODS.has(method)) {
                        return handleSimpleOperation(state, method, args);
                    }
                    if (REORDERING_METHODS.has(method)) {
                        return handleReorderingOperation(state, method, args);
                    }
                }
                else {
                    return handleNonMutatingOperation(state, method, args);
                }
            }
            finally {
                exitOperation(state);
            }
        };
    }
    function handleNonMutatingOperation(state: ProxyArrayState, method: NonMutatingArrayMethod, args: any[]) {
        const source = latest(state);
        if (method === "filter") {
            const predicate = args[0];
            const thisArg = args[1];
            const result: any[] = [];
            const length = source.length;
            for (let i = 0; i < length; i++) {
                if (predicate.call(thisArg, source[i], i, source)) {
                    result.push(state.draft_[i]);
                }
            }
            return result;
        }
        if (FIND_METHODS.has(method)) {
            const predicate = args[0];
            const thisArg = args[1];
            const length = source.length;
            const isForward = method === "find";
            const step = isForward ? 1 : -1;
            const start = isForward ? 0 : length - 1;
            for (let i = start; i >= 0 && i < length; i += step) {
                if (predicate.call(thisArg, source[i], i, source)) {
                    return state.draft_[i];
                }
            }
            return undefined;
        }
        if (method === "slice") {
            const rawStart = args[0] ?? 0;
            const rawEnd = args[1] ?? source.length;
            const start = normalizeSliceIndex(rawStart, source.length);
            const end = normalizeSliceIndex(rawEnd, source.length);
            const result: any[] = [];
            for (let i = start; i < end; i++) {
                result.push(state.draft_[i]);
            }
            return result;
        }
        return source[method as keyof typeof Array.prototype](...args);
    }
    loadPlugin(PluginArrayMethods, {
        createMethodInterceptor,
        isArrayOperationMethod,
        isMutatingArrayMethod
    });
}
