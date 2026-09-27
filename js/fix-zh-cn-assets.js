/* Jobs.ac.cn — Fix broken /zh-cn/ prefixed asset URLs (JobBoardly bug workaround) */
(function(){
'use strict';

// Only run on /zh-cn pages
if (!/^\/zh-cn(\/|$)/.test(location.pathname)) return;

// Broken path segments introduced by JobBoardly on zh-cn pages.
// e.g. https://assets.jobboardly.com/zh-cn/rails/active_storage/...
//      -> https://assets.jobboardly.com/rails/active_storage/...
var BAD_PATHS = [
  '/zh-cn/rails/',
  '/zh-cn/og/',
  '/zh-cn/assets/',
  '/zh-cn/packs/'
];

function fixUrl(str){
  if (!str || str.indexOf('/zh-cn/') === -1) return str;

  for (var i = 0; i < BAD_PATHS.length; i++) {
    var bad = BAD_PATHS[i];
    if (str.indexOf(bad) !== -1) {
      var good = bad.replace('/zh-cn/', '/');
      str = str.split(bad).join(good);
    }
  }
  return str;
}

function fixNode(node){
  if (!node || node.nodeType !== 1) return;

  var tag = node.tagName;

  // <img src="...">
  if (tag === 'IMG' && node.src && node.src.indexOf('/zh-cn/') !== -1) {
    var newSrc = fixUrl(node.src);
    if (newSrc !== node.src) node.src = newSrc;
  }

  // <img srcset> / <source srcset>
  if ((tag === 'IMG' || tag === 'SOURCE') && node.srcset && node.srcset.indexOf('/zh-cn/') !== -1) {
    var newSet = fixUrl(node.srcset);
    if (newSet !== node.srcset) node.srcset = newSet;
  }

  // Inline style with background-image
  var styleAttr = node.getAttribute && node.getAttribute('style');
  if (styleAttr && styleAttr.indexOf('/zh-cn/') !== -1) {
    var newStyle = fixUrl(styleAttr);
    if (newStyle !== styleAttr) node.setAttribute('style', newStyle);
  }

  // Descendants
  if (node.querySelectorAll) {
    node.querySelectorAll(
      'img[src*="/zh-cn/"], img[srcset*="/zh-cn/"], ' +
      'source[srcset*="/zh-cn/"], [style*="/zh-cn/"]'
    ).forEach(fixNode);
  }
}

function fixMeta(){
  document.querySelectorAll(
    'meta[content*="/zh-cn/rails/"], meta[content*="/zh-cn/og/"]'
  ).forEach(function(m){
    var c = m.getAttribute('content');
    var fixed = fixUrl(c);
    if (fixed !== c) m.setAttribute('content', fixed);
  });
}

function run(root){
  fixNode(root || document.documentElement);
  fixMeta();
}

// Run immediately
run();

// After DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function(){ run(); }, { once: true });
}

// Turbo navigation
document.addEventListener('turbo:load', function(){ run(); });
document.addEventListener('turbo:render', function(){ run(); });

// Watch for dynamically inserted content
var mo = new MutationObserver(function(mutations){
  mutations.forEach(function(m){
    m.addedNodes.forEach(function(node){
      if (node.nodeType === 1) fixNode(node);
    });
  });
});
mo.observe(document.documentElement, { childList: true, subtree: true });

})();
