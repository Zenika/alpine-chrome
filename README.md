# Supported tags and respective `Dockerfile` links

 * `latest`, `63` [(Dockerfile)](https://github.com/Zenika/alpine-chrome/blob/master/Dockerfile)

# alpine-chrome
Minimal Headless Chrome Docker Images built on Alpine Linux
Based on `zenika/alpine-node`

# Why this image

We often need a headless chrome.
We created this image to get a fully headless chrome image.

# How to use this image

## Print the DOM 

Using `docker container run -it --rm --cap-add=SYS_ADMIN zenika/alpine-chrome` to open a shell

Command: `chromium-browser --headless --disable-gpu --no-sandbox --dump-dom https://www.chromestatus.com/`

Or directly `docker container run -it --rm --cap-add=SYS_ADMIN zenika/alpine-chrome chromium-browser --headless --disable-gpu --no-sandbox --dump-dom https://www.chromestatus.com/`

## Print a PDF

Using `docker container run -it --rm --cap-add=SYS_ADMIN zenika/alpine-chrome`

Command: `chromium-browser --headless --disable-gpu --no-sandbox --print-to-pdf https://www.chromestatus.com/`

Or directly `docker container run -it --rm --cap-add=SYS_ADMIN zenika/alpine-chrome chromium-browser --headless --disable-gpu --no-sandbox --print-to-pdf https://www.chromestatus.com/`

## Take a screenshot 

Using `docker container run -it --rm --cap-add=SYS_ADMIN zenika/alpine-chrome`
Command: `chromium-browser --headless --disable-gpu --no-sandbox --screenshot https://www.chromestatus.com/`

Or directly `docker container run -it --rm --cap-add=SYS_ADMIN zenika/alpine-chrome chromium-browser --headless --disable-gpu --no-sandbox --screenshot https://www.chromestatus.com/`

### Size of a standard letterhead.

Command: `chromium-browser --headless --disable-gpu --screenshot --no-sandbox --window-size=1280,1696 https://www.chromestatus.com/`

### Nexus 5x

Command: `chromium-browser --headless --disable-gpu --screenshot --no-sandbox --window-size=412,732 https://www.chromestatus.com/`

# Reference

 * Headless Chrome website : https://developers.google.com/web/updates/2017/04/headless-chrome

 * Where to file issues : https://github.com/Zenika/alpine-chrome/issues

 * Maintained by : https://www.zenika.com

# Versions (in latest)

## Alpine version

```
docker run -it --rm zenika/alpine-chrome cat /etc/alpine-release
3.6.2
```

## Chrome version

```
docker run -it --rm zenika/alpine-chrome chromium-browser --version
Chromium 63.0.3239.108 
```
