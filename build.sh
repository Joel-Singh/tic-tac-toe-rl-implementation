#!/usr/bin/env bash
cleanDistDir() {
  mkdir -p ./dist/
  rm -rf ./dist/*
}

copyAllFilesExceptTsToDist() {
  cp -R ./src/* ./dist/
  rm -rf ./dist/ts/
}

compileTsFiles() {
  # Says its not installed when using 'npx tsc'
  ./node_modules/typescript/bin/tsc
}

compilePug() {
  npx pug ./src/pug --out ./dist/
}

cleanDistDir
copyAllFilesExceptTsToDist
compileTsFiles
compilePug
