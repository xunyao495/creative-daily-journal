#!/usr/bin/env node
/**
 * crawl.js 官网 XML 兜底版 —— 只爬**官网原生 RSS**，永远 429 不了
 * 输出：9 条
 */
const RSSParser = require('rss-parser');
const fs        = require('fs');
const path      = require('path');

const parser = new RSSParser({ timeout: 15000, headers: { 'User-Agent': 'Creative-Bot/8.0' } });

/* ---- 官网原生 XML（无 RSSHub）---- */
const OFFICIAL_XML = [
  { name: '故宫官网新闻',  url: 'https://www.dpm.org.cn/about/rss.xml',               home: 'https://www.dpm.org.cn' },
  { name: '文旅部政策',    url: 'https://www.mct.gov.cn/rss/policy.xml',              home: 'https://www.mct.gov.cn' },
  { name: 'B 站国创',      url: 'https://www.bilibili.com/rss/guochuang.xml',         home: 'https://www.bilibili.com' },
  { name: '故宫淘宝',      url: 'https://www.gugong.taobao.com/rss/new.xml',          home: 'https://gugong.taobao.com' },
  { name: '泡泡玛特新品',  url: 'https://www.popmart.com/rss/new.xml',                home: 'https://www.popmart.com' },
  { name: '原神文创',      url: 'https://ys.mihoyo.com/rss/culture.xml',              home: 'https://ys.mihoyo.com' },
  { name: '鲸园区招商',    url: 'https://www.whalegogo.com/rss/culture.xml',          home: 'https://www.whalegogo.com' },
  { name: '小红书国风',    url: 'https://www.xiaohongshu.com/rss/user/5f3d7f7f0000000001006d8b.xml', home: 'https://xiaohongshu.com' },
  { name: '微博热搜文创',  url: 'https://weibo.com/rss/search/文创',                  home: 'https://weibo.com' },
];

async function fetchOfficial() {
  const all = [];
  for (const src of OFFICIAL_XML) {
    try {
      const feed = await parser.parseURL(src.url);
      all.push(...feed.items.slice(0, 5).map(it => ({
        id: it.guid || it.link,
        title: it.title?.trim(),
        summary: (it.contentSnippet || it.description || '').slice(0, 120) + '…',
        image: it.enclosure?.url || `https://picsum.photos/seed/${encodeURIComponent(it.title)}/400/300`,
        date: new Date(it.isoDate || it.pubDate).toISOString().slice(0, 10),
        readTime: Math.ceil((it.contentSnippet || '').length / 350) + '分钟',
        tags: ['文创'],
        source: src.name,
        originalUrl: it.link,
      })));
    } catch (e) {
      console.warn(`[WARN] ${src.name} 失败`, e.message);
    }
  }
  return all;
}

(async () => {
  const all = await fetchOfficial();
  const posts = all
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .filter((it, idx, arr) => arr.findIndex(i => i.id === it.id) === idx)
    .slice(0, 9); // ← 只写 9 条！

  const outFile = path.join(__dirname, '..', 'data', 'posts.json');
  fs.writeFileSync(outFile, JSON.stringify(posts, null, 2));
  console.log(`[OK] 写入 ${posts.length} 条（官网 XML）→ ${outFile}`);
})();

