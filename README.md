# Description

Chrome running in headless mode in a tiny Alpine image.

# How to

Main command to launch a shell
`docker run -it --rm zenika/alpine-chrome`

# Headless usage 

## Print the DOM 

Using `docker run -it --rm --cap-add=SYS_ADMIN zenika/alpine-chrome`

Command: `chromium-browser --headless --disable-gpu --dump-dom https://www.chromestatus.com/`

Or directly `docker run -it --rm --cap-add=SYS_ADMIN zenika/alpine-chrome chromium-browser --headless --disable-gpu --dump-dom https://www.chromestatus.com/`

## Print a PDF

Using `docker run -it --rm --cap-add=SYS_ADMIN zenika/alpine-chrome`

Command: `chromium-browser --headless --disable-gpu --print-to-pdf https://www.chromestatus.com/`

Or directly `docker run -it --rm --cap-add=SYS_ADMIN zenika/alpine-chrome chromium-browser --headless --disable-gpu --print-to-pdf https://www.chromestatus.com/`

## Take a screenshot 

Using `docker run -it --rm --cap-add=SYS_ADMIN zenika/alpine-chrome`
Command: `chromium-browser --headless --disable-gpu --screenshot https://www.chromestatus.com/`

Or directly `docker run -it --rm --cap-add=SYS_ADMIN zenika/alpine-chrome chromium-browser --headless --disable-gpu --screenshot https://www.chromestatus.com/`

### Size of a standard letterhead.

Command: `chromium-browser --headless --disable-gpu --screenshot --window-size=1280,1696 https://www.chromestatus.com/`

### Nexus 5x

Command: `chromium-browser --headless --disable-gpu --screenshot --window-size=412,732 https://www.chromestatus.com/`

# Alpine version

```
docker run -it --rm zenika/alpine-chrome cat /etc/alpine-release
3.6.2
```

# Chrome version

```
docker run -it --rm zenika/alpine-chrome chromium-browser --version
Chromium 59.0.3071.115 
```