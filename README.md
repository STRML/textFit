jquery.textFit
==============

A **fast** jQuery plugin that quickly fits single and multi-line text to the width (and optionally height) of its container.

Usage
=====

```html
<div class="box" style="width:300px;height:300px">
  Fit me, I am some text
</div>
```

```javascript
$(".box").textFit()
```

The text will scale until it reaches the horizontal or vertical bounds of the box.
Explicit width and height styles are required in order to fit the text.

Advanced Usage
==============

Multiline Strings
-----------------

If your text has multiple lines, jQuery.textFit() will automatically detect that and disable white-space: no-wrap!
No changes are necessary.

```html
<div class="box" style="width:300px;height:300px">
  This text <br>
  Has multiple lines <br>
  Fit me!
</div>
```

```javascript
$(".box").textFit()
```

If, for some reason, the automatic detection is not working out for you, use the following to explicitly turn on
multiLine:

```javascript
$(".box").textFit({multiLine:true});
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
$(".box").textFit({alignHoriz:true, alignVert:true})
```

Minimum and Maximum Sizes
-------------------------

Sometimes you want to make sure that your text remains sanely sizes if it is very short or very long. jQuery.textFit
has you covered:

```html
<div class="box" style="width:300px;height:300px">
  Short Text
</div>
```

```javascript
$(".box").textFit({minFontSize:10, maxFontSize: 50});
```

Implementation Details
----------------------
jQuery.textFit determines reasonable minimum and maximum bounds for your text. The defaults are listed below.

To ensure accurate results with various font-faces, line-heights, and letter-spacings, jQuery.textFit resizes the text
until it fits the box as accurately as possible. Unlike many similar plugins, jQuery.textFit uses **binary search** to
find the correct fit, which speeds the process significantly. jQuery.textFit() is fast enough to use in production
websites.

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
    reProcess: false, // if true, textFit will re-process already-fit nodes. Leave to 'false' for better performance
    widthOnly: false // if true, textFit will fit text to element width, regardless of text height
};
```

License
=======
MIT