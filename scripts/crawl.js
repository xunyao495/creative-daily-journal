#!/usr/bin/env node
/**
 * Node.js RSS 爬虫 – 稳定版
 * 生成 9 条有效数据 → posts.json
 */
const RSSParser = require('rss-parser');
const fs = require('fs');
const path = require('path');

const parser = new RSSParser({
  timeout: 15000,
  headers: { 'User-Agent': 'Mozilla/5.0 (compatible; RSS-Aggregator/1.0)' },
  requestOptions: { rejectUnauthorized: false }
});

const NEVER_BLOCK = [
  /* ===== 文创相关 ===== */
  { name: '百度新闻-文创', url: `http://news.baidu.com/ns?word=${encodeURIComponent('文创')}&tn=newsrss&sr=0&cl=2&rn=20&ct=0`, home: 'https://news.baidu.com' },
  { name: '中国文化报', url: 'http://www.ccmapp.cn/rss/Entertainment.xml', home: 'http://www.ccmapp.cn' },
  { name: '中国新闻网-文化', url: 'http://www.chinanews.com/rss/culture.xml', home: 'http://www.chinanews.com' },
  { name: '中国文化产业网', url: 'http://www.cnci.gov.cn/rss.xml', home: 'http://www.cnci.gov.cn' },
  { name: '豆瓣文化', url: 'http://www.douban.com/feed/culture', home: 'https://www.douban.com' },

  /* ===== 全球高可用兜底 ===== */
  { name: 'Reddit', url: 'https://www.reddit.com/.rss', home: 'https://www.reddit.com' },
  { name: 'GitHub Trending', url: 'https://github.com/trending.atom', home: 'https://github.com' },
  { name: 'Hacker News', url: 'https://news.ycombinator.com/rss', home: 'https://news.ycombinator.com' },
  { name: 'BBC World', url: 'https://feeds.bbci.co.uk/news/world/rss.xml', home: 'https://www.bbc.com/news' },
  { name: 'Google News', url: 'https://news.google.com/rss', home: 'https://news.google.com' }
];

const log = (...args) => console.log(`[${new Date().toLocaleTimeString()}]`, ...args);

async function fetchAll() {
  const all = [];
  for (const src of NEVER_BLOCK) {
    try {
      log(`正在解析 ${src.name}...`);
      const feed = await parser.parseURL(src.url);
      log(`├─ 获取 ${feed.items.length} 条`);
      all.push(...feed.items.map(it => ({
        id: it.guid || it.link,
        title: it.title?.trim() || '无标题',
        summary: (it.contentSnippet || it.description || '').slice(0, 120) + '…',
        image: it.enclosure?.url || `https://picsum.photos/seed/${encodeURIComponent(it.title || 'default')}/400/300`,
        date: new Date(it.isoDate || it.pubDate).toISOString().slice(0, 10),
        readTime: Math.ceil((it.contentSnippet || '').length / 350) + '分钟',
        tags: ['文创'],
        source: src.name,
        originalUrl: it.link
      })));
    } catch (e) {
      log(`├─ 失败：${src.name} – ${e.message}`);
    }
    // 礼貌延迟
    await new Promise(r => setTimeout(r, 800));
  }
  return all;
}

(async () => {
  log('开始抓取 RSS 数据...');
  try {
    const raw = await fetchAll();
    log(`原始数据合计 ${raw.length} 条，去重并截取 9 条...`);

    const posts = raw
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .filter((it, idx, arr) => arr.findIndex(i => i.id === it.id) === idx)
      .slice(0, 9);

    const outFile = path.join(__dirname, 'posts.json');
    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, JSON.stringify(posts, null, 2));
    log(`✅ 已写入 ${posts.length} 条 → ${outFile}`);
  } catch (err) {
    log('❌ 意外错误:', err.message);
    process.exit(1);
  }
})();
