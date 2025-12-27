// middlewares/userValidator.js

// استيراد مكتبة AJV للتحقق من صحة JSON
const Ajv = require('ajv');
const ajv = new Ajv();

// مخطط التحقق من صحة بيانات المستخدم
const userSchema = {
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 2 },
        email: { type: 'string', format: 'email' },
        password: { type: 'string', minLength: 6 }
    },
    required: ['name', 'email', 'password'],
    additionalProperties: false
};

const validate = ajv.compile(userSchema);

// Middleware للتحقق من صحة بيانات المستخدم
function userValidator(req, res, next) {
    const valid = validate(req.body);
    if (!valid) {
        return res.status(400).json({
            message: 'بيانات المستخدم غير صحيحة',
            errors: validate.errors
        });
    }
    next();
}

module.exports = userValidator;
