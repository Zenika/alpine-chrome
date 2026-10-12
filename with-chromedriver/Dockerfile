ARG REGISTRY=zenika
FROM ${REGISTRY}/alpine-chrome

USER root
RUN apk add --no-cache chromium-chromedriver
USER chrome
EXPOSE 9515
ENTRYPOINT ["chromedriver","--allowed-ips=","--allowed-origins=*"]
