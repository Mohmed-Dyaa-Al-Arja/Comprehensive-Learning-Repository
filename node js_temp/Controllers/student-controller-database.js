// Controllers/student-controller-database.js

const Student = require('../Models/studentMongooseModel');

// إنشاء طالب جديد
exports.createStudent = async (req, res) => {
    try {
        const { fn, ln, dept, id } = req.body;
        if (!fn || !ln || !dept || !id) {
            return res.status(400).json({ message: 'حقول مطلوبة مفقودة' });
        }
        const student = new Student({ fn, ln, dept, id });
        await student.save();
        res.status(201).json({ message: 'تم حفظ الطالب بنجاح', student });
    } catch (err) {
        res.status(500).json({ message: 'حدث خطأ أثناء الحفظ', error: err.message });
    }
};

// جلب طالب بواسطة ID
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'الطالب غير موجود' });
        }
        res.json(student);
    } catch (err) {
        res.status(500).json({ message: 'حدث خطأ', error: err.message });
    }
};

// جلب جميع الطلاب
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find({}, 'fn ln id').sort({ id: 1 });
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: 'حدث خطأ', error: err.message });
    }
};

// تحديث طالب
exports.updateStudent = async (req, res) => {
    try {
        const { fn, ln, dept } = req.body;
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            { fn, ln, dept },
            { new: true }
        );
        if (!student) {
            return res.status(404).json({ message: 'الطالب غير موجود' });
        }
        res.json({ message: 'تم التحديث بنجاح', student });
    } catch (err) {
        res.status(500).json({ message: 'حدث خطأ', error: err.message });
    }
};

// حذف طالب
exports.deleteStudentById = async (req, res) => {
    try {
        const student = await Student.findByIdAndRemove(req.params.id);
        if (!student) {
            return res.status(404).json({ message: 'الطالب غير موجود' });
        }
        res.json({ message: 'تم حذف الطالب', student });
    } catch (err) {
        res.status(500).json({ message: 'حدث خطأ', error: err.message });
    }
};
