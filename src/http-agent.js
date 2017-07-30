/**
 * Node samples to experiment with Node native http API
 */

const http = require('http')
const url = require('url');
const requestretry = require('requestretry');
const pool = new http.Agent({
    keepAlive: true
});
const myTimeout = 2500;

const server = http.createServer((request, response) => {
    console.log('request to upstream service');
    const { pathname } = url.parse(request.url);
    if (pathname.includes('repo')) {
        const req = http.request({
            url: 'https://github.com', 
            agent: pool,
            path: '/repos/addityasingh',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }, (err, res) => {
            console.log(err);
            console.log(res);
            response.end('Hello success');
        });
        

        // req.on('response', (res) => {
        //     console.log(res);
        //     response.end('Hello success');
        // });

        req.on('error', (err) => {
            console.log(err);
            response.end('Hello failure');
        });

        // req.on('finish', (err) => {
        //     console.log(err);
        //     response.end('Hello finish');
        // });
    }

    setTimeout(() => {
        console.log('Response from the server after 3000 ms')
        response.end('Test data');
    }, 3000);
})
.listen(8090, () => {
    console.log('server started at port 8090');
});

const client = http.createServer((request, response) => {
    const postData = JSON.stringify({
        'msg' : 'Hello World!'
    });

    const req = requestretry({
        uri: 'http://localhost:8090/',
        //port: 8090,
        // path: '/',
        timeout: myTimeout,
        maxAttempts: 2,   // (default) try 5 times 
        retryDelay: 100,  // (default) wait for 5s before trying again
        retryStrategy: requestretry.RetryStrategies.HTTPOrNetworkError // (default) retry on 5xx or network errors
    }, (err, res) => {
        console.log('err', err);
        // console.log('res', res);
        console.log(`STATUS: ${res.statusCode}`);
        console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
        
        res
            .setEncoding('utf8')
            .pipe(response)
            .on('error', (er) => {
                console.log(`Error from upstream with ${er.message}`);
                response.end();
            });
    });

    // req.on('socket', function (socket) {
    //     socket.setTimeout(myTimeout);  
    //     socket.on('timeout', function() {
    //         req.abort();
    //     });
    // });

    req.on('error', err => {
        if (err.code === "ECONNRESET") {
            console.log(`Timeout occurs. Details ${err.message}` );
            //specific error treatment
        } else {
            console.log(`problem with request: ${err.message}`);
        }

        // response.end('Error');
    });

    // write data to request body
    // req.write(postData);
    req.end();
})
.listen(8099, () => {
    console.log('Client service started at port 8099');
});