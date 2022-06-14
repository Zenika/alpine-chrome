FROM alpine:3.16

ARG BUILD_DATE
ARG VCS_REF

LABEL org.opencontainers.image.created=$BUILD_DATE \
    org.opencontainers.image.description="Chrome running in headless mode in a tiny Alpine image" \
    org.opencontainers.image.title="alpine-chrome" \
    org.opencontainers.image.documentation="https://github.com/Zenika/alpine-chrome/blob/master/README.md" \
    org.opencontainers.image.source="https://github.com/Zenika/alpine-chrome" \
    org.opencontainers.image.revision=$VCS_REF \
    org.opencontainers.image.vendor="Zenika" \
    org.opencontainers.image.version="latest"

# Installs latest Chromium package.
RUN apk upgrade --no-cache --available \
    && apk add --no-cache \
      chromium \
      ttf-freefont \
      font-noto-emoji \
    && apk add --no-cache \
      --repository=https://dl-cdn.alpinelinux.org/alpine/edge/testing \
      font-wqy-zenhei

COPY local.conf /etc/fonts/local.conf

# Add Chrome as a user
RUN mkdir -p /usr/src/app \
    && adduser -D chrome \
    && chown -R chrome:chrome /usr/src/app
# Run Chrome as non-privileged
USER chrome
WORKDIR /usr/src/app

ENV CHROME_BIN=/usr/bin/chromium-browser \
    CHROME_PATH=/usr/lib/chromium/

# Autorun chrome headless
ENTRYPOINT ["chromium-browser", "--headless", "--use-gl=swiftshader", "--disable-software-rasterizer", "--disable-dev-shm-usage"]
