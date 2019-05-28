const promise4 = new Promise((res, rej) => {
    setTimeout(() => {
        rej('rejected')
    }, 5000);
});
// promise4.then(console.log).catch(console.error);
process.on("rejectionhandled", event => {
    console.log("Promise rejected; reason: " + event.reason);
}, false);
process.on('rejectionhandled', (val) => {
    console.log('>>>>>>>>>>onrejectionhandled: ', val)
})
process.on('unhandledrejection', (val) => {
    console.log('>>>>>>>>>>onunhandledrejection: ', val)
})