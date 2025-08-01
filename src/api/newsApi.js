import axios from 'axios';

const API_KEY = import.meta.env.VITE_NEWS_API_KEY || '9c0d54b6229243559ab9982dc4c1eaab';
const BASE_URL = 'https://newsapi.org/v2/everything';

/**
 * 获取新闻数据
 * @param {string} query - 搜索关键词
 * @param {string} fromDate - 起始日期，格式：YYYY-MM-DD
 * @returns {Promise} - 返回API响应数据
 */
export const fetchNews = async (query = 'China', fromDate = '2025-07-11') => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: query,
        from: fromDate,
        sortBy: 'publishedAt',
        apiKey: API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};