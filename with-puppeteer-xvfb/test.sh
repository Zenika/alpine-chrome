#!/bin/sh -e

IMAGE_NAME=${IMAGE_NAME:-zenika/alpine-chrome:with-puppeteer-xvfb}
export IMAGE_NAME

DIR=$(cd $(dirname $0) && pwd)
${DIR}/../test.sh

echo "# Puppeteer-Xvfb test"
EXPECTED_PNG="${DIR}/test/example.png"
rm -f ${EXPECTED_PNG}
chmod a+rwX -R ${DIR}/test
docker container run --rm --volume ${DIR}/test:/usr/src/app/test --cap-add=SYS_ADMIN ${IMAGE_NAME} node test/test.js
[ -f "${EXPECTED_PNG}" ] && echo "Screenshot created" || { echo "Missing screenshot" 2>&1; exit 1; }
