// models/User.js
// ไฟล์นี้เป็น Model สำหรับกำหนดโครงสร้างของข้อมูลผู้ใช้ในฐานข้อมูล

import mongoose from 'mongoose';

// กำหนด Schema สำหรับ User
const userSchema = new mongoose.Schema({
  // ชื่อผู้ใช้
  username: {
    type: String,
    required: [true, 'กรุณาระบุชื่อผู้ใช้'],
    unique: true,
    trim: true,
    minlength: [3, 'ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร']
  },

  firstname: {
    type: String,
    required: [true, 'กรุณาระบุชื่อผู้ใช้'],
    trim: true,
    minlength: [3, 'ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร'],
    maxlength: [30, 'ชื่อผู้ใช้ต้องมีไม่เกิน 30 ตัวอักษร']
  },

  lastname: {
    type: String,
    required: [true, 'กรุณาระบุชื่อผู้ใช้'],
    trim: true,
    minlength: [3, 'ชื่อผู้ใช้ต้องมีอย่างน้อย 3 ตัวอักษร'],
    maxlength: [30, 'ชื่อผู้ใช้ต้องมีไม่เกิน 30 ตัวอักษร']
  },

  // อีเมล
  email: {
    type: String,
    required: [true, 'กรุณาระบุอีเมล'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'กรุณาระบุอีเมลที่ถูกต้อง']
  },

  // รหัสผ่าน (ต้องเข้ารหัสก่อนบันทึก)
  password: {
    type: String,
    required: [true, 'กรุณาระบุรหัสผ่าน'],
    minlength: [6, 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร']
  },

  // ข้อมูลเพิ่มเติม (ถ้ามี)
  // profile: {
  //   firstName: String,
  //   lastName: String,
  //   phoneNumber: String
  // },

  // วันที่สร้าง
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// สร้าง Model จาก Schema
const connection = mongoose.createConnection('mongodb+srv://team4:team4ydp@pemika.hzqduzq.mongodb.net/ydp-team4?appName=Pemika');
const User = connection.model('User', userSchema);

export default User;