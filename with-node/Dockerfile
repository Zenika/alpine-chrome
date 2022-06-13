FROM zenika/alpine-chrome

USER root
RUN apk add --no-cache \
      tini make python3 git nodejs npm yarn && \
    apk add --no-cache \
      --repository=https://dl-cdn.alpinelinux.org/alpine/edge/main \
      make gcc g++
USER chrome
ENTRYPOINT ["tini", "--"]
