FROM zenika/alpine-chrome:with-puppeteer

# Prepare
USER root
RUN chmod -R 777 /usr/lib
RUN echo http://dl-cdn.alpinelinux.org/alpine/v3.11/main > /etc/apk/repositories \
    && echo http://dl-cdn.alpinelinux.org/alpine/v3.11/community  >> /etc/apk/repositories \
    && echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories \
    && echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories

RUN apk update \
    && apk add alpine-sdk@edge \
    && apk del chromium \
    && addgroup chrome abuild

# Fetch
USER chrome
RUN git clone https://git.alpinelinux.org/aports/ \
    && cd aports \
    && git checkout 559ca01ce273111fa46352af60e88d74c657c7f5

# Patch
WORKDIR /usr/src/app/aports/community/chromium
RUN sed -i '284i	install -Dm755 swiftshader/libEGL.so "$pkgdir"/usr/lib/$pkgname/swiftshader/libEGL.so' APKBUILD \
    && sed -i '285i	install -Dm755 swiftshader/libGLESv2.so "$pkgdir"/usr/lib/$pkgname/swiftshader/libGLESv2.so' APKBUILD \
    && sed -i '289i	install -Dm755 xdg-mime "$pkgdir"/usr/lib/$pkgname/xdg-mime'  APKBUILD \
    && sed -i '290i	install -Dm755 xdg-settings "$pkgdir"/usr/lib/$pkgname/xdg-settings' APKBUILD \
    && sed -i '300i	cp -a MEIPreload "$pkgdir"/usr/lib/$pkgname/' APKBUILD

# Build
RUN abuild-keygen -a \
    && abuild checksum \
    && abuild -r

# Install and clean up
USER root
RUN apk add --allow-untrusted $(find /home -name chromium-80*) \
    && apk del alpine-sdk \
    && rm -rf /usr/src/app/aports

USER chrome
WORKDIR /usr/src/app

COPY --chown=chrome package.json package-lock.json ./
RUN npm install
COPY --chown=chrome . ./

ENTRYPOINT ["tini", "--"]
CMD ["node", "src/pdf"]
