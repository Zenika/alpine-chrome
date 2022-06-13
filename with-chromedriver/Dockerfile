FROM zenika/alpine-chrome

USER root
RUN apk add --no-cache \
      --repository=https://dl-cdn.alpinelinux.org/alpine/edge/community \
      chromium-chromedriver
USER chrome
ENTRYPOINT ["chromedriver","--allowed-ips=","--allowed-origins=*"]
