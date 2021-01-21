`textFit` - Hassle-Free Text Fitting
==================================

A **fast**, dependency-free text sizing component that quickly fits single and multi-line text to the width and/or height of its container.

[Example](http://strml.github.com/examples/textFit.html)

Capabilities
============

`textFit` is:

* Fast, using binary search to quickly fit text to its container in `log n` time, making it far faster than most solutions.
  * Most fits are `<1ms`. See the [implementation details](#implementation-details).
* Dependency-free.
* Small. `4.1KB` minified and `1.5KB` gzipped.
* Supports both horizontal and vertical centering, including vertical centering with Flexbox for maximum accuracy.
* Supports any font face, padding, and multiline text.

Browser Support
===============

`textFit` supports IE9+, Firefox, Chrome, Opera, and most mobile browsers. If you find an incompatibility,
please file an issue.

If you require IE <= 8 support, please use the [jQuery version](https://github.com/STRML/textFit/tree/1.0-jQuery).
Functionality is identical between v1.0 and v2.0, the only change was the removal of the jQuery dependency.

Changelog
=========

v2.4.0
------

* Added `stopOverflow`. If there is too much text then the text will still overflow outside of the div at the smallest font size. Setting stopOverflow to true will add a `.overflow` class to the seleted div if the text is overflowing. It also adds CSS which hides the text that is overflowing in order to keep the design of the page.
* Added `maxLines`. Similar to stopOverflow but instead it adds the class if there is too many lines of text. This setting takes an input of `false` or a number of lines to apply the limit at. This needs to be improved but it's still useful to have now.
* Added `fontUnit`. Changes the unit used in the minFontSize and maxFontSize. This allows units such as cm, mm, in, pt, pc, em, vw, vh, % and rem to be used instead of px.
* Added `fontChangeSize`. This changes the amount of the font is changed by when trying to find the final font size. The default is 1 but changing this to a decimal is sometimes needed. When using rem or em font units 0.1 or 0.01 is a recommended change size.

v2.3.1
------

* Fix [#20](https://github.com/STRML/textFit/issues/20) - properly iterate over `HTMLCollection` objects.

v2.3.0
------

* Added `alignVertWithFlexbox`. This does better vertical alignment and fixes #14.

v2.2.0
------

* Throw errors instead of just printing to console when missing height/width.
  - Removed `options.suppressErrors`. Wrap in `try/catch` instead if you really need this.
* Slight refactor.
* Added automatic build on prepublish.

v2.1.1
------

* Fixed a bug with `alignVert` when reprocessing.
* Added full UMD shim and published to npm.

v2.1
----

* Reworked alignVert.
* `reProcess` is now `true` by default. Set to `false` if you want to fire-and-forget on potentially
   processed nodes. This was originally false by default because it was being used in an infinite scrolling list.

v2.0
----

* Removed jQuery dependency.

Usage
=====

```html
<div class="box" style="width:300px;height:300px">
  Fit me, I am some text
</div>
```

```javascript
// textFit accepts arrays
textFit(document.getElementsByClassName('box'));
// or single DOM elements
textFit(document.getElementsByClassName('box')[0]);
// Use jQuery selectors if you like.
textFit($('#box')[0])
```

The text will scale until it reaches the horizontal or vertical bounds of the box.
Explicit width and height styles are required in order to fit the text.

Advanced Usage
==============

Multiline Strings
-----------------

If your text has multiple lines, textFit() will automatically detect that and disable white-space: no-wrap!
No changes are necessary.

```html
<div class="box" style="width:300px;height:300px">
  This text <br>
  Has multiple lines <br>
  Fit me!
</div>
```

```javascript
textFit(document.getElementsByClassName('box'))
```

If, for some reason, the automatic detection is not working out for you, use the following to explicitly turn on
multiLine fitting:

```javascript
textFit(document.getElementsByClassName('box'), {multiLine: true})
```

Horizontal/Vertical Centering
-----------------------------

```html
<div class="box" style="width:300px;height:300px">
  This text <br>
  Has multiple lines <br>
  And wants to be centered horizontally and vertically<br>
  Fit me!
</div>
```

```javascript
textFit(document.getElementsByClassName('box'), {alignHoriz: true, alignVert: true})
```

Minimum and Maximum Sizes
-------------------------

Sometimes you want to make sure that your text remains sanely sizes if it is very short or very long. textFit
has you covered:

```html
<div class="box" style="width:300px;height:300px">
  Short Text
</div>
```

```javascript
textFit(document.getElementsByClassName('box'), {minFontSize:10, maxFontSize: 50})
```

Implementation Details
----------------------
textFit determines reasonable minimum and maximum bounds for your text. The defaults are listed below.

To ensure accurate results with various font-faces, line-heights, and letter-spacings, textFit resizes the text
until it fits the box as accurately as possible. Unlike many similar plugins, textFit uses **binary search** to
find the correct fit, which speeds the process significantly. textFit is fast enough to use in production
websites.

`textFit()` is a synchronous function. Because of this, resizes should be invisible as the render thread does not
have a chance to do a layout until completion. Normal processing times should be < 1ms and should not significantly
block renders.

Default Settings
----------------

From the source, for reference:

```javascript
settings = {
    alignVert: false, // if true, textFit will align vertically using css tables
    alignHoriz: false, // if true, textFit will set text-align: center
    multiLine: false, // if true, textFit will not set white-space: no-wrap
    detectMultiLine: true, // disable to turn off automatic multi-line sensing
    stopOverflow: false, // if true, a error we be thrown if the content is overflowing
    fontUnit: 'px', // what unit should the final font be. using rems or mm is sometimes useful
    fontChangeSize: 1, // how much should the font size by ajusted by each time. 0.1 and 0.01 is useful for when using a rem font unit
    minFontSize: 6,
    maxFontSize: 80,
    reProcess: true, // if true, textFit will re-process already-fit nodes. Set to 'false' for better performance
    widthOnly: false, // if true, textFit will fit text to element width, regardless of text height
    alignVertWithFlexbox: false, // if true, textFit will use flexbox for vertical alignment
};
```

License
=======
MIT
