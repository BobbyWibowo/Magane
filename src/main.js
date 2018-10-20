/* global that */

if (!global || !global._babelPolyfill) {
	require('babel-polyfill');
}

import Vue from 'vue';
import App from './App.vue';
import Vuebar from 'vuebar';
import VueScrollTo from 'vue-scrollto';

Vue.use(Vuebar);
Vue.use(VueScrollTo);

let appendableElement = null;

function prepareDOM() {
	// Remove old elements, when reloaded by BetterDiscord
	const old = appendableElement.querySelectorAll('div#magane');
	if (old.length) { old.forEach(e => e.remove()); }

	const maganeContainer = document.createElement('div');
	maganeContainer.id = 'maganeContainer';
	appendableElement.appendChild(maganeContainer);

	const vue = new Vue({
		el: '#maganeContainer',
		render: h => h(App)
	});

	// BD plugin only
	if (typeof that !== 'undefined') {
		that.vue = vue;
	}
}

let loadTimer = setInterval(() => {
	appendableElement = document.querySelector('[class^="channelTextArea-"] [class^="inner-"]')
	|| document.querySelector('.channel-textarea-inner');
	if (appendableElement !== null) {
		clearInterval(loadTimer);
		prepareDOM();
	}
}, 1000);
