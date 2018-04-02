[![npm](https://img.shields.io/npm/v/postcss-color-transform.svg)](https://www.npmjs.com/package/postcss-color-transform)
[![npm](https://img.shields.io/npm/dt/postcss-color-transform.svg)](https://www.npmjs.com/package/postcss-color-transform)
[![npm](https://img.shields.io/npm/l/postcss-color-transform.svg)](https://www.npmjs.com/package/postcss-color-transform)

# PostCSS Color Transform

[PostCSS] plugin to perform arbitrary transformations to colors.

[PostCSS]: https://github.com/postcss/postcss

## Usage

```js
var colorTransform = require('postcss-color-transform');
var invert = colorTransform({ transform: color => color.negate() });
postcss([ invert ]);
```

Input:

```css
.foo {
    color: #FF0;
    background-color: hsla(90, 50%, 80%, 0.7);
}
```

Output:

```css
.foo {
    color: rgb(0, 0, 255);
    background-color: rgba(51, 26, 77, 0.7);
}
```

See [PostCSS] docs for examples for your environment.
