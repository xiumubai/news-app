const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// 启用CORS
app.use(cors());

// 代理NewsAPI请求
app.get('/api/news', async (req, res) => {
  try {
    // 从请求中获取查询参数
    const { query, fromDate } = req.query;
    
    // 从环境变量获取API密钥
    const API_KEY = process.env.VITE_NEWS_API_KEY || '9c0d54b6229243559ab9982dc4c1eaab';
    const BASE_URL = 'https://newsapi.org/v2/everything';
    
    // 调用NewsAPI
    const response = await axios.get(BASE_URL, {
      params: {
        q: query || 'China',
        from: fromDate || '2025-07-11',
        sortBy: 'publishedAt',
        apiKey: API_KEY
      }
    });
    
    // 返回API响应数据
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('代理API请求失败:', error.response?.data || error.message);
    
    // 返回错误信息
    return res.status(error.response?.status || 500).json({
      error: '获取新闻数据失败',
      details: error.response?.data || error.message
    });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`本地开发服务器运行在: http://localhost:${PORT}`);
});