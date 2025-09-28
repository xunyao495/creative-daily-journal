#!/usr/bin/env node
/**
 * crawl.js  —— 30+ 源文创资讯爬虫 → data/posts.json
 * 运行：node scripts/crawl.js
 */
const RSSParser = require('rss-parser');
const fs        = require('fs');
const path      = require('path');
const HttpsProxyAgent = require('https-proxy-agent');

/* ======  代理配置  ====== */
const proxy = process.env.PROXY_URL ? new HttpsProxyAgent(process.env.PROXY_URL) : null;
const parser = new RSSParser({
  timeout: 12000,
  headers: { 'User-Agent': 'Creative-Bot/3.0' },
  requestOptions: { agent: proxy },
});

/* ======  30+ 源表  ====== */
const ALL_SOURCES = [
  /* ---- 国内直连 ---- */
  { name: '新浪文创',        rssUrl: 'https://rsshub.app/sina/culture',         home: 'https://finance.sina.com.cn',  proxy: false },
  { name: '腾讯文创',        rssUrl: 'https://rsshub.app/tencent/news/culture', home: 'https://news.qq.com',          proxy: false },
  { name: '网易文创',        rssUrl: 'https://rsshub.app/netease/culture',      home: 'https://news.163.com',         proxy: false },
  { name: '故宫新闻',        rssUrl: 'https://rsshub.app/dpm/news',             home: 'https://www.dpm.org.cn',       proxy: false },
  { name: '微博热搜文创',    rssUrl: 'https://rsshub.app/weibo/search/文创',    home: 'https://weibo.com',            proxy: false },
  { name: '百度热搜文创',    rssUrl: 'https://rsshub.app/baidu/search/文创',    home: 'https://www.baidu.com',        proxy: false },
  { name: '小红书国风',      rssUrl: 'https://rsshub.app/xiaohongshu/user/5f3d7f7f0000000001006d8b', home: 'https://xiaohongshu.com', proxy: false },
  { name: 'B 站联名',        rssUrl: 'https://rsshub.app/bilibili/partner/goods', home: 'https://www.bilibili.com',   proxy: false },
  { name: '泡泡玛特新品',    rssUrl: 'https://rsshub.app/popmart/new',          home: 'https://www.popmart.com',      proxy: false },
  { name: '故宫淘宝',        rssUrl: 'https://rsshub.app/taobao/shop/58994987', home: 'https://gugong.taobao.com',    proxy: false },
  { name: '原神文创',        rssUrl: 'https://rsshub.app/ys/culture',           home: 'https://ys.mihoyo.com',        proxy: false },
  { name: '文旅部政策',      rssUrl: 'https://rsshub.app/gov/mct/policy',       home: 'http://www.mct.gov.cn',        proxy: false },

  /* ---- 外网走代理 ---- */
  { name: 'The Met',         rssUrl: 'https://rsshub.app/metmuseum/exhibitions', home: 'https://www.metmuseum.org',   proxy: true },
  { name: 'V&A',             rssUrl: 'https://rsshub.app/vamuseum/exhibitions',  home: 'https://www.vam.ac.uk',       proxy: true },
  { name: 'British Museum',  rssUrl: 'https://rsshub.app/britishmuseum/exhibitions', home: 'https://www.britishmuseum.org', proxy: true },
  { name: 'MoMA',            rssUrl: 'https://rsshub.app/moma/exhibitions',      home: 'https://www.moma.org',        proxy: true },
  { name: 'Design Week',     rssUrl: 'https://rsshub.app/designweek/news',       home: 'https://www.designweek.co.uk', proxy: true },
  { name: 'Creative Boom',   rssUrl: 'https://rsshub.app/creativeboom/articles', home: 'https://www.creativeboom.com', proxy: true },
  { name: 'It’s Nice That',  rssUrl: 'https://rsshub.app/itsnicethat/articles',  home: 'https://www.itsnicethat.com',  proxy: true },
  { name: 'Colossal',        rssUrl: 'https://rsshub.app/colossal/articles',     home: 'https://www.thisiscolossal.com', proxy: true },
  { name: 'OpenSea Drops',   rssUrl: 'https://rsshub.app/opensea/drops',         home: 'https://opensea.io',           proxy: true },
  { name: 'SuperRare',       rssUrl: 'https://rsshub.app/superrare/activity',    home: 'https://superrare.com',        proxy: true },
  { name: 'Foundation',      rssUrl: 'https://rsshub.app/foundation/activities', home: 'https://foundation.app',       proxy: true },
  { name: 'Twitter 文创热搜', rssUrl: 'https://rsshub.app/twitter/search/文创 -filter:retweets', home: 'https://twitter.com',      proxy: true },
  { name: 'IG 文创标签',     rssUrl: 'https://rsshub.app/instagram/tag/文创 creative',         home: 'https://instagram.com',    proxy: true },
  { name: 'Reddit 文创',     rssUrl: 'https://rsshub.app/reddit/subreddit/CulturalCreative', home: 'https://reddit.com', proxy: true },
  { name: 'TG 文创内参',     rssUrl: 'https://rsshub.app/telegram/channel/creativeinside', home: 'https://t.me/creativeinside', proxy: true },
  { name: 'Google Trends 文创', rssUrl: 'https://rsshub.app/google/trends/文创', home: 'https://trends.google.com', proxy: true },
];

/* ======  带重试的 RSS 拉取  ====== */
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
      await new Promise(r => setTimeout(r, 2000));
    }
  }
  return [];
}

/* ======  主流程  ====== */
(async () => {
  const all = [];
  for (const src of ALL_SOURCES) all.push(...await fetchRSS(src));
  const posts = all
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .filter((it, idx, arr) => arr.findIndex(i => i.id === it.id) === idx)
    .slice(0, 10);

  const outFile = path.join(__dirname, '..', 'data', 'posts.json');
  fs.writeFileSync(outFile, JSON.stringify(posts, null, 2));
  console.log(`[OK] 写入 ${posts.length} 条（${ALL_SOURCES.length} 源）→ ${outFile}`);
})();
