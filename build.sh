#!/usr/bin/env bash
function _webpack() {
	if hash webpack 2>/dev/null; then
		webpack "$@"
	else
		node_modules/.bin/webpack "$@"
	fi
}
NODE_ENV=production _webpack --progress --hide-modules
# _webpack --progress --hide-modules
cat bdprefix.js dist/stickers.min.js bdsuffix.js > magane.plugin.js
cp -f magane.plugin.js ~/.config/BetterDiscord/plugins
# node magane.plugin.js
