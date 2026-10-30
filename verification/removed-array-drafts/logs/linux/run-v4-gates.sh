set -eu
node --version
yarn --version
mkdir -p /work/baseline /work/candidate
cd /work/baseline
tar -xf /evidence/linux-baseline.tar
yarn --frozen-lockfile
NODE_OPTIONS=--openssl-legacy-provider yarn test:size
cd /work/candidate
tar -xf /evidence/linux-candidate-v4.tar
yarn --frozen-lockfile
yarn test:size
NODE_OPTIONS=--openssl-legacy-provider yarn test:size
yarn test
yarn coverage
yarn test:perf
