const EventEmitter = require('events').EventEmitter;

//#region Synchronous EventEmitter
const john = new EventEmitter();
const jane = new EventEmitter();

jane.emit('greet', `Jane`);
john.emit('greet', `John`);

john.on('greet', (person) => {
    console.log(`Hello from ${person}`);
});

jane.on('greet', (message) => {
    console.log('>>>>>>>>>>>', message, '<<<<<<<<<<<<<');
});
//#endregion

//#region Async EventEmitter
const johnAsync = new EventEmitter();
const janeAsync = new EventEmitter();

setImmediate(() => janeAsync.emit('greet', `Jane`));
setImmediate(() => johnAsync.emit('greet', `John`));

johnAsync.on('greet', (person) => {
    console.log(`Hello from ${person}`);
});

janeAsync.on('greet', (message) => {
    console.log('>>>>>>>>>>>', message, '<<<<<<<<<<<<<');
});
//#endregion

