# 复制资源文件，这些文件不需要编译
mkdir -p  ling_chair_http
cp -r client_src/* build_cache/

# 向前兼容脚本
cd babel_lib
node node_modules/@babel/cli/bin/babel ../client_src --out-dir ../build_cache --presets=@babel/env

# 打包以减小负载
cd ../webpack_lib
node node_modules/webpack-cli/bin/cli.js --config webpack_config.js
