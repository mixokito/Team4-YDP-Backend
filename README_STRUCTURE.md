# Team4-YDP-Backend - API Documentation

## 📚 โครงสร้างโปรเจค

```
Team4-YDP-Backend/
├── controllers/          # Logic ของแต่ละ feature
│   ├── authController.js
│   └── searchController.js
├── depositories/        # เชื่อมต่อฐานข้อมูล
│   └── mongoDb.js
├── middleware/          # Middleware สำหรับตรวจสอบ authentication
│   └── authMiddleware.js
├── models/             # Schema ของข้อมูล
│   └── User.js
├── routes/             # กำหนด route ของ API
│   ├── authRoutes.js
│   └── searchRoutes.js
├── .env               # ตัวแปร environment (ห้ามอัพโหลด Git)
├── .env.example       # ตัวอย่างไฟล์ .env
├── index.js          # จุดเริ่มต้นของโปรเจค
└── package.json      # ข้อมูล dependencies
```

## 🚀 วิธีการติดตั้ง

1. ติดตั้ง dependencies:
```bash
npm install
```

2. สร้างไฟล์ `.env` และใส่ค่า environment variables:
```bash
cp .env.example .env
```

3. แก้ไขค่าใน `.env`:
- `MONGODB_URI`: URL เชื่อมต่อ MongoDB
- `JWT_SECRET`: กุญแจลับสำหรับ JWT (ควรสุ่มค่ายาวๆ)
- `PORT`: port ที่ต้องการรัน server

4. รัน server:
```bash
npm run dev
```

## 📡 API Endpoints

### Authentication

#### 1. Register (ลงทะเบียน)
- **URL**: `POST /api/auth/register`
- **Body**:
```json
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "password123"
}
```

#### 2. Login (เข้าสู่ระบบ)
- **URL**: `POST /api/auth/login`
- **Body**:
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```
- **Response**: จะได้ token กลับมาเพื่อใช้ในการเข้าถึง API อื่นๆ

#### 3. Logout (ออกจากระบบ)
- **URL**: `POST /api/auth/logout`
- **Headers**: `Authorization: Bearer YOUR_TOKEN`

### Search

#### 4. Search (ค้นหา)
- **URL**: `GET /api/search?q=keyword`
- **Headers**: `Authorization: Bearer YOUR_TOKEN`
- **Query Parameters**: 
  - `q`: คำค้นหา

## 🔧 สิ่งที่ต้องทำเพิ่มเติม

นักเรียนต้องเขียน code เติมในส่วนที่เป็น `// code here` ใน:

1. **controllers/authController.js** - เขียน logic สำหรับ register, login, logout
2. **controllers/searchController.js** - เขียน logic สำหรับค้นหาข้อมูล
3. **middleware/authMiddleware.js** - เขียนการตรวจสอบ JWT token

## 💡 คำแนะนำ

- อ่าน comment ภาษาไทยในแต่ละไฟล์เพื่อเข้าใจโครงสร้าง
- ศึกษาเพิ่มเติมเกี่ยวกับ JWT, bcrypt, mongoose
- ทดสอบ API ด้วย Postman หรือ Thunder Client
- อย่าลืมเชื่อมต่อ MongoDB ก่อนรัน server

## 📦 Dependencies ที่ใช้

- **express**: Web framework
- **mongoose**: MongoDB ODM
- **bcrypt**: เข้ารหัสรหัสผ่าน
- **jsonwebtoken**: สร้างและตรวจสอบ JWT token
- **dotenv**: จัดการ environment variables
