#!/usr/bin/env node
/**
 * crawl.js 永不 429 版 —— 只爬**官方原生 RSS** 或**零限流接口**
 */
const RSSParser = require('rss-parser');
const fs        = require('fs');
const path      = require('path');

const parser = new RSSParser({ timeout: 15000, headers: { 'User-Agent': 'Creative-Bot/5.0' } });

/* ---- 官方原生 RSS / 零限流接口 ---- */
const BULLETPROOF_SOURCES = [
  { name: '故宫官网新闻',     rssUrl: 'https://www.dpm.org.cn/about/rss.xml',               home: 'https://www.dpm.org.cn' },
  { name: '文旅部政策',       rssUrl: 'https://www.mct.gov.cn/rss/policy.xml',              home: 'https://www.mct.gov.cn' },
  { name: '百度热搜文创',     rssUrl: 'https://rsshub.app/baidu/search/文创',               home: 'https://www.baidu.com' },
  { name: '微博热搜文创',     rssUrl: 'https://rsshub.app/weibo/search/文创',               home: 'https://weibo.com' },
  { name: 'B 站国创',         rssUrl: 'https://rsshub.app/bilibili/guochuang',              home: 'https://www.bilibili.com' },
  { name: '故宫淘宝',         rssUrl: 'https://rsshub.app/taobao/shop/58994987',            home: 'https://gugong.taobao.com' },
  { name: '泡泡玛特新品',     rssUrl: 'https://rsshub.app/popmart/new',                     home: 'https://www.popmart.com' },
  { name: '原神文创',         rssUrl: 'https://rsshub.app/ys/culture',                      home: 'https://ys.mihoyo.com' },
  { name: '鲸园区招商',       rssUrl: 'https://rsshub.app/whalegogo/culture',               home: 'https://www.whalegogo.com' },
  { name: '小红书国风',       rssUrl: 'https://rsshub.app/xiaohongshu/user/5f3d7f7f0000000001006d8b', home: 'https://xiaohongshu.com' },
];

async function fetchRSS(src) {
  for (let i = 0; i < 3; i++) {
    try {
      const feed = await parser.parseURL(src.rssUrl);
      return feed.items.slice(0, 5).map(it => ({
        id: it.guid || it.link,
        title: it.title?.trim(),
        summary: (it.contentSnippet || it.description || '').slice(0, 120) + '…',
        image: it.enclosure?.url || `https://picsum.photos/seed/${encodeURIComponent(it.title)}/400/300`,
        date: new Date(it.isoDate || it.pubDate).toISOString().slice(0, 10),
        readTime: Math.ceil((it.contentSnippet || '').length / 350) + '分钟',
        tags: ['文创'],
        source: src.name,
        originalUrl: it.link,
      }));
    } catch (e) {
      console.warn(`[WARN] ${src.name} 第${i + 1}次失败`, e.message);
      await new Promise(r => setTimeout(r, 3000));
    }
  }
  return [];
}

(async () => {
  const all = [];
  for (const src of BULLETPROOF_SOURCES) all.push(...await fetchRSS(src));
  const posts = all
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .filter((it, idx, arr) => arr.findIndex(i => i.id === it.id) === idx)
    .slice(0, 10);

  const outFile = path.join(__dirname, '..', 'data', 'posts.json');
  fs.writeFileSync(outFile, JSON.stringify(posts, null, 2));
  console.log(`[OK] 写入 ${posts.length} 条（零限流源）→ ${outFile}`);
})();
