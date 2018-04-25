const fastify = require('fastify');
const { graphql } = require('graphql');

const { schema, graphqlFastify } = require('./graphql');

const app = fastify();

app.register(graphqlFastify, { graphqlOptions: { schema } });

app.listen(3000, (err) => {
  if (err) {
      app.log.error(err)
      process.exit(1)
  }
})