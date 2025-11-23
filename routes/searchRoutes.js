// routes/searchRoutes.js
// ไฟล์นี้ใช้สำหรับกำหนด route ที่เกี่ยวข้องกับการค้นหา

import express from 'express';
import * as searchController from '../controllers/searchController.js';
import * as authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Route สำหรับค้นหา (ต้อง login ก่อน)
// GET /api/search?q=keyword
router.get('/', authMiddleware.verifyToken, searchController.search);

export default router;
