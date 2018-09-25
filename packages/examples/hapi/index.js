const Hapi = require('hapi');

const port = process.env.PORT || 8080
const server = Hapi.server({ host: 'localhost', port: port });

async function example() {
    const handler = function (route, options) {

        return function (request, h) {

            return 'new handler: ' + options.msg;
        }
    };

    server.decorate('handler', 'test', handler);

    server.route({
        method: 'GET',
        path: '/',
        handler: { test: { msg: 'test' } }
    });

    server.route({
        method: 'GET',
        path: '/replyheader',
        handler: (req, reply) => {
            return Promise.resolve('Hello world!')
                .then(r => {
                    console.log('reply header', Object.keys(reply.request.headers));
                    return r;
                })
                .then(reply)
                .catch(reply);
        }
    });

    console.log('>>>>>>>>server keys', Object.keys(server));

    await server.start();

}

example();