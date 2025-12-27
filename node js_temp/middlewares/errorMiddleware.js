// middlewares/errorMiddleware.js
module.exports = function (err, req, res, next) {
    // تسجيل الخطأ في السجل (يمكنك تخصيصه)
    console.error(err);
    // إرسال استجابة موحدة للعميل
    res.status(err.status || 500).json({
        message: err.message || 'حدث خطأ غير متوقع في الخادم',
        error: process.env.NODE_ENV === 'development' ? err : undefined
    });
};
