// controllers/authController.js
// ไฟล์นี้เป็น Controller สำหรับจัดการ Logic ของ Authentication

import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// ฟังก์ชันสำหรับลงทะเบียนผู้ใช้ใหม่
export const register = async (req, res) => {
  try {
    // 1. รับข้อมูลจาก request body (username, email, password)
    // const { username, email, password } = req.body;
    const { username, firstname, lastname, email, password } = req.body;

    // 2. ตรวจสอบว่ามีข้อมูลครบถ้วนหรือไม่
    if (!username || !firstname || !lastname || !email || !password) {
      return res.status(400).json({ message: 'Please enter all fields' });
    }

    // 3. ตรวจสอบว่า email หรือ username ซ้ำในระบบหรือไม่
    const existingUser = await User.findOne({ $or: [{ email: email }, { username: username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Email or username already exists' });
    }

    // 4. เข้ารหัส password ด้วย bcrypt
    // const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5. สร้างผู้ใช้ใหม่ในฐานข้อมูล
    // const newUser = new User({ ... });
    // await newUser.save();
    const newUser = await User.create({
      username,
      firstname,
      lastname,
      email,
      password: hashedPassword
    });

    // 6. ส่ง response กลับไปว่าสำเร็จ
    // res.status(201).json({ message: 'ลงทะเบียนสำเร็จ' });
    return res.status(201).json({ message: 'Register Success' });

  } catch (error) {
    // จัดการ error
    res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: error.message });
  }
};

// ฟังก์ชันสำหรับเข้าสู่ระบบ
export const login = async (req, res) => {
  try {
    // 1. รับข้อมูล email และ password จาก request body
    // const { email, password } = req.body;
    const { username, password } = req.body;

    // 2. ตรวจสอบว่ามีข้อมูลครบถ้วนหรือไม่
    if (!username || !password) {
      return res.status(400).json({ message: 'Please enter username and password' });
    }

    // 3. หาผู้ใช้จากฐานข้อมูลด้วย email
    const usernameCheck = await User.findOne({ "username": username });
    if (usernameCheck === null) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // 5. ตรวจสอบ password ว่าถูกต้องหรือไม่
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = await bcrypt.compare(password, usernameCheck.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid username or password' });
    }

    // 6. สร้าง JWT token
    // const token = jwt.sign(
    //   { userId: user._id, email: user.email },
    //   process.env.JWT_SECRET,
    //   { expiresIn: '24h' }
    // );
    const token = jwt.sign(
      { userId: usernameCheck._id, username: usernameCheck.username, email: usernameCheck.email },
      'ydp-team-4',
      { expiresIn: '30m' }
    );

    // 7. ส่ง token กลับไปให้ client
    // res.status(200).json({
    //   message: 'เข้าสู่ระบบสำเร็จ',
    //   token: token,
    //   user: { id: user._id, username: user.username, email: user.email }
    // });
    res.status(200).json({
      message: 'Login Success',
      token: token,
      user: { id: usernameCheck._id, username: usernameCheck.username, email: usernameCheck.email }
    });

  } catch (error) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: error.message });
  }
};

// ฟังก์ชันสำหรับออกจากระบบ
export const logout = async (req, res) => {
  try {
    // สำหรับ JWT token การ logout จะทำที่ฝั่ง client โดยการลบ token
    // แต่ถ้าต้องการให้เซิร์ฟเวอร์จัดการ สามารถ:

    // 2. ส่ง response กลับไปว่า logout สำเร็จ
    res.status(200).json({ message: 'ออกจากระบบสำเร็จ' });

  } catch (error) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: error.message });
  }
};
