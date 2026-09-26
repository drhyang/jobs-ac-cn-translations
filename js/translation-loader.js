/* Jobs.ac.cn Translation Loader */
(function(){
'use strict';

var cache={};
var pending=0;

if(document.documentElement.lang.toLowerCase()==='zh-cn'){
document.documentElement.classList.add('translation-loading');
}

window.JobsAcTranslation={
load:function(file,callback){
pending++;

if(cache[file]){
callback(cache[file]);
pending--;
check();
return;
}

fetch('https://jobs-ac-cn-translations.pages.dev/zh-cn/'+file+'?t='+Date.now())
.then(function(r){
return r.json();
})
.then(function(data){
cache[file]=data;
callback(data);
})
.catch(function(e){
console.error('Translation load failed:',file,e);
})
.finally(function(){
pending--;
check();
});
}
};

function check(){
if(pending===0){
document.documentElement.classList.remove('translation-loading');
}
}

})();
