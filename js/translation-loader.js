(function(){
'use strict';

var cache={};
var pending=0;

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

},

start:function(){
pending++;
},

done:function(){
pending--;

if(pending<=0){
document.documentElement.classList.remove('translation-loading');
}

}

};

function loadScript(name){

window.JobsAcTranslation.start();

var script=document.createElement('script');

script.src='https://jobs-ac-cn-translations.pages.dev/js/'+name;

document.head.appendChild(script);

}

if(window.JobsAcContext.lang==='zh-cn'){

loadScript('navigation.js');

}

})();
