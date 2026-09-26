/* Jobs.ac.cn Translation Loader */
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

})();
