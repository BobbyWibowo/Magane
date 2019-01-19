//META{"name":"magane"}*//

/* global BdApi, ZLibrary */
// eslint-disable-next-line no-unused-vars
class magane {
	getName() { return 'Magane'; }

	getDescription() { return 'Bringing LINE stickers to Discord in a chaotic way.'; }

	getVersion() { return '0.1.9'; }

	getAuthor() { return 'Kana'; }

	getUpdateLink() { return 'https://raw.githubusercontent.com/BobbyWibowo/Magane/master/magane.plugin.js'; }

	showToast(content, options) {
		if (typeof this.toastFunction === 'undefined') {
			this.toastFunction = null;
			// First of all, try BetterDiscord API
			if (BdApi && typeof BdApi.showToast === 'function')
				this.toastFunction = (...args) => BdApi.showToast(...args);
			// But prefer Zere's Library if it's loaded
			if (ZLibrary && ZLibrary.Toasts && typeof ZLibrary.Toasts.show === 'function')
				this.toastFunction = (...args) => ZLibrary.Toasts.show(...args);
		}
		if (this.toastFunction === null)
			return false;
		try {
			return this.toastFunction(content, options);
		} catch (error) {
			return false;
		}
	}

	start() {
		// eslint-disable-next-line no-unused-vars, consistent-this
		const that = this;

		// stickers.min.js

		// Try to use Zere's Library's plugin updater if it exists
		try {
			if (ZLibrary && ZLibrary.PluginUpdater && typeof ZLibrary.PluginUpdater.checkForUpdate === 'function')
				ZLibrary.PluginUpdater.checkForUpdate(this.getName(), this.getVersion(), this.getUpdateLink());
		} catch (error) {
			console.error(error);
		}
	}

	stop() {
		// Destroy vue instance
		if (this.vue) {
			console.log('Vue instance found, destroying\u2026');
			// Call Magane's destroy function
			this.vue.$children[0].destroy();
			// Then call Vue's destroy function
			this.vue.$destroy();
			// Then delete
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
