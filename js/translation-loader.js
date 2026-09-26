/* Jobs.ac.cn Translation Loader */
(function(){
'use strict';

var cache={};
var scriptUrl=document.currentScript.src;
var baseUrl=new URL('../zh-cn/',scriptUrl);

window.JobsAcTranslation={
load:function(file,callback){
if(cache[file]){
callback(cache[file]);
return;
}
fetch(new URL(file,baseUrl)+'?t='+Date.now())
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
