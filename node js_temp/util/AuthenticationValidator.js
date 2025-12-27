const Ajv = require('ajv');
const ajv = new Ajv();
const schema = {
    type: 'object',
    properties: {
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6 }
    },
    required: ['email', 'password'],
    additionalProperties: false
};
module.exports = ajv.compile(schema);
