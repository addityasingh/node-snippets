const { expect } = require('chai')
const { stub } = require('sinon')
const request = require('supertest');
require('mocha');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    graphql,
} = require('graphql'); 
const {graphqlFastify, schema} = require('./graphql')
const fastify = require('fastify')();

describe('graphqlHTTP', () => {
    let app, createApp, destroyApp;

    before(() => {
        createApp = async ({
            graphqlOptions
        }) => {
            fastify.register(graphqlFastify, { graphqlOptions });

            try {
                return await fastify.listen(3007, 'localhost')
            } catch (err) {
                fastify.log.error(err)
                process.exit(1)
            }
        };
    })

    after(() => {
        if(app && typeof app.close === 'function') {
            app.close();
            app = null;
        }
    });

    it('can be called with an options function', async () => {
      app = await createApp({
        graphqlOptions: () => ({ schema }),
      });
      const expected = {
        testString: 'it works',
      };
      const req = request(app)
        .post('/graphql')
        .send({
          query: 'query test{ testString }',
        });
      return req.then(res => {
        expect(res.status).to.equal(200);
        return expect(res.body.data).to.deep.equal(expected);
      });
    });
});