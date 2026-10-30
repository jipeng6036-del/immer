#!/bin/sh
set -eu
node --version > /e/linux-node-version.txt
npm --version > /e/linux-npm-version.txt
for kind in baseline candidate; do
  consumer=/e/consumers/linux-$kind
  mkdir -p "$consumer"
  printf '{"name":"pr4-immer-tarball-consumer","private":true,"version":"1.0.0"}\n' > "$consumer/package.json"
  cp /e/public-probe.cjs /e/entry.cjs /e/entry.mjs "$consumer/"
  cd "$consumer"
  npm install --ignore-scripts --no-audit --no-fund "/e/artifacts/$kind/immer-10.0.3-beta.tgz" > "/e/linux-$kind-install.stdout.log" 2> "/e/linux-$kind-install.stderr.log"
  for style in cjs esm; do
    if [ "$style" = cjs ]; then entry=entry.cjs; else entry=entry.mjs; fi
    for mode in development production; do
      if [ "$style" = esm ] && [ "$mode" = production ]; then continue; fi
      set +e
      NODE_ENV=$mode node "$entry" > "/e/linux-$kind-$style-$mode.json" 2> "/e/linux-$kind-$style-$mode.stderr.log"
      code=$?
      set -e
      printf '%s\n' "$code" > "/e/linux-$kind-$style-$mode.exit"
      printf '%s %s\n' "linux-$kind-$style-$mode" "$code"
      if [ "$kind" = candidate ] && [ "$code" -ne 0 ]; then exit "$code"; fi
      if [ "$kind" = baseline ] && [ "$code" -ne 1 ]; then exit 10; fi
    done
  done
done
