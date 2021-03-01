#!/bin/sh
set -e

if [ ! -d "node_modules" ]
then
  npm install && npm run-script start:dev
else
  npm run-script start:dev
fi

exec "$@"
