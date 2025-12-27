// util/StudentsValidator.js

// الكود التالي كان يُستخدم للتحقق من صحة بيانات الطلاب باستخدام Ajv قبل تحديث المخطط أو التحويل إلى قاعدة بيانات:
/*
const Ajv = require('ajv');
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
module.exports = ajv.compile(schema);
*/
// سبب التعليق: تم تحديث المخطط أو التحويل إلى قاعدة بيانات، أو تم تحديث طريقة التحقق من صحة البيانات حسب متطلبات المشروع الجديدة.