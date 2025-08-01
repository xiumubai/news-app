import React, { useRef, useEffect } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import LoadingState from '../LoadingState/LoadingState';
import ErrorState from '../ErrorState/ErrorState';

/**
 * 新闻列表组件
 * @param {Object} props - 组件属性
 * @param {Array} props.news - 新闻文章列表
 * @param {boolean} props.loading - 加载状态
 * @param {string} props.error - 错误信息
 * @param {boolean} props.hasMore - 是否有更多新闻
 * @param {Function} props.loadMore - 加载更多回调
 * @param {Function} props.onRetry - 重试回调
 * @param {boolean} props.isDark - 是否为暗色模式
 * @returns {JSX.Element} 新闻列表UI
 */
const NewsList = ({ news, loading, error, hasMore, loadMore, onRetry, isDark = false }) => {
  const loaderRef = useRef(null);
  
  // 使用Intersection Observer实现上拉加载更多
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentLoader = loaderRef.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [hasMore, loading, loadMore]);

  // 初始加载状态
  if (loading && news.length === 0) {
    return <LoadingState isDark={isDark} />;
  }
  
  // 错误状态
  if (error) {
    return <ErrorState message={error} onRetry={onRetry} isDark={isDark} />;
  }
  
  // 无数据状态
  if (news.length === 0) {
    return (
      <div className="text-center py-10">
        <div className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border rounded-lg p-6 inline-block transition-colors duration-300`}>
          <svg className={`w-12 h-12 ${isDark ? 'text-gray-500' : 'text-gray-400'} mx-auto mb-4`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h3 className={`text-lg font-bold ${isDark ? 'text-gray-200' : 'text-gray-700'} mb-2`}>没有找到新闻</h3>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>请尝试其他搜索关键词</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((article, index) => (
          <NewsCard key={`${article.url}-${index}`} article={article} isDark={isDark} />
        ))}
      </div>
      
      {/* 上拉加载更多指示器 */}
      {hasMore && (
        <div 
          ref={loaderRef} 
          className="text-center py-4"
        >
          {loading && (
            <div className="flex items-center justify-center space-x-2">
              <div className={`w-4 h-4 rounded-full ${isDark ? 'bg-blue-500' : 'bg-blue-600'} animate-pulse`}></div>
              <div className={`w-4 h-4 rounded-full ${isDark ? 'bg-blue-500' : 'bg-blue-600'} animate-pulse delay-75`}></div>
              <div className={`w-4 h-4 rounded-full ${isDark ? 'bg-blue-500' : 'bg-blue-600'} animate-pulse delay-150`}></div>
              <span className={`${isDark ? 'text-gray-400' : 'text-gray-600'} ml-2`}>加载中...</span>
            </div>
          )}
          {!loading && (
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>上拉加载更多</p>
          )}
        </div>
      )}
      
      {!hasMore && news.length > 0 && (
        <div className="text-center py-4">
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>已经到底了</p>
        </div>
      )}
    </div>
  );
};

export default NewsList;