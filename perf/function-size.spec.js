
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

const input = Array.from({ length: 50 }, (v, k) => k)
console.log('Input sample is ', input);

const averageSmall = (list) => {
    const sum = () => list.reduce((acc, num) => acc + num, 0);
    const count = () => list.reduce((acc, num) => acc + 1, 0);
    return sum() / count();
}

const averageSingle = (list) => {
    const sum = list.reduce((acc, num) => acc + num, 0);
    return sum / list.length;
}

suite
    .add('Small functions', () => {
        averageSmall(input);
    })
    .add('One big function', () => {
        averageSingle(input);
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