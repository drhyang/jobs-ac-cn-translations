/* Jobs.ac.cn Translation Loader */
(function(){
'use strict';

var cache={};
var baseUrl='https://jobs-ac-cn-translations.pages.dev/zh-cn/';

window.JobsAcTranslation={
load:function(file,callback){
if(cache[file]){
callback(cache[file]);
return;
}

fetch(baseUrl+file+'?t='+Date.now())
.then(function(r){
if(!r.ok)throw new Error('HTTP '+r.status);
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
