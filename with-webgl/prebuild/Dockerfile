FROM zenika/alpine-chrome:with-puppeteer

# Install
USER root
COPY chromium-80.0.3987.149-r0.apk /home/chrome/chromium-80.0.3987.149-r0.apk

RUN echo http://dl-cdn.alpinelinux.org/alpine/v3.11/main > /etc/apk/repositories \
    && echo http://dl-cdn.alpinelinux.org/alpine/v3.11/community  >> /etc/apk/repositories \
    && echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories \
    && echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories \
    && apk update

RUN apk add --allow-untrusted /home/chrome/chromium-80.0.3987.149-r0.apk

USER chrome
WORKDIR /usr/src/app

ENTRYPOINT ["tini", "--"]
CMD ["node", "src/pdf"]
