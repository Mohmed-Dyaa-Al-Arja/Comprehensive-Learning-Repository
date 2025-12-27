// Models/teacherModel.js

const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/Teachers.json');

class Teacher {
    constructor(name, dept, id) {
        this.name = name;
        this.dept = dept;
        this.id = id;
    }
}

// جلب جميع المعلمين (غير متزامن)
function fetchAllTeachers(callback) {
    fs.readFile(dataPath, 'utf-8', (err, data) => {
        if (err) {
            callback([]);
        } else {
            try {
                const teachers = JSON.parse(data);
                callback(teachers);
            } catch (e) {
                callback([]);
            }
        }
    });
}

// إضافة معلم جديد
function saveTeacher(teacher) {
    let teachers = [];
    try {
        const data = fs.readFileSync(dataPath, 'utf-8');
        teachers = JSON.parse(data);
    } catch (err) { }
    const newId = teachers.length > 0 ? teachers[teachers.length - 1].id + 1 : 1;
    const newTeacher = new Teacher(teacher.name, teacher.dept, newId);
    teachers.push(newTeacher);
    fs.writeFileSync(dataPath, JSON.stringify(teachers, null, 2));
    return newTeacher;
}

module.exports = {
    Teacher,
    fetchAllTeachers,
    saveTeacher
};
