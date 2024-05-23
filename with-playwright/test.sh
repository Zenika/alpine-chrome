#!/bin/sh -e

IMAGE_NAME=${IMAGE_NAME:-zenika/alpine-chrome:with-playwright}
export IMAGE_NAME

DIR=$(cd $(dirname $0) && pwd)
${DIR}/../test.sh

echo "# Playwright test"
EXPECTED_SCREENSHOT="${DIR}/test/example.png"
rm -f "${EXPECTED_SCREENSHOT}"
chmod a+rwX -R ${DIR}/test
docker container run --rm --volume ${DIR}/test:/usr/src/app/test ${IMAGE_NAME} node test/test.js
[ -f "${EXPECTED_SCREENSHOT}" ] && echo "Screenshot created" || { echo "Missing screenshot" 2>&1; exit 1; }
