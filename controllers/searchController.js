// controllers/searchController.js
// ไฟล์นี้เป็น Controller สำหรับจัดการ Logic ของการค้นหา

import User from '../models/User.js';

// ฟังก์ชันสำหรับค้นหาข้อมูล
export const search = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ message: 'Please enter the keywords' });
    }

    const pythonServiceUrl = 'http://localhost:8000/api/v1/search';
    const apiKey = 'mer-GkI78nqrLJVTlbGDZ0C85PfAxIEIeWvoYPzZpGXEFHAx5ar7';

    const response = await fetch(pythonServiceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      return res.status(500).json({ message: 'Error from Python service' });
    }

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ message: 'เกิดข้อผิดพลาด', error: error.message });
  }
};

// ฟังก์ชันสำหรับค้นหาด้วย AI
export const aiSearch = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ message: 'กรุณากรอกข้อความที่ต้องการค้นหา' });
    }

    const pythonServiceUrl = 'http://localhost:8000/api/v1/search';
    const apiKey = 'mer-GkI78nqrLJVTlbGDZ0C85PfAxIEIeWvoYPzZpGXEFHAx5ar7';

    const response = await fetch(pythonServiceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(response.status).json({ 
        message: 'เกิดข้อผิดพลาดจาก AI Service', 
        error: errorData 
      });
    }

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    console.error('AI Search Error:', error);
    res.status(500).json({ message: 'เกิดข้อผิดพลาดในการค้นหาด้วย AI', error: error.message });
  }
};
