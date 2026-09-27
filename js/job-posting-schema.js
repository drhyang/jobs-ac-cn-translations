/* Jobs.ac.cn — JobPosting JSON-LD schema injector (job detail pages only) */
(function(){
'use strict';

// Only run on job detail pages: /jobs/<slug> or /zh-cn/jobs/<slug>
// Excludes: /jobs, /jobs/, /zh-cn/jobs, /zh-cn/jobs/
if (!/^\/(?:zh-cn\/)?jobs\/[^/]+\/?$/.test(location.pathname)) return;

// ---------- Extract job data from the DOM ----------
function buildJobData(){
  var h1 = document.querySelector('h1');
  if (!h1) return null;

  var title = h1.textContent.trim();
  if (!title) return null;

  // Meta row: employer, location, employment type, date
  var metaRow = h1.parentElement && h1.parentElement.querySelector('.flex.items-center.gap-3');
  if (!metaRow) return null;

  // Employer link (first <a> in the meta row)
  var employerLink = metaRow.querySelector('a');
  var employer = employerLink ? employerLink.textContent.trim() : '';
  var employerUrl = employerLink ? employerLink.href : '';

  // Location: span.inline-flex
  var locationSpan = metaRow.querySelector('span.inline-flex');
  var locationText = locationSpan ? locationSpan.textContent.trim() : '';

  // Employment type: span.rounded-full
  var employmentSpan = metaRow.querySelector('span.rounded-full');
  var employmentText = employmentSpan ? employmentSpan.textContent.trim() : '';

  // Date: span.text-xs (not rounded-full, not inline-flex)
  var dateText = '';
  Array.from(metaRow.querySelectorAll(':scope > span')).some(function(s){
    if (
      s.classList.contains('text-xs') &&
      !s.classList.contains('rounded-full') &&
      !s.classList.contains('inline-flex')
    ) {
      dateText = s.textContent.trim();
      return true;
    }
    return false;
  });

  // Description: the main prose block
  var descEl = document.querySelector('.prose.prose-sm.max-w-none');
  var description = descEl ? descEl.innerHTML : '';

  if (!employer) return null;

  return {
    title: title,
    employer: employer,
    employerUrl: employerUrl,
    locationText: locationText,
    employmentText: employmentText,
    dateText: dateText,
    description: description
  };
}

// ---------- Helpers ----------
function parseRelativeDate(text){
  var now = new Date();
  if (!text) return now.toISOString().split('T')[0];

  var m;
  if ((m = text.match(/(\d+)\s*天/)))      { now.setDate(now.getDate()  - +m[1]); return now.toISOString().split('T')[0]; }
  if ((m = text.match(/(\d+)\s*小时/)))    { now.setHours(now.getHours() - +m[1]); return now.toISOString().split('T')[0]; }
  if ((m = text.match(/(\d+)\s*分钟/)))    { now.setMinutes(now.getMinutes() - +m[1]); return now.toISOString().split('T')[0]; }
  if ((m = text.match(/(\d+)\s*days?\s*ago/i)))    { now.setDate(now.getDate()  - +m[1]); return now.toISOString().split('T')[0]; }
  if ((m = text.match(/(\d+)\s*hours?\s*ago/i)))   { now.setHours(now.getHours() - +m[1]); return now.toISOString().split('T')[0]; }
  if ((m = text.match(/(\d+)\s*minutes?\s*ago/i))) { now.setMinutes(now.getMinutes() - +m[1]); return now.toISOString().split('T')[0]; }

  return now.toISOString().split('T')[0];
}

function mapEmploymentType(text){
  if (!text) return 'FULL_TIME';
  if (/全职|full[\s-]?time/i.test(text))   return 'FULL_TIME';
  if (/兼职|part[\s-]?time/i.test(text))   return 'PART_TIME';
  if (/合同|contract/i.test(text))          return 'CONTRACTOR';
  if (/实习|intern/i.test(text))            return 'INTERN';
  if (/临时|temporary|temp/i.test(text))    return 'TEMPORARY';
  return 'FULL_TIME';
}

function parseLocation(text){
  if (!text) return null;
  var parts = text.split(',').map(function(s){ return s.trim(); }).filter(Boolean);
  if (!parts.length) return null;

  var countryMap = {
    'malaysia':'MY','china':'CN','中国':'CN','united states':'US','usa':'US',
    'uk':'GB','united kingdom':'GB','singapore':'SG','japan':'JP','日本':'JP',
    'australia':'AU','canada':'CA','germany':'DE','france':'FR',
    'netherlands':'NL','hong kong':'HK','香港':'HK','taiwan':'TW','台湾':'TW'
  };

  var addr = { "@type": "PostalAddress" };

  addr.addressLocality = parts[0];
  if (parts.length >= 2) addr.addressRegion = parts[1];
  if (parts.length >= 3) {
    var c = parts[parts.length - 1].toLowerCase();
    addr.addressCountry = countryMap[c] || parts[parts.length - 1];
  }

  return addr;
}

// ---------- Inject ----------
function inject(){
  var data = buildJobData();
  if (!data) return false;

  // Remove previous schema (for Turbo navigations)
  var old = document.getElementById('jac-job-posting-ld');
  if (old) old.remove();

  var ld = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": data.title,
    "description": data.description,
    "datePosted": parseRelativeDate(data.dateText),
    "employmentType": mapEmploymentType(data.employmentText),
    "hiringOrganization": {
      "@type": "Organization",
      "name": data.employer
    },
    "url": location.href.split('?')[0]
  };

  if (data.employerUrl) {
    ld.hiringOrganization.sameAs = data.employerUrl;
  }

  var addr = parseLocation(data.locationText);
  if (addr) {
    ld.jobLocation = { "@type": "Place", "address": addr };
  }

  var s = document.createElement('script');
  s.type = 'application/ld+json';
  s.id = 'jac-job-posting-ld';
  s.textContent = JSON.stringify(ld);
  document.head.appendChild(s);

  return true;
}

// ---------- Boot ----------
if (!inject()) {
  var mo = new MutationObserver(function(){
    if (inject()) mo.disconnect();
  });
  mo.observe(document.documentElement, { childList: true, subtree: true });
  setTimeout(function(){ mo.disconnect(); }, 5000);
}

// Re-inject on Turbo navigation
document.addEventListener('turbo:load', inject);
document.addEventListener('turbo:render', inject);

})();
