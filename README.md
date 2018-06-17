# Supported tags and respective `Dockerfile` links

 * `latest`, `64` [(Dockerfile)](https://github.com/Zenika/alpine-chrome/blob/master/Dockerfile)

# alpine-chrome
Minimal Headless Chrome Docker Images built on Alpine Linux
Based on `zenika/alpine-node`

# Why this image

We often need a headless chrome.
We created this image to get a fully headless chrome image.
Be careful to the "--no-sandbox" flag from Chrome

# 3 ways to use Chrome Headless with this image

## Not secured

Launch the container using:

`docker container run -it --rm zenika/alpine-chrome` and use the `--no-sandbox` flag for all your commands. 

Be careful to know the website you're calling.

Explanation for the `no-sandbox` flag in a [quick introduction here](https://www.google.com/googlebooks/chrome/med_26.html) and for [More in depth design document here](https://chromium.googlesource.com/chromium/src/+/master/docs/design/sandbox.md)

## With SYS_ADMIN capability

Launch the container using:
`docker container run -it --rm --cap-add=SYS_ADMIN zenika/alpine-chrome`

This allows to run Chrome with sandboxing but needs unnecessary privileges from a Docker point of view.

## The best: With seccomp 

Thanks to ever-awesome Jessie Frazelle seccomp profile for Chrome.

[chrome.json](https://github.com/Zenika/alpine-chrome/blob/master/chrome.json)

Also available here `wget https://raw.githubusercontent.com/jfrazelle/dotfiles/master/etc/docker/seccomp/chrome.json`

Launch the container using: 
`docker container run -it --rm --security-opt seccomp=$(pwd)/chrome.json zenika/alpine-chrome`

# How to use in command line

## Default entrypoint 

The default entrypoint does the following command: `chromium-browser --headless --disable-gpu`

You can get full control by overriding the entrypoint using: `docker run -it --rm --entrypoint "" zenika/alpine-chrome chromium-browser ...`

## Use the devtools

Command (with no-sandbox): `docker container run -d -p 9222:9222 zenika/alpine-chrome --no-sandbox --remote-debugging-address=0.0.0.0 --remote-debugging-port=9222 https://www.chromestatus.com/`

Open your browser to: `http://localhost:9222` and then click on the tab you want to inspect. Replace the beginning 
`https://chrome-devtools-frontend.appspot.com/serve_file/@.../inspector.html?ws=localhost:9222/[END]`
by 
`chrome-devtools://devtools/bundled/inspector.html?ws=localhost:9222/[END]`

## Print the DOM 

Command (with no-sandbox): `docker container run -it --rm zenika/alpine-chrome --no-sandbox --dump-dom https://www.chromestatus.com/`

## Print a PDF

Command (with no-sandbox):  `docker container run -it --rm -v $(pwd):/usr/src/app zenika/alpine-chrome --no-sandbox --print-to-pdf --hide-scrollbars https://www.chromestatus.com/`

## Take a screenshot

Command (with no-sandbox):  `docker container run -it --rm -v $(pwd):/usr/src/app zenika/alpine-chrome --no-sandbox --screenshot --hide-scrollbars https://www.chromestatus.com/`

### Size of a standard letterhead.

Command (with no-sandbox):  `docker container run -it --rm -v $(pwd):/usr/src/app zenika/alpine-chrome --no-sandbox --screenshot --hide-scrollbars --window-size=1280,1696 https://www.chromestatus.com/`

### Nexus 5x

Command (with no-sandbox):  `docker container run -it --rm -v $(pwd):/usr/src/app zenika/alpine-chrome --no-sandbox --screenshot --hide-scrollbars --window-size=412,732 https://www.chromestatus.com/`

### Screenshot owned by current user (by default the file is owned by the container user)

Command (with no-sandbox):  ``docker container run -u `id -u $USER` -it --rm -v $(pwd):/usr/src/app zenika/alpine-chrome --no-sandbox --screenshot --hide-scrollbars --window-size=412,732 https://www.chromestatus.com/``

# How to use with Puppeteer

With tool like ("Puppeteer")[https://pptr.dev/#?product=Puppeteer&version=v1.5.0&show=api-class-browser], we can add a lot things with our Chrome Headless. 

With some code in NodeJS, we can improve and make some tests.

See the ["with-puppeteer"](https://github.com/Zenika/alpine-chrome/blob/master/with-puppeteer) folder for more details.

If you have a NodeJS/Puppeteer script in your current folder named `my-test.js`, you can launch it using the following command:

```
docker run -it --rm -v $(pwd):/usr/src/app --cap-add=SYS_ADMIN zenika/alpine-chrome:with-puppeteer node my-test.js
```

# References

 * Headless Chrome website: https://developers.google.com/web/updates/2017/04/headless-chrome

 * List of all options of the "Chromium" command line: https://peter.sh/experiments/chromium-command-line-switches/

 * Where to file issues: https://github.com/Zenika/alpine-chrome/issues

 * Maintained by: https://www.zenika.com

# Versions (in latest)

## Alpine version

```
docker run -it --rm --entrypoint "" zenika/alpine-chrome cat /etc/alpine-release
3.7.0
```

## Chrome version

```
docker run -it --rm --entrypoint "" zenika/alpine-chrome chromium-browser --version
Chromium 64.0.3282.168
```
