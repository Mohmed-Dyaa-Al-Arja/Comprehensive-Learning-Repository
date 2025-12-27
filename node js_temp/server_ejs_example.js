// server_ejs_example.js
// Express server with EJS, Helmet, cookie-parser, and data validation

const path = require("path");
const express = require("express");
const app = express();
const Ajv = require('ajv'); // للتحقق من صحة البيانات
const cookieParser = require('cookie-parser'); // لتحليل الكوكيز
const helmet = require('helmet'); // لتحسين أمان التطبيق

// إعداد EJS كمحرك قوالب
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// إعداد مخطط التحقق من البيانات
const schema = {
    type: 'object',
    properties: {
        name: { type: 'string', minLength: 3, maxLength: 30, pattern: "^[A-Za-z]+$" },
        dept: { type: 'string', enum: ["PD", "SA", "MD", "SAP", "EB", "GD", "GA"], minLength: 2, maxLength: 3 }
    },
    required: ["name", "dept"],
    maxProperties: 2,
    minProperties: 2
};
const ajv = new Ajv();
const validator = ajv.compile(schema);

// built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

// custom middleware (مثال على تسجيل الطلبات)
app.use((req, res, next) => {
    // console.log(`${req.method} ${req.url}`);
    next();
});

// static files
app.use("/assets", express.static(path.join(__dirname, 'public')));

// تم هاش الكود التالي لأنه كان يعتمد على مصفوفة داخلية،
// الآن كل البيانات تُدار عبر الموديل وملف Students.json فقط.
/*
const Students = [
    { name: 'Ali', dept: 'PD', id: 1 },
    { name: 'Nour', dept: 'SA', id: 2 },
    { name: 'Mona', dept: 'MD', id: 3 },
    { name: 'Sara', dept: 'SAP', id: 4 },
    { name: 'Mostafa', dept: 'EB', id: 5 },
    { name: 'Ahmed', dept: 'GD', id: 6 },
    { name: 'Noha', dept: 'GA', id: 7 },
];
*/

// صفحة الطلاب (تعرض بيانات الطلاب باستخدام EJS)
app.get("/api/students", (req, res) => {
    res.set("access-control-allow-origin", "*");
    res.render("students.ejs", { std: Students });
});

// إضافة طالب جديد (مع تحقق من صحة البيانات)
app.post("/api/students", (req, res) => {
    const valid = validator(req.body);
    if (!valid) {
        return res.status(400).json({ errors: validator.errors });
    }
    const newStudent = req.body;
    newStudent.id = Students.length + 1;
    Students.push(newStudent);
    res.redirect("/api/students");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// ملاحظات:
// - يجب إنشاء مجلد باسم views في نفس مجلد هذا الملف، ووضع ملف students.ejs بداخله.
// - يجب إنشاء مجلد public للملفات الثابتة (css, js, img...)
// - لتشغيل السيرفر: node server_ejs_example.js
// - لعرض الطلاب: http://localhost:3000/api/students
// - لإضافة طالب: أرسل POST إلى /api/students مع بيانات name و dept
