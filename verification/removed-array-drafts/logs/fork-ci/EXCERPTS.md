# Verified original Test workflow log excerpts

Head: d54c38736b4393720c2f47e0cc26ef320fb9674d

Run: https://github.com/jipeng6036-del/immer/actions/runs/40995723319

Original workflow blob: 2aaea3b8ee61f6f073c0e03ee1e5bb68c564d88c (same as upstream baseline).

## Checkout and environment

```text
91: 2026-10-30T03:09:04.2222646Z ##[group]Fetching the repository
92: 2026-10-30T03:09:04.2236113Z [command]/usr/bin/git -c protocol.version=2 fetch --no-tags --prune --no-recurse-submodules --depth=1 origin +d54c38736b4393720c2f47e0cc26ef320fb9674d:refs/remotes/origin/ci/array-removals-d54c387-20261030
93: 2026-10-30T03:09:04.8039828Z From https://github.com/jipeng6036-del/immer
94: 2026-10-30T03:09:04.8042537Z  * [new ref]         d54c38736b4393720c2f47e0cc26ef320fb9674d -> origin/ci/array-removals-d54c387-20261030
95: 2026-10-30T03:09:04.8047516Z ##[endgroup]
96: 2026-10-30T03:09:04.8048354Z ##[group]Determining the checkout info
97: 2026-10-30T03:09:04.8049856Z ##[endgroup]
98: 2026-10-30T03:09:04.8056235Z [command]/usr/bin/git sparse-checkout disable
99: 2026-10-30T03:09:04.8121564Z [command]/usr/bin/git config --local --unset-all extensions.worktreeConfig
100: 2026-10-30T03:09:04.8161697Z ##[group]Checking out the ref
101: 2026-10-30T03:09:04.8174210Z [command]/usr/bin/git checkout --progress --force -B ci/array-removals-d54c387-20261030 refs/remotes/origin/ci/array-removals-d54c387-20261030
102: 2026-10-30T03:09:04.8416875Z Switched to a new branch 'ci/array-removals-d54c387-20261030'
103: 2026-10-30T03:09:04.8422892Z branch 'ci/array-removals-d54c387-20261030' set up to track 'origin/ci/array-removals-d54c387-20261030'.
104: 2026-10-30T03:09:04.8429847Z ##[endgroup]
105: 2026-10-30T03:09:04.8486035Z [command]/usr/bin/git log -1 --format=%H
106: 2026-10-30T03:09:04.8521275Z d54c38736b4393720c2f47e0cc26ef320fb9674d
107: 2026-10-30T03:09:04.8530946Z ##[group]Removing auth
108: 2026-10-30T03:09:04.8534961Z [command]/usr/bin/git config --local --name-only --get-regexp core\.sshCommand
109: 2026-10-30T03:09:04.8575749Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'core\.sshCommand' && git config --local --unset-all 'core.sshCommand' || :"
110: 2026-10-30T03:09:04.8817189Z [command]/usr/bin/git config --local --name-only --get-regexp http\.https\:\/\/github\.com\/\.extraheader
111: 2026-10-30T03:09:04.8853801Z http.https://github.com/.extraheader
112: 2026-10-30T03:09:04.8862217Z [command]/usr/bin/git config --local --unset-all http.https://github.com/.extraheader
113: 2026-10-30T03:09:04.8904721Z [command]/usr/bin/git submodule foreach --recursive sh -c "git config --local --name-only --get-regexp 'http\.https\:\/\/github\.com\/\.extraheader' && git config --local --unset-all 'http.https://github.com/.extraheader' || :"
114: 2026-10-30T03:09:04.9153129Z [command]/usr/bin/git config --local --name-only --get-regexp ^includeIf\.gitdir:
115: 2026-10-30T03:09:04.9194752Z [command]/usr/bin/git submodule foreach --recursive git config --local --show-origin --name-only --get-regexp remote.origin.url
116: 2026-10-30T03:09:04.9433704Z ##[endgroup]
117: 2026-10-30T03:09:04.9713505Z ##[group]Run actions/setup-node@48b55a011bda9f5d6aeb4c2d9c7362e8dae4041e
118: 2026-10-30T03:09:04.9714006Z with:
119: 2026-10-30T03:09:04.9714253Z   node-version: 24
120: 2026-10-30T03:09:04.9714512Z   check-latest: false
121: 2026-10-30T03:09:04.9716764Z   token: ***
122: 2026-10-30T03:09:04.9717036Z   package-manager-cache: true
123: 2026-10-30T03:09:04.9717337Z ##[endgroup]
124: 2026-10-30T03:09:05.1426534Z Found in cache @ /opt/hostedtoolcache/node/24.22.1/x64
125: 2026-10-30T03:09:05.1431844Z ##[group]Environment details
126: 2026-10-30T03:09:09.9202808Z node: v24.22.1
127: 2026-10-30T03:09:09.9203326Z npm: 11.19.1
128: 2026-10-30T03:09:09.9203560Z yarn: 1.22.22
129: 2026-10-30T03:09:09.9204141Z ##[endgroup]
130: 2026-10-30T03:09:09.9371700Z ##[group]Run yarn --frozen-lockfile
```

## Install and source test command

```text
130: 2026-10-30T03:09:09.9371700Z ##[group]Run yarn --frozen-lockfile
131: 2026-10-30T03:09:09.9372106Z yarn --frozen-lockfile
132: 2026-10-30T03:09:09.9446318Z shell: /usr/bin/bash -e {0}
133: 2026-10-30T03:09:09.9446620Z ##[endgroup]
134: 2026-10-30T03:09:10.1213149Z yarn install v1.22.22
135: 2026-10-30T03:09:10.1965951Z [1/4] Resolving packages...
136: 2026-10-30T03:09:10.5306451Z [2/4] Fetching packages...
137: 2026-10-30T03:09:28.0111236Z [3/4] Linking dependencies...
138: 2026-10-30T03:09:28.0131546Z warning " > @vitest/coverage-v8@2.1.9" has incorrect peer dependency "vitest@2.1.9".
139: 2026-10-30T03:09:28.0377442Z warning Workspaces can only be enabled in private projects.
140: 2026-10-30T03:09:33.4245120Z [4/4] Building fresh packages...
141: 2026-10-30T03:09:33.8794799Z Done in 23.80s.
142: 2026-10-30T03:09:33.9297828Z ##[group]Run yarn test
143: 2026-10-30T03:09:33.9298129Z yarn test
144: 2026-10-30T03:09:33.9318397Z shell: /usr/bin/bash -e {0}
145: 2026-10-30T03:09:33.9318676Z ##[endgroup]
146: 2026-10-30T03:09:34.0759400Z yarn run v1.22.22
147: 2026-10-30T03:09:34.1122748Z $ vitest run && yarn test:build && yarn test:flow
148: 2026-10-30T03:09:34.5310371Z 
149: 2026-10-30T03:09:34.5316879Z  RUN  v3.2.6 /home/runner/work/immer/immer
```

## Source results

```text
175: 2026-10-30T03:09:38.4159420Z  ✓ __tests__/null.js (1 test) 3ms
176: 2026-10-30T03:09:38.6525825Z  ✓ __tests__/isDraftable.js (1 test) 2ms
177: 2026-10-30T03:09:38.6697111Z 
178: 2026-10-30T03:09:38.6709666Z  Test Files  26 passed (26)
179: 2026-10-30T03:09:38.6723306Z       Tests  4244 passed | 8 skipped (4252)
180: 2026-10-30T03:09:38.6724567Z    Start at  03:09:34
181: 2026-10-30T03:09:38.6725987Z    Duration  4.13s (transform 751ms, setup 0ms, collect 2.63s, tests 1.96s, environment 7ms, prepare 2.38s)
182: 2026-10-30T03:09:38.6727232Z 
```

## DTS and production results

```text
229: 2026-10-30T03:09:39.4317139Z ESM dist/immer.production.mjs.map 128.38 KB
230: 2026-10-30T03:09:39.4318256Z ESM ⚡️ Build success in 101ms
231: 2026-10-30T03:09:39.6414725Z DTS Build start
232: 2026-10-30T03:09:41.0898723Z DTS ⚡️ Build success in 1449ms
233: 2026-10-30T03:09:41.0899700Z DTS dist/immer.d.ts 16.70 KB
234: 2026-10-30T03:09:41.5488518Z 
235: 2026-10-30T03:09:41.5490318Z  RUN  v3.2.6 /home/runner/work/immer/immer
236: 2026-10-30T03:09:41.5491113Z 
237: 2026-10-30T03:09:42.1537240Z  ✓ __tests__/updateScenarios.js (17 tests) 69ms
238: 2026-10-30T03:09:42.2184659Z  ✓ __tests__/patch.js (228 tests) 95ms
239: 2026-10-30T03:09:42.5399398Z  ✓ __tests__/array-methods-removed.js (32 tests) 38ms
240: 2026-10-30T03:09:42.6123168Z  ✓ __tests__/map-set.js (52 tests) 28ms
241: 2026-10-30T03:09:42.9100180Z  ✓ __tests__/regressions.js (65 tests | 8 skipped) 36ms
242: 2026-10-30T03:09:42.9622627Z  ✓ __tests__/current.js (25 tests) 28ms
243: 2026-10-30T03:09:43.2447268Z  ✓ __tests__/readme.js (8 tests) 36ms
244: 2026-10-30T03:09:43.3007646Z  ✓ __tests__/frozen.js (20 tests) 21ms
245: 2026-10-30T03:09:43.5532058Z  ✓ __tests__/manual.js (8 tests) 16ms
246: 2026-10-30T03:09:43.7239985Z  ✓ __tests__/produce.ts (37 tests) 22ms
247: 2026-10-30T03:09:43.7532783Z  ✓ __tests__/base.js (3134 tests) 1121ms
248: 2026-10-30T03:09:43.8338080Z  ✓ __tests__/prototype-inspection.js (9 tests) 9ms
249: 2026-10-30T03:09:44.0553304Z  ✓ __tests__/array-methods-filter-length.js (4 tests) 7ms
250: 2026-10-30T03:09:44.0842531Z  ✓ __tests__/curry.js (6 tests) 14ms
251: 2026-10-30T03:09:44.1615699Z  ✓ __tests__/empty.ts (8 tests) 12ms
252: 2026-10-30T03:09:44.3538785Z  ✓ __tests__/not-strict-copy.ts (6 tests) 8ms
253: 2026-10-30T03:09:44.3572082Z  ✓ __tests__/isModified.js (10 tests) 14ms
254: 2026-10-30T03:09:44.4562235Z  ✓ __tests__/draft.ts (6 tests) 7ms
255: 2026-10-30T03:09:44.6546478Z  ✓ __tests__/original.js (4 tests) 8ms
256: 2026-10-30T03:09:44.7016161Z  ✓ __tests__/type-external.ts (6 tests) 9ms
257: 2026-10-30T03:09:44.7475968Z  ✓ __tests__/redux.ts (5 tests) 5ms
258: 2026-10-30T03:09:44.9317926Z  ✓ __tests__/plugins.js (4 tests) 6ms
259: 2026-10-30T03:09:44.9750816Z  ✓ __tests__/immutable.ts (4 tests) 5ms
260: 2026-10-30T03:09:45.0259864Z  ✓ __tests__/null.js (1 test) 4ms
261: 2026-10-30T03:09:45.2042565Z  ✓ __tests__/spec_ts.ts (1 test) 2ms
262: 2026-10-30T03:09:45.2207955Z  ✓ __tests__/isDraftable.js (1 test) 2ms
263: 2026-10-30T03:09:45.2393285Z 
264: 2026-10-30T03:09:45.2406031Z  Test Files  26 passed (26)
265: 2026-10-30T03:09:45.2416443Z       Tests  3693 passed | 8 skipped (3701)
266: 2026-10-30T03:09:45.2417719Z    Start at  03:09:41
267: 2026-10-30T03:09:45.2420030Z    Duration  3.69s (transform 743ms, setup 0ms, collect 1.80s, tests 1.62s, environment 6ms, prepare 2.36s)
268: 2026-10-30T03:09:45.2421773Z 
269: 2026-10-30T03:09:45.5707015Z $ yarn flow check __tests__/flow
270: 2026-10-30T03:09:45.7583778Z $ /home/runner/work/immer/immer/node_modules/.bin/flow check __tests__/flow
271: 2026-10-30T03:09:46.9697101Z Found 0 errors
272: 2026-10-30T03:09:47.0127120Z Done in 12.94s.
273: 2026-10-30T03:09:47.0275542Z ##[group]Run yarn coverage
```

## Coverage result

```text
310: 2026-10-30T03:09:52.1050058Z  ✓ __tests__/spec_ts.ts (1 test) 4ms
311: 2026-10-30T03:09:52.2662070Z  ✓ __tests__/isDraftable.js (1 test) 3ms
312: 2026-10-30T03:09:52.6049104Z 
313: 2026-10-30T03:09:52.6061285Z  Test Files  26 passed (26)
314: 2026-10-30T03:09:52.6071594Z       Tests  4244 passed | 8 skipped (4252)
315: 2026-10-30T03:09:52.6072474Z    Start at  03:09:47
316: 2026-10-30T03:09:52.6075338Z    Duration  4.87s (transform 601ms, setup 0ms, collect 2.50s, tests 2.42s, environment 8ms, prepare 2.76s)
```

## Four performance scripts and output

```text
362: 2026-10-30T03:09:52.7326297Z ##[group]Run yarn test:perf
363: 2026-10-30T03:09:52.7326640Z yarn test:perf
364: 2026-10-30T03:09:52.7346829Z shell: /usr/bin/bash -e {0}
365: 2026-10-30T03:09:52.7347127Z ##[endgroup]
366: 2026-10-30T03:09:52.8824523Z yarn run v1.22.22
367: 2026-10-30T03:09:52.9201652Z $ cd __performance_tests__ && node add-data.mjs && node todo.mjs && node incremental.mjs && node large-obj.mjs
368: 2026-10-30T03:09:52.9779166Z 
369: 2026-10-30T03:09:52.9779938Z # add-data - loading large set of data
370: 2026-10-30T03:09:52.9780364Z 
371: 2026-10-30T03:09:52.9795072Z just mutate: 0ms
372: 2026-10-30T03:09:52.9839931Z just mutate, freeze: 0ms
373: 2026-10-30T03:09:52.9840806Z handcrafted reducer (no freeze): 0ms
374: 2026-10-30T03:09:52.9841765Z handcrafted reducer (with freeze): 0ms
375: 2026-10-30T03:09:53.0955169Z immutableJS: 23ms
376: 2026-10-30T03:09:53.1995208Z immutableJS + toJS: 23ms
377: 2026-10-30T03:09:53.3424006Z seamless-immutable: 30ms
378: 2026-10-30T03:09:53.5176238Z seamless-immutable + asMutable: 37ms
379: 2026-10-30T03:09:53.5978866Z immer - without autofreeze * 10000: 27ms
380: 2026-10-30T03:09:53.6680136Z immer - with autofreeze * 10000: 19ms
381: 2026-10-30T03:09:54.7614937Z 
382: 2026-10-30T03:09:54.7615564Z # todo - performance
383: 2026-10-30T03:09:54.7615922Z 
384: 2026-10-30T03:09:55.1234916Z just mutate: 0ms
385: 2026-10-30T03:09:55.7806805Z just mutate, freeze: 67ms
386: 2026-10-30T03:09:56.1211713Z deepclone, then mutate: 71ms
387: 2026-10-30T03:09:56.7766618Z deepclone, then mutate, then freeze: 131ms
388: 2026-10-30T03:09:56.7852732Z handcrafted reducer (no freeze): 2ms
389: 2026-10-30T03:09:56.7943072Z handcrafted reducer (with freeze): 2ms
390: 2026-10-30T03:09:56.7992669Z naive handcrafted reducer (without freeze): 1ms
391: 2026-10-30T03:09:56.9095162Z naive handcrafted reducer (with freeze): 9ms
392: 2026-10-30T03:09:56.9371857Z immutableJS: 4ms
393: 2026-10-30T03:09:57.2658002Z immutableJS + toJS: 66ms
394: 2026-10-30T03:09:57.3844268Z seamless-immutable: 25ms
395: 2026-10-30T03:09:57.7666146Z seamless-immutable + asMutable: 68ms
396: 2026-10-30T03:09:57.8073551Z immer - without autofreeze: 6ms
397: 2026-10-30T03:09:57.8840185Z immer - with autofreeze: 16ms
398: 2026-10-30T03:09:57.9538640Z immer - without autofreeze - with patch listener: 14ms
399: 2026-10-30T03:09:58.0325145Z immer - with autofreeze - with patch listener: 16ms
400: 2026-10-30T03:09:58.1526659Z 
401: 2026-10-30T03:09:58.1527634Z # incremental - lot of small incremental changes
402: 2026-10-30T03:09:58.1528086Z 
403: 2026-10-30T03:09:58.1546627Z just mutate: 0ms
404: 2026-10-30T03:09:58.1664146Z handcrafted reducer: 2ms
405: 2026-10-30T03:09:58.1856846Z immutableJS: 6ms
406: 2026-10-30T03:09:58.6368824Z immer: 92ms
407: 2026-10-30T03:09:58.6605400Z immer - single produce: 6ms
408: 2026-10-30T03:09:58.6946152Z 
409: 2026-10-30T03:09:58.6947104Z # large-obj - mutate large object
410: 2026-10-30T03:09:58.6947389Z 
411: 2026-10-30T03:10:00.2426680Z immer - with setUseStrictShallowCopy: 311ms
412: 2026-10-30T03:10:00.3219580Z immer - without setUseStrictShallowCopy: 16ms
413: 2026-10-30T03:10:00.3390358Z Done in 7.46s.
414: 2026-10-30T03:10:00.3621151Z ##[group]Run coverallsapp/github-action@8cbef1dea373ebce56de0a14c68d6267baa10b44
```

## Coveralls action

```text
414: 2026-10-30T03:10:00.3621151Z ##[group]Run coverallsapp/github-action@8cbef1dea373ebce56de0a14c68d6267baa10b44
415: 2026-10-30T03:10:00.3621669Z with:
416: 2026-10-30T03:10:00.3636560Z   github-token: ***
417: 2026-10-30T03:10:00.3636874Z   path-to-lcov: ./coverage/lcov.info
418: 2026-10-30T03:10:00.3637206Z   coveralls-endpoint: https://coveralls.io
419: 2026-10-30T03:10:00.3637508Z ##[endgroup]
420: 2026-10-30T03:10:00.5048968Z Using lcov file: ./coverage/lcov.info
421: 2026-10-30T03:10:03.4493177Z ##[warning]The `set-output` command is deprecated and will be disabled soon. Please upgrade to using Environment Files. For more information see: https://github.blog/changelog/2022-10-11-github-actions-deprecating-save-state-and-set-output-commands/
422: 2026-10-30T03:10:03.4685223Z Post job cleanup.
423: 2026-10-30T03:10:03.6045308Z Post job cleanup.
```

Coveralls action success and use of the lcov file were observed. An independent server upload ID or result URL was not emitted in this log. This is fork CI evidence, not upstream review or merge.
