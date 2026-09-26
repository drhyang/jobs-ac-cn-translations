/* Jobs.ac.cn Search Category SEO — meta/title only (h1 handled in <head>) */
(function(){
'use strict';

var originalMeta = {
  path: null, title: null, description: null,
  twitterTitle: null, twitterDescription: null,
  ogTitle: null, ogDescription: null
};

function getSlug(){
  var path = window.location.pathname;
  var match = path.match(/^\/(?:zh-cn\/)?s\/([^/]+)\/?$/);
  return match ? match[1] : null;
}

function saveOriginalMeta(){
  var path = window.location.pathname;
  if (originalMeta.path === path) return;
  originalMeta.path = path;
  originalMeta.title = document.title;

  var d  = document.querySelector('meta[name="description"]');
  var tt = document.querySelector('meta[name="twitter:title"]');
  var td = document.querySelector('meta[name="twitter:description"]');
  var ot = document.querySelector('meta[property="og:title"]');
  var od = document.querySelector('meta[property="og:description"]');

  originalMeta.description         = d  ? d.getAttribute('content')  || '' : null;
  originalMeta.twitterTitle        = tt ? tt.getAttribute('content') || '' : null;
  originalMeta.twitterDescription  = td ? td.getAttribute('content') || '' : null;
  originalMeta.ogTitle             = ot ? ot.getAttribute('content') || '' : null;
  originalMeta.ogDescription       = od ? od.getAttribute('content') || '' : null;
}

function applyMeta(cat){
  if (!cat) return;

  if (cat.title) document.title = cat.title;

  var d  = document.querySelector('meta[name="description"]');
  if (d  && cat.description) d.setAttribute('content', cat.description);

  var tt = document.querySelector('meta[name="twitter:title"]');
  if (tt && cat.title) tt.setAttribute('content', cat.title);

  var td = document.querySelector('meta[name="twitter:description"]');
  if (td && cat.description) td.setAttribute('content', cat.description);

  var ot = document.querySelector('meta[property="og:title"]');
  if (ot && cat.title) ot.setAttribute('content', cat.title);

  var od = document.querySelector('meta[property="og:description"]');
  if (od && cat.description) od.setAttribute('content', cat.description);
}

function updateMeta(){
  var slug = getSlug();
  if (!slug) return;

  // Reuse data already fetched by <head> — no second network round-trip
  if (window.__jacSearchCategory) {
    saveOriginalMeta();
    applyMeta(window.__jacSearchCategory);
    return;
  }

  if (!window.JobsAcTranslation) return;

  window.JobsAcTranslation.load('search.json', function(categories){
    if (!categories || !categories[slug]) return;
    saveOriginalMeta();
    applyMeta(categories[slug]);
  });
}

// Run immediately if possible
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', updateMeta, { once: true });
} else {
  updateMeta();
}

// Turbo navigation
document.addEventListener('turbo:load', function(){
  window.__jacSearchCategory = null;
  updateMeta();
});

})();
