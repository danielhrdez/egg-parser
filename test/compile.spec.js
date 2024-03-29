// @ts-check
/**
 * @description A file with the tests for the Egg compiler
 * @author Alu0101331720 Name <alu0101331720@ull.edu.es>
 * @since 02/05/2022
 */

'use strict';

const should = require('chai').should();
const { parseFromFile, parBalance, getTokens, parse } = require("../src/parse.js");

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
  testList.forEach((test) => {
    it(test, () => {
      runTest(test);
    });
  });
});

describe('Compiler errors', () => {
  const basePath = 'test/errors/';

  const testList = [
    { name: 'unexpected-empty-array', error: /Unexpected.*Empty.*array/i },
    { name: 'unexpected-token-comma', error: /Unexpected.*token.*,/i },
    { name: 'unexpected-eof',   error: /Unexpected.*EOF.*token/i },
    { name: 'unexpected-token-word', error: /Unexpected.*WORD.token/i },
  ];

  const runTest = (test) => {
    it(test.name, () => {
      should.throw(() => {
        parseFromFile(basePath + test.name + '.egg');
      }, test.error);
    });
  };

  testList.forEach((test) => {
    runTest(test);
  });
});

describe('par balance', () => {
  it('should be check the balance of parenthesis', () => {
    parBalance('()').should.equal(0);
    parBalance('()()').should.equal(0);
    parBalance('(())').should.equal(0);
    parBalance('()()()').should.equal(0);
    parBalance('(()())').should.equal(0);
    parBalance('(()()())').should.equal(0);
    parBalance('(()()()())').should.equal(0);
  });

  it('should be check the non balance of parenthesis', () => {
    parBalance('(()').should.not.equal(0);
    parBalance('()())()').should.not.equal(0);
    parBalance('(()()()()').should.not.equal(0);
    parBalance('(()()()()()').should.not.equal(0);
    parBalance('(()()()()()()').should.not.equal(0);
  });

  it('should be check the balance of brackets', () => {
    parBalance('[]').should.equal(0);
    parBalance('[]()').should.equal(0);
    parBalance('[()]').should.equal(0);
    parBalance('[]()()').should.equal(0);
    parBalance('[()()]').should.equal(0);
    parBalance('[()()()]').should.equal(0);
    parBalance('[()()()()]').should.equal(0);
  });

  it('should be check the non balance of brackets', () => {
    parBalance('[()').should.not.equal(0);
    parBalance('()[)()]').should.not.equal(0);
    parBalance('[()()()()').should.not.equal(0);
    parBalance('[()()()()()').should.not.equal(0);
    parBalance('[()()()()()()').should.not.equal(0);
  });
});

describe('getTokens', () => {

  it('should be get the tokens', () => {
    const tokens = getTokens('&');
    tokens.should.deep.equal([{
      col: 1,
      length: 1,
      line: 1,
      type: 'WORD',
      value: '&',
    }]);
  });
});

describe('parse', () => {
  it('should be parse the tokens', () => {
    const result = parse('a()');
    result.should.deep.equal({
      type: 'apply',
      operator: { type: 'word', length: 1, name: 'a' },
      args: []
    });
  });
});
