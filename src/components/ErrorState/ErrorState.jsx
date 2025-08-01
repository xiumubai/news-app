import React from 'react';

/**
 * 错误状态组件
 * @param {Object} props - 组件属性
 * @param {string} props.message - 错误信息
 * @param {Function} props.onRetry - 重试回调函数
 * @param {boolean} props.isDark - 是否为暗色模式
 * @returns {JSX.Element} 错误状态UI
 */
const ErrorState = ({ message = '出错了', onRetry, isDark = false }) => {
  return (
    <div className="text-center py-10">
      <div className={`${isDark ? 'bg-red-900/30 border-red-800' : 'bg-red-50 border-red-200'} border rounded-lg p-6 inline-block transition-colors duration-300`}>
        <svg className={`w-12 h-12 ${isDark ? 'text-red-400' : 'text-red-500'} mx-auto mb-4`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h3 className={`text-lg font-bold ${isDark ? 'text-red-300' : 'text-red-700'} mb-2`}>加载失败</h3>
        <p className={`${isDark ? 'text-red-400' : 'text-red-600'} mb-4`}>{message}</p>
        {onRetry && (
          <button 
            onClick={onRetry}
            className={`px-4 py-2 ${isDark ? 'bg-red-500 hover:bg-red-400' : 'bg-red-600 hover:bg-red-700'} text-white rounded-md transition-colors duration-300`}
          >
            重试
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;