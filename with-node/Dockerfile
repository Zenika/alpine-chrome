FROM zenika/alpine-chrome

USER root
RUN apk add --no-cache tini make gcc g++ python git nodejs nodejs-npm yarn
USER chrome
ENTRYPOINT ["tini", "--"]
