// التعامل مع الوعود المرفوضة غير المعالجة (unhandled promise rejections)
process.on('unhandledRejection', (reason, promise) => {
    console.error('تم رفض وعد غير معالج:', reason);
    // من الأفضل إنهاء العملية وإعادة تشغيلها تلقائيًا في بيئة الإنتاج
    process.exit(1);
});
// التعامل مع الاستثناءات غير المعالجة خارج Express middleware
process.on('uncaughtException', (err) => {
    console.error('حدث استثناء غير معالج:', err);
    // يمكن هنا تسجيل الخطأ أو إرسال إشعار، أو حتى إنهاء التطبيق إذا كان ذلك مناسبًا
});
// استيراد middleware الخاص بالأخطاء
const errorMiddleware = require('./middlewares/errorMiddleware');
// ...existing code...
// إضافة middleware الخاص بالأخطاء في النهاية
app.use(errorMiddleware);
// app.js الرئيسي لمشروع Express

const path = require("path");
const express = require("express");
const app = express();
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

// ربط Mongoose وإنشاء الاتصال بقاعدة البيانات
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/schoolDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
});
mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());

// ملفات ثابتة
app.use("/assets", express.static(path.join(__dirname, '../public')));


// استيراد جميع المسارات (routes)
const studentsRouter = require("./routes/Students");
const teachersRouter = require("./routes/Teachers");
const coursesRouter = require("./routes/Courses");
const usersRouter = require("./routes/Users"); // إضافة مسار المستخدمين
const AuthRouter = require('./routes/Auth'); // إضافة مسار المصادقة الجديد
const adminRouter = require('./routes/admin'); // إضافة مسار الإدارة
const logging = require('./middlewares/logging');

// ميدل وير عام (مثال)

app.use("/api/logging", logging);
app.use("/api/students", studentsRouter);
app.use("/api/teachers", teachersRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/users", usersRouter); // تفعيل مسار المستخدمين
app.use("/api/login", AuthRouter); // تفعيل مسار تسجيل الدخول الجديد
app.use('/api/admin', adminRouter); // ربط مسارات الإدارة

// # تم عمل هاش لأي كود قديم خاص بتسجيل الدخول هنا لأنه تم نقله إلى Auth.js
// app.post('/api/login', ... )
// ...

// صفحة رئيسية بسيطة
app.get("/", (req, res) => {
    res.send("API Home - Project Structure Example. جميع البيانات تُدار الآن عبر قاعدة بيانات MongoDB باستخدام Mongoose.");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
