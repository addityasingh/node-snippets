/**
 * Node sample to compare the cost of using loggers
 */

const app = require('express')();
const http = require('http');
const server = http.createServer(app)

// app.use(require('express-bunyan-logger')())

app.use(require('express-pino-logger')({
  extreme: true
}))


app.get('/', function (req, res) {
  res.send('hello world')
})

server.listen(3000) 