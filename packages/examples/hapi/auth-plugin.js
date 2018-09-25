const Boom = require('boom');

const validate = async (request) => {
    const { authorization = ''} = request.headers;
    const isValid = authorization.indexOf('Bearer') > -1;
    return { isValid };
}

const scheme = (server, options) => ({
    authenticate: async function (request, h) {
        const authorization = request.headers.authorization;

        if (!authorization) {
            throw Boom.unauthorized(null, 'No authorization header', options.unauthorizedAttributes);
        }

        const { isValid } = await options.validate(request);

        if (!isValid) {
            return h.unauthenticated(Boom.unauthorized('Un-authenticated request', 'Bearer', options.unauthorizedAttributes), {credentials: {}})
        }

        return h.authenticated({credentials: {}});
    }
});


exports.plugin = {
    register: function (server, options) {
        server.auth.scheme('bearer', scheme);
        server.auth.strategy('simple', 'bearer', { validate });
        server.auth.default('simple');
    },
    name: 'auth-validation'
};
