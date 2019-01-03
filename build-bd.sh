#!/usr/bin/env bash
# run as "NODE_ENV=production ./build-bd.sh" or "./build-bd.sh -p" to minify
# use "-e" option to also copy into EnhancedDiscord's plugins directory

# options
enhanceddiscord=0
production=0

while getopts 'ep' flag; do
  case "${flag}" in
    e) enhanceddiscord=1 ;;
    p) production=1 ;;
    *) break ;;
  esac
done

function _webpack() {
	if hash webpack 2>/dev/null; then
		webpack "$@"
	else
		node_modules/.bin/webpack "$@"
	fi
}

if [ $production -eq 1 ]; then
	NODE_ENV=production _webpack --progress --hide-modules
else
	_webpack --progress --hide-modules
fi

awk '/\/\/ stickers\.min\.js/{f=1;print;while (getline < "dist/stickers.min.js"){print}}//{f=0}!f' src/bd-template.js > magane.plugin.js

cp -f magane.plugin.js ~/.config/BetterDiscord/plugins

if [ $enhanceddiscord -eq 1 ]; then
	cp -f magane.plugin.js ~/.config/EnhancedDiscord/plugins
fi
