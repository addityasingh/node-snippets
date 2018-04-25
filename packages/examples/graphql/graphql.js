const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  graphql,
} = require('graphql'); 

const personType = new GraphQLObjectType({
  name: 'PersonType',
  fields: {
    firstName: {
      type: GraphQLString,
    },
    lastName: {
      type: GraphQLString,
    },
  },
});

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  fields: {
    testString: {
      type: GraphQLString,
      resolve() {
        return 'it works';
      },
    },
    testPerson: {
      type: personType,
      resolve() {
        return { firstName: 'Jane', lastName: 'Doe' };
      },
    },
  },
});

const schema = new GraphQLSchema({
  query: queryType,
});

const parseGQLQuery = (req) =>
  Promise.resolve(req.raw.method === 'POST' ? req.body : req.query)
    .then(res => res.query);

async function graphqlFastify(fastify, options, next) {
    if (!options || !options.graphqlOptions) {
      throw new Error('GraphQl Server requires options.');
    }
  
    if (arguments.length !== 3) {
      throw new Error(
        `GraphQl Server expects exactly 3 argument, got ${arguments.length}`,
      );
    }
  
    const handler = async (req, res) => {
      return parseGQLQuery(req)
        .then(query => graphql(schema, query))
        .then(gqlResponse => {
          res.header('Content-Type', 'application/json');
          res.header('Content-Length', Buffer.byteLength(JSON.stringify(gqlResponse), 'utf8'));
          res.send(gqlResponse);
          // return gqlResponse;
        })
        .catch((error) => {
          if ('HttpQueryError' !== error.name) {
            return error;
          }
  
          if (error.headers) {
            Object.keys(error.headers).forEach(header => {
              res.header(header, error.headers[header])
            });
          }
  
          res.code(error.statusCode)
          res.send(error.message)
        })
        .then(next);
    }

    fastify.route({
      method: ['GET', 'POST'],
      url: '/graphql', 
      handler
    });
  }


module.exports = {
  graphqlFastify,
  schema,
}