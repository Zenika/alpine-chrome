FROM zenika/alpine-chrome:with-puppeteer

USER root
RUN apk add --no-cache mesa-egl mesa-gles \
	&& rm -rf /var/lib/apt/lists/* \
    /var/cache/apk/* \
    /usr/share/man \
    /tmp/* \
    && mkdir /usr/lib/chromium/swiftshader/ \
    && ln -s /usr/lib/libGLESv2.so.2 /usr/lib/chromium/swiftshader/libGLESv2.so \
    && ln -s /usr/lib/libEGL.so.1 /usr/lib/chromium/swiftshader/libEGL.so
USER chrome
ENTRYPOINT ["tini", "--"]
