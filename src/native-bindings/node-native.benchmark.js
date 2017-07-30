var Benchmark = require('benchmark');
var palindromeC = require('bindings')('palindrome.node');
var palindromeJs = require('./palindrome.js').default;
var suite = new Benchmark.Suite;
var str = 'a man a plan a cat a ham a yak a yam a hat a canal panama';

suite
.add('Javascript palindrome', function() {
  palindromeJs(str);
})
.add('C palindrome', function() {
  palindromeC(str);
})
.on('cycle', cycle)
.on('complete', complete)
.run({ 'async': true });

function cycle(event) {
  console.log(String(event.target));
}

function complete(a,b) {
  console.log('Fastest: ' + this.filter('fastest').map('name'));
  console.log('Slowest: ' + this.filter('slowest').map('name'));
}