#!/bin/bash


cd $(cd "$(dirname "$0")" ; pwd)/..
dir="$PWD"


./commands/copyworkspace.sh ~/.build

cd ~/.build

# TODO: Factor this out of deploy.sh
defaultHost='${locationData.protocol}//${locationData.hostname}:'
homeURL='https://www.cyph.com'
sed -i "s|${defaultHost}42002|https://cyph.app|g" shared/js/cyph/env-deploy.ts
sed -i "s|CYPH-AUDIO|https://cyph.audio|g" shared/js/cyph/env-deploy.ts
sed -i "s|CYPH-IM|https://cyph.im|g" shared/js/cyph/env-deploy.ts
sed -i "s|CYPH-IO|https://cyph.io|g" shared/js/cyph/env-deploy.ts
sed -i "s|CYPH-ME|https://cyph.me|g" shared/js/cyph/env-deploy.ts
sed -i "s|CYPH-VIDEO|https://cyph.video|g" shared/js/cyph/env-deploy.ts
sed -i "s|http://localhost:42000|https://api.cyph.com|g" backend/config.go
sed -i "s|${defaultHost}42000|https://api.cyph.com|g" shared/js/cyph/env-deploy.ts
sed -i "s|${defaultHost}43000|${homeURL}|g" shared/js/cyph/env-deploy.ts

cd cyph.com
../commands/buildunbundledassets.sh
../commands/prodbuild.sh --configuration prod

cp ../shared/assets/js/standalone/analytics.js dist/
cp ../shared/assets/js/standalone/global.js dist/
cp ../shared/assets/node_modules/core-js/client/shim.js dist/
rm -rf "${dir}/cyph.com/dist"
mv dist "${dir}/cyph.com/"
