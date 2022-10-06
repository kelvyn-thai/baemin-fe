#!/bin/bash
APPNAME=baemin-fe
cd /home/envuser/$APPNAME

npx pm2 start server.js --name='baemin-fe'

while true; do
    sleep 2
    tail -n 50 ~/.pm2/logs/baemin-fe-error.log
done
