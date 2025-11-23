// controllers/searchController.js
// ไฟล์นี้เป็น Controller สำหรับจัดการ Logic ของการค้นหา

import User from '../models/User.js';

// ฟังก์ชันสำหรับค้นหาข้อมูล
export const search = async (req, res) => {
  try {
    // 1. รับคำค้นหาจาก query parameter
    // const { q } = req.query; // q = keyword ที่ต้องการค้นหา

    // 2. ตรวจสอบว่ามีคำค้นหาหรือไม่
    // if (!q) {
    //   return res.status(400).json({ message: 'กรุณาระบุคำค้นหา' });
    // }

    // 3. ค้นหาข้อมูลจากฐานข้อมูล
    // ตัวอย่าง: ค้นหา user ที่มี username หรือ email ตรงกับคำค้นหา
    // const results = await User.find({
    //   $or: [
    //     { username: { $regex: q, $options: 'i' } }, // i = case insensitive
    //     { email: { $regex: q, $options: 'i' } }
    //   ]
    // }).select('-password'); // ไม่เอา password ออกมา

    // 4. ส่งผลลัพธ์กลับไป
    // res.status(200).json({
    //   message: 'ค้นหาสำเร็จ',
    //   count: results.length,
    //   data: results
    // });

  } catch (error) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: error.message });
  }
};
