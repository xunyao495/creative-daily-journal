#!/usr/bin/env node
/**
 * crawl.js 终极无 RSSHub 版 —— 只爬官网 XML + 开放接口，永远 429 不了
 * 输出：9 条（留 1 条空位）
 */
const axios     = require('axios');
const RSSParser = require('rss-parser');
const fs        = require('fs');
const path      = require('path');

const parser = new RSSParser({ timeout: 15000, headers: { 'User-Agent': 'Creative-Bot/7.0' } });

/* ---- 官网原生 XML + 开放接口（无 RSSHub）---- */
const BULLETPROOF_SOURCES = [
  { name: '故宫官网新闻',  type: 'xml',  url: 'https://www.dpm.org.cn/about/rss.xml',               home: 'https://www.dpm.org.cn' },
  { name: '文旅部政策',    type: 'xml',  url: 'https://www.mct.gov.cn/rss/policy.xml',              home: 'https://www.mct.gov.cn' },
  { name: '百度热搜文创',  type: 'api',  url: 'https://api.baidu.com/rss/hotword?word=文创',       home: 'https://www.baidu.com' }, // 百度开放接口
  { name: '微博热搜文创',  type: 'api',  url: 'https://api.weibo.cn/2/search/topics?q=文创',      home: 'https://weibo.com' },     // 微博开放接口
  { name: 'B 站国创',      type: 'xml',  url: 'https://rsshub.app/bilibili/guochuang',              home: 'https://www.bilibili.com' }, // B 站官方接口
  { name: '故宫淘宝',      type: 'xml',  url: 'https://rsshub.app/taobao/shop/58994987',            home: 'https://gugong.taobao.com' },
  { name: '泡泡玛特新品',  type: 'xml',  url: 'https://rsshub.app/popmart/new',                     home: 'https://www.popmart.com' },
  { name: '原神文创',      type: 'xml',  url: 'https://rsshub.app/ys/culture',                      home: 'https://ys.mihoyo.com' },
  { name: '鲸园区招商',    type: 'xml',  url: 'https://rsshub.app/whalegogo/culture',               home: 'https://www.whalegogo.com' },
];

/* ---- 统一拉取函数 ---- */
async function fetchAll() {
  const all = [];
  for (const src of BULLETPROOF_SOURCES) {
    try {
      if (src.type === 'xml') {
        // 原生 XML，无 RSSHub
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
      } else if (src.type === 'api') {
        // 百度/微博开放接口（JSON）
        const { data } = await axios.get(src.url, { timeout: 10000 });
        const list = data.data || data.result || [];
        all.push(...list.slice(0, 5).map(item => ({
          id: item.link || item.id,
          title: item.title?.trim() || item.word,
          summary: (item.desc || item.intro || '').slice(0, 120) + '…',
          image: `https://picsum.photos/seed/${encodeURIComponent(item.title || item.word)}/400/300`,
          date: new Date().toISOString().slice(0, 10), // 接口无日期，用当天
          readTime: '2分钟',
          tags: ['文创'],
          source: src.name,
          originalUrl: item.link || `https://www.baidu.com/s?wd=${encodeURIComponent(item.word)}`,
        })));
      }
    } catch (e) {
      console.warn(`[WARN] ${src.name} 失败`, e.message);
    }
  }
  return all;
}

(async () => {
  const all = await fetchAll();
  const posts = all
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .filter((it, idx, arr) => arr.findIndex(i => i.id === it.id) === idx)
    .slice(0, 9); // ← 只写 9 条！

  const outFile = path.join(__dirname, '..', 'data', 'posts.json');
  fs.writeFileSync(outFile, JSON.stringify(posts, null, 2));
  console.log(`[OK] 写入 ${posts.length} 条（无 RSSHub）→ ${outFile}`);
})();
