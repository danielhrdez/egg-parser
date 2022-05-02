// @ts-check
/**
 * @description A file with the tests for the Egg compiler
 * @author Alu0101331720 Name <alu0101331720@ull.edu.es>
 * @since 02/05/2022
 */

'use strict';

const should = require('chai').should();
const { parseFromFile } = require("../src/parse.js");

const fs = require('fs');
const path = require('path');

const { skipKeys, simpleDeb } = require('../src/utils.js')

const testFolder = path.join(__dirname, 'examples');

const testList = [];

fs.readdirSync(testFolder).forEach(file => {
  if (/\.egg$/.test(file)) testList.push(file.replace('.egg', ''));
});

skipKeys(['toString', "line", "offset", "lineBreaks", "col"]);

describe('Compiler', () => {
  const runTest = (testName) => {
    const expected = JSON.parse(fs.readFileSync('test/ast/' + testName + '.json', {encoding: 'utf8'}));
    debugger;
    const result = parseFromFile('test/examples/' + testName + '.egg');
    simpleDeb(result).should.eql(simpleDeb(expected));
  };
  let i = 0;
  testList.forEach((test) => {
    if (i < 5) {
      it(test, () => {
        runTest(test);
      });
    }
    i++;
  });
});

describe('Compiler errors', () => {
  const basePath = 'test/errors/';

  const testList = [
    { name: 'unexpected-token-comma', error: /Unexpected.*token.*,/i },
    { name: 'unexpected-eof',   error: /Unexpected.*EOF.*token/i },
    { name: 'unexpected-token-word', error: /Unexpected.*WORD.token/i },
  ];

  const runTest = (test) => {
    xit(test.name, () => {
      should.throw(() => {
        parseFromFile(basePath + test.name + '.egg');
      }, test.error);
    });
  };

  testList.forEach((test) => {
    runTest(test);
  });
});
