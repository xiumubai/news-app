# AI 新闻浏览应用

一个响应式的新闻浏览应用，支持移动端和 PC 端，主要展示与 AI 相关的新闻文章。使用 React 和 Tailwind CSS 构建，提供现代化的 UI 设计和流畅的用户体验。

## 项目预览

![预览地址](https://news-list-xiumubai.vercel.app/)

## 功能特点

- 📱 响应式设计，同时支持移动端和 PC 端
- 🔍 支持关键词搜索功能
- 🔄 支持刷新和懒加载
- ⏱️ 内置倒计时组件（支持页签切换状态保持）
- 🖼️ 美观的新闻卡片布局
- ⚡ 良好的加载状态和错误处理
- 支持主题切换（亮色/暗色模式）

## 技术栈

- **前端框架**: React
- **UI 框架**: Tailwind CSS
- **包管理工具**: pnpm
- **API**: NewsAPI
- **工具库**: axios, dayjs, react-icons

## 快速开始

### 前提条件

- Node.js (v16.20.0+)
- pnpm (v8.19.4+)

### 安装

1. 克隆仓库

```bash
git clone https://github.com/xiumubai/news_list.git
cd news_list
```

2. 安装依赖

```bash
pnpm install
```

3. 启动开发服务器

```bash
pnpm dev
```

应用将在 http://localhost:5173 运行

### 构建生产版本

```bash
pnpm build
```

构建后的文件将位于 `dist` 目录中

## 项目结构

```
src/
├── api/          # API调用相关函数
├── components/   # UI组件
├── hooks/        # 自定义Hooks
├── utils/        # 工具函数
├── App.jsx       # 应用主组件
└── main.jsx      # 入口文件
```

## 核心功能说明

### 新闻数据获取

应用使用 NewsAPI 获取最新的 AI 相关新闻。数据获取逻辑封装在自定义 Hook 中，支持搜索、刷新等功能。

### 倒计时组件

应用包含一个倒计时组件，即使在用户切换页签后也能保持正确的计时状态。

倒计时的功能重新设计如下： 1.默认为 5 分钟，点击开始按钮，开始倒计时 2.点击刷新按钮，重新设置为 5 分钟，停止倒计时，点击开始按钮，开始倒计时 3.刷新浏览器，倒计时需要记录之前的倒计时间，继续倒计时，直到结束。所以还需要记录当前倒计时是否已经开启，是否已经结束。 4.在另一个页签同时打开页面，倒计时的所有状态进行同步

### 响应式设计

使用 Tailwind CSS 实现响应式设计，确保应用在不同屏幕尺寸下都有良好的用户体验。

## API 参考

本项目使用 NewsAPI 获取新闻数据：

```
GET https://newsapi.org/v2/everything?q=China&from=2025-07-11&sortBy=publishedAt&apiKey=YOUR_API_KEY
```
