#!/bin/bash

cp ../textFit.js .
cat textFit.js | \
  sed 's/function processItem(/async function processItem(/' | \
  sed 's/\/\/ await injection point/await new Promise((resolve) => setTimeout(resolve, 500));/' \
  > textFit.slow.js
