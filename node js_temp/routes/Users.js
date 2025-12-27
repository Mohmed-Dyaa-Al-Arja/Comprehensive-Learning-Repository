// routes/Users.js

// استيراد المكتبات المطلوبة
const express = require('express');
const router = express.Router();

// استيراد نموذج المستخدم
const User = require('../Models/userModel');

// استيراد middleware التحقق من صحة المستخدم
const userValidator = require('../middlewares/userValidator');


// استيراد مكتبة bcrypt لتجزئة كلمات المرور
const bcrypt = require('bcrypt');


// استيراد مكتبة jsonwebtoken لإنشاء JWT
const jwt = require('jsonwebtoken');

// استيراد مكتبة config لإدارة الأسرار
const config = require('config');

// =============================
// تسجيل مستخدم جديد (Register) مع تجزئة كلمة المرور
// =============================
// هذا المسار يسمح بإنشاء مستخدم جديد وإضافته لقاعدة البيانات بشكل آمن
// يتم التحقق من صحة البيانات أولاً باستخدام middleware
router.post('/register', userValidator, async (req, res, next) => {
    try {
        // التأكد من عدم وجود مستخدم بنفس البريد الإلكتروني
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).json({ message: 'البريد الإلكتروني مستخدم بالفعل' });
        }
        // تجزئة كلمة المرور قبل الحفظ
        const saltRounds = 10; // عدد جولات الملح
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        // إنشاء مستخدم جديد مع كلمة مرور مجزأة
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            isAdmin: req.body.isAdmin || false // يقبل isAdmin من الطلب أو يجعلها false افتراضيًا
        });
        await user.save();
        // توليد JWT باستخدام دالة النموذج
        let token;
        try {
            token = user.generateJWT();
        } catch (err) {
            // الكود القديم لإرجاع المستخدم فقط تم تعليقه أدناه:
            // res.status(201).json({ message: 'تم تسجيل المستخدم بنجاح', user });
            return next(err);
        }
        // إرسال التوكن في رأس الاستجابة
        res.setHeader('X-Auth-Token', token);
        res.status(201).json({ message: 'تم تسجيل المستخدم بنجاح', user });
    } catch (err) {
        next(err);
    }
});

// =============================
// تسجيل الدخول (Login)
// =============================
// هذا المسار يسمح للمستخدم بتسجيل الدخول إذا كانت بياناته صحيحة

// الكود القديم الخاص بتسجيل الدخول تم تعليقه أدناه لأنه كان placeholder فقط ولم يكن ينفذ منطق فعلي:
// router.post('/login', async (req, res) => {
//     // ...هنا سيتم تنفيذ منطق تسجيل الدخول لاحقًا
//     res.status(501).json({ message: 'لم يتم تنفيذ تسجيل الدخول بعد' });
// });

// الكود الجديد: تسجيل الدخول مع إرجاع JWT
router.post('/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // البحث عن المستخدم بالبريد الإلكتروني
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
        }
        // التحقق من كلمة المرور
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
        }
        // جلب سر JWT من إعدادات config
        const jwtSecret = config.get('jwtSecret');
        if (!jwtSecret) {
            // الكود القديم الذي كان يستخدم سر ثابت تم تعليقه أدناه:
            // const token = jwt.sign(
            //     { userID: user._id },
            //     'هذا هو المفتاح السري لإنشاء الرمز',
            //     { expiresIn: '1h' }
            // );
            return next(new Error('لم يتم إعداد سر JWT بشكل صحيح في إعدادات التطبيق أو متغيرات البيئة.'));
        }
        // إنشاء JWT باستخدام السر من config
        const token = jwt.sign(
            { userID: user._id },
            jwtSecret,
            { expiresIn: '1h' }
        );
        // إرسال التوكن في رأس HTTP باسم X-Auth-Token
        // الكود القديم لإرجاع التوكن في الجسم تم تعليقه أدناه:
        // res.json({ token });
        res.setHeader('X-Auth-Token', token);
        res.status(200).json({ message: 'تم تسجيل الدخول بنجاح' });
    } catch (err) {
        next(err);
    }
});

// تصدير الراوتر لاستخدامه في app.js
module.exports = router;

// الكود القديم (إن وجد) يجب أن يتم تعليقه مع توضيح سبب التعليق، لكن لا يوجد كود قديم هنا حالياً.