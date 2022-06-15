#!/bin/sh

DIR=$(cd $(dirname $0) && pwd)
${DIR}/../test.sh
docker container run --rm --entrypoint '' ${IMAGE_NAME:-zenika/alpine-chrome:with-chromedriver} chromedriver --version
