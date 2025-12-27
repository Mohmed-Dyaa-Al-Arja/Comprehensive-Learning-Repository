// routes/admin.js
const express = require('express');
const router = express.Router();
const User = require('../Models/userModel');
const permission = require('../middlewares/permission');

// تحديث دور المستخدم ليصبح مسؤولاً (Admin)
// PUT /api/admin/user/:id
router.put('/user/:id', permission, async (req, res) => {
    try {
        const userId = req.params.id;
        // تحديث isAdmin إلى true
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { isAdmin: true },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'المستخدم غير موجود' });
        }
        res.json({ message: 'تم تعيين المستخدم كمسؤول بنجاح', user: updatedUser });
    } catch (err) {
        res.status(500).json({ message: 'حدث خطأ أثناء تحديث دور المستخدم', error: err.message });
    }
});

module.exports = router;
