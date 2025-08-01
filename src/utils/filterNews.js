/**
 * 根据搜索关键词过滤新闻列表
 * @param {Array} newsList - 新闻文章列表
 * @param {string} searchTerm - 搜索关键词
 * @returns {Array} - 过滤后的新闻列表
 */
export const filterNewsBySearchTerm = (newsList, searchTerm) => {
  if (!searchTerm || searchTerm.trim() === '') {
    return newsList;
  }
  
  const term = searchTerm.toLowerCase().trim();
  
  return newsList.filter(article => {
    // 在标题中搜索
    if (article.title && article.title.toLowerCase().includes(term)) {
      return true;
    }
    
    // 在描述中搜索
    if (article.description && article.description.toLowerCase().includes(term)) {
      return true;
    }
    
    // 在内容中搜索
    if (article.content && article.content.toLowerCase().includes(term)) {
      return true;
    }
    
    // 在作者中搜索
    if (article.author && article.author.toLowerCase().includes(term)) {
      return true;
    }
    
    // 在来源名称中搜索
    if (article.source && article.source.name && 
        article.source.name.toLowerCase().includes(term)) {
      return true;
    }
    
    return false;
  });
};