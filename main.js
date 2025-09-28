// 新闻数据
const newsData = [
    {
        id: 1,
        title: "文化产业投融资市场回暖，上半年投融资额激增88.9%",
        summary: "2025年上半年文化产业投融资增速显著提升，文化科技融合领域成为投资重点，AI+文化项目占比超过40%。",
        category: "policy",
        image: "https://picsum.photos/seed/news1/400/300.jpg",
        date: "2025-09-25",
        readTime: "5分钟",
        tags: ["投融资", "文化科技", "政策"],
        source: "中国文化产业协会",
        originalUrl: "https://example.com/news/culture-investment-2025"
    },
    {
        id: 2,
        title: "数字艺术市场突破千亿美元，AI驱动创作新纪元",
        summary: "全球数字艺术市场规模持续扩大，人工智能技术重塑创意表达边界，算法艺术成为新趋势。",
        category: "digital",
        image: "https://picsum.photos/seed/news2/400/300.jpg",
        date: "2025-09-24",
        readTime: "8分钟",
        tags: ["数字艺术", "AI", "创作"],
        source: "ArtTech研究院",
        originalUrl: "https://example.com/news/digital-art-ai-2025"
    },
    {
        id: 3,
        title: "毛绒绒风席卷全国，情绪价值驱动文创消费新趋势",
        summary: "年轻人更愿意为情绪价值买单，文创产品成为文化旅游新标配，互动体验成为关键。",
        category: "products",
        image: "https://picsum.photos/seed/news3/400/300.jpg",
        date: "2025-09-23",
        readTime: "6分钟",
        tags: ["文创产品", "消费升级", "情绪价值"],
        source: "消费趋势报告",
        originalUrl: "https://example.com/news/emotional-value-trend"
    },
    {
        id: 4,
        title: "成都发布数字文创产业政策，签约金额逾30亿元",
        summary: "成都市推出四大专项政策，打造数字文创三高地三中心，多个重点项目现场签约。",
        category: "investment",
        image: "https://picsum.photos/seed/news4/400/300.jpg",
        date: "2025-09-22",
        readTime: "7分钟",
        tags: ["成都", "数字文创", "政策"],
        source: "成都市文产办",
        originalUrl: "https://example.com/news/chengdu-cultural-policy"
    },
    {
        id: 5,
        title: "博物馆文创产品销售额增长20倍，带动就业超万人",
        summary: "河南博物院文创产品种类从102款增至2000多款，销售额从200多万增长到4000多万元。",
        category: "products",
        image: "https://picsum.photos/seed/news5/400/300.jpg",
        date: "2025-09-21",
        readTime: "4分钟",
        tags: ["博物馆", "文创产品", "就业"],
        source: "河南博物院",
        originalUrl: "https://example.com/news/museum-products-growth"
    },
    {
        id: 6,
        title: "低空经济+文旅融合发展，催生文化产业新增长点",
        summary: "2024年成为低空经济元年，无人机+文旅、通用航空+旅游等新业态快速发展。",
        category: "trends",
        image: "https://picsum.photos/seed/news1/400/300.jpg",
        date: "2025-09-20",
        readTime: "9分钟",
        tags: ["低空经济", "文旅融合", "新业态"],
        source: "文旅产业观察"
    },
    {
        id: 7,
        title: "VR+文化项目占比超30%，沉浸式体验成主流",
        summary: "虚拟现实技术在文化领域的应用不断深化，VR博物馆、VR演出等项目受到市场欢迎。",
        category: "digital",
        image: "https://picsum.photos/seed/news2/400/300.jpg",
        date: "2025-09-19",
        readTime: "6分钟",
        tags: ["VR", "沉浸式", "文化体验"],
        source: "VR产业联盟"
    },
    {
        id: 8,
        title: "国潮IP持续火爆，衍生品开发成投资热点",
        summary: "传统文化IP现代化转型加速，国潮品牌通过多元化衍生品开发实现商业价值最大化。",
        category: "investment",
        image: "https://picsum.photos/seed/news3/400/300.jpg",
        date: "2025-09-18",
        readTime: "5分钟",
        tags: ["国潮", "IP开发", "衍生品"],
        source: "IP价值研究院"
    },
    {
        id: 9,
        title: "文创产业园区建设加速，集聚效应显著",
        summary: "各地文创产业园区建设成效显著，形成完整产业链，推动产业集聚发展。",
        category: "trends",
        image: "https://picsum.photos/seed/news4/400/300.jpg",
        date: "2025-09-17",
        readTime: "8分钟",
        tags: ["产业园区", "集聚效应", "产业链"],
        source: "产业园区联盟"
    },
    {
        id: 10,
        title: "数字版权保护技术升级，区块链应用深化",
        summary: "区块链技术在文化版权保护领域的应用不断深化，为文创产业发展提供技术保障。",
        category: "digital",
        image: "https://picsum.photos/seed/news1/400/300.jpg",
        date: "2025-09-16",
        readTime: "7分钟",
        tags: ["区块链", "版权保护", "技术"],
        source: "区块链技术协会"
    }
];

// 初始化页面
document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log('开始初始化页面...');
        initializeCarousel();
        initializeNewsGrid();
        initializeAnimations();
        initializeBackground();
        initializeFilters();
        
        // 启动实时更新
        startRealTimeUpdates();
        
        console.log('页面初始化完成');
    } catch (error) {
        console.error('页面初始化失败:', error);
        showMessage('页面加载出现问题，请刷新重试', 'error');
    }
});

// 初始化轮播
function initializeCarousel() {
    if (document.getElementById('featured-carousel')) {
        new Splide('#featured-carousel', {
            type: 'loop',
            perPage: 3,
            perMove: 1,
            gap: '2rem',
            autoplay: true,
            interval: 4000,
            pauseOnHover: true,
            breakpoints: {
                768: {
                    perPage: 1,
                },
                1024: {
                    perPage: 2,
                }
            }
        }).mount();
    }
}

// 初始化新闻网格
function initializeNewsGrid() {
    const newsGrid = document.getElementById('news-grid');
    if (newsGrid) {
        // 确保DOM完全加载后再渲染
        setTimeout(() => {
            try {
                renderNewsItems(newsData);
                console.log('新闻网格初始化完成，共加载', newsData.length, '条新闻');
            } catch (error) {
                console.error('新闻渲染失败:', error);
                // 显示后备新闻
                showFallbackNews();
            }
        }, 100);
    } else {
        console.error('找不到新闻网格容器');
    }
}

// 显示后备新闻
function showFallbackNews() {
    const newsGrid = document.getElementById('news-grid');
    if (!newsGrid) return;
    
    // 简化的后备新闻显示
    newsGrid.innerHTML = newsData.map(item => `
        <div class="news-card card-hover p-6 cursor-pointer" onclick="window.open('${item.originalUrl || '#'}', '_blank')">
            <div class="relative mb-4">
                <img src="${item.image}" alt="${item.title}" class="w-full h-48 object-cover rounded-lg">
                <div class="absolute top-3 right-3 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-medium text-text-dark">
                    ${item.readTime}
                </div>
            </div>
            <h3 class="text-xl font-semibold mb-3 text-text-dark">${item.title}</h3>
            <p class="text-text-medium mb-4">${item.summary}</p>
            <div class="flex justify-between items-center text-sm">
                <span class="text-text-light">${item.date}</span>
                <span class="text-text-light">来源: ${item.source}</span>
            </div>
        </div>
    `).join('');
}

// 渲染新闻项目
function renderNewsItems(newsItems) {
    const newsGrid = document.getElementById('news-grid');
    const loadingIndicator = document.getElementById('loading-indicator');
    const noDataMessage = document.getElementById('no-data-message');
    
    if (!newsGrid) return;

    // 显示加载状态
    if (loadingIndicator) {
        loadingIndicator.classList.remove('hidden');
    }
    
    // 清空现有内容
    newsGrid.innerHTML = '';
    
    // 隐藏无数据消息
    if (noDataMessage) {
        noDataMessage.classList.add('hidden');
    }
    
    if (newsItems.length === 0) {
        // 显示无数据消息
        if (loadingIndicator) {
            loadingIndicator.classList.add('hidden');
        }
        if (noDataMessage) {
            noDataMessage.classList.remove('hidden');
        }
        return;
    }
    
    // 延迟渲染以显示加载效果
    setTimeout(() => {
        // 隐藏加载状态
        if (loadingIndicator) {
            loadingIndicator.classList.add('hidden');
        }
        
        // 渲染新闻卡片
        newsItems.forEach((item, index) => {
            const newsCard = createNewsCard(item, index);
            newsGrid.appendChild(newsCard);
        });

        // 添加动画
        anime({
            targets: '.news-card',
            opacity: [0, 1],
            translateY: [30, 0],
            delay: anime.stagger(100),
            duration: 600,
            easing: 'easeOutQuart'
        });
    }, 500);
}

// 创建新闻卡片
function createNewsCard(item, index) {
    const card = document.createElement('div');
    card.className = 'news-card card-hover p-6 reveal cursor-pointer';
    card.style.animationDelay = `${index * 0.1}s`;
    
    // 添加点击事件
    card.addEventListener('click', () => {
        if (item.originalUrl) {
            window.open(item.originalUrl, '_blank');
        } else {
            // 如果没有原始链接，跳转到新闻详情页
            window.location.href = `news.html?id=${item.id}`;
        }
    });
    
    card.innerHTML = `
        <div class="relative mb-4">
            <img src="${item.image}" alt="${item.title}" class="w-full h-48 object-cover rounded-lg">
            <div class="absolute top-3 right-3 bg-white bg-opacity-90 px-2 py-1 rounded-full text-xs font-medium text-text-dark">
                ${item.readTime}
            </div>
        </div>
        <h3 class="text-xl font-semibold mb-3 text-text-dark line-clamp-2">${item.title}</h3>
        <p class="text-text-medium mb-4 line-clamp-3">${item.summary}</p>
        <div class="flex flex-wrap gap-2 mb-4">
            ${item.tags.map(tag => `
                <span class="bg-soft-gold text-accent-gold px-3 py-1 rounded-full text-xs font-medium">
                    ${tag}
                </span>
            `).join('')}
        </div>
        <div class="flex justify-between items-center text-sm">
            <span class="text-text-light">${item.date}</span>
            <span class="text-text-light">来源: ${item.source}</span>
        </div>
    `;
    
    return card;
}

// 初始化筛选器
function initializeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // 移除所有活动状态
            filterBtns.forEach(b => b.classList.remove('filter-active'));
            // 添加当前按钮的活动状态
            this.classList.add('filter-active');
            
            const category = this.dataset.category;
            filterNews(category);
        });
    });
}

// 筛选新闻
function filterNews(category) {
    let filteredNews = newsData;
    
    if (category !== 'all') {
        filteredNews = newsData.filter(item => item.category === category);
    }
    
    renderNewsItems(filteredNews);
}

// 初始化动画
function initializeAnimations() {
    // 滚动动画
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 观察所有需要动画的元素
    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // 页面加载动画
    anime({
        targets: '.hero-title',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1000,
        easing: 'easeOutQuart'
    });
}

// 初始化背景动画
function initializeBackground() {
    if (document.getElementById('p5-background')) {
        new p5((p) => {
            let particles = [];
            
            p.setup = function() {
                let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
                canvas.parent('p5-background');
                
                // 创建粒子
                for (let i = 0; i < 50; i++) {
                    particles.push({
                        x: p.random(p.width),
                        y: p.random(p.height),
                        vx: p.random(-0.5, 0.5),
                        vy: p.random(-0.5, 0.5),
                        size: p.random(2, 6)
                    });
                }
            };
            
            p.draw = function() {
                p.clear();
                
                // 绘制粒子
                particles.forEach(particle => {
                    p.fill(212, 175, 55, 100);
                    p.noStroke();
                    p.circle(particle.x, particle.y, particle.size);
                    
                    // 更新位置
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    
                    // 边界检查
                    if (particle.x < 0 || particle.x > p.width) particle.vx *= -1;
                    if (particle.y < 0 || particle.y > p.height) particle.vy *= -1;
                });
            };
            
            p.windowResized = function() {
                p.resizeCanvas(p.windowWidth, p.windowHeight);
            };
        });
    }
}

// 搜索功能
function searchNews(query) {
    const filteredNews = newsData.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.summary.toLowerCase().includes(query.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    
    renderNewsItems(filteredNews);
}

// 导出数据功能
function exportNewsData() {
    const dataStr = JSON.stringify(newsData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '文创新闻数据.json';
    link.click();
}

// 获取新闻统计信息
function getNewsStats() {
    const stats = {
        total: newsData.length,
        categories: {},
        sources: {}
    };
    
    newsData.forEach(item => {
        stats.categories[item.category] = (stats.categories[item.category] || 0) + 1;
        stats.sources[item.source] = (stats.sources[item.source] || 0) + 1;
    });
    
    return stats;
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 实时更新功能
function startRealTimeUpdates() {
    // 每30秒检查一次新数据
    setInterval(() => {
        checkForUpdates();
    }, 30000);
    
    // 初始加载后立即检查一次
    setTimeout(() => {
        checkForUpdates();
    }, 1000);
}

// 检查更新
function checkForUpdates() {
    console.log('检查新闻更新...');
    
    // 模拟从服务器获取最新数据
    // 在实际应用中，这里应该是一个API调用
    const latestNews = getLatestNewsFromServer();
    
    if (latestNews && latestNews.length > 0) {
        // 更新新闻数据
        newsData.unshift(...latestNews);
        
        // 重新渲染新闻网格
        renderNewsItems(newsData);
        
        // 显示更新提示
        showUpdateNotification(latestNews.length);
    }
}

// 模拟从服务器获取最新新闻
function getLatestNewsFromServer() {
    // 这里应该是实际的API调用
    // 为了演示，我们返回一些模拟数据
    const now = new Date();
    const latestNews = [
        {
            id: Date.now() + 1,
            title: "【实时更新】文创产业最新政策解读",
            summary: "刚刚发布的文创产业新政策，将为行业发展带来重大机遇。",
            category: "policy",
            image: "https://picsum.photos/seed/latest1/400/300.jpg",
            date: formatDate(now),
            readTime: "3分钟",
            tags: ["政策", "实时", "解读"],
            source: "政策发布平台",
            originalUrl: "https://example.com/news/latest-policy-interpretation"
        },
        {
            id: Date.now() + 2,
            title: "【实时更新】数字文创展览今日开幕",
            summary: "年度最大规模的数字文创展览在北京开幕，展出超过1000件作品。",
            category: "digital",
            image: "https://picsum.photos/seed/latest2/400/300.jpg",
            date: formatDate(now),
            readTime: "5分钟",
            tags: ["展览", "数字文创", "开幕"],
            source: "展览组委会",
            originalUrl: "https://example.com/news/digital-art-exhibition-opening"
        }
    ];
    
    // 模拟随机返回新数据（30%概率）
    if (Math.random() < 0.3) {
        return latestNews.slice(0, Math.floor(Math.random() * 2) + 1);
    }
    
    return [];
}

// 显示更新通知
function showUpdateNotification(count) {
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50';
    notification.innerHTML = `
        <div class="flex items-center">
            <span class="mr-2">🔄</span>
            <span>发现 ${count} 条新资讯</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // 3秒后自动消失
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// 强制刷新新闻数据
window.refreshNewsData = function() {
    console.log('强制刷新新闻数据...');
    
    // 清空现有数据
    newsData.length = 0;
    
    // 重新加载基础数据
    const baseNews = [
        {
            id: 1,
            title: "文化产业投融资市场回暖，上半年投融资额激增88.9%",
            summary: "2025年上半年文化产业投融资增速显著提升，文化科技融合领域成为投资重点，AI+文化项目占比超过40%。",
            category: "policy",
            image: "https://picsum.photos/seed/news1/400/300.jpg",
            date: "2025-09-25",
            readTime: "5分钟",
            tags: ["投融资", "文化科技", "政策"],
            source: "中国文化产业协会"
        },
        {
            id: 2,
            title: "数字艺术市场突破千亿美元，AI驱动创作新纪元",
            summary: "全球数字艺术市场规模持续扩大，人工智能技术重塑创意表达边界，算法艺术成为新趋势。",
            category: "digital",
            image: "https://picsum.photos/seed/news2/400/300.jpg",
            date: "2025-09-24",
            readTime: "8分钟",
            tags: ["数字艺术", "AI", "创作"],
            source: "ArtTech研究院"
        },
        {
            id: 3,
            title: "毛绒绒风席卷全国，情绪价值驱动文创消费新趋势",
            summary: "年轻人更愿意为情绪价值买单，文创产品成为文化旅游新标配，互动体验成为关键。",
            category: "products",
            image: "https://picsum.photos/seed/news3/400/300.jpg",
            date: "2025-09-23",
            readTime: "6分钟",
            tags: ["文创产品", "消费升级", "情绪价值"],
            source: "消费趋势报告"
        }
    ];
    
    newsData.push(...baseNews);
    
    // 重新渲染
    renderNewsItems(newsData);
    
    showMessage('新闻数据已刷新', 'success');
};

// 错误处理增强
window.addEventListener('error', function(e) {
    console.error('页面错误:', e.error);
    showMessage('页面加载出现问题，请刷新重试', 'error');
});

// 页面可见性变化时的处理
document.addEventListener('visibilitychange', function() {
    if (!document.hidden) {
        // 页面重新可见时检查更新
        console.log('页面重新可见，检查更新...');
        setTimeout(() => {
            checkForUpdates();
        }, 1000);
    }
});

// 获取热门标签
function getPopularTags(limit = 10) {
    const tagCount = {};
    
    newsData.forEach(item => {
        item.tags.forEach(tag => {
            tagCount[tag] = (tagCount[tag] || 0) + 1;
        });
    });
    
    return Object.entries(tagCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, limit)
        .map(([tag, count]) => ({ tag, count }));
}

// 获取最近新闻
function getRecentNews(limit = 5) {
    return newsData
        .sort((a, b) => new Date(b