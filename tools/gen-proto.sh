#!/bin/bash

set -e

if [ -z "$GITHUB_TOKEN" ]; then
  echo "ERROR: Define env variable GITHUB_TOKEN"
  exit 1
fi

CURRENT_DIR=$(dirname "$BASH_SOURCE")

PROTO_DIR=$CURRENT_DIR/../idl
ABS_PROTO_DIR=$PWD/idl/
SRC_DIR=$CURRENT_DIR/../src/idl

mkdir -p $PROTO_DIR
rm $PROTO_DIR/* || true

fetch-github-release findy-network findy-agent-api ./idl

TARGET_DIR=$ABS_PROTO_DIR

protoc \
    --js_out="import_style=commonjs,binary:${TARGET_DIR}" \
    --ts_out="${TARGET_DIR}" \
    -I $TARGET_DIR \
    "$TARGET_DIR"agent.proto "$TARGET_DIR"protocol.proto

mkdir -p $SRC_DIR
rm $SRC_DIR/* || true
mv $PROTO_DIR/*s $SRC_DIR
