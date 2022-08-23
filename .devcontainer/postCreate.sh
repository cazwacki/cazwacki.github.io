#! /bin/bash

# update npm and fix cache issue
npm install -g npm
npm config set cache /workspaces/cazwacki.github.io/cache

# allow for deployments to GitHub via npm run deploy
# sudo chown -R 1000:1000 /root/.config
# mkdir -p /root/.config/git
# echo """
# [user]
# 	email = cazwacki@vt.edu
# 	name = Charles Zawacki
# """ > /root/.config/git/attributes

cd /workspaces/cazwacki.github.io
git config user.email "cazwacki@vt.edu"
git config user.name "Charles Zawacki"

# install packages
npm install