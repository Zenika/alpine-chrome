FROM zenika/alpine-chrome:with-node

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD 1
COPY --chown=chrome package.json package-lock.json /usr/src/app/
RUN npm install
COPY --chown=chrome . /usr/src/app
WORKDIR /usr/src/app
ENTRYPOINT []
ENTRYPOINT ["tini", "--"]
CMD node pdf.js
