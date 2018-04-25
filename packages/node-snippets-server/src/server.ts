import * as fastify from 'fastify';

const app = fastify();

app.listen(3000, (err) => {
  if (err) {
      app.log.error(err)
      process.exit(1)
  }
  console.log('server started at', app.server.address().port);
});