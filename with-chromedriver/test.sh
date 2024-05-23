#!/bin/sh -e

IMAGE_NAME=${IMAGE_NAME:-zenika/alpine-chrome:with-chromedriver}
export IMAGE_NAME

DIR=$(cd $(dirname $0) && pwd)
${DIR}/../test.sh

echo "# Chromedriver test"
docker container run --rm --entrypoint '' ${IMAGE_NAME} chromedriver --version
