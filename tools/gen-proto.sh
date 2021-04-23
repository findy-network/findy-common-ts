#!/bin/bash

set -e

if [ -z "$GITHUB_TOKEN" ]; then
  echo "ERROR: Define env variable GITHUB_TOKEN"
  exit 1
fi

CURRENT_DIR=$(dirname "$BASH_SOURCE")

rm ./idl/* || true
mkdir -p $CURRENT_DIR/../idl

fetch-github-release findy-network findy-agent-api ./idl

TARGET_DIR=$PWD/idl/

grpc_tools_node_protoc \
    --js_out=import_style=commonjs,binary:$TARGET_DIR \
    --grpc_out=grpc_js:$TARGET_DIR \
    -I $TARGET_DIR \
    "$TARGET_DIR"agent.proto "$TARGET_DIR"protocol.proto
