#/usr/bin/sh

dir='build'
outFile='mini_logiciel.js'
outFileMini='mini_logiciel.min.js'

rm -rf $dir
mkdir $dir

cat node_modules/wolfy87-eventemitter/EventEmitter.min.js > ${dir}/${outFile}
cat node_modules/jquery.cookie/jquery.cookie.js >> ${dir}/${outFile}
cat src/sha256.js >> ${dir}/${outFile}
cat src/networkConfig.js >> ${dir}/${outFile}
cat src/bannerHandle.js >> ${dir}/${outFile}
cat src/idHandle.js >> ${dir}/${outFile}
cat src/extEventHandler.js >> ${dir}/${outFile}
cat src/dataHandler.js >> ${dir}/${outFile}
cat src/main.js >> ${dir}/${outFile}
uglifyjs --compress --mangle -- ${dir}/${outFile} > ${dir}/${outFileMini}
