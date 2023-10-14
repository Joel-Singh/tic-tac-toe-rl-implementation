#!/usr/bin/env bash
cleanDistDir() {
  rm -rf ./dist/*
}

copyAllFilesExceptTsToDist() {
  cp -R ./src/* ./dist/
  rm -rf ./dist/ts/
}

compileTsFiles() {
  npx tsc
}

compilePug() {
  npx pug ./src/pug --out ./dist/
}

cleanDistDir
copyAllFilesExceptTsToDist
compileTsFiles
compilePug
