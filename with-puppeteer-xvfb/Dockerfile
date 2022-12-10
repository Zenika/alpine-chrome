FROM zenika/alpine-chrome:with-puppeteer

USER 0
RUN apk add --no-cache xvfb
USER chrome

ENV DISPLAY :99

COPY --chown=chrome . ./
RUN chmod +x docker-entrypoint.sh
ENTRYPOINT ["/usr/src/app/docker-entrypoint.sh"]
CMD ["node", "/usr/src/app/src/extension.js"]
