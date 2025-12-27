const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Middleware لقراءة البيانات من الـ Request
app.use(express.urlencoded({ extended: true })); // لقراءة بيانات الـ Form
app.use(express.json()); // لقراءة بيانات الـ JSON

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

// Middleware لتقديم الملفات الثابتة من مجلد public على مسار /assets
app.use('/assets', express.static(path.join(__dirname, 'public')));

// Route 1: الصفحة الرئيسية
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Route 2: جلب كل الطلاب
app.get("/api/students", (req, res) => {
    res.json(Students);
});

// Route 3: جلب طالب محدد بالـ ID
app.get("/api/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const student = Students.find((val) => val.id === id);
    if (student) {
        res.json(student);
    } else {
        res.status(404).send("student not found");
    }
});

// Route 4: إضافة طالب جديد
app.post("/api/students", (req, res) => {
    const newStudent = req.body;
    newStudent.id = Students.length + 1;
    Students.push(newStudent);
    res.json(newStudent);
});

// Route 5: تحديث بيانات طالب موجود
app.put("/api/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    let idx = Students.findIndex((val) => val.id === id);
    if (idx !== -1) {
        for (let key in req.body) {
            Students[idx][key] = req.body[key];
        }
        res.json(Students[idx]);
    } else {
        res.status(404).send("student not found");
    }
});

// Route 6: حذف طالب
app.delete("/api/students/:id", (req, res) => {
    const id = parseInt(req.params.id);
    let idx = Students.findIndex((val) => val.id === id);
    if (idx !== -1) {
        let deletedstd = Students.splice(idx, 1);
        res.send({
            message: "student deleted successfully",
            student: deletedstd[0]
        });
    } else {
        res.status(404).send("student not found");
    }
});

// تشغيل السيرفر
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
