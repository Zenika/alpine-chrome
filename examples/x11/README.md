# zenika/alpine-chrome with X11

We are very familiar with running CLI processes in Docker containers with no Graphical UI at all.
Here is an example using zenika/alpine-chrome with a X11 server

# On MacOS

First, install the pre following this [great article](https://cntnr.io/running-guis-with-docker-on-mac-os-x-a14df6a76efc)

## Install socat

```
brew install socat
socat TCP-LISTEN:6000,reuseaddr,fork UNIX-CLIENT:\"$DISPLAY\"
```

## Install Xquartz - a X11 server

```
brew cask install xquartz
```

Open Xquartz

```
open -a Xquartz
```

Activate the option ‘Allow connections from network clients’ in XQuartz settings.
Quit & restart Xquartz.

One important thing to note is that after you have installed this is to log out and log back into OS X to get everything to work properly. Once that is done we can start Xquartz.

## Launch

```
docker container run --rm -it -e DISPLAY=host.docker.internal:0 --cap-add=SYS_ADMIN --entrypoint "" zenika/alpine-chrome:with-webgl chromium-browser --disable-dev-shm-usage
```

## Testing with xeyes

Launch this commmand to check your X11 setup:

```
docker container run --rm -it -e DISPLAY=host.docker.internal:0 gns3/xeyes
```

## Troubleshooting

If you got this error:

```
[1:1:0507/061725.810254:ERROR:browser_main_loop.cc(1512)] Unable to open X display.
```

Then your X11 server might not be configured in your container.

## References

- https://cntnr.io/running-guis-with-docker-on-mac-os-x-a14df6a76efc
- https://medium.com/@mreichelt/how-to-show-x11-windows-within-docker-on-mac-50759f4b65cb
