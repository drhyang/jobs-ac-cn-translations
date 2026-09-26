/* Jobs.ac.cn Navigation Translation */
(function(){
'use strict';

var SELECTOR = 'header,nav,footer';
var cached = null;

function reveal(){
  document.documentElement.classList.remove('jac-i18n-loading');
}

function applyTranslations(translations){
  if (!translations) return;
  document.querySelectorAll(SELECTOR).forEach(function(container){
    var walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null);
    var node;
    while ((node = walker.nextNode())) {
      var raw = node.textContent;
      var text = raw.trim();
      if (!text) continue;
      var t = translations[text];
      if (t) node.textContent = raw.replace(text, t);
    }
  });
}

function tryApply(){
  if (!cached) return false;
  if (!document.querySelector(SELECTOR)) return false;
  applyTranslations(cached);
  reveal();
  return true;
}

// JSON 一到就尝试翻译
window.JobsAcTranslation.load('navigation.json', function(t){
  cached = t;
  if (tryApply()) return;

  // header 还没出现 → 盯着，一出现立刻翻译
  var mo = new MutationObserver(function(){
    if (tryApply()) mo.disconnect();
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });
});

// Turbo 切页
document.addEventListener('turbo:before-render', function(){
  document.documentElement.classList.add('jac-i18n-loading');
});
document.addEventListener('turbo:load', function(){
  if (cached) applyTranslations(cached);
  reveal();
});

// 兜底：超时也要显示
setTimeout(reveal, 1500);

})();
