@echo off
REM تحديد مسار Node.js اللي جاي من nvm
SET PATH=C:\Users\user\AppData\Roaming\nvm\v20.19.5;%PATH%

REM تحديد مسار ملف Jupyter Notebook
SET NOTEBOOK_PATH="D:\mohamed_dyaa\backend\node_js.ipynb"

REM فتح Jupyter Lab مباشرة على الملف ده
jupyter lab %NOTEBOOK_PATH%

REM بعد إغلاق Jupyter Lab، إنشاء نسخة احتياطية (اختياري)
echo Creating backup copy...
copy %NOTEBOOK_PATH% "%~dp0backup_%date:~-4,4%-%date:~-7,2%-%date:~-10,2%.ipynb" >nul
