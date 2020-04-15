FROM zenika/alpine-chrome

USER root
COPY swiftshader/libEGL.so /usr/lib/chromium/swiftshader/libEGL.so
COPY swiftshader/libGLESv2.so /usr/lib/chromium/swiftshader/libGLESv2.so
RUN chmod 755 /usr/lib/chromium/swiftshader/libEGL.so
RUN chmod 755 /usr/lib/chromium/swiftshader/libGLESv2.so
USER chrome
# Autorun chrome headless with GPU enabled thanks to swiftshader
ENTRYPOINT ["chromium-browser", "--headless", "--use-gl=swiftshader", "--disable-software-rasterizer", "--disable-dev-shm-usage"]
