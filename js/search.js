/* Jobs.ac.cn Search Category SEO */
(function(){
'use strict';

var originalH1 = new WeakMap();

var originalMeta = {
  path: null,
  title: null,
  description: null,
  twitterTitle: null,
  twitterDescription: null,
  ogTitle: null,
  ogDescription: null
};


function getSlug(){
  var path = window.location.pathname;
  var match = path.match(/^\/(?:zh-cn\/)?s\/([^/]+)\/?$/);
  return match ? match[1] : null;
}


function reveal(){
  document.documentElement.classList.remove('jac-search-loading');
}


function saveOriginalMeta(){
  var path = window.location.pathname;
  if (originalMeta.path === path) return;
  originalMeta.path = path;
  originalMeta.title = document.title;

  var description = document.querySelector('meta[name="description"]');
  var twitterTitle = document.querySelector('meta[name="twitter:title"]');
  var twitterDescription = document.querySelector('meta[name="twitter:description"]');
  var ogTitle = document.querySelector('meta[property="og:title"]');
  var ogDescription = document.querySelector('meta[property="og:description"]');

  originalMeta.description = description ? description.getAttribute('content') || '' : null;
  originalMeta.twitterTitle = twitterTitle ? twitterTitle.getAttribute('content') || '' : null;
  originalMeta.twitterDescription = twitterDescription ? twitterDescription.getAttribute('content') || '' : null;
  originalMeta.ogTitle = ogTitle ? ogTitle.getAttribute('content') || '' : null;
  originalMeta.ogDescription = ogDescription ? ogDescription.getAttribute('content') || '' : null;
}


function updateH1(text){
  document.querySelectorAll('h1').forEach(function(h1){
    var walker = document.createTreeWalker(h1, NodeFilter.SHOW_TEXT, null);
    var node;
    while (node = walker.nextNode()) {
      if (!originalH1.has(node)) originalH1.set(node, node.textContent);
      node.textContent = text;
      break;
    }
  });
}


function applyCategory(category){
  if (!category) { reveal(); return; }

  if (category.title) {
    document.title = category.title;
  }

  var description = document.querySelector('meta[name="description"]');
  if (description && category.description) {
    description.setAttribute('content', category.description);
  }

  var twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle && category.title) {
    twitterTitle.setAttribute('content', category.title);
  }

  var twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (twitterDescription && category.description) {
    twitterDescription.setAttribute('content', category.description);
  }

  var ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle && category.title) {
    ogTitle.setAttribute('content', category.title);
  }

  var ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription && category.description) {
    ogDescription.setAttribute('content', category.description);
  }

  if (category.h1) {
    updateH1(category.h1);
  }

  reveal();
}


function updateSearch(){
  try {
    var slug = getSlug();
    if (!slug) { reveal(); return; }

    // loader 还没到位 → 直接显示英文，别卡住用户
    if (!window.JobsAcTranslation || typeof window.JobsAcTranslation.load !== 'function') {
      reveal();
      return;
    }

    window.JobsAcTranslation.load('search.json', function(categories){
      try {
        if (!categories) { reveal(); return; }

        var category = categories[slug];
        if (!category) { reveal(); return; }

        saveOriginalMeta();

        // h1 已经在 DOM 里（服务端渲染），直接应用
        if (document.querySelector('h1')) {
          applyCategory(category);
          return;
        }

        // 极少见：h1 还没出现，盯着它
        var mo = new MutationObserver(function(){
          if (document.querySelector('h1')) {
            applyCategory(category);
            mo.disconnect();
          }
        });
        mo.observe(document.documentElement, { childList: true, subtree: true });

        // 观察器超时兜底
        setTimeout(function(){
          mo.disconnect();
          reveal();
        }, 1500);

      } catch (e) {
        console.error('search.js apply failed:', e);
        reveal();
      }
    });

  } catch (e) {
    console.error('search.js updateSearch failed:', e);
    reveal();
  }
}


// 立即执行，不等 DOMContentLoaded
updateSearch();


// Turbo 切页：重新藏，再翻译
document.addEventListener('turbo:before-render', function(){
  var path = location.pathname;
  if (/^\/(?:zh-cn\/)?s\/[^/]+/.test(path)) {
    document.documentElement.classList.add('jac-search-loading');
  }
});

document.addEventListener('turbo:load', updateSearch);


// 终极兜底：无论发生什么，2 秒后一定要显示
setTimeout(reveal, 2000);

})();
