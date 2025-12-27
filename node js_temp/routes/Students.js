
// routes/Students.js

const express = require('express');
const router = express.Router();
const permission = require('../middlewares/permission');
const asyncHandler = require('../middlewares/Async');


// الكود التالي كان يُستخدم مع متحكم الطلاب القديم (StudentsControllers)، وتم استبداله بمتحكم قاعدة البيانات الجديد
// const validator = require('../util/StudentsValidator');
// const {
//     getAllStudents,
//     getStudentById,
//     createStudent
// } = require('../Controllers/StudentsControllers');
// سبب التعليق: تم التحويل لاستخدام قاعدة بيانات MongoDB عبر Mongoose، وأصبح المتحكم الجديد يدير جميع العمليات مباشرة مع قاعدة البيانات.

const studentController = require('../Controllers/student-controller-database');



// الكود التالي كان يُستخدم مع المتحكم القديم:
// router.get("/", getAllStudents);
// router.get(":id", getStudentById);
// router.post("/", createStudent(validator));
// سبب التعليق: تم استبداله بمسارات CRUD مع متحكم قاعدة البيانات الجديد.

// GET /api/students
router.get("/", asyncHandler(studentController.getAllStudents));

// GET /api/students/:id
router.get(":id", asyncHandler(studentController.getStudentById));

// POST /api/students
router.post("/", permission, asyncHandler(studentController.createStudent));

// PUT /api/students/:id
router.put(":id", permission, asyncHandler(studentController.updateStudent));

// DELETE /api/students/:id
router.delete(":id", permission, asyncHandler(studentController.deleteStudentById));

module.exports = router;