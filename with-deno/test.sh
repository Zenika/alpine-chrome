#!/bin/sh -e

IMAGE_NAME=${IMAGE_NAME:-zenika/alpine-chrome:with-deno}
export IMAGE_NAME

DIR=$(cd $(dirname $0) && pwd)
${DIR}/../test.sh

echo "# Deno test"
docker container run --rm --entrypoint '' ${IMAGE_NAME} deno --version
