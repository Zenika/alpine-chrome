FROM zenika/alpine-chrome

USER root
RUN apk add --no-cache tini@edge make@edge gcc@edge g++@edge python@edge git@edge nodejs@edge nodejs-npm@edge yarn@edge \
    && apk add --no-cache -X http://dl-cdn.alpinelinux.org/alpine/edge/testing wqy-zenhei \
	&& rm -rf /var/lib/apt/lists/* \
    /var/cache/apk/* \
    /usr/share/man \
    /tmp/*
USER chrome
ENTRYPOINT ["tini", "--"]
