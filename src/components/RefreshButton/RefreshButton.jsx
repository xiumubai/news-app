import React from 'react';

/**
 * 刷新按钮组件
 * @param {Object} props - 组件属性
 * @param {Function} props.onRefresh - 刷新回调函数
 * @param {boolean} props.loading - 加载状态
 * @param {boolean} props.isDark - 是否为暗色模式
 * @returns {JSX.Element} 刷新按钮UI
 */
const RefreshButton = ({ onRefresh, loading = false, isDark = false }) => {
  return (
    <button 
      onClick={onRefresh}
      disabled={loading}
      className={`px-4 py-2 rounded-md flex items-center justify-center transition-all duration-300 ${loading ? (isDark ? 'bg-dark-600 cursor-not-allowed' : 'bg-primary-300 cursor-not-allowed') : (isDark ? 'bg-gradient-to-r from-secondary-600 to-secondary-500 hover:from-secondary-500 hover:to-secondary-400 text-white hover:shadow-lg hover:scale-105' : 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white hover:shadow-lg hover:scale-105')}`}
    >
      {loading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          刷新中
        </>
      ) : (
        <>
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          刷新
        </>
      )}
    </button>
  );
};

export default RefreshButton;