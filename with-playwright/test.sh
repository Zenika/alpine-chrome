#!/bin/sh -e

IMAGE_NAME=${IMAGE_NAME:-zenika/alpine-chrome:with-playwright}
export IMAGE_NAME

DIR=$(cd $(dirname $0) && pwd)
${DIR}/../test.sh

echo "# Playwright test"
WORK_DIR=$(mktemp --directory)
trap "rm -rf ${WORK_DIR}" EXIT
mkdir ${WORK_DIR}/src/ && chmod a+rwX -R ${WORK_DIR}
docker container run --rm --volume ${WORK_DIR}:/work --workdir /work ${IMAGE_NAME:-zenika/alpine-chrome:with-playwright}
[ -f ${WORK_DIR}/src/example-chromium.png ]
