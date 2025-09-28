const fs = require('fs');
const path = require('path');

const DATA_FILE = './data/posts.json';
const OUTPUT_FILE = './index.html';

const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

const postsHtml = data.posts.map(post => `
  <div class="news-card" onclick="window.open('${post.originalUrl}', '_blank')">
    <div class="relative mb-4">
      <img src="${post.image}" alt="${post.title}" class="w-full h-48 object-cover rounded-lg">
      <div class="absolute top-3 right-3 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-medium text-gray-800">
        ${post.readTime}
      </div>
    </div>
    <h3 class="text-xl font-semibold mb-3 text-gray-800 line-clamp-2">${post.title}</h3>
    <p class="text-gray-600 mb-4 line-clamp-3">${post.summary}</p>
    <div class="flex flex-wrap gap-2 mb-4">
      ${post.tags.map(tag => `
        <span class="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
          ${tag}
        </span>
      `).join('')}
    </div>
    <div class="flex justify-between items-center text-sm">
      <span class="text-gray-500">${post.date}</span>
      <span class="text-gray-500">来源: ${post.source}</span>
    </div>
  </div>
`).join('');

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>文创每日手账</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Noto+Sans+SC:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Noto Sans SC', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #fefefe 0%, #f8f9fa 100%);
            color: #2c3e50;
            line-height: 1.7;
        }
        
        .news-card {
            background: white;
            border: 1px solid #e8e9ea;
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 20px;
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .news-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }
        
        .news-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 20px;
            padding: 20px 0;
        }
        
        .hero-title {
            font-family: 'Playfair Display', serif;
            background: linear-gradient(135deg, #d4af37 0%, #f39c12 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 600;
        }
        
        .nav-blur {
            backdrop-filter: blur(20px);
            background: rgba(255, 255, 255, 0.95);
            border-bottom: 1px solid #e8e9ea;
            box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
        }
        
        .gradient-text {
            background: linear-gradient(135deg, #d4af37 0%, #f39c12 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="fixed top-0 w-full z-50 nav-blur">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <h1 class="text-2xl font-bold gradient-text">文创每日手账</h1>
                </div>
                <div class="hidden md:block">
                    <div class="ml-10 flex items-baseline space-x-8">
                        <a href="index.html" class="text-text-dark hover:text-yellow-600 px-3 py-2 text-sm font-medium transition-colors">首页</a>
                        <a href="news.html" class="text-gray-600 hover:text-yellow-600 px-3 py-2 text-sm font-medium transition-colors">新闻详情</a>
                        <a href="trends.html" class="text-gray-600 hover:text-yellow-600 px-3 py-2 text-sm font-medium transition-colors">趋势分析</a>
                        <a href="about.html" class="text-gray-600 hover:text-yellow-600 px-3 py-2 text-sm font-medium transition-colors">关于我们</a>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div class="max