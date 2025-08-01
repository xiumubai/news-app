import React, { useState, useEffect } from 'react';
import { useNews } from './hooks/useNews';
import { useTheme } from './hooks/useTheme';
import NewsList from './components/NewsList/NewsList';
import SearchBar from './components/SearchBar/SearchBar';
import RefreshButton from './components/RefreshButton/RefreshButton';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import {
  FaHome,
  FaBars,
  FaArrowUp,
  FaNewspaper,
  FaFire,
  FaChartLine,
  FaGlobe,
  FaLightbulb,
} from 'react-icons/fa';

/**
 * 主应用组件
 * @returns {JSX.Element} 应用UI
 */
function App() {
  // 使用自定义Hook获取新闻数据
  const {
    news,
    loading,
    error,
    refreshNews,
    setSearchTerm,
    searchTerm,
    hasMore,
    loadMore,
  } = useNews();

  // 使用主题Hook
  const { isDark, toggleTheme } = useTheme();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // 监听滚动事件，控制返回顶部按钮的显示
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // 返回顶部功能
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`min-h-screen ${
        isDark ? 'bg-dark-900' : 'bg-primary-50'
      } transition-colors duration-300`}
    >
      {/* 头部 */}
      <header
        className={`${
          isDark
            ? 'bg-gradient-to-r from-dark-900 to-secondary-900'
            : 'bg-gradient-to-r from-primary-700 to-secondary-600'
        } text-white py-2 md:py-4 sticky top-0 z-10 shadow-lg transition-colors duration-300`}
      >
        <div className="container mx-auto px-3 md:px-4">
          <div className="flex justify-between items-center h-8 md:h-10">
            <div className="flex items-center space-x-1 md:space-x-2 group">
              <img
                src="/news-icon.svg"
                alt="Logo"
                className="w-6 h-6 md:w-8 md:h-8 text-white transition-all duration-300 transform group-hover:rotate-12 group-hover:scale-110"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
              <h1 className="text-lg md:text-2xl lg:text-3xl font-bold transition-all duration-300 group-hover:text-accent-300">
                AI新闻浏览器
              </h1>
            </div>

            {/* 移动端菜单按钮 */}
            <button
              className="md:hidden text-white focus:outline-none transition-all duration-300 transform p-1 rounded-md hover:bg-primary-600/30 flex items-center justify-center"
              style={{
                backgroundColor: menuOpen
                  ? isDark
                    ? 'rgba(79, 70, 229, 0.3)'
                    : 'rgba(14, 165, 233, 0.3)'
                  : 'transparent',
                transform: menuOpen ? 'scale(1.1)' : 'scale(1)',
                height: '28px',
                width: '28px',
              }}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label="切换导航菜单"
            >
              <FaBars
                size={20}
                style={{
                  transform: menuOpen ? 'rotate(90deg)' : 'rotate(0deg)',
                  transition: 'transform 0.3s ease',
                }}
              />
            </button>

            {/* 桌面端导航 */}
            <nav className="hidden md:flex space-x-6 items-center">
              <a
                href="#"
                className="flex items-center space-x-1 hover:text-accent-300 transition-all duration-300 hover:scale-110 hover:translate-y-[-2px] px-2 py-1 rounded-md hover:bg-primary-600/30"
              >
                <FaHome className="transform transition-transform duration-300 group-hover:rotate-12" />
                <span>首页</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-1 hover:text-accent-300 transition-all duration-300 hover:scale-110 hover:translate-y-[-2px] px-2 py-1 rounded-md hover:bg-primary-600/30"
              >
                <FaNewspaper className="transform transition-transform duration-300 group-hover:rotate-12" />
                <span>最新资讯</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-1 hover:text-accent-300 transition-all duration-300 hover:scale-110 hover:translate-y-[-2px] px-2 py-1 rounded-md hover:bg-primary-600/30"
              >
                <FaFire className="transform transition-transform duration-300 group-hover:rotate-12" />
                <span>热门话题</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-1 hover:text-accent-300 transition-all duration-300 hover:scale-110 hover:translate-y-[-2px] px-2 py-1 rounded-md hover:bg-primary-600/30"
              >
                <FaChartLine className="transform transition-transform duration-300 group-hover:rotate-12" />
                <span>AI趋势</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-1 hover:text-accent-300 transition-all duration-300 hover:scale-110 hover:translate-y-[-2px] px-2 py-1 rounded-md hover:bg-primary-600/30"
              >
                <FaGlobe className="transform transition-transform duration-300 group-hover:rotate-12" />
                <span>国际视野</span>
              </a>
              <a
                href="#"
                className="flex items-center space-x-1 hover:text-accent-300 transition-all duration-300 hover:scale-110 hover:translate-y-[-2px] px-2 py-1 rounded-md hover:bg-primary-600/30"
              >
                <FaLightbulb className="transform transition-transform duration-300 group-hover:rotate-12" />
                <span>创新应用</span>
              </a>
              <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
            </nav>
          </div>

          {/* 移动端菜单 - Drawer侧边栏 */}
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden transition-all duration-300 ease-in-out ${
              menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setMenuOpen(false)}
          >
            <div
              className={`fixed top-0 right-0 h-full w-[80%] max-w-xs overflow-y-auto transition-transform duration-300 ease-in-out ${
                isDark ? 'bg-dark-800' : 'bg-primary-50'
              } shadow-xl ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`flex justify-between items-center p-4 border-b ${
                  isDark ? 'border-dark-700' : 'border-primary-200'
                }`}
              >
                <h2
                  className={`text-lg font-medium ${
                    isDark ? 'text-white' : 'text-primary-900'
                  }`}
                >
                  菜单
                </h2>
                <button
                  onClick={() => setMenuOpen(false)}
                  className={`p-1 rounded-full ${
                    isDark
                      ? 'text-dark-400 hover:text-white hover:bg-secondary-800'
                      : 'text-primary-500 hover:text-primary-800 hover:bg-primary-200'
                  }`}
                  aria-label="关闭菜单"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <nav className="flex flex-col px-4">
                <a
                  href="#"
                  className={`flex items-center space-x-3 text-base ${
                    isDark ? 'text-dark-200' : 'text-primary-800'
                  } py-3 border-b ${
                    isDark ? 'border-dark-700' : 'border-primary-200'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  <FaHome size={18} className="ml-1" />
                  <span>首页</span>
                </a>
                <a
                  href="#"
                  className={`flex items-center space-x-3 text-base ${
                    isDark ? 'text-dark-200' : 'text-primary-800'
                  } py-3 border-b ${
                    isDark ? 'border-dark-700' : 'border-primary-200'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  <FaNewspaper size={18} className="ml-1 text-secondary-500" />
                  <span>最新资讯</span>
                </a>
                <a
                  href="#"
                  className={`flex items-center space-x-3 text-base ${
                    isDark ? 'text-dark-200' : 'text-primary-800'
                  } py-3 border-b ${
                    isDark ? 'border-dark-700' : 'border-primary-200'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  <FaFire size={18} className="ml-1 text-accent-500" />
                  <span>热门话题</span>
                </a>
                <a
                  href="#"
                  className={`flex items-center space-x-3 text-base ${
                    isDark ? 'text-dark-200' : 'text-primary-800'
                  } py-3 border-b ${
                    isDark ? 'border-dark-700' : 'border-primary-200'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  <FaChartLine size={18} className="ml-1 text-primary-500" />
                  <span>AI趋势</span>
                </a>
                <a
                  href="#"
                  className={`flex items-center space-x-3 text-base ${
                    isDark ? 'text-dark-200' : 'text-primary-800'
                  } py-3 border-b ${
                    isDark ? 'border-dark-700' : 'border-primary-200'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  <FaGlobe size={18} className="ml-1 text-secondary-600" />
                  <span>国际视野</span>
                </a>
                <a
                  href="#"
                  className={`flex items-center space-x-3 text-base ${
                    isDark ? 'text-dark-200' : 'text-primary-800'
                  } py-3 border-b ${
                    isDark ? 'border-dark-700' : 'border-primary-200'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  <FaLightbulb size={18} className="ml-1 text-accent-600" />
                  <span>创新应用</span>
                </a>
                <div
                  className={`flex items-center justify-between text-base py-3 border-b ${
                    isDark ? 'border-dark-700' : 'border-primary-200'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="ml-1">{isDark ? '🌙' : '☀️'}</span>
                    <span
                      className={isDark ? 'text-dark-200' : 'text-primary-800'}
                    >
                      切换主题
                    </span>
                  </div>
                  <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2
            className={`text-xl font-bold ${
              isDark ? 'text-primary-100' : 'text-primary-900'
            }`}
          >
            最新AI新闻
          </h2>
          <RefreshButton
            onRefresh={refreshNews}
            loading={loading && news.length > 0}
            isDark={isDark}
          />
        </div>

        <SearchBar
          onSearch={setSearchTerm}
          initialValue={searchTerm}
          isDark={isDark}
        />

        <NewsList
          news={news}
          loading={loading}
          error={error}
          hasMore={hasMore}
          loadMore={loadMore}
          onRetry={refreshNews}
          isDark={isDark}
        />
      </main>

      {/* 页脚 */}
      <footer
        className={`${
          isDark
            ? 'bg-gradient-to-r from-dark-900 to-secondary-900'
            : 'bg-gradient-to-r from-primary-800 to-secondary-800'
        } text-white py-6 mt-8 transition-colors duration-300 shadow-lg`}
      >
        <div className="container mx-auto px-4 text-center">
          <p className="hover:text-accent-300 transition-all duration-300 transform hover:scale-105 inline-block font-medium">
            © {new Date().getFullYear()} AI新闻探索者 | 高端资讯平台.
            保留所有权利.
          </p>
          <p
            className={`${
              isDark ? 'text-secondary-400' : 'text-primary-300'
            } text-sm mt-1 hover:text-accent-300 transition-all duration-300 transform hover:translate-y-[-2px] inline-block`}
          >
            数据由NewsAPI提供
          </p>
        </div>
      </footer>

      {/* 返回顶部按钮 */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 ${
            isDark
              ? 'bg-gradient-to-r from-secondary-700 to-secondary-600 hover:from-secondary-600 hover:to-secondary-500'
              : 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500'
          } text-white p-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-125 hover:rotate-6 hover:translate-y-[-4px] focus:outline-none z-50 animate-bounce-slow`}
          aria-label="返回顶部"
        >
          <FaArrowUp
            size={20}
            className="transform transition-transform duration-300"
          />
        </button>
      )}
    </div>
  );
}

export default App;
