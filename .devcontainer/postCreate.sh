#! /bin/bash

# update npm and fix cache issue
npm install -g npm
npm config set cache /workspaces/cazwacki.github.io/cache

# configure git info for this repo
cd /workspaces/cazwacki.github.io
git config user.email "cazwacki@vt.edu"
git config user.name "Charles Zawacki"

# install packages
npm install