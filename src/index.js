import http from 'http';

http.createServer((req, res, next) => {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello Connect");

    console.log('Server started at port 8082');
}).listen(8082);
