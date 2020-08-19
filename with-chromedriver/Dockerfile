FROM zenika/alpine-chrome

USER root
RUN apk add --no-cache chromium-chromedriver \
    && rm -rf /var/lib/apt/lists/* \
    /var/cache/apk/* \
    /usr/share/man \
    /tmp/*
USER chrome
ENTRYPOINT ["chromedriver","--whitelisted-ips"]
