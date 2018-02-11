const EventEmitter = require('events').EventEmitter;

const john = new EventEmitter();

john.on('greet', (person) => {
    console.log(`Hello from ${person}`);
});

const jane = new EventEmitter();

jane.on('greet', (message) => {
    console.log('>>>>>>>>>>>', message, '<<<<<<<<<<<<<');
});

jane.emit('greet', `Jane`);
john.emit('greet', `John`);

