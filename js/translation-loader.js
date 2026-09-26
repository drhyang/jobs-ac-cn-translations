/* Jobs.ac.cn Translation Loader */
(function(){
'use strict';

var cache={};

window.JobsAcTranslation={
pending:0,
load:function(file,callback){
if(cache[file]){
callback(cache[file]);
return;
}
fetch('https://jobs-ac-cn-translations.pages.dev/zh-cn/'+file+'?t='+Date.now())
.then(function(r){
return r.json();
})
.then(function(data){
cache[file]=data;
callback(data);
});
},
start:function(){
if(document.documentElement.lang.toLowerCase()==='zh-cn'){
document.documentElement.classList.add('translation-loading');
}
},
done:function(){
this.pending--;
if(this.pending<=0){
document.documentElement.classList.remove('translation-loading');
}
}
};

if(document.documentElement.lang.toLowerCase()==='zh-cn'){
document.documentElement.classList.add('translation-loading');
}

})();
