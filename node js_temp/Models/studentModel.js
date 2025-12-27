// Models/studentModel.js

// ملاحظة: الكود التالي كان يُستخدم لتخزين البيانات في الذاكرة فقط، وتم استبداله بقراءة/كتابة البيانات من ملف JSON.
// تم هاش الكود حتى لا يتم حذفه نهائيًا ولتوضيح الفرق بين الطريقتين.
/*
let students = [
    { name: 'Ali', dept: 'PD', id: 1 },
    { name: 'Nour', dept: 'SA', id: 2 },
    { name: 'Mona', dept: 'MD', id: 3 },
    { name: 'Sara', dept: 'SAP', id: 4 },
    { name: 'Mostafa', dept: 'EB', id: 5 },
    { name: 'Ahmed', dept: 'GD', id: 6 },
    { name: 'Noha', dept: 'GA', id: 7 },
];

class Student {
    constructor(name, dept) {
        this.name = name;
        this.dept = dept;
        this.id = students.length + 1;
    }
}

function fetchAllStudents() {
    return students;
}

function saveStudent(student) {
    students.push(student);
}
*/

// الكود الجديد: التعامل مع البيانات من ملف JSON (Students.json)
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/Students.json');

class Student {
    constructor(name, dept, id) {
        this.name = name;
        this.dept = dept;
        this.id = id;
    }
}

// الكود المتزامن (تم هاشه)
/*
function fetchAllStudents() {
    try {
        const data = fs.readFileSync(dataPath, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        return [];
    }
}
*/

// الكود الجديد: دالة غير متزامنة تعتمد على callback
function fetchAllStudents(callback) {
    fs.readFile(dataPath, 'utf-8', (err, data) => {
        if (err) {
            callback([]);
        } else {
            try {
                const students = JSON.parse(data);
                callback(students);
            } catch (e) {
                callback([]);
            }
        }
    });
}

function saveStudent(student) {
    // نحتاج لجلب الطلاب بشكل متزامن هنا فقط للكتابة
    let students = [];
    try {
        const data = fs.readFileSync(dataPath, 'utf-8');
        students = JSON.parse(data);
    } catch (err) { }
    // تعيين id بناءً على البيانات في الملف
    const newId = students.length > 0 ? students[students.length - 1].id + 1 : 1;
    const newStudent = new Student(student.name, student.dept, newId);
    students.push(newStudent);
    fs.writeFileSync(dataPath, JSON.stringify(students, null, 2));
    return newStudent;
}

module.exports = {
    Student,
    fetchAllStudents,
    saveStudent
};
