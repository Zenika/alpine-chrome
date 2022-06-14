#!/bin/sh

docker container run --rm --entrypoint '' ${IMAGE_NAME:-zenika/alpine-chrome} cat /etc/alpine-release
docker container run --rm --entrypoint '' ${IMAGE_NAME:-zenika/alpine-chrome} chromium-browser --version
