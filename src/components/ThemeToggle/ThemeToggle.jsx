import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

/**
 * 主题切换组件
 * @param {Object} props - 组件属性
 * @param {boolean} props.isDark - 是否为暗色主题
 * @param {Function} props.toggleTheme - 切换主题的函数
 * @returns {JSX.Element} 主题切换按钮
 */
const ThemeToggle = ({ isDark, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className={`p-1 md:p-2 rounded-md flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
        isDark 
          ? 'bg-gradient-to-r from-secondary-800 to-secondary-700 text-accent-300 hover:from-secondary-700 hover:to-secondary-600 shadow-lg shadow-secondary-900/30' 
          : 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:from-primary-400 hover:to-secondary-400 shadow-lg shadow-primary-500/30'
      }`}
      aria-label={isDark ? '切换到亮色模式' : '切换到暗色模式'}
      title={isDark ? '切换到亮色模式' : '切换到暗色模式'}
    >
      {isDark ? (
        <FaSun size={18} className="transition-transform duration-300 hover:rotate-45 animate-pulse" />
      ) : (
        <FaMoon size={18} className="transition-transform duration-300 hover:rotate-12" />
      )}
    </button>
  );
};

export default ThemeToggle;