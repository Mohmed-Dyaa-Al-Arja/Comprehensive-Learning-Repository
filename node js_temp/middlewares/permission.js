// middlewares/permission.js
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    // استخراج التوكن من رأس الطلب
    const token = req.headers['x-auth-token'];
    if (!token) {
        return res.status(401).json({ message: 'تم رفض الوصول: لا يوجد رمز توكن.' });
    }
    try {
        const jwtSecret = config.get('jwtSecret');
        const decoded = jwt.verify(token, jwtSecret);
        // دعم خاصية AdminRole أو isAdmin في الحمولة
        if (!(decoded.isAdmin || decoded.AdminRole)) {
            return res.status(401).json({ message: 'تم رفض الوصول: ليس لديك صلاحية المسؤول.' });
        }
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'تم رفض الوصول: رمز التوكن غير صالح أو منتهي.' });
    }
};
