const http = require('http');
const https = require('https');
const {parse} = require('url');

const server = () => {
    http.createServer((request, response) => {
        response.write('>>>>>>>>>>>>>>>>');
        response.statusCode = 200;
        response.end();
    })
    .listen(3007, () => { 
        client(Object.assign({}, parse("http://127.0.0.1:3007"), {
            timeout: 500
        }), (err, res) => {
            if(err) {
                console.error('>>>>>>>>>>>error',err);
            } else {
                console.log('>>>>>>timings', res.timings);
                console.log('>>>>>>body', res.body);
            }
        });
    })
}


const client = (options, callback) => {
    const timings = {
        startTime: process.hrtime(),
        dnsLookupTime: undefined,
        tcpConnectionTime: undefined,
        tlsHandshakeTime: undefined,
        requestHeaderStartTime: undefined,
        requestHeaderEndTime: undefined,
        requestBodyStartTime: undefined,
        requestBodyEndTime: undefined,
        responseHeaderStartTime: undefined,
        responseHeaderEndTime: undefined,
        responseBodyStartTime: undefined,
        responseBodyEndTime: undefined,
    };
    const { protocol } = options;
    const usedProtocol = protocol === 'https:' ? https : http;

    let response = '';
    const request = usedProtocol.request(options, (res) => {
        res.once('data', () => {
            timings.responseBodyStartTime = process.hrtime();
        });

        res.on('data', (chunk) => response += chunk);
        res.on('end', () => {
            timings.responseBodyEndTime = process.hrtime();
            callback(null, {
                body: response,
                timings: getTimings(timings),
            });
        })
    })
    .setTimeout(options.timeout)
    .on('socket', (socket) => {
        // Socket created for dnslookup
        socket.on('lookup', () => {
            timings.dnsLookupTime = process.hrtime();
        });

        // TCP Connection established
        socket.on('connect', () => {
            timings.tcpConnectionTime = process.hrtime();
        })

        // TLS Handshake complete
        socket.on('secureConnect', () => {
            timings.tlsHandshakeTime = process.hrtime();
        });
        socket.on('timeout', () => {
            request.abort();
            const err = new Error('ETIMEDOUT')
            err.code = 'ETIMEDOUT'
            callback(err)
        })
    })
    .on('error', callback)
    .end();

}

function getTimings(httpTimings) {
    const dnsLookup = httpTimings.dnsLookupTime 
        ? findDuration(
            httpTimings.startTime,
            httpTimings.dnsLookupTime
        ) 
        : undefined
    const tcpConnectionTime = httpTimings.tcpConnectionTime 
        ? findDuration(
            (httpTimings.dnsLookupTime || httpTimings.startTime),
            httpTimings.tcpConnectionTime
        ) 
        : undefined;
    const tlsHandshakeTime = httpTimings.tlsHandshakeTime 
        ? findDuration(
            httpTimings.tcpConnectionTime,
            httpTimings.tlsHandshakeTime
        ) 
        : undefined;
    const firstByte = findDuration(
        (httpTimings.tlsHandshakeTime || httpTimings.tcpConnectionTime),
        httpTimings.responseBodyStartTime
    );
    const contentTransfer = findDuration(
        httpTimings.responseBodyStartTime,
        httpTimings.responseBodyEndTime
    );
    const total = findDuration(
            httpTimings.startTime,
            httpTimings.responseBodyEndTime
    );
    return {
        dnsLookup,
        tcpConnectionTime,
        tlsHandshakeTime,
        firstByte,
        contentTransfer,
        total,
    };
}

function findDuration(
    [secStart, nanoSecStart],
    [secEnd, nanoSecEnd]
) {
    return (
        (
            (secEnd - secStart) * 1e9
        ) 
        + 
        (
            nanoSecEnd - nanoSecStart
        )
    )/1e6
}

// server();
client(Object.assign({}, 
    parse("https://api.github.com/users"),
    {
        headers: {
            'User-Agent': 'Example'
        },
        timeout: 500
    }), (err, res) => {
        if(err) {
            console.error('>>>>>>>>>>>error',err);
        } else {
            console.log(res.timings);
            // console.log('>>>>>>body', res.body);
        }
})