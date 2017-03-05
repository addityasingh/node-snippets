'use strict';
import recast from 'recast';

const code = [
  'function add(a, b) {',
  '  return a +',
  '    // Weird formatting, huh?',
  '    b;',
  '}'
].join('\n');

const ast = recast.parse(code);

console.log('recasted ast', JSON.stringify(ast));

const output = recast.prettyPrint(ast, { tabWidth: 2 }).code;
//recast.print(ast).code;
console.log('recast formatted Output: ', output);
