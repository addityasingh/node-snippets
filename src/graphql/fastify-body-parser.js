'use strict'

const fastify = require('fastify')()
const jsonParser = require('fast-json-body')

// curl -X POST -d '{"hello":"world", "key": "fastify-body-parser"}' -H'Content-type: application/json' http://localhost:3005/
fastify.addContentTypeParser('application/json', function (req, done) {
  jsonParser(req, function (err, body) {
    done(err, body)
  })
})

fastify
  .post('/', function (req, reply) {
    reply.send(req.body)
  })

fastify.listen(3005, err => {
  if (err) throw err
  console.log(`server listening on ${fastify.server.address().port}`)
})