var postcss = require('postcss');

var plugin = require('./');

function run(input, output, opts) {
  return postcss([ plugin(opts) ]).process(input, { from: undefined })
    .then(result => {
      expect(result.css).toEqual(output);
      expect(result.warnings().length).toBe(0);
    });
}

it('Transforms hex colors', () => {
  return run(
    'a{ color: #FFFF00 }',
    'a{ color: rgb(0, 0, 255) }',
    { transform: color => color.negate() });
});

it('Transforms short hex colors', () => {
  return run(
    'a{ color: #F0F }',
    'a{ color: rgb(0, 255, 0) }',
    { transform: color => color.negate() });
});

it('Transforms rgb colors', () => {
  return run(
    'a{ color: rgb(255, 255, 255) }',
    'a{ color: rgb(0, 0, 0) }',
    { transform: color => color.negate() });
});

it('Transforms rgba colors', () => {
  return run(
    'a{ color: rgba(255, 255, 255, 0.8) }',
    'a{ color: rgba(0, 0, 0, 0.8) }',
    { transform: color => color.negate() });
});

it('Transforms hsl colors', () => {
  return run(
    'a{ color: hsl(90, 50%, 80%) }',
    'a{ color: rgb(51, 26, 77) }',
    { transform: color => color.negate() });
});

it('Transforms hsla colors', () => {
  return run(
    'a{ color: hsla(90, 50%, 80%, 0.7) }',
    'a{ color: rgba(51, 26, 77, 0.7) }',
    { transform: color => color.negate() });
});
