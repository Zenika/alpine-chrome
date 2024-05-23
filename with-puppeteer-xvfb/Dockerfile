FROM zenika/alpine-chrome:with-puppeteer

USER 0
RUN apk add --no-cache xvfb
USER chrome

ENV DISPLAY :99

COPY --chown=chrome docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh
ENTRYPOINT ["/usr/src/app/docker-entrypoint.sh"]
