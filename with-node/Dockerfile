FROM zenika/alpine-chrome

USER root
RUN apk add --no-cache tini make gcc g++ python git nodejs nodejs-npm yarn wqy-zenhei \
	&& rm -rf /var/lib/apt/lists/* \
    /var/cache/apk/* \
    /usr/share/man \
    /tmp/*
USER chrome
ENTRYPOINT ["tini", "--"]
