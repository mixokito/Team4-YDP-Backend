// middleware/authMiddleware.js
// ไฟล์นี้เป็น Middleware สำหรับตรวจสอบ JWT token

import jwt from 'jsonwebtoken';

// Middleware สำหรับตรวจสอบ token
export const verifyToken = (req, res, next) => {
  try {
    // 1. รับ token จาก header
    // const token = req.headers.authorization?.split(' ')[1]; // Format: "Bearer TOKEN"
    // หรือ const token = req.headers['authorization']?.split(' ')[1];
    const token = req.headers.authorization?.split(' ')[1];

    // 2. ตรวจสอบว่ามี token หรือไม่
    // if (!token) {
    //   return res.status(401).json({ message: 'ไม่พบ token กรุณา login' });
    // }
    if (!token) {
      return res.status(401).json({ message: 'Token not found. Please log in.' });
    }

    // 3. ตรวจสอบความถูกต้องของ token
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const decoded = jwt.verify(token, 'ydp-team-4'); 

    // 4. เก็บข้อมูล user ไว้ใน request เพื่อใช้ใน controller
    // req.user = decoded; // decoded = { userId, email, iat, exp }
    req.user = decoded;

    // 5. ไปต่อที่ controller ถัดไป
    // next();
    next();

  } catch (error) {
    // จัดการ error เช่น token หมดอายุ หรือ token ไม่ถูกต้อง
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token ไม่ถูกต้อง' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token หมดอายุ' });
    }
    return res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: error.message });
  }
};

// Middleware เพิ่มเติม (ถ้าต้องการ)
// exports.checkRole = (roles) => {
//   return (req, res, next) => {
//     // ตรวจสอบ role ของผู้ใช้
//     // code here
//   };
// };
