FROM zenika/alpine-chrome

USER root
RUN apk add --no-cache chromium-chromedriver
USER chrome
ENTRYPOINT ["chromedriver","--allowed-ips=","--allowed-origins=*"]
