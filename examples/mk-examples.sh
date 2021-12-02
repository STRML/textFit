#!/bin/bash

DIR="$(dirname "$0")"

cp $DIR/../textFit.js $DIR
cat $DIR/textFit.js | \
  sed 's/function processItem(/async function processItem(/' | \
  sed 's/\/\/ await injection point/await new Promise((resolve) => setTimeout(resolve, 500));/' \
  > $DIR/textFit.slow.js
