/* Jobs.ac.cn Social Links */
(function(){
'use strict';

var ICON_SIZE = 20;
var SVG_NS = 'http://www.w3.org/2000/svg';

var LINKS = [
  {
    href: 'https://www.linkedin.com/company/jobs-ac-cn',
    label: 'LinkedIn',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z'
  },
  {
    href: 'https://www.facebook.com/jobs.ac.cn',
    label: 'Facebook',
    path: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
  },
  {
    href: 'https://x.com/Jobsaccn',
    label: 'X',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'
  }
];

function makeIcon(pathD, size){
  var svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  svg.setAttribute('fill', 'currentColor');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.cssText =
    'display:block;width:' + size + 'px;height:' + size + 'px;' +
    'visibility:visible;fill:currentColor;';

  var path = document.createElementNS(SVG_NS, 'path');
  path.setAttribute('d', pathD);
  svg.appendChild(path);

  return svg;
}

function inject(){
  var footer = document.querySelector('footer');
  if (!footer) return;
  if (footer.querySelector('.jac-social-row')) return;

  // Remove existing empty stubs
  footer.querySelectorAll('a[href*="linkedin.com"], a[href*="facebook.com"]').forEach(function(a){
    if (a.querySelector('.sr-only')) a.remove();
  });

  var row = document.createElement('div');
  row.className = 'jac-social-row';
  row.style.cssText =
    'max-width:64rem;margin:0 auto 1rem;padding:0 1rem;' +
    'display:flex;align-items:center;justify-content:center;gap:2rem;';

  LINKS.forEach(function(item){
    var a = document.createElement('a');
    a.href = item.href;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.setAttribute('aria-label', item.label);
    a.style.cssText =
      'color:var(--footer-link-color,#666);' +
      'display:inline-flex;align-items:center;justify-content:center;' +
      'width:' + ICON_SIZE + 'px;height:' + ICON_SIZE + 'px;' +
      'text-decoration:none;transition:opacity .15s;';

    a.appendChild(makeIcon(item.path, ICON_SIZE));
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
