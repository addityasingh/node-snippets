const http = require('http');

const handler = (req, res) => {
  let buffs = [];
  req.on('data', (chunk) => {
    buffs.push(chunk);
  });
  req.on('end', () => {
    res.write(Buffer.concat(buffs));
    res.end();
  });
};
http.createServer(handler).listen(3002);