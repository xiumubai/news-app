import axios from 'axios';

export default async function handler(req, res) {
  // 设置CORS头，允许前端访问
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // 处理OPTIONS请求（预检请求）
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 只允许GET请求
  if (req.method !== 'GET') {
    return res.status(405).json({ error: '只允许GET请求' });
  }

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
}