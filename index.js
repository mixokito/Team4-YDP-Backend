import express from 'express';

// นำเข้า routes
import authRoutes from './routes/authRoutes.js';
import searchRoutes from './routes/searchRoutes.js';
import User from './models/User.js';

const app = express()
const port = 3000

// Middleware
app.use(express.json())

app.get('/', (req, res) => {
  res.send('team 4 backend')
})

app.post('/post', (req, res) => {
  res.send('POST request to the homepage')
  console.log(req.body)
  console.log(req.body.title)
})

// เชื่อมต่อ Routes
// Route สำหรับ Authentication (register, login, logout)
app.use('/api/auth', authRoutes);

// Route สำหรับ Search
app.use('/api/search', searchRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})