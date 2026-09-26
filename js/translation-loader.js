(function(){
'use strict';

var cache={};

window.JobsAcTranslation={

load:function(file,callback){

if(cache[file]){
callback(cache[file]);
return;
}

fetch('https://jobs-ac-cn-translations.pages.dev/zh-cn/'+file, { credentials: 'omit' })
.then(function(r){
return r.json();
})
.then(function(data){
cache[file]=data;
callback(data);
})
.catch(function(e){
console.error('Translation load failed:',file,e);
});

}

};

function loadScript(name){

var script=document.createElement('script');
script.src='https://jobs-ac-cn-translations.pages.dev/js/'+name;
document.head.appendChild(script);

}


var lang=window.JobsAcContext.lang;
var path=window.JobsAcContext.path;


if(lang==='zh-CN'){

// all Chinese pages
loadScript('navigation.js');


// Static pages SEO
if(
    path==='/' ||
    path==='/zh-cn' ||
    path==='/zh-cn/' ||
    path==='/about' ||
    path==='/zh-cn/about' ||
    path==='/for-employers' ||
    path==='/zh-cn/for-employers' ||
    path==='/for-job-seekers' ||
    path==='/zh-cn/for-job-seekers' ||
    path==='/contact' ||
    path==='/zh-cn/contact' ||
    path==='/blog' ||
    path==='/zh-cn/blog' ||
    path==='/jobs' ||
    path==='/zh-cn/jobs'
){
    loadScript('pages.js');
}


// Chinese for employers and about pages
if(
path==='/for-employers' ||
path==='/zh-cn/for-employers' ||
path==='/about' ||
path==='/zh-cn/about'
){
    loadScript('content.js');
}

  
// Chinese search pages
if(
path.indexOf('/s/')===0 ||
path.indexOf('/zh-cn/s/')===0
){
loadScript('search.js');
}

}

})();
