var postcss = require('postcss');
var helpers = require('postcss-message-helpers');
var color = require('color');
var reduceFunctionCall = require('reduce-function-call');

const COLOR_FUNCTION_REGEX = /\b(rgba?|hsla?)\(/g;
const COLOR_HEX_REGEX = /#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?\b/g;

module.exports = postcss.plugin('postcss-invert-luminance', function (opts) {
  let { transform } = opts;
  if (typeof transform !== 'function') {
    throw new Error('Must provide a color transform function!');
  }

  function transformColor(c) {
    return transform(c).rgb().string();
  }

  function transformColorFunction(body, functionIdentifier) {
    return transformColor(color(functionIdentifier + '(' + body + ')'));
  }

  function transformHex(hexString) {
    return transformColor(color(hexString));
  }

  return function (style) {
    style.walkDecls(function transformDecl(decl) {
      if (!decl.value) {
        return;
      }

      decl.value = helpers.try(function transformColorFunctions() {
        return reduceFunctionCall(
          decl.value, COLOR_FUNCTION_REGEX, transformColorFunction);
      }, decl.source);

      decl.value = helpers.try(function transformHexColors() {
        return decl.value.replace(COLOR_HEX_REGEX, transformHex);
      }, decl.source);
    });
  };
});
