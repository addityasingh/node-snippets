
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

const alphabetGenerator = (alphabetPattern, value) => 
    alphabetPattern
        .split('')
        .reduce((acc, curr) => {
            acc[curr] = value;
            return acc;
        }, {});
const input = alphabetGenerator('abcdefghijklmn', 12);
console.log('Input sample is ', input);

const destructure = (obj) => {
    const { a, b, c, d, e, f, g, h, i, j, k, l, m, n } = obj;
    const asdf = ('Destructured props ', a, b, c, d, e, f, g, h, i, j, k, l, m, n);
}

const dotAccess = (obj) => {
    const asdf = ('Dot access of props', obj.a, obj.b, obj.c, obj.d, 
        obj.e, obj.f, obj.g, obj.h, obj.i, obj.j, obj.k, obj.l, obj.m, obj.n);
}

const dynamicAccess = () => {
    const asdf = ('Dynamic access of props', obj['a'], obj['b'], obj['c'], obj['d'], 
        obj['e'], obj['f'], obj['g'], obj['h'], obj['i'], obj['j'], obj['k'], obj['l'], obj['m'], obj['n']);
}

suite
    .add('Destructure', () => {
        destructure(input);
    })
    .add('DotAccess', () => {
        dotAccess(input);
    })
    .add('DynamicAccess', () => {
        dynamicAccess(input);
    })
    .on('cycle', cycle)
    .on('complete', complete)
    .run({ async: true });

function cycle(event) {
  console.log(String(event.target));
}

function complete(a,b) {
  console.log('Fastest: ' + this.filter('fastest').map('name'));
  console.log('Slowest: ' + this.filter('slowest').map('name'));
}