#!/usr/bin/env bash
function _webpack() {
	if hash webpack 2>/dev/null; then
		webpack "$@"
	else
		node_modules/.bin/webpack "$@"
	fi
}

_webpack --progress --hide-modules

awk '/\/\/ stickers\.min\.js/{f=1;print;while (getline < "dist/stickers.min.js"){print}}//{f=0}!f' src/bd-template.js > magane.plugin.js

cp -f magane.plugin.js ~/.config/BetterDiscord/plugins
