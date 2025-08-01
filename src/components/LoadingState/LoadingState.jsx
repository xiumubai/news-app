import React from 'react';

/**
 * 加载状态组件
 * @param {Object} props - 组件属性
 * @param {boolean} props.isDark - 是否为暗色模式
 * @returns {JSX.Element} 加载状态UI
 */
const LoadingState = ({ isDark = false }) => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${isDark ? 'border-blue-400' : 'border-blue-500'} transition-colors duration-300`}></div>
      <span className={`ml-3 ${isDark ? 'text-gray-400' : 'text-gray-600'} transition-colors duration-300`}>加载中...</span>
    </div>
  );
};

export default LoadingState;