import axios from 'axios';

/**
 * 获取新闻数据
 * @param {string} query - 搜索关键词
 * @param {string} fromDate - 起始日期，格式：YYYY-MM-DD
 * @returns {Promise} - 返回API响应数据
 */
export const fetchNews = async (query = 'China', fromDate = '2025-07-11') => {
  try {
    // 使用本地代理API而不是直接调用NewsAPI
    // 在开发环境中使用相对路径，在生产环境中使用绝对路径
    const API_URL = import.meta.env.PROD
      ? '/api/news'
      : '/api/news';

    const response = await axios.get(API_URL, {
      params: {
        query: query,
        fromDate: fromDate
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};