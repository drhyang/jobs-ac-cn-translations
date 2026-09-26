(function(){
'use strict';

var cache={};

window.JobsAcTranslation={

load:function(file,callback){

if(cache[file]){
callback(cache[file]);
return;
}

fetch('https://jobs-ac-cn-translations.pages.dev/zh-cn/'+file)
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


// Chinese homepage
if(
path==='/' ||
path==='/zh-cn' ||
path==='/zh-cn/'
){
loadScript('home.js');
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
