const benchmark = require('benchmark')
const slow = require('.')
const suite = new benchmark.Suite()

// const numbers = Array.from({length: 100}, (v, k) => Math.random() * k)

suite.add("slow", () => {
    slow(12, numbers);
});

suite.on("complete", print);

suite.run();

function print() {
    for (var i = 0; i < this.length; i++) {
        console.log(this[i].toString())
    }
    console.log('Fastest is', this.filter('fastest').map('name')[0])
}