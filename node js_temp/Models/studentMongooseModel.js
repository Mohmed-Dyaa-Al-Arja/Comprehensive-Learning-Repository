// الكود التالي كان يُستخدم لتخزين البيانات في الذاكرة أو في ملف JSON قبل التحويل إلى قاعدة بيانات MongoDB:
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

// الكود التالي كان يُستخدم لقراءة/كتابة البيانات من ملف JSON:
const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '../data/Students.json');

function fetchAllStudents(callback) {
  fs.readFile(dataPath, 'utf-8', (err, data) => {
    if (err) return callback([]);
    callback(JSON.parse(data));
  });
}

function saveStudent(student, callback) {
  fetchAllStudents((students) => {
    students.push(student);
    fs.writeFile(dataPath, JSON.stringify(students, null, 2), callback);
  });
}
*/
// سبب التعليق: تم التحويل لاستخدام قاعدة بيانات MongoDB عبر Mongoose، وأصبح النموذج يدير البيانات مباشرة مع قاعدة البيانات.

// ملف نموذج الطلاب باستخدام Mongoose
// 1) استيراد مكتبة mongoose
const mongoose = require('mongoose');

// 2) إعداد الاتصال بقاعدة البيانات
mongoose.connect("mongodb://localhost:27017/iti", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => {
    console.log("connect to Database..")
  })
  .catch((err) => {
    console.log(err)
  });

// 3) إنشاء الـ Schema الخاص بالطلاب
const studentSchema = new mongoose.Schema({
  fn: {
    type: String,
    required: true,
    minlength: 3,
    maxLength: 50,
    trim: true
  },
  ln: {
    type: String,
    required: true,
    minlength: 3,
    maxLength: 50,
    trim: true
  },
  dept: {
    type: String,
    required: true,
    default: "General"
  },
  id: {
    type: Number,
    required: true,
    unique: true
  }
});

// 4) إنشاء النموذج (Model) بناءً على المخطط
const Student = mongoose.model('Student', studentSchema);

// 5) تصدير النموذج لاستخدامه في باقي أجزاء المشروع
module.exports = Student;
