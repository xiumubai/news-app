import { useState, useEffect } from 'react';

/**
 * 主题管理Hook
 * @returns {Object} 主题状态和切换函数
 */
export const useTheme = () => {
  // 检查本地存储中是否有主题偏好设置
  const getInitialTheme = () => {
    // 首先检查本地存储
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    
    // 如果没有本地存储，检查系统偏好
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
    
    // 默认为亮色主题
    return false;
  };

  const [isDark, setIsDark] = useState(false);
  
  // 在组件挂载时初始化主题
  useEffect(() => {
    setIsDark(getInitialTheme());
  }, []);

  // 当主题状态改变时，更新文档类和本地存储
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // 切换主题的函数
  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return { isDark, toggleTheme };
};