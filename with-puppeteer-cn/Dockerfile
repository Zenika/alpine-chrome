FROM zenika/alpine-chrome:with-puppeteer

USER root
# add font manager
RUN apk add ttf-dejavu
# copy font files
COPY font/* /usr/share/fonts/
USER chrome

ENTRYPOINT ["tini", "--"]
CMD ["node", "src/pdf"]