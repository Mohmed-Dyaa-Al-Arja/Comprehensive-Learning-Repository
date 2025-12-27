// routes/Teachers.js

const express = require('express');
const router = express.Router();
const validator = require('../util/StudentsValidator'); // يمكن لاحقاً عمل Validator خاص بالمعلمين
const {
    getAllTeachers,
    getTeacherById,
    createTeacher
} = require('../Controllers/TeachersControllers');

// GET /api/teachers
router.get("/", getAllTeachers);

// GET /api/teachers/:id
router.get("/:id", getTeacherById);

// POST /api/teachers
router.post("/", createTeacher(validator));

module.exports = router;
