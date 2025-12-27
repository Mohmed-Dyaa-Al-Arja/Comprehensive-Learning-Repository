
// استيراد نموذج الطلاب الجديد من Mongoose

// الكود التالي كان يُستخدم لتصدير دوال CRUD الخاصة بالطلاب قبل التحويل إلى متحكم قاعدة البيانات الجديد:
/*
const Student = require('../Models/studentMongooseModel');

// جلب جميع الطلاب (MongoDB)
const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: 'خطأ في جلب الطلاب', details: err });
    }
};

// جلب طالب حسب ID (MongoDB)
const getStudentById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const student = await Student.findOne({ id });
        if (!student) {
            return res.status(404).json({ message: "غير موجود" });
        }
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: 'خطأ في جلب الطالب', details: err });
    }
};

// إضافة طالب جديد (MongoDB)
const createStudent = (validator) => async (req, res) => {
    const valid = validator(req.body);
    if (!valid) {
        return res.status(400).json({ errors: validator.errors });
    }
    try {
        const { fn, dept, id } = req.body;
        const newStudent = new Student({ fn, dept, id });
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(500).json({ error: 'خطأ في إضافة الطالب', details: err });
    }
};

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent
};
*/
// سبب التعليق: تم التحويل لاستخدام متحكم جديد يدير جميع عمليات CRUD مباشرة مع قاعدة البيانات، وتم نقل جميع الدوال إلى student-controller-database.js.