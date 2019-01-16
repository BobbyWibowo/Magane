# HOWTO

## Table of Contents

- [Downloads](#downloads)
- [Exposed console functions](#exposed-console-functions)
- [Bonus: Custom packs](#bonus-custom-packs)
- [Bonus: Custom CSS](#bonus-custom-css)

## Downloads

### BetterDiscord

Plugin: [https://blog.fiery.me/Magane/magane.plugin.js](https://blog.fiery.me/Magane/magane.plugin.js).

Install it the same way you install any other BetterDiscord plugins.

> This plugin can not be cleanly unloaded yet, so you have to reload Discord if you ever want to disable it.


### InjectMeDaddy

With [InjectMeDaddy](https://github.com/anonymousthing/InjectMeDaddy/releases), click Add source, then populate the first input box with `Magane (Bobby's fork)` and the second input box with this URL:
```
https://blog.fiery.me/Magane/dist/stickers.min.js
```
Make sure the ticked checkbox is on Javascript, and you can leave Description empty.

Untick the old Magane before injecting.

### MyDiscord

With [MyDiscord](https://github.com/justinoboyle/mydiscord), add the following URL into the **plugins array**:
```
https://blog.fiery.me/Magane/dist/stickers.min.js
```

### Without installing anything

Open DevTools in Discord (**Ctrl + Shift + i** or **CMD + Option + i**), then run the following line in Console:
```js
document.head.appendChild(document.createElement('script'))setAttribute('src', 'https://blog.fiery.me/Magane/dist/stickers.min.js')
```

> This is more intended for trying purpose, as you will have to redo this step the next time you launch Discord.

### Browser

Unfortunately, I don't think it will work because the plugin needs to make an API call to `https://magane.moe` to download list of preset packs, but the browser version have a Content Security Policy that prevents network access to third-party domains.

In fact, I think InjectMeDaddy had to patch Discord to allow HTTPS access to third-party domains to make it work.

## Exposed console functions

Magane now have 5 exposed functions that can be executed from the console:

* [maganeAppendPack(title, firstid, count, animated)](#maganeappendpacktitle-firstid-count-animated)
* [maganeAppendCustomPack(title, id, count, animated, template)](#maganeappendcustompacktitle-id-count-animated-template)
* [maganeDeletePack(id)](#maganedeletepackid)
* [maganeSubcribeToPack(id)](#maganesubscribetopackid)
* [maganeUnsubscribeToPack(id)](#maganeunsubscribetopackid)

### maganeAppendPack(title, firstid, count, animated)

You can use `maganeAppendPack()` to add a new pack straight from LINE Store.

This is similar to [bd-linestickers](https://github.com/awaken1ng/bd-linestickers) plugin and was originally done in [harjitmoe's fork](https://github.com/harjitmoe/Magane), which I used as a base to add animated packs support.

Here's an example of the command to add [Panpan! Panda Bear](https://store.line.me/stickershop/product/1570399/en) pack:

```js
maganeAppendPack(`Panpan! Panda Bear`, 19759616, 8, 0)
```

What you need to pay attention to are `firstid` (`19759616`) and `count` (`8`).

`firstid`, as the name suggest, is the ID of the first sticker in the pack.
To get that, the simplest solution would be just to inspect the element. Once you do so, you'll see something like this:

```html
<span class="mdCMN09Image" style="background-image: url(&quot;https://stickershop.line-scdn.net/stickershop/v1/sticker/19759616/ANDROID/sticker.png;compress=true&quot;);"></span>
```

The ID should be pretty obvious from there, it's `19759616`.

As for `count`, it's the count of how many stickers the pack have. Then after manually counting them you'll find that there are `8` stickers.

#### Sounds too complicated?

Don't worry, there's a much easier solution, and that would be to install this userscript: [https://greasyfork.org/en/scripts/373429-line-append-string](https://greasyfork.org/en/scripts/373429-line-append-string).

After using it, you will be able to see something like this on every sticker pages:

![Preview](https://i.fiery.me/Mdql.png)

Just execute the line after `Console command:` in your Discord's console and be done with it!

> After adding a pack, you still need to add it from the subscription menu to use:
>
> ![Preview](https://i.fiery.me/5meI.png)

### maganeAppendCustomPack(title, id, count, animated, template)

This one is for the more advanced users. You can use this to add your own custom packs that are hosted anywhere remotely. Just gotta make sure the pictures can be hotlinked.

An example to add my custom Azur Lane Animation Sticker:

```js
maganeAppendCustomPack('AzurLane Animation Sticker Vol.1 (v2)', 'bNOuvYDDWt', 24, true, 'https://i.fiery.me/stickers/%pack%/%id%')
```

What you need to pay attention to here are `id` (`bNOuvYDDWt`), `count` (`24`), and `template` (`https://i.fiery.me/stickers/%pack%/%id%`).

The plugin will use the provided template, then replace `%pack%` with the ID (`id`), and `%id%` with the individual sticker's IDs + extension.

The individual sticker IDs are expected to be `1, 2, ..., n`, a regular one-based index.

The extensions will either be `.png` or `.gif`, depending on the state of `animated` (in the example I set it to `true` because the pack is animated).

So with this template, the plugin expects the stickers to be available at `https://i.fiery.me/stickers/bNOuvYDDWt/`, and they're named as `1.gif`, `2.gif`, ..., `24.gif`.

### maganeDeletePack(id)

It should be obvious, but this is used to delete custom pack.

Now there's another thing that you need to pay attention to!

For this function, as well as `maganeSubcribeToPack()` and `maganeUnsubscribeToPack()`, the IDs for packages that were added with `maganeAppendPack()` and `maganeAppendCustomPack()` are a bit special.

For `maganeAppendPack()`, their ID in the storage would be `startswith-<firstid>`, where `<firstid>` is the ID of the first sticker that was talked about above.

So for the example of panda sticker, its ID would be `startswith-19759616`.

For `maganeAppendCustomPack()`, their ID in the storage would be `custom-<id>`, where `<id>` is the actual ID you input in the function.

So for the example of my custom Azur Lane stickers, its ID would be `custom-bNOuvYDDWt`.

So yeah, an example of deleting the panda sticker would be:

```js
maganeDeletePack('startswith-19759616')
```

### maganeSubscribeToPack(id)

Susbcribe to pack. Please see note about IDs above.

### maganeUnsubscribeToPack(id)

Unsubscribe to pack. Please see note about IDs above.

## Bonus: Custom packs

Here is my collection of custom packs: [https://gist.github.com/BobbyWibowo/666f45d386594df0c4f58edce367d67b](https://gist.github.com/BobbyWibowo/666f45d386594df0c4f58edce367d67b).

## Bonus: Custom CSS

If you use [Beard's Material Design](https://github.com/BeardDesign1/Material-design-theme-ressources) theme, you may want to check out my custom CSS here: [20-bmt-magane.css](https://github.com/BobbyWibowo/BobbyBDThemes/blob/master/assets/bmt/files/20-bmt-magane.css). This only contain some cosmetic improvements to make it appear more faithful with the theme.
