# استخدم Node.js 20 كـ base image
FROM node:20

# تحديد مجلد العمل داخل الـ container
WORKDIR /app

# نسخ ملفات package.json و package-lock.json (لو موجود)
COPY package*.json ./

# تثبيت جميع الـ dependencies
RUN npm install

# نسخ باقي ملفات المشروع
COPY . .

# كشف البورت 3000 للخارج
EXPOSE 3000

# تشغيل السيرفر
CMD ["npm", "start"]
