const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
    const { pathname } = url.parse(req.url);
    console.log('>>>>>>>>route', pathname);
    if (pathname === '/nike.html') {
        const buffer = fs.readFileSync(path.join(__dirname, 'bankroll.json'));
        console.log('>>>>>>>>>>>buffer length', buffer.length);
        // res.setHeader('content-encoding', 'br');
        res.removeHeader('content-length');
        res.setHeader('content-type', 'application/json');
        res.write(buffer);
    }
    res.end();
});

server.on('clientError', (err, socket) => {
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(9193, () => {
    console.log('>>server started at ', 9193);
})