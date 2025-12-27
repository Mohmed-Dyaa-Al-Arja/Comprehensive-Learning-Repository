// routes/Courses.js
const express = require('express');
const router = express.Router();

// بيانات الكورسات (مؤقتة، ويفضل لاحقًا نقلها إلى موديل منفصل كما في الطلاب)
const Courses = [
    { id: 1, name: 'Node.js Basics', hours: 20 },
    { id: 2, name: 'Express.js Advanced', hours: 15 },
    { id: 3, name: 'MongoDB Intro', hours: 10 },
];

// GET /api/courses
router.get('/', (req, res) => {
    res.json(Courses);
});

// POST /api/courses
router.post('/', (req, res) => {
    const { name, hours } = req.body;
    if (!name || typeof name !== 'string' || !hours || typeof hours !== 'number') {
        return res.status(400).json({ error: 'اسم الكورس وعدد الساعات مطلوبين' });
    }
    const newCourse = { id: Courses.length + 1, name, hours };
    Courses.push(newCourse);
    res.status(201).json(newCourse);
});

module.exports = router;
