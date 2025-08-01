import React, { useState } from 'react';
import { formatDate, getRelativeTime } from '../../utils/dateFormatter';

/**
 * 新闻卡片组件
 * @param {Object} props - 组件属性
 * @param {Object} props.article - 新闻文章数据
 * @param {boolean} props.isDark - 是否为暗色模式
 * @returns {JSX.Element} 新闻卡片UI
 */
const NewsCard = ({ article, isDark = false }) => {
  const { title, urlToImage, source, publishedAt, description, url, author } = article;
  
  // 图片加载状态
  const [imageLoading, setImageLoading] = useState(true);
  
  // 格式化日期
  const formattedDate = formatDate(publishedAt);
  const relativeTime = getRelativeTime(publishedAt);
  
  // 点击卡片打开原始链接
  const handleClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };
  
  // 图片加载完成处理
  const handleImageLoad = () => {
    setImageLoading(false);
  };
  
  // 图片加载错误处理
  const handleImageError = (e) => {
    setImageLoading(false);
    e.target.onerror = null;
    e.target.src = '/default-news.svg';
  };
  
  return (
    <div 
      className={`${isDark ? 'bg-dark-800 border border-dark-700' : 'bg-white border border-primary-100'} rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-[1.02] hover:translate-y-[-4px] ${isDark ? 'hover:shadow-secondary-900/20' : 'hover:shadow-primary-500/20'}`}
      onClick={handleClick}
    >
      <div className="h-48 overflow-hidden relative">
        {/* 加载状态指示器 */}
        {imageLoading && (
          <div className={`absolute inset-0 flex items-center justify-center ${isDark ? 'bg-dark-700' : 'bg-primary-50'}`}>
            <div className="flex items-center justify-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-secondary-500' : 'bg-primary-500'} animate-pulse`}></div>
              <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-secondary-500' : 'bg-primary-500'} animate-pulse delay-75`}></div>
              <div className={`w-3 h-3 rounded-full ${isDark ? 'bg-secondary-500' : 'bg-primary-500'} animate-pulse delay-150`}></div>
            </div>
          </div>
        )}
        <img 
          src={urlToImage || '/default-news.svg'} 
          alt={title} 
          className="w-full h-full object-cover"
          onLoad={handleImageLoad}
          onError={handleImageError}
          style={{ opacity: imageLoading ? 0 : 1, transition: 'opacity 0.3s ease-in-out' }}
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className={`text-sm font-medium px-2 py-1 rounded-full ${isDark ? 'bg-secondary-900/50 text-secondary-300' : 'bg-primary-100 text-primary-700'}`}>{source?.name || '未知来源'}</span>
          <span className={`text-xs ${isDark ? 'text-dark-400' : 'text-primary-500'}`} title={formattedDate}>{relativeTime}</span>
        </div>
        <h3 className={`text-lg font-bold mb-2 line-clamp-2 ${isDark ? 'text-primary-100' : 'text-primary-900'} hover:text-accent-500 transition-colors duration-300`}>{title}</h3>
        {description && (
          <p className={`text-sm line-clamp-3 mb-2 ${isDark ? 'text-dark-300' : 'text-primary-700'}`}>{description}</p>
        )}
        {author && (
          <div className={`text-xs ${isDark ? 'text-secondary-400' : 'text-secondary-600'} mt-2 italic`}>作者: {author}</div>
        )}
      </div>
    </div>
  );
};

export default NewsCard;