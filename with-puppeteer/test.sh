#!/bin/sh -e

IMAGE_NAME=${IMAGE_NAME:-zenika/alpine-chrome:with-puppeteer}
export IMAGE_NAME

DIR=$(cd $(dirname $0) && pwd)
${DIR}/../test.sh

echo "# Puppeteer test"
EXPECTED_PDF="${DIR}/test/example.pdf"
EXPECTED_CN_PNG="${DIR}/test/baidu_cn.png"
EXPECTED_JP_PNG="${DIR}/test/yahoo_jp.png"
EXPECTED_KR_PNG="${DIR}/test/naver_kr.png"
rm -f ${EXPECTED_PDF} ${EXPECTED_CN_PNG} ${EXPECTED_JP_PNG} ${EXPECTED_KR_PNG}
chmod a+rwX -R ${DIR}/test
docker container run --rm --volume ${DIR}/test:/usr/src/app/test --cap-add=SYS_ADMIN ${IMAGE_NAME} node test/test.js
[ -f "${EXPECTED_PDF}" ] && echo "PDF created" || { echo "Missing PDF" 2>&1; exit 1; }
[ -f "${EXPECTED_CN_PNG}" ] && echo "Screenshot CN created" || { echo "Missing screenshot CN" 2>&1; exit 1; }
[ -f "${EXPECTED_JP_PNG}" ] && echo "Screenshot JP created" || { echo "Missing screenshot JP" 2>&1; exit 1; }
[ -f "${EXPECTED_KR_PNG}" ] && echo "Screenshot KR created" || { echo "Missing screenshot KR" 2>&1; exit 1; }
