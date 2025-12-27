const validate = require('../util/AuthenticationValidator');
module.exports = (req, res, next) => {
    const valid = validate(req.body);
    if (!valid) {
        return res.status(400).json({ errors: validate.errors });
    }
    next();
};
