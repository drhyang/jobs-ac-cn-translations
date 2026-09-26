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
});

}

};

function loadScript(name){

var script=document.createElement('script');
script.src='https://jobs-ac-cn-translations.pages.dev/js/'+name;
document.head.appendChild(script);

}

if(window.JobsAcContext.lang==='zh-cn'){
loadScript('navigation.js');
}

if(window.JobsAcContext.path==='/'){
loadScript('home.js');
}

})();
