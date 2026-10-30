# Immer: keep removed array values safe to mutate

This evidence package covers commit `d54c38736b4393720c2f47e0cc26ef320fb9674d` (tree `b6d5113c6125b8712f316b601d21222a74550cdb`) against `75a290e44ba14bd723c8ef8546b6559c8ef3ae88`.

With `enableArrayMethods()`, moving an object from one draft array to another and then updating it could mutate the original base object, or throw when the base was frozen:

```js
produce({todo: [{done: false}], done: []}, draft => {
  const item = draft.todo.pop()
  draft.done.push(item)
  item.done = true
})
```

The final change reads only the item being removed by `pop` or `shift` through the existing proxy before the optimized removal. `splice` uses the normal proxy/native method path so removed values, JavaScript argument coercion, and sparse arrays follow ordinary Immer behavior. This deliberately accepts the normal proxy cost for `splice`; it does not claim that every operation retains the old plugin's speed. Newly supplied external objects keep their existing undrafted behavior.

## Results and boundaries

| Check | Evidence |
| --- | --- |
| Exact baseline, 32 new regressions | 10 failed, 22 controls passed; [baseline log](logs/baseline-32-regressions.log) |
| Final candidate, Windows and Linux | Source: 4,244 passed / 8 skipped; production build: 3,693 passed / 8 skipped; Flow: 0 errors. Both ran coverage and all four existing performance scripts. [Windows](logs/windows/yarn-test.log), [Linux](logs/linux/v4-gates.log) |
| Final candidate, same 32 regressions | All 32 passed within the full source and production test runs above. |
| Actual local npm tarball consumption | Fresh Windows and Linux Node 24.14.0 consumers installed the unmodified `immer@10.0.3-beta` tarballs. Public CJS development, CJS production, and ESM imports each ran 17 cases per platform. Candidate: 102/102 passed. Each baseline invocation: 13 defect failures and 4 passing controls. [Package receipt](package/DELIVERY.json) |
| Installed bytes | Both tarballs contain 34 files. Every file matched the packaging stage and both platforms' installed copies byte for byte; package entries resolved inside the consumer's `node_modules/immer`. No source alias/link supplied the consumed package. [Comparison](package/INSTALLED_BYTE_COMPARISON.json) |
| Independent focused review | 18 scenarios against ordinary Immer, the original plugin, and the candidate: candidate 18/18 and ordinary 18/18 passed, original plugin failed 13. Extra getter, nested producer, coercion, and exception cleanup probes passed. [Review](review/REVIEW_V4.json) |
| Final source binding | TypeScript 5.0.2 AST output matches the independently reviewed v4 after removing comments and normalizing an unused `void expression` statement. [Receipt](package/FINAL_SOURCE_REVIEW.json), [normalized final source](package/final-normalized.ts) |
| Original Test workflow on the fork | [Run 40995723319](https://github.com/jipeng6036-del/immer/actions/runs/40995723319), exact candidate HEAD, succeeded. Its original build job actually ran install, source/build tests, Flow, coverage and four performance scripts. [Receipt](FORK_CI.json), [job log](logs/fork-ci/job-123868267312.log) |

The fork result is separate from any upstream PR checks. Upstream PR CI is not established by this package. The Coveralls action step succeeded and reported reading the lcov file; its log did not provide a server-side upload ID or confirmation URL, so successful service ingestion is not claimed.

The npm artifacts here are local `npm pack` outputs, not a registry release or publication. They preserve the repository's package name, version, `files`, and `exports`. The skipped tests remain skipped; their presence is not reported as success. No live model calls or paid services were used for these checks.

## Size and performance

The original Windows size command failed with a symlink `EPERM`; that earlier tooling attempt is retained in [its log](logs/windows/size-original-tooling-attempt.log), not represented as a final passing measurement. On Linux the original `yarn test:size` exited 0 even though its old Webpack subprocess failed with `ERR_OSSL_EVP_UNSUPPORTED` and produced zero sizes. Those zeros are invalid measurements.

A separate size-only compatibility run used `NODE_OPTIONS=--openssl-legacy-provider yarn test:size`. The option was not applied to the source/build/Flow/coverage/performance test gates. Its gzip results were:

| Export measurement | Baseline bytes | Candidate bytes |
| --- | ---: | ---: |
| `produce` | 4,284 | 4,284 |
| Array methods plugin alone | 5,098 | 5,060 |
| Plugin cumulative | 7,022 | 6,980 |

[The Linux log](logs/linux/v4-gates.log) preserves both the failed original tool path and the separately identified compatibility measurements. The [microbenchmark](performance/benchmark-removals-v4.json) records five-round medians for limited removal workloads; returned values were ignored while timing. The old plugin's raw return values were semantically different. Ordinary proxy behavior is the relevant correct comparison. These figures are not an application-wide performance guarantee, and no claim of zero regressions is made. The four existing performance scripts completing is distinct from a before/after performance certification.

V2's base-reference cache had an independently reproduced extra-getter regression. V3 sent all removals through the normal proxy and incurred a substantial repeated-shift cost. Both were superseded. Their passing checks are not relabeled as results for this final change; the final logs and manifests above bind v4/final source separately.

## Reproduce the public package entry points

From a fresh directory under this evidence package:

```sh
mkdir consumer
cd consumer
npm init -y
npm install --ignore-scripts --no-audit --no-fund ../package/artifacts/candidate/immer-10.0.3-beta.tgz
cp ../package/public-probe.cjs ../package/entry.cjs ../package/entry.mjs .
NODE_ENV=development node entry.cjs
NODE_ENV=production node entry.cjs
node entry.mjs
```

For the baseline comparison, use a separate fresh consumer and the tarball under `package/artifacts/baseline/`. The baseline script intentionally exits 1 with the recorded 13 defect failures. Public probes cover movement by all three methods, frozen inputs and auto-freezing, nested changes, patch/inverse round trips, prior draft identity, external objects, no-op identity, retained getters and sparse arrays. [Commands](COMMANDS.json) records the other checks. Review and benchmark scripts retain their own adjacent historical bundles for independent reproduction; the actual npm consumer checks use only installed tarballs.

## Integrity and disclosure

[FINAL_BINDING.json](FINAL_BINDING.json) identifies the exact source, tree, artifacts and original package hashes. [RAW_TO_PUBLIC_MANIFEST.json](RAW_TO_PUBLIC_MANIFEST.json) records every copied evidence file's original and publication SHA-256. Publication text replaces only private workspace/home path prefixes with placeholders; compressed tarballs and their hashes were not rewritten. Credentials scanning covers text plus tarball members. Caches, dependency trees, machine ledgers, private instructions and conversations are excluded.

Implementation and independent checks used OpenAI Codex. No human review is claimed. This evidence preparation did not rerun tests or publish a branch, PR, package, or release.
