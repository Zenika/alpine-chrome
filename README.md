[![Docker Build Status](https://img.shields.io/docker/build/zenika/alpine-chrome.svg)](https://hub.docker.com/r/zenika/alpine-chrome/) [![Docker Pulls](https://img.shields.io/docker/pulls/zenika/alpine-chrome.svg)](https://hub.docker.com/r/zenika/alpine-chrome/) [![Layers](https://images.microbadger.com/badges/image/zenika/alpine-chrome.svg)](https://microbadger.com/images/zenika/alpine-chrome) [![Version](https://images.microbadger.com/badges/version/zenika/alpine-chrome.svg)](https://microbadger.com/images/zenika/alpine-chrome)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-27-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

# Supported tags and respective `Dockerfile` links

- `latest`, `81` [(Dockerfile)](https://github.com/Zenika/alpine-chrome/blob/master/Dockerfile)
- `with-webgl` [(Dockerfile)](https://github.com/Zenika/alpine-chrome/blob/master/with-webgl/Dockerfile)
- `with-node`, `81-with-node`, `81-with-node-12` [(Dockerfile)](https://github.com/Zenika/alpine-chrome/blob/master/with-node/Dockerfile)
- `with-puppeteer`, `81-with-puppeteer` [(Dockerfile)](https://github.com/Zenika/alpine-chrome/blob/master/with-puppeteer/Dockerfile)
- `80`, `77`, `76`, `73`, `72`, `71`, `68`, `64`
- `80-with-node`, `77-with-node`, `76-with-node`
- `80-with-puppeteer`, `77-with-puppeteer`, `76-with-puppeteer`

# alpine-chrome

Chrome running in headless mode in a tiny Alpine image

# Why this image

We often need a headless chrome.
We created this image to get a fully headless chrome image.
Be careful to the "--no-sandbox" flag from Chrome

# 3 ways to use Chrome Headless with this image

## ❌ With nothing

Launching the container using only `docker container run -it zenika/alpine-chrome ...` will fail with some logs similar to [#33](https://github.com/Zenika/alpine-chrome/issues/33).

Please use the 3 others ways to use Chrome Headless.

## ✅ With `--no-sandbox`

Launch the container using:

`docker container run -it --rm zenika/alpine-chrome` and use the `--no-sandbox` flag for all your commands.

Be careful to know the website you're calling.

Explanation for the `no-sandbox` flag in a [quick introduction here](https://www.google.com/googlebooks/chrome/med_26.html) and for [More in depth design document here](https://chromium.googlesource.com/chromium/src/+/master/docs/design/sandbox.md)

## ✅ With `SYS_ADMIN` capability

Launch the container using:
`docker container run -it --rm --cap-add=SYS_ADMIN zenika/alpine-chrome`

This allows to run Chrome with sandboxing but needs unnecessary privileges from a Docker point of view.

## ✅ The best: With `seccomp`

Thanks to ever-awesome Jessie Frazelle seccomp profile for Chrome.

[chrome.json](https://github.com/Zenika/alpine-chrome/blob/master/chrome.json)

Also available here `wget https://raw.githubusercontent.com/jfrazelle/dotfiles/master/etc/docker/seccomp/chrome.json`

Launch the container using:
`docker container run -it --rm --security-opt seccomp=$(pwd)/chrome.json zenika/alpine-chrome`

# How to use in command line

## Default entrypoint

The default entrypoint does the following command: `chromium-browser --headless --disable-gpu --disable-software-rasterizer --disable-dev-shm-usage`

You can get full control by overriding the entrypoint using: `docker container run -it --rm --entrypoint "" zenika/alpine-chrome chromium-browser ...`

## Use the devtools

Command (with no-sandbox): `docker container run -d -p 9222:9222 zenika/alpine-chrome --no-sandbox --remote-debugging-address=0.0.0.0 --remote-debugging-port=9222 https://www.chromestatus.com/`

Open your browser to: `http://localhost:9222` and then click on the tab you want to inspect. Replace the beginning
`https://chrome-devtools-frontend.appspot.com/serve_file/@.../inspector.html?ws=localhost:9222/[END]`
by
`chrome-devtools://devtools/bundled/inspector.html?ws=localhost:9222/[END]`

## Print the DOM

Command (with no-sandbox): `docker container run -it --rm zenika/alpine-chrome --no-sandbox --dump-dom https://www.chromestatus.com/`

## Print a PDF

Command (with no-sandbox): `docker container run -it --rm -v $(pwd):/usr/src/app zenika/alpine-chrome --no-sandbox --print-to-pdf --hide-scrollbars https://www.chromestatus.com/`

## Take a screenshot

Command (with no-sandbox): `docker container run -it --rm -v $(pwd):/usr/src/app zenika/alpine-chrome --no-sandbox --screenshot --hide-scrollbars https://www.chromestatus.com/`

### Size of a standard letterhead.

Command (with no-sandbox): `docker container run -it --rm -v $(pwd):/usr/src/app zenika/alpine-chrome --no-sandbox --screenshot --hide-scrollbars --window-size=1280,1696 https://www.chromestatus.com/`

### Nexus 5x

Command (with no-sandbox): `docker container run -it --rm -v $(pwd):/usr/src/app zenika/alpine-chrome --no-sandbox --screenshot --hide-scrollbars --window-size=412,732 https://www.chromestatus.com/`

### Screenshot owned by current user (by default the file is owned by the container user)

Command (with no-sandbox): `` docker container run -u `id -u $USER` -it --rm -v $(pwd):/usr/src/app zenika/alpine-chrome --no-sandbox --screenshot --hide-scrollbars --window-size=412,732 https://www.chromestatus.com/ ``

# How to use with Puppeteer

With tool like ["Puppeteer"](https://pptr.dev/#?product=Puppeteer&version=v1.15.0&show=api-class-browser), we can add a lot things with our Chrome Headless.

With some code in NodeJS, we can improve and make some tests.

See the ["with-puppeteer"](https://github.com/Zenika/alpine-chrome/blob/master/with-puppeteer) folder for more details.

If you have a NodeJS/Puppeteer script in your `src` folder named `pdf.js`, you can launch it using the following command:

```
docker container run -it --rm -v $(pwd)/src:/usr/src/app/src --cap-add=SYS_ADMIN zenika/alpine-chrome:with-puppeteer node src/pdf.js
```

With the ["wqy-zenhei"](https://pkgs.alpinelinux.org/package/edge/testing/x86/wqy-zenhei) library, you could also manipulate asian pages like in ["screenshot-asia.js"](https://github.com/Zenika/alpine-chrome/blob/master/with-puppeteer/src/screenshot-asia.js)

```
docker container run -it --rm -v $(pwd)/src:/usr/src/app/src --cap-add=SYS_ADMIN zenika/alpine-chrome:with-puppeteer node src/screenshot-asia.js
```

These websites are tested with the following supported languages:

- Chinese (with `https://m.baidu.com`)
- Japanese (with `https://www.yahoo.co.jp/`)
- Korean (with `https://www.naver.com/`)

# How to use with Playwright

Like ["Puppeteer"](https://pptr.dev/#?product=Puppeteer&version=v1.15.0&show=api-class-browser), we can do a lot things using ["Playwright"](https://playwright.dev/#version=v1.0.1&path=docs%2Fcore-concepts.md&q=browser) with our Chrome Headless.

Go to the `with-playwright` folder and launch the following command:

```
docker container run -it --rm -v $(pwd)/src:/usr/src/app/src --cap-add=SYS_ADMIN zenika/alpine-chrome:with-playwright npm start
```

# How to use with WebGL

Links:

- https://github.com/adieuadieu/serverless-chrome/issues/108
- https://github.com/DevExpress/testcafe/issues/2116
- 'use-gl' values [here](https://cs.chromium.org/chromium/src/ui/gl/gl_switches.cc?type=cs&q=kUseGL&sq=package:chromium&g=0&l=69)

`docker container run -it --rm --cap-add=SYS_ADMIN -v $(pwd):/usr/src/app zenika/alpine-chrome:with-webgl --screenshot --hide-scrollbars https://webglfundamentals.org/webgl/webgl-fundamentals.html`

`docker container run -it --rm --cap-add=SYS_ADMIN -v $(pwd):/usr/src/app zenika/alpine-chrome:with-webgl --screenshot --hide-scrollbars https://browserleaks.com/webgl`

# Run as root and override defaut entrypoint

We can run the container as root with this command:

```
docker container run --rm -it --entrypoint "" --user root zenika/alpine-chrome sh
```

# Run examples

Some examples are available on the `examples` [directory](examples):

- [docker-compose](https://github.com/Zenika/alpine-chrome/blob/master/examples/docker-compose) to launch a chrome calling a nginx server in the same docker-compose
- [x11](https://github.com/Zenika/alpine-chrome/blob/master/examples/x11) to experiment this image with a X11 server.

# References

- Headless Chrome website: https://developers.google.com/web/updates/2017/04/headless-chrome

- List of all options of the "Chromium" command line: https://peter.sh/experiments/chromium-command-line-switches/

- Where to file issues: https://github.com/Zenika/alpine-chrome/issues

- Maintained by: https://www.zenika.com

# Versions (in latest)

## Alpine version

```
docker run -it --rm --entrypoint "" zenika/alpine-chrome cat /etc/alpine-release
3.11.6
```

## Chrome version

```
docker run -it --rm --entrypoint "" zenika/alpine-chrome chromium-browser --version
Chromium 81.0.4044.122
```

## Image disk size

```
docker image inspect zenika/alpine-chrome --format='{{.Size}}'
368292240
```

# ✨ Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/lygstate"><img src="https://avatars3.githubusercontent.com/u/121040?v=4" width="100px;" alt=""/><br /><sub><b>Yonggang Luo</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/commits?author=lygstate" title="Code">💻</a> <a href="#ideas-lygstate" title="Ideas, Planning, & Feedback">🤔</a> <a href="#question-lygstate" title="Answering Questions">💬</a></td>
    <td align="center"><a href="https://pixelarbeit.de"><img src="https://avatars1.githubusercontent.com/u/22632550?v=4" width="100px;" alt=""/><br /><sub><b>Dennis Koch</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/commits?author=pxlrbt" title="Code">💻</a> <a href="#ideas-pxlrbt" title="Ideas, Planning, & Feedback">🤔</a> <a href="#question-pxlrbt" title="Answering Questions">💬</a></td>
    <td align="center"><a href="https://github.com/sargonpiraev"><img src="https://avatars3.githubusercontent.com/u/9588637?v=4" width="100px;" alt=""/><br /><sub><b>Sargon Piraev</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/commits?author=sargonpiraev" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ebriand"><img src="https://avatars1.githubusercontent.com/u/1011902?v=4" width="100px;" alt=""/><br /><sub><b>Eric Briand</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/commits?author=ebriand" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/huhai463127310"><img src="https://avatars1.githubusercontent.com/u/1825820?v=4" width="100px;" alt=""/><br /><sub><b>栩风</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/commits?author=huhai463127310" title="Code">💻</a> <a href="#ideas-huhai463127310" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://rubyisforfun.com"><img src="https://avatars3.githubusercontent.com/u/1477672?v=4" width="100px;" alt=""/><br /><sub><b>Roman Pushkin</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/commits?author=ro31337" title="Code">💻</a></td>
    <td align="center"><a href="https://twitter.com/jllado"><img src="https://avatars2.githubusercontent.com/u/628929?v=4" width="100px;" alt=""/><br /><sub><b>Juan Lladó</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/commits?author=jllado" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/c24w"><img src="https://avatars2.githubusercontent.com/u/710406?v=4" width="100px;" alt=""/><br /><sub><b>Chris Watson</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3Ac24w" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://jokester.io"><img src="https://avatars0.githubusercontent.com/u/802130?v=4" width="100px;" alt=""/><br /><sub><b>Wang Guan</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3Ajokester" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/OscarSotoSanchez"><img src="https://avatars0.githubusercontent.com/u/12794770?v=4" width="100px;" alt=""/><br /><sub><b>Óscar Soto Sánchez</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3AOscarSotoSanchez" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://ro.linkedin.com/in/alexandrucalinoiu"><img src="https://avatars3.githubusercontent.com/u/679198?v=4" width="100px;" alt=""/><br /><sub><b>Calinoiu Alexandru Nicolae</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3Aalexandru-calinoiu" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/mamacdon"><img src="https://avatars2.githubusercontent.com/u/382404?v=4" width="100px;" alt=""/><br /><sub><b>Mark Macdonald</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3Amamacdon" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://www.thisiswhytheinternetexists.com"><img src="https://avatars0.githubusercontent.com/u/5497269?v=4" width="100px;" alt=""/><br /><sub><b>Felix Mann</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3ADJFliX" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/horacimacias"><img src="https://avatars2.githubusercontent.com/u/1333208?v=4" width="100px;" alt=""/><br /><sub><b>horacimacias</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3Ahoracimacias" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://emil.kjer.info"><img src="https://avatars2.githubusercontent.com/u/970602?v=4" width="100px;" alt=""/><br /><sub><b>Emil Kjer</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3Aemilkjer" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/likwid"><img src="https://avatars1.githubusercontent.com/u/523407?v=4" width="100px;" alt=""/><br /><sub><b>Jeff Gonzalez</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3Alikwid" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://www.rom.by"><img src="https://avatars2.githubusercontent.com/u/2912732?v=4" width="100px;" alt=""/><br /><sub><b>George Gaál</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3Agecube" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/wheestermans31"><img src="https://avatars1.githubusercontent.com/u/41023907?v=4" width="100px;" alt=""/><br /><sub><b>wheestermans31</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3Awheestermans31" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/hodossy"><img src="https://avatars1.githubusercontent.com/u/19623656?v=4" width="100px;" alt=""/><br /><sub><b>Hodossy, Szabolcs</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3Ahodossy" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/ardeois"><img src="https://avatars0.githubusercontent.com/u/1867939?v=4" width="100px;" alt=""/><br /><sub><b>Corentin Ardeois</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3Aardeois" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://www.dynamicfiles.de"><img src="https://avatars0.githubusercontent.com/u/1042579?v=4" width="100px;" alt=""/><br /><sub><b>Danny Althoff</b></sub></a><br /><a href="#question-FibreFoX" title="Answering Questions">💬</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/chadlwilson"><img src="https://avatars1.githubusercontent.com/u/29788154?v=4" width="100px;" alt=""/><br /><sub><b>Chad Wilson</b></sub></a><br /><a href="#question-chadlwilson" title="Answering Questions">💬</a> <a href="#ideas-chadlwilson" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/fenchu"><img src="https://avatars1.githubusercontent.com/u/11349883?v=4" width="100px;" alt=""/><br /><sub><b>fenchu</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3Afenchu" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/nrawat151290"><img src="https://avatars1.githubusercontent.com/u/3829598?v=4" width="100px;" alt=""/><br /><sub><b>nrawat151290</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3Anrawat151290" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://blog.zenika.com/author/jlandure/"><img src="https://avatars2.githubusercontent.com/u/525974?v=4" width="100px;" alt=""/><br /><sub><b>Julien Landuré</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/commits?author=jlandure" title="Code">💻</a> <a href="https://github.com/Zenika/alpine-chrome/pulls?q=is%3Apr+reviewed-by%3Ajlandure" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/Zenika/alpine-chrome/commits?author=jlandure" title="Tests">⚠️</a> <a href="#ideas-jlandure" title="Ideas, Planning, & Feedback">🤔</a> <a href="#question-jlandure" title="Answering Questions">💬</a> <a href="#maintenance-jlandure" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://twitter.com/x0rzkov"><img src="https://avatars3.githubusercontent.com/u/56916043?v=4" width="100px;" alt=""/><br /><sub><b>x0rzkov</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3Ax0rzkov" title="Bug reports">🐛</a> <a href="#ideas-x0rzkov" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/jketterl"><img src="https://avatars0.githubusercontent.com/u/180748?v=4" width="100px;" alt=""/><br /><sub><b>Jakob Ketterl</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3Ajketterl" title="Bug reports">🐛</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

# 🎉 Show your support

⭐️ this repo or [leave a comment here](https://github.com/Zenika/alpine-chrome/issues/new?template=03_thanks.md)
