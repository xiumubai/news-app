import React, { useState, useEffect, useRef } from 'react';

/**
 * 搜索栏组件
 * @param {Object} props - 组件属性
 * @param {Function} props.onSearch - 搜索回调函数
 * @param {string} props.initialValue - 初始搜索值
 * @param {boolean} props.isDark - 是否为暗色模式
 * @returns {JSX.Element} 搜索栏UI
 */
const SearchBar = ({ onSearch, initialValue = '', isDark = false }) => {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const searchInputRef = useRef(null);
  
  // 初始化搜索值
  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);
  
  // 处理表单提交
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };
  
  // 处理输入变化
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // 清空搜索
  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
    searchInputRef.current?.focus();
  };
  
  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="relative">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="搜索新闻..."
          className={`w-full px-4 py-2 pr-24 border ${isDark ? 'border-dark-700 bg-dark-800 text-dark-200 placeholder-dark-400' : 'border-primary-200 bg-white text-primary-800'} rounded-md focus:outline-none focus:ring-2 ${isDark ? 'focus:ring-secondary-500' : 'focus:ring-primary-500'} transition-all duration-300 ${isDark ? 'hover:border-secondary-600' : 'hover:border-primary-400'} hover:shadow-md`}
          value={searchTerm}
          onChange={handleChange}
        />
        {searchTerm && (
          <button
            type="button"
            className={`absolute right-20 top-1/2 transform -translate-y-1/2 ${isDark ? 'text-secondary-500 hover:text-secondary-300' : 'text-primary-400 hover:text-primary-600'} transition-all duration-200 hover:scale-110`}
            onClick={handleClear}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        )}
        <button
          type="submit"
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 ${isDark ? 'bg-gradient-to-r from-secondary-600 to-secondary-500 hover:from-secondary-500 hover:to-secondary-400' : 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500'} text-white rounded-md transition-all duration-300 text-sm font-medium hover:shadow-lg hover:scale-105`}
        >
          搜索
        </button>
      </div>
    </form>
  );
};

export default SearchBar;