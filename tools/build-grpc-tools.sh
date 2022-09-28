#!/bin/bash

# prerequisites: brew install jq cmake

mkdir -p .build
mkdir -p ./node_modules/
mkdir -p ./node_modules/.bin

git clone https://github.com/grpc/grpc-node.git .build/grpc-node

cd .build/grpc-node
git submodule update --init --recursive --depth 1 packages/grpc-tools/deps/protobuf

./packages/grpc-tools/build_binaries.sh
cp .build/grpc-node/packages/grpc-tools/build/bin/grpc_node_plugin ./node_modules/.bin
cp .build/grpc-node/packages/grpc-tools/build/bin/protoc ./node_modules/.bin