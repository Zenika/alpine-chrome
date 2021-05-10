FROM zenika/alpine-chrome:with-puppeteer

USER 0
RUN apk upgrade -U -a \
    && apk add xvfb\
    && rm -rf /var/cache/* \
    && mkdir /var/cache/apk
USER chrome

ENV DISPLAY :99

COPY --chown=chrome . ./
RUN chmod +x docker-entrypoint.sh
ENTRYPOINT ["/usr/src/app/docker-entrypoint.sh"] 
CMD ["node", "src/extension.js"]
