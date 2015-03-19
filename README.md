textFit v2.1.0
==============

A **fast**, jQuery-free text sizing component that quickly fits single and multi-line text to the width (and optionally height) of its container.

[Example](http://strml.github.com/examples/textFit.html)

Browser Support
===============

`textFit` supports IE9+, Firefox, Chrome, Opera, and most mobile browsers. If you find an incompatibility,
please file an issue.

If you require IE <= 8 support, please use the [jQuery version](https://github.com/STRML/textFit/tree/1.0-jQuery).
Functionality is identical between v1.0 and v2.0, the only change was the removal of the jQuery dependency.

Changelog
=========

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
    minFontSize: 6,
    maxFontSize: 80,
    reProcess: true, // if true, textFit will re-process already-fit nodes. Set to 'false' for better performance
    widthOnly: false // if true, textFit will fit text to element width, regardless of text height
};
```

License
=======
MIT
