// routes/searchRoutes.js
// ไฟล์นี้ใช้สำหรับกำหนด route ที่เกี่ยวข้องกับการค้นหา

import express from 'express';
import * as searchController from '../controllers/searchController.js';
import * as authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Route สำหรับค้นหาแบบปกติ
// POST /api/search
router.post('/', searchController.search);

// Route สำหรับค้นหาด้วย AI
// POST /api/search/ai
router.post('/ai', searchController.aiSearch);

export default router;
