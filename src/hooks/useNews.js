import { useState, useEffect, useCallback } from 'react';
import { fetchNews } from '../api/newsApi';
import { filterNewsBySearchTerm } from '../utils/filterNews';

/**
 * 新闻数据获取和管理的自定义Hook
 * @param {string} initialQuery - 初始搜索关键词
 * @returns {Object} - 包含新闻数据和相关状态、方法的对象
 */
export const useNews = (initialQuery = 'China') => {
  // 原始新闻数据
  const [news, setNews] = useState([]);
  // 加载状态
  const [loading, setLoading] = useState(true);
  // 错误状态
  const [error, setError] = useState(null);
  // 搜索关键词
  const [query, setQuery] = useState(initialQuery);
  // 搜索词（前端过滤用）
  const [searchTerm, setSearchTerm] = useState('');
  // 过滤后的新闻数据
  const [filteredNews, setFilteredNews] = useState([]);
  // 分页相关状态
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 10; // 每页显示的新闻数量

  // 加载新闻数据
  const loadNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchNews(query);
      setNews(data.articles || []);
      setFilteredNews(data.articles || []);
      setHasMore((data.articles || []).length > pageSize);
    } catch (err) {
      setError(err.message || '获取新闻数据失败');
    } finally {
      setLoading(false);
    }
  }, [query, pageSize]);

  // 初始加载数据
  useEffect(() => {
    loadNews();
  }, [loadNews]);

  // 根据搜索词过滤新闻
  useEffect(() => {
    const filtered = filterNewsBySearchTerm(news, searchTerm);
    setFilteredNews(filtered);
    setHasMore(filtered.length > page * pageSize);
  }, [searchTerm, news, page, pageSize]);

  // 加载更多新闻
  const loadMore = useCallback(() => {
    if (filteredNews.length > page * pageSize) {
      setPage(prevPage => prevPage + 1);
    } else {
      setHasMore(false);
    }
  }, [filteredNews.length, page, pageSize]);

  // 刷新新闻数据
  const refreshNews = useCallback(() => {
    setPage(1);
    loadNews();
  }, [loadNews]);

  // 更改搜索关键词
  const changeQuery = useCallback((newQuery) => {
    setQuery(newQuery);
    setPage(1);
  }, []);

  // 获取当前页的新闻
  const getCurrentPageNews = useCallback(() => {
    return filteredNews.slice(0, page * pageSize);
  }, [filteredNews, page, pageSize]);

  return {
    news: getCurrentPageNews(),
    allNews: filteredNews,
    loading,
    error,
    hasMore,
    refreshNews,
    loadMore,
    setSearchTerm,
    searchTerm,
    changeQuery,
    query
  };
};