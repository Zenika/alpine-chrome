#!/bin/sh -e

IMAGE_NAME=${IMAGE_NAME:-zenika/alpine-chrome:with-node}
export IMAGE_NAME

DIR=$(cd $(dirname $0) && pwd)
${DIR}/../test.sh

echo "# Node test"
docker container run --rm --entrypoint '' ${IMAGE_NAME} node --version
