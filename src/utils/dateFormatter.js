import dayjs from 'dayjs';

/**
 * 格式化日期时间
 * @param {string} dateString - ISO格式的日期字符串
 * @param {string} format - 格式化模板
 * @returns {string} - 格式化后的日期字符串
 */
export const formatDate = (dateString, format = 'YYYY-MM-DD HH:mm') => {
  if (!dateString) return '';
  return dayjs(dateString).format(format);
};

/**
 * 获取相对时间（如：3小时前，2天前）
 * @param {string} dateString - ISO格式的日期字符串
 * @returns {string} - 相对时间字符串
 */
export const getRelativeTime = (dateString) => {
  if (!dateString) return '';
  
  const now = dayjs();
  const date = dayjs(dateString);
  const diffMinutes = now.diff(date, 'minute');
  
  if (diffMinutes < 60) {
    return `${diffMinutes} 分钟前`;
  }
  
  const diffHours = now.diff(date, 'hour');
  if (diffHours < 24) {
    return `${diffHours} 小时前`;
  }
  
  const diffDays = now.diff(date, 'day');
  if (diffDays < 30) {
    return `${diffDays} 天前`;
  }
  
  return formatDate(dateString, 'YYYY-MM-DD');
};