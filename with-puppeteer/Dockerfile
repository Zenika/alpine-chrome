FROM zenika/alpine-chrome:with-node

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD 1
COPY package.json package-lock.json /usr/src/app/
RUN npm install
COPY . /usr/src/app
WORKDIR /usr/src/app
ENTRYPOINT []
CMD node pdf.js
