// Controllers/TeachersControllers.js
const { Teacher, fetchAllTeachers, saveTeacher } = require('../Models/teacherModel');

// جلب جميع المعلمين (غير متزامن)
const getAllTeachers = (req, res) => {
    fetchAllTeachers((teachers) => {
        res.json(teachers);
    });
};

// جلب معلم حسب ID (غير متزامن)
const getTeacherById = (req, res) => {
    const id = parseInt(req.params.id);
    fetchAllTeachers((teachers) => {
        const teacher = teachers.find(t => t.id === id);
        if (!teacher) {
            return res.status(404).json({ message: "غير موجود" });
        }
        res.json(teacher);
    });
};

// إضافة معلم جديد (يحتاج validator)
const createTeacher = (validator) => (req, res) => {
    const valid = validator(req.body);
    if (!valid) {
        return res.status(400).json({ errors: validator.errors });
    }
    const { name, dept } = req.body;
    const newTeacher = saveTeacher({ name, dept });
    res.status(201).json(newTeacher);
};

module.exports = {
    getAllTeachers,
    getTeacherById,
    createTeacher
};
