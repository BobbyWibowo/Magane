//META{"name":"magane"}*//

/* global BdApi */
// eslint-disable-next-line no-unused-vars
class magane {
	getName() { return 'Magane'; }

	getDescription() { return 'Bringing LINE stickers to Discord in a chaotic way.'; }

	getVersion() { return '0.1.4'; }

	getAuthor() { return 'Kana'; }

	getUpdateLink() { return 'https://raw.githubusercontent.com/BobbyWibowo/Magane/master/magane.plugin.js'; }

	start() {
		// eslint-disable-next-line no-unused-vars
		const that = this;

		// stickers.min.js
	}

	stop() {
		// FIXME: Figure out how to cleanly unload the plugin

		if (BdApi && typeof BdApi.showToast === 'function') {
			// eslint-disable-next-line max-len
			BdApi.showToast('Magane still can not be cleanly unloaded, please reload your Discord to reload the plugin!', { type: 'error', timeout: 6000 });
		}

		// Destroy vue instance
		if (this.vue) {
			console.log('Vue instance found, destroying\u2026');
			console.log(this.vue);
			this.vue.$destroy();
			delete this.vue;
		}

		// Remove leftover from DOM
		const old = document.body.querySelectorAll('div#magane');
		if (old.length) {
			console.log(`Found ${old.length} leftover, destroying\u2026`);
			old.forEach(e => e.remove());
		}
	}
}
