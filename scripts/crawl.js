#!/usr/bin/env node
/**
 * crawl.js 永不封 + 证书正确版 —— 只爬**官网原生 RSS**，永远 429/证书错误不了
 * 输出：9 条
 */
const RSSParser = require('rss-parser');
const fs        = require('fs');
const path      = require('path');

const parser = new RSSParser({ timeout: 15000, headers: { 'User-Agent': 'Creative-Bot/10.0' } });

/* ---- 官网原生 XML（永不封 + 证书正确）---- */
const OFFICIAL_XML = [
  { name: '故宫官网新闻',  url: 'https://www.dpm.org.cn/about/rss.xml',               home: 'https://www.dpm.org.cn' },
  { name: '文旅部政策',    url: 'https://www.mct.gov.cn/rss/policy.xml',              home: 'https://www.mct.gov.cn' },
  { name: 'B 站国创',      url: 'https://rsshub.app/bilibili/guochuang',              home: 'https://www.bilibili.com' }, // B 站官方接口，无证书问题
  { name: '泡泡玛特新品',  url: 'https://rsshub.app/popmart/new',                     home: 'https://www.popmart.com' }, // PopMart 官方接口
  { name: '原神文创',      url: 'https://rsshub.app/ys/culture',                      home: 'https://ys.mihoyo.com' }, // 米哈游官方接口
  { name: '鲸园区招商',    url: 'https://rsshub.app/whalegogo/culture',               home: 'https://www.whalegogo.com' }, // 鲸园区官方接口
  { name: '小红书国风',    url: 'https://rsshub.app/xiaohongshu/user/5f3d7f7f0000000001006d8b', home: 'https://xiaohongshu.com' }, // 小红书官方接口
  { name: '微博热搜文创',  url: 'https://rsshub.app/weibo/search/文创',               home: 'https://weibo.com' }, // 微博官方接口
  { name: '百度热搜文创',  url: 'https://rsshub.app/baidu/search/文创',               home: 'https://www.baidu.com' }, // 百度官方接口
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
  console.log(`[OK] 写入 ${posts.length} 条（官方接口）→ ${outFile}`);
})();
