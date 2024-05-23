#!/bin/sh -e

IMAGE_NAME=${IMAGE_NAME:-zenika/alpine-chrome:with-selenoid}
export IMAGE_NAME

DIR=$(cd $(dirname $0) && pwd)
${DIR}/../test.sh

echo "# Selenoid test"
docker container run --rm --entrypoint '' ${IMAGE_NAME} selenoid -version
