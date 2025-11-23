// routes/authRoutes.js
// ไฟล์นี้ใช้สำหรับกำหนด route ทั้งหมดที่เกี่ยวข้องกับการ Authentication

import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

// Route สำหรับลงทะเบียนผู้ใช้ใหม่
// POST /api/auth/register
router.post('/register', authController.register);

// Route สำหรับเข้าสู่ระบบ
// POST /api/auth/login
router.post('/login', authController.login);

// Route สำหรับออกจากระบบ
// POST /api/auth/logout
router.post('/logout', authController.logout);

export default router;
