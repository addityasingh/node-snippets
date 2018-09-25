const http = require('http');

const handler = (req, res) => req.pipe(res);
http.createServer(handler).listen(3001);