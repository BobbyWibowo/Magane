//META{"name":"magane"}*//

var magane = function () {};
magane.prototype.getName = () => "Magane";
magane.prototype.getDescription = () => "Bringing LINE stickers to Discord in a chaotic way.";
magane.prototype.getVersion = () => "0.1.0";
magane.prototype.getAuthor = () => "Kana";
magane.prototype.getSettingsPanel = () => {};

magane.prototype.load = magane.prototype.add = magane.prototype.onSwitch =
magane.prototype.onMessage = magane.prototype.convert = magane.prototype.observer = () => null;

magane.prototype.unload = magane.prototype.stop = () => {
	console.log('Unloading magane from DOM');
	const old = document.body.querySelectorAll('div#magane');
	if (old.length) { old.forEach(e => e.remove()); }
}

magane.prototype.start = () => {

