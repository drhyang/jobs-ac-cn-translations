/* Jobs.ac.cn Navigation Translation */
(function(){
'use strict';

var SELECTOR = 'header,nav,footer';
var cached = null;

function reveal(){
  document.documentElement.classList.remove('jac-i18n-loading');
}

function applyTranslations(translations){
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
  reveal();
}

function afterDom(fn){
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn, { once: true });
  } else {
    fn();
  }
}

function run(){
  if (cached) { applyTranslations(cached); return; }
  window.JobsAcTranslation.load('navigation.json', function(t){
    cached = t;
    afterDom(function(){ applyTranslations(t); });
  });
}

run();

document.addEventListener('turbo:before-render', function(){
  document.documentElement.classList.add('jac-i18n-loading');
});
document.addEventListener('turbo:render', run);
document.addEventListener('turbo:load', run);

setTimeout(reveal, 2500);

})();
