#!/bin/sh
XVFB_WHD=${XVFB_WHD:-1280x720x16}

echo "Starting Xvfb"
Xvfb :99 -ac -screen 0 $XVFB_WHD -nolisten tcp &
sleep 2

echo "Executing command $@"
export DISPLAY=:99

exec "$@"