#!/bin/bash

docker compose up -d
cd src/frontend
npm install

HTTPD=`curl -A "Web Check" -sL --connect-timeout 3 -w "%{http_code}\n" "http://127.0.0.1" -o /dev/null`
until [ "$HTTPD" == "200" ]; do
    printf '.'
    sleep 3
    service nginx restart
    HTTPD=`curl -A "Web Check" -sL --connect-timeout 3 -w "%{http_code}\n" "http://127.0.0.1" -o /dev/null`
done