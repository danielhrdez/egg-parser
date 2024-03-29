const SPACE = /(?<SPACE>\s+|#.*|\/[*](?:.|\n)*?[*]\/)/; SPACE.skip = true;
const NUMBER = /(?<NUMBER>[-+]?\d+(\.\d+)?(?:[eE][-+]?\d+)?)/;
NUMBER.value = (x) => {
  if (x.match(/^0\.0+$/g)) return x;
  return Number(x);
};
const STRING = /(?<STRING>"(?:[^"\\]|\\.)*")/;
const REGEXP = /(?<REGEXP>r\/((?:[^\/\\]|\\.)*)\/(\w*?\b)?)/;
REGEXP.value = (value) => {
  let [source, flags] = value.split('/').slice(1);
  return {
      type: 'RegExp',
      info: [ source, flags]
  };
};
const LP = /(?<LP>\()/;
const RP = /(?<RP>\))/;
const LB = /(?<LB>\[)/;
const RB = /(?<RB>\])/;
const LC = /(?<LC>\{)/;
const RC = /(?<RC>\})/;
const DOT = /(?<DOT>\.)/;
const COLON = /(?<COLON>:)/;
const WORD = /(?<WORD>[^\s\(\),"\[\]\.:\{\}]+)/;
const COMMA = /(?<COMMA>,)/;

/** Tokens object: definitions */
const tokens = [
  SPACE,
  NUMBER,
  STRING,
  LP,
  RP,
  LB,
  RB,
  LC,
  RC,
  DOT,
  COLON,
  COMMA,
  REGEXP,
  WORD,
];

module.exports = {SPACE, tokens};