#!/bin/bash -xe
if [ "$TRAVIS_TAG" ]; then
  export ARTIFACT="extension.zip"
  test -f "$ARTIFACT"

  curl -L -o ~/github-release.tar.bz2 https://github.com/aktau/github-release/releases/download/v0.7.2/linux-amd64-github-release.tar.bz2
  tar -C ~ -jxf ~/github-release.tar.bz2
  export PATH=~/bin/linux/amd64:"$PATH"

  github-release release \
    --user int128 \
    --repo bntp \
    --tag "$TRAVIS_TAG" \
    --name "$TRAVIS_TAG" \
    --description "Released on $(date +%Y-%m-%d)"

  github-release upload \
    --user int128 \
    --repo bntp \
    --tag "$TRAVIS_TAG" \
    --name "$(basename "$ARTIFACT")" \
    --file "$ARTIFACT"
fi
