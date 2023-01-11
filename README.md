[![GitHub Stars](https://img.shields.io/github/stars/zenika/alpine-chrome)](https://github.com/Zenika/alpine-chrome/) [![Docker Build Status](https://img.shields.io/github/workflow/status/zenika/alpine-chrome/build.svg)](https://hub.docker.com/r/zenika/alpine-chrome/) [![Docker Pulls](https://img.shields.io/docker/pulls/zenika/alpine-chrome.svg)](https://hub.docker.com/r/zenika/alpine-chrome/) [![Docker Stars](https://img.shields.io/docker/stars/zenika/alpine-chrome.svg)](https://hub.docker.com/r/zenika/alpine-chrome/)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-39-orange.svg?style=flat-square)](#-contributors)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

# Available registries

Following the changes with the [Rate Limiting on Docker Hub](https://www.docker.com/increase-rate-limits). [Tweet here for more information in 🇫🇷](https://twitter.com/jlandure/status/1322474352554770432)
- On the [Docker Hub](https://hub.docker.com/r/zenika/alpine-chrome) without any prefix: `zenika/alpine-chrome`
- On Google Cloud - available in the closest region:
  - Global: `gcr.io/zenika-hub/alpine-chrome`
  - Europe: `eu.gcr.io/zenika-hub/alpine-chrome`
  - Asia: `asia.gcr.io/zenika-hub/alpine-chrome`
  - US: `us.gcr.io/zenika-hub/alpine-chrome`

# Supported tags and respective `Dockerfile` links

- `latest`, `100` [(Dockerfile)](https://github.com/Zenika/alpine-chrome/blob/master/Dockerfile)
- `with-node`, `100-with-node`, `100-with-node-16` [(Dockerfile)](https://github.com/Zenika/alpine-chrome/blob/master/with-node/Dockerfile)
- `with-puppeteer`, `100-with-puppeteer` [(Dockerfile)](https://github.com/Zenika/alpine-chrome/blob/master/with-puppeteer/Dockerfile)
- `with-playwright`, `100-with-playwright` [(Dockerfile)](https://github.com/Zenika/alpine-chrome/blob/master/with-playwright/Dockerfile)
- `with-selenoid`, `100-with-selenoid` [(Dockerfile)](https://github.com/Zenika/alpine-chrome/blob/master/with-selenoid/Dockerfile)
- `with-chromedriver`, `100-with-chromedriver` [(Dockerfile)](https://github.com/Zenika/alpine-chrome/blob/master/with-chromedriver/Dockerfile)
- `89`, `86`, `85`, `84`, `83`, `81`, `80`, `77`, `76`, `73`, `72`, `71`, `68`, `64`
- `89-with-node`, `86-with-node`, `85-with-node`, `84-with-node`, `83-with-node`, `81-with-node`, `80-with-node`, `77-with-node`, `76-with-node`
- `89-with-puppeteer`, `86-with-puppeteer`, `85-with-puppeteer`,`84-with-puppeteer`, `83-with-puppeteer`, `81-with-puppeteer`, `80-with-puppeteer`, `77-with-puppeteer`, `76-with-puppeteer`

# alpine-chrome

Chrome running in headless mode in a tiny Alpine image
****

# 🤔 Why use a Headless Chrome

In the world of webdev, the ability to run quickly end-to-end tests are important. Popular technologies like Puppeteer enable developers to make fun things like testing, automating forms, crawling, generating screenshots, capturing timeline... And there is a secret: some of these features are directly available on Chrome! 🙌

## 💡 Crafting the perfect container

- 📦 Tiniest Headless Chrome (Compressed size: [423 MB](https://github.com/Zenika/alpine-chrome#image-disk-size))
- 🐳 Easy to use, ephemeral and reproducible Headless Chrome with Docker
- 📝 Doc-friendly with examples for printing the DOM, generating an image with a mobile ratio or generating a PDF.
- 👷‍♂️ Autobuild with the [Docker Hub](https://hub.docker.com/repository/docker/zenika/alpine-chrome) to sync the project and ship the images with confidence
- 📌 Up-to-date latest Chromium and tags available to test different versions of Chromium
- 🔐 Secure with the best way to use Chrome and Docker - [See "3 ways to securely use Chrome Headless"](https://github.com/Zenika/alpine-chrome#3-ways-to-securely-use-chrome-headless-with-this-image) section
- 🌐 Ready for internationalisation use: support for asian characters - [See "screenshot-asia.js" file](https://github.com/Zenika/alpine-chrome/blob/master/with-puppeteer/src/screenshot-asia.js)
- 💄 Ready for design use: support for WebGL, support for emojis- See ["How to use with WebGL" section](https://github.com/Zenika/alpine-chrome#how-to-use-with-webgl) and ["Emojis are not rendered properly" section](https://github.com/Zenika/alpine-chrome/issues/114)
- 📄 Open Source with an Apache2 licence
- 👥 Community-built with external contributors - [See "✨ Contributors" section](https://github.com/Zenika/alpine-chrome#-contributors)
- 💚 Dev-friendly with examples using NodeJS, Puppeteer, docker-compose and also a test with a X11 display - [See "Run examples" section](https://github.com/Zenika/alpine-chrome#run-examples)

# 3 ways to securely use Chrome Headless with this image

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

Thanks to ever-awesome Jessie Frazelle seccomp profile for Chrome. This is The most secure way to run this Headless Chrome docker image.

[chrome.json](https://github.com/Zenika/alpine-chrome/blob/master/chrome.json)

Also available here `wget https://raw.githubusercontent.com/jfrazelle/dotfiles/master/etc/docker/seccomp/chrome.json`

Launch the container using:
`docker container run -it --rm --security-opt seccomp=$(pwd)/chrome.json zenika/alpine-chrome`

# How to use in command line

## Default entrypoint

The default entrypoint runs `chromium-browser --headless` with some common flags from `CHROMIUM_FLAGS` set in the [`Dockerfile`](./Dockerfile).

You can change the `CHROMIUM_FLAGS` by overriding the environment variable using: `docker container run -it --rm --env CHROMIUM_FLAGS="--other-flag ..." zenika/alpine-chrome chromium-browser ...`

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

# How to use with Deno

Go the deno `src` folder. Build your image using this command:

```
docker image build -t zenika/alpine-chrome:with-deno-sample .
```

Then launch the container:

```
docker container run -it --rm zenika/alpine-chrome:with-deno-sample
 Download https://deno.land/std/examples/welcome.ts
 Warning Implicitly using master branch https://deno.land/std/examples/welcome.ts
 Compile https://deno.land/std/examples/welcome.ts
 Welcome to Deno 🦕
```

With your own file, use this command:

```
docker container run -it --rm -v $(pwd):/usr/src/app zenika/alpine-chrome:with-deno-sample run helloworld.ts
Compile file:///usr/src/app/helloworld.ts
Download https://deno.land/std/fmt/colors.ts
Warning Implicitly using master branch https://deno.land/std/fmt/colors.ts
Hello world!
```

# How to use with Puppeteer

With tool like ["Puppeteer"](https://pptr.dev/#?product=Puppeteer&version=v1.15.0&show=api-class-browser), we can add a lot things with our Chrome Headless.

With some code in NodeJS, we can improve and make some tests.

See the ["with-puppeteer"](https://github.com/Zenika/alpine-chrome/blob/master/with-puppeteer) folder for more details. We have to [follow the mapping of Chromium => Puppeteer described here](https://github.com/puppeteer/puppeteer/blob/main/versions.js).

If you have a NodeJS/Puppeteer script in your `src` folder named `pdf.js`, you can launch it using the following command:

```
docker container run -it --rm -v $(pwd)/src:/usr/src/app/src --cap-add=SYS_ADMIN zenika/alpine-chrome:with-puppeteer node src/pdf.js
```

With the ["font-wqy-zenhei"](https://pkgs.alpinelinux.org/package/edge/testing/x86/font-wqy-zenhei) library, you could also manipulate asian pages like in ["screenshot-asia.js"](https://github.com/Zenika/alpine-chrome/blob/master/with-puppeteer/src/screenshot-asia.js)

```
docker container run -it --rm -v $(pwd)/src:/usr/src/app/src --cap-add=SYS_ADMIN zenika/alpine-chrome:with-puppeteer node src/screenshot-asia.js
```

These websites are tested with the following supported languages:

- Chinese (with `https://m.baidu.com`)
- Japanese (with `https://www.yahoo.co.jp/`)
- Korean (with `https://www.naver.com/`)

# How to use with Puppeteer to test a Chrome Extension
[According to puppeteer official doc](https://github.com/puppeteer/puppeteer/blob/main/docs/api.md#working-with-chrome-extensions) you can not test a Chrome Extension in headleass mode. You need a display available, that's where Xvfb comes in.

See the ["with-puppeteer-xvfb"](https://github.com/Zenika/alpine-chrome/blob/master/with-puppeteer-xvfb) folder for more details. We have to [follow the mapping of Chromium => Puppeteer described here](https://github.com/puppeteer/puppeteer/blob/main/versions.js).

Assuming you have a NodeJS/Puppeteer script in your `src` folder named `extension.js`, and the unpacked extension in the `chrome-extension` folder, you can launch it using the following command:

```
docker container run -it --rm -v $(pwd)/src:/usr/src/app/src --cap-add=SYS_ADMIN zenika/alpine-chrome:with-puppeteer-xvfb node src/extension.js
```

The extension provided will change the page background in red for every website visited. This demo will load the extension and take a screenshot of the icanhazip.com website.

# How to use with Playwright

Like ["Puppeteer"](https://pptr.dev/#?product=Puppeteer&version=v6.0.0&show=api-class-browser), we can do a lot things using ["Playwright"](https://playwright.dev/docs/core-concepts/#browser) with our Chrome Headless.

Go to the `with-playwright` folder and launch the following command:

```
docker container run -it --rm -v $(pwd)/src:/usr/src/app/src --cap-add=SYS_ADMIN zenika/alpine-chrome:with-playwright node src/useragent.js
```

A `example-chromium.png` file will be created in your `with-playwright/src` folder.

# How to use with WebGL

By default, this image works with WebGL.

If you want to disable it, make sure to add `--disable-gpu` when launching Chromium.

`docker container run -it --rm --cap-add=SYS_ADMIN -v $(pwd):/usr/src/app zenika/alpine-chrome --screenshot --hide-scrollbars https://webglfundamentals.org/webgl/webgl-fundamentals.html`

`docker container run -it --rm --cap-add=SYS_ADMIN -v $(pwd):/usr/src/app zenika/alpine-chrome --screenshot --hide-scrollbars https://browserleaks.com/webgl`

# How to use with Chromedriver

[ChromeDriver](https://chromedriver.chromium.org/home) is a separate executable that Selenium WebDriver uses to control Chrome.
You can use this image as a base for your Docker based selenium tests. See [Guide for running Selenium tests using Chromedriver](https://www.browserstack.com/guide/run-selenium-tests-using-selenium-chromedriver).

# How to use with Selenoid

[Selenoid](https://github.com/aerokube/selenoid) is a powerful implementation of Selenium hub using Docker containers to launch browsers.
Even if it used to run browsers in docker containers, it can be quite useful as lightweight Selenium replacement.
`with-selenoid` image is a self sufficient selenium server, chrome and chromedriver installed.

You can run it with following command:

```
docker container run -it --rm --cap-add=SYS_ADMIN  -p 4444:4444 zenika/alpine-chrome:with-selenoid -capture-driver-logs
```

And run your tests against `http://localhost:4444/wd/hub`

One of the use-cases might be running automation tests in the environment with restricted Docker environment
like on some CI systems like GitLab CI, etc. In such case you may not have permissions for `--cap-add=SYS_ADMIN`
and you will need to pass the `--no-sandbox` to `chromedriver`.

See more [selenoid docs](https://aerokube.com/selenoid/latest/#_using_selenoid_without_docker)

# Run as root and override default entrypoint

We can run the container as root with this command:

```
docker container run --rm -it --entrypoint "" --user root zenika/alpine-chrome sh
```

# Run examples

Some examples are available on the `examples` [directory](examples):

- 🐳 [docker-compose](https://github.com/Zenika/alpine-chrome/blob/master/examples/docker-compose) to launch a chrome calling a nginx server in the same docker-compose
- ☸️ [kubernetes](https://github.com/Zenika/alpine-chrome/tree/master/examples/k8s) to launch a pod with a headless chrome
- 🖥 [x11](https://github.com/Zenika/alpine-chrome/blob/master/examples/x11) to experiment this image with a X11 server.

# References

- Headless Chrome website: https://developers.google.com/web/updates/2017/04/headless-chrome

- List of all options of the "Chromium" command line: https://peter.sh/experiments/chromium-command-line-switches/

- Where to file issues: https://github.com/Zenika/alpine-chrome/issues

- Maintained by: https://www.zenika.com

# Versions (in latest)

## Alpine version

```
docker container run -it --rm --entrypoint "" zenika/alpine-chrome cat /etc/alpine-release
3.15.4
```

## Chrome version

```
docker container run -it --rm --entrypoint "" zenika/alpine-chrome chromium-browser --version
Chromium 100.0.4896.60
```

## Image disk size

```
docker image inspect zenika/alpine-chrome --format='{{.Size}}'
357467827 # 341 MB
```

# ✨ Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://blog.zenika.com/author/jlandure/"><img src="https://avatars2.githubusercontent.com/u/525974?v=4" width="100px;" alt=""/><br /><sub><b>Julien Landuré</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/commits?author=jlandure" title="Code">💻</a> <a href="https://github.com/Zenika/alpine-chrome/pulls?q=is%3Apr+reviewed-by%3Ajlandure" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/Zenika/alpine-chrome/commits?author=jlandure" title="Tests">⚠️</a> <a href="#ideas-jlandure" title="Ideas, Planning, & Feedback">🤔</a> <a href="#question-jlandure" title="Answering Questions">💬</a> <a href="#maintenance-jlandure" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://github.com/lygstate"><img src="https://avatars3.githubusercontent.com/u/121040?v=4" width="100px;" alt=""/><br /><sub><b>Yonggang Luo</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/commits?author=lygstate" title="Code">💻</a> <a href="#ideas-lygstate" title="Ideas, Planning, & Feedback">🤔</a> <a href="#question-lygstate" title="Answering Questions">💬</a></td>
    <td align="center"><a href="https://pixelarbeit.de"><img src="https://avatars1.githubusercontent.com/u/22632550?v=4" width="100px;" alt=""/><br /><sub><b>Dennis Koch</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/commits?author=pxlrbt" title="Code">💻</a> <a href="#ideas-pxlrbt" title="Ideas, Planning, & Feedback">🤔</a> <a href="#question-pxlrbt" title="Answering Questions">💬</a></td>
    <td align="center"><a href="https://github.com/sargonpiraev"><img src="https://avatars3.githubusercontent.com/u/9588637?v=4" width="100px;" alt=""/><br /><sub><b>Sargon Piraev</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/commits?author=sargonpiraev" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/ebriand"><img src="https://avatars1.githubusercontent.com/u/1011902?v=4" width="100px;" alt=""/><br /><sub><b>Eric Briand</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/commits?author=ebriand" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/huhai463127310"><img src="https://avatars1.githubusercontent.com/u/1825820?v=4" width="100px;" alt=""/><br /><sub><b>栩风</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/commits?author=huhai463127310" title="Code">💻</a> <a href="#ideas-huhai463127310" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://rubyisforfun.com"><img src="https://avatars3.githubusercontent.com/u/1477672?v=4" width="100px;" alt=""/><br /><sub><b>Roman Pushkin</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/commits?author=ro31337" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://twitter.com/jllado"><img src="https://avatars2.githubusercontent.com/u/628929?v=4" width="100px;" alt=""/><br /><sub><b>Juan Lladó</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/commits?author=jllado" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/c24w"><img src="https://avatars2.githubusercontent.com/u/710406?v=4" width="100px;" alt=""/><br /><sub><b>Chris Watson</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3Ac24w" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://jokester.io"><img src="https://avatars0.githubusercontent.com/u/802130?v=4" width="100px;" alt=""/><br /><sub><b>Wang Guan</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3Ajokester" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/OscarSotoSanchez"><img src="https://avatars0.githubusercontent.com/u/12794770?v=4" width="100px;" alt=""/><br /><sub><b>Óscar Soto Sánchez</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3AOscarSotoSanchez" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://ro.linkedin.com/in/alexandrucalinoiu"><img src="https://avatars3.githubusercontent.com/u/679198?v=4" width="100px;" alt=""/><br /><sub><b>Calinoiu Alexandru Nicolae</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3Aalexandru-calinoiu" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/mamacdon"><img src="https://avatars2.githubusercontent.com/u/382404?v=4" width="100px;" alt=""/><br /><sub><b>Mark Macdonald</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3Amamacdon" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://www.thisiswhytheinternetexists.com"><img src="https://avatars0.githubusercontent.com/u/5497269?v=4" width="100px;" alt=""/><br /><sub><b>Felix Mann</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3ADJFliX" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/horacimacias"><img src="https://avatars2.githubusercontent.com/u/1333208?v=4" width="100px;" alt=""/><br /><sub><b>horacimacias</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3Ahoracimacias" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://emil.kjer.info"><img src="https://avatars2.githubusercontent.com/u/970602?v=4" width="100px;" alt=""/><br /><sub><b>Emil Kjer</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3Aemilkjer" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/likwid"><img src="https://avatars1.githubusercontent.com/u/523407?v=4" width="100px;" alt=""/><br /><sub><b>Jeff Gonzalez</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3Alikwid" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://www.rom.by"><img src="https://avatars2.githubusercontent.com/u/2912732?v=4" width="100px;" alt=""/><br /><sub><b>George Gaál</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3Agecube" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/wheestermans31"><img src="https://avatars1.githubusercontent.com/u/41023907?v=4" width="100px;" alt=""/><br /><sub><b>wheestermans31</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3Awheestermans31" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/hodossy"><img src="https://avatars1.githubusercontent.com/u/19623656?v=4" width="100px;" alt=""/><br /><sub><b>Hodossy, Szabolcs</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3Ahodossy" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/ardeois"><img src="https://avatars0.githubusercontent.com/u/1867939?v=4" width="100px;" alt=""/><br /><sub><b>Corentin Ardeois</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3Aardeois" title="Bug reports">🐛</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://www.dynamicfiles.de"><img src="https://avatars0.githubusercontent.com/u/1042579?v=4" width="100px;" alt=""/><br /><sub><b>Danny Althoff</b></sub></a><br /><a href="#question-FibreFoX" title="Answering Questions">💬</a></td>
    <td align="center"><a href="https://github.com/chadlwilson"><img src="https://avatars1.githubusercontent.com/u/29788154?v=4" width="100px;" alt=""/><br /><sub><b>Chad Wilson</b></sub></a><br /><a href="#question-chadlwilson" title="Answering Questions">💬</a> <a href="#ideas-chadlwilson" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/fenchu"><img src="https://avatars1.githubusercontent.com/u/11349883?v=4" width="100px;" alt=""/><br /><sub><b>fenchu</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3Afenchu" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://github.com/nrawat151290"><img src="https://avatars1.githubusercontent.com/u/3829598?v=4" width="100px;" alt=""/><br /><sub><b>nrawat151290</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3Anrawat151290" title="Bug reports">🐛</a></td>
    <td align="center"><a href="https://twitter.com/x0rzkov"><img src="https://avatars3.githubusercontent.com/u/56916043?v=4" width="100px;" alt=""/><br /><sub><b>x0rzkov</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3Ax0rzkov" title="Bug reports">🐛</a> <a href="#ideas-x0rzkov" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/jketterl"><img src="https://avatars0.githubusercontent.com/u/180748?v=4" width="100px;" alt=""/><br /><sub><b>Jakob Ketterl</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3Ajketterl" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://virus.hostv.pl"><img src="https://avatars1.githubusercontent.com/u/1295000?v=4" width="100px;" alt=""/><br /><sub><b>Piotr Sikora</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3Apiotr-sikora-v" title="Bug reports">🐛</a> <a href="#ideas-piotr-sikora-v" title="Ideas, Planning, & Feedback">🤔</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/pgrimaud"><img src="https://avatars1.githubusercontent.com/u/1866496?v=4" width="100px;" alt=""/><br /><sub><b>Pierre Grimaud</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/commits?author=pgrimaud" title="Code">💻</a></td>
    <td align="center"><a href="http://www.niekvandermaas.nl"><img src="https://avatars0.githubusercontent.com/u/213140?v=4" width="100px;" alt=""/><br /><sub><b>Niek van der Maas</b></sub></a><br /><a href="#question-Niek" title="Answering Questions">💬</a> <a href="#ideas-Niek" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://github.com/llange"><img src="https://avatars0.githubusercontent.com/u/222432?v=4" width="100px;" alt=""/><br /><sub><b>llange</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/issues?q=author%3Allange" title="Bug reports">🐛</a> <a href="https://github.com/Zenika/alpine-chrome/commits?author=llange" title="Code">💻</a></td>
    <td align="center"><a href="http://agengdp.github.io"><img src="https://avatars1.githubusercontent.com/u/16035097?v=4" width="100px;" alt=""/><br /><sub><b>Ageng D. Prastyawan</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/commits?author=agengdp" title="Documentation">📖</a></td>
    <td align="center"><a href="https://neelkamath.com"><img src="https://avatars3.githubusercontent.com/u/24778804?v=4" width="100px;" alt=""/><br /><sub><b>Neel Kamath</b></sub></a><br /><a href="#question-neelkamath" title="Answering Questions">💬</a></td>
    <td align="center"><a href="https://www.peterdavehello.org/"><img src="https://avatars3.githubusercontent.com/u/3691490?v=4" width="100px;" alt=""/><br /><sub><b>Peter Dave Hello</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/commits?author=PeterDaveHello" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Trane9991"><img src="https://avatars1.githubusercontent.com/u/9948629?v=4" width="100px;" alt=""/><br /><sub><b>Taras</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/commits?author=Trane9991" title="Code">💻</a> <a href="https://github.com/Zenika/alpine-chrome/commits?author=Trane9991" title="Documentation">📖</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/Antoineoili"><img src="https://avatars1.githubusercontent.com/u/50737365?v=4" width="100px;" alt=""/><br /><sub><b>Antoine Oili</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/commits?author=Antoineoili" title="Documentation">📖</a></td>
    <td align="center"><a href="https://manuelcepeda.dev"><img src="https://avatars1.githubusercontent.com/u/8043309?v=4" width="100px;" alt=""/><br /><sub><b>Manuel Cepeda</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/commits?author=mecm1993" title="Code">💻</a></td>
    <td align="center"><a href="https://simon-frey.com"><img src="https://avatars3.githubusercontent.com/u/24354822?v=4" width="100px;" alt=""/><br /><sub><b>Simon Frey</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/commits?author=simonfrey" title="Code">💻</a></td>
    <td align="center"><a href="https://www.bleedbytes.in"><img src="https://avatars1.githubusercontent.com/u/20743451?v=4" width="100px;" alt=""/><br /><sub><b>Santhosh C</b></sub></a><br /><a href="https://github.com/Zenika/alpine-chrome/commits?author=santhosh-chinnasamy" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

# 🎉 Show your support

⭐️ this repo or [leave a comment here](https://github.com/Zenika/alpine-chrome/issues/new?template=03_thanks.md)

💚 Support this repository using [GitHub Sponsor](https://github.com/sponsors/jlandure/)
