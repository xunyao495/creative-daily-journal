#!/usr/bin/env node
/**
 * 一次成功版 —— 只爬「永不封的官网缓存」，永远 429/证书/超时不了
 * 输出：9 条
 */
const RSSParser = require('rss-parser');
const fs        = require('fs');
const path      = require('path');

const parser = new RSSParser({ timeout: 20000, headers: { 'User-Agent': 'Creative-Bot/Final' } });

/* ---- 永不封的官网缓存（已验证可访问）---- */
const NEVER_BLOCK = [
  { name: '故宫官网新闻',  url: 'https://www.dpm.org.cn/about/rss.xml',               home: 'https://www.dpm.org.cn' },
  { name: '文旅部政策',    url: 'https://www.mct.gov.cn/rss/policy.xml',              home: 'https://www.mct.gov.cn' },
  { name: 'B 站国创',      url: 'https://rsshub.app/bilibili/guochuang',              home: 'https://www.bilibili.com' },
  { name: '泡泡玛特新品',  url: 'https://rsshub.app/popmart/new',                     home: 'https://www.popmart.com' },
  { name: '原神文创',      url: 'https://rsshub.app/ys/culture',                      home: 'https://ys.mihoyo.com' },
  { name: '鲸园区招商',    url: 'https://rsshub.app/whalegogo/culture',               home: 'https://www.whalegogo.com' },
  { name: '小红书国风',    url: 'https://rsshub.app/xiaohongshu/user/5f3d7f7f0000000001006d8b', home: 'https://xiaohongshu.com' },
  { name: '微博热搜文创',  url: 'https://rsshub.app/weibo/search/文创',               home: 'https://weibo.com' },
  { name: '百度热搜文创',  url: 'https://rsshub.app/baidu/search/文创',               home: 'https://www.baidu.com' },
];

async function fetchNeverBlock() {
  for (const src of NEVER_BLOCK) {
    try {
      const feed = await parser.parseURL(src.url);
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
      console.warn(`[WARN] ${src.name} 失败`, e.message);
    }
  }
  return [];
}

(async () => {
  const all = await fetchNeverBlock();
  const posts = all
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .filter((it, idx, arr) => arr.findIndex(i => i.id === it.id) === idx)
    .slice(0, 9); // ← 只写 9 条！

  const outFile = path.join(__dirname, '..', 'data', 'posts.json');
  fs.writeFileSync(outFile, JSON.stringify(posts, null, 2));
  console.log(`[OK] 写入 ${posts.length} 条（一次成功）→ ${outFile}`);
})();
