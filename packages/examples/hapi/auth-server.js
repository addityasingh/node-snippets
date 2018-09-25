const Hapi = require('hapi');
const validateTokenPlugin = require('./auth-plugin')

const example = async () => {
    const port = process.env.PORT || 8080
    const server = Hapi.server({ host: 'localhost', port: port });
    
    await server.register(validateTokenPlugin);
        
    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, h) {
            return 'welcome';
        }
    });

    await server.start();

    return server;
};

example()
.then(server => console.log(`Server listening on ${server.info.uri}`))
.catch(err => {
    console.error(err);
    process.exit(1);
});