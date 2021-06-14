#!/bin/bash

set -e

CURRENT_DIR=$(dirname "$BASH_SOURCE")

PROTO_DIR=$CURRENT_DIR/../idl
ABS_PROTO_DIR=$PWD/idl/
SRC_DIR=$CURRENT_DIR/../src/idl

mkdir -p $PROTO_DIR
rm $PROTO_DIR/* || true

echo "Download proto files..."

fetch-github-release findy-network findy-agent-api ./idl

TARGET_DIR=$ABS_PROTO_DIR

echo "Run JS generator..."

grpc_tools_node_protoc \
    --js_out=import_style=commonjs,binary:$TARGET_DIR \
    --grpc_out=grpc_js:$TARGET_DIR \
    -I $TARGET_DIR \
    "$TARGET_DIR"agent.proto "$TARGET_DIR"protocol.proto

echo "Run TS generator..."

protoc \
    --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
    --ts_out=grpc_js:${TARGET_DIR} \
    -I $TARGET_DIR \
    "$TARGET_DIR"agent.proto "$TARGET_DIR"protocol.proto

mkdir -p $SRC_DIR
rm $SRC_DIR/* || true
mv $PROTO_DIR/*s $SRC_DIR
