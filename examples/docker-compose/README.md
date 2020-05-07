# zenika/alpine-chrome with docker-compose

Here is an example with docker-compose on how to launch and use `zenika/alpine-chrome` calling a `nginx` page in another container.

## Launch

Inside this folder, run the following command:

```
docker-compose up
```

## Test

Then go to `localhost:9222` with your browser.
You can enter `nginx` like the name of the service you want to call.

You will see something like that:

<img width="951" alt="image-nginx" src="https://user-images.githubusercontent.com/525974/81261911-34b67900-903d-11ea-9f3c-14aca6fc0477.png">


## Logs

```
Starting docker-compose_chrome_1 ... done
Starting docker-compose_nginx_1  ... done
Attaching to docker-compose_chrome_1, docker-compose_nginx_1
chrome_1  | [0506/204056.362234:WARNING:dns_config_service_posix.cc(341)] Failed to read DnsConfig.
chrome_1  |
chrome_1  | DevTools listening on ws://0.0.0.0:9222/devtools/browser/936196ef-d450-48bc-ab97-255b79e8fb47
chrome_1  | [0506/204056.441684:WARNING:dns_config_service_posix.cc(341)] Failed to read DnsConfig.
nginx_1   | 172.18.0.3 - - [06/May/2020:20:41:16 +0000] "GET / HTTP/1.1" 200 612 "-" "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/81.0.4044.113 Safari/537.36" "-"
```

## Configuration

You may change the `zenika/alpine-chrome` image you want to use modifying the line 10 in `docker-compose.yml`.

## References

- https://stackoverflow.com/questions/56766493/docker-compose-chrome-alpine-to-use-nginx
