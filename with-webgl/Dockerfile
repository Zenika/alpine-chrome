FROM zenika/alpine-chrome:with-puppeteer

USER root
RUN apk add alpine-sdk
RUN usermod -aG abuild chrome

USER chrome
RUN git clone https://git.alpinelinux.org/aports/
RUN cd aports/community/chromium
RUN abuild-keygen -a
RUN sed '290i	install -Dm755 swiftshader/libEGL.so "$pkgdir"/usr/lib/$pkgname/swiftshader/libEGL.so' APKBUILD > APKBUILD \
    && sed '291i	install -Dm755 swiftshader/libGLESv2.so "$pkgdir"/usr/lib/$pkgname/swiftshader/libGLESv2.so' APKBUILD > APKBUILD \
    && sed '296i	install -Dm755 xdg-mime "$pkgdir"/usr/lib/$pkgname/xdg-mime'  APKBUILD > APKBUILD \
    && sed '297i	install -Dm755 xdg-settings "$pkgdir"/usr/lib/$pkgname/xdg-settings' APKBUILD > APKBUILD \
    && sed '307i	cp -a MEIPreload "$pkgdir"/usr/lib/$pkgname/' APKBUILD > APKBUILD

RUN abuild checksum && abuild -r -i

RUN apk rm alpine-sdk
RUN rm -rf aports

WORKDIR /usr/src/app

ENTRYPOINT ["tini", "--"]
CMD ["node", "src/pdf"]
