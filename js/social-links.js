/* Jobs.ac.cn Social Icons */
(function(){
'use strict';

var LINKS = [
  { href: 'https://www.linkedin.com/company/jobs-ac-cn', label: 'LinkedIn', svg: '...' },
  { href: 'https://www.facebook.com/jobs.ac.cn',        label: 'Facebook', svg: '...' }
];

function inject(){
  var footer = document.querySelector('footer');
  if (!footer) return;
  if (footer.querySelector('.jac-social-row')) return;

  footer.querySelectorAll('a[href*="linkedin.com"], a[href*="facebook.com"]').forEach(function(a){
    if (a.querySelector('.sr-only')) a.remove();
  });

  var row = document.createElement('div');
  row.className = 'jac-social-row';
  row.style.cssText = 'max-width: 64rem; margin: 0 auto 1rem; padding: 0 1rem; display: flex; align-items: center; gap: 1rem;';

  LINKS.forEach(function(item){
    var a = document.createElement('a');
    a.href = item.href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.setAttribute('aria-label', item.label);
    a.style.cssText = 'color: var(--footer-link-color, #666); display: inline-flex; align-items: center; transition: opacity .15s;';
    a.innerHTML = item.svg;
    a.addEventListener('mouseenter', function(){ a.style.opacity = '0.7'; });
    a.addEventListener('mouseleave', function(){ a.style.opacity = '1'; });
    row.appendChild(a);
  });

  footer.insertBefore(row, footer.firstChild);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inject, { once: true });
} else {
  inject();
}

document.addEventListener('turbo:load', inject);

})();
