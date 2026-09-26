<script>
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
fetch(new URL('../zh-cn/'+file+'?t='+Date.now(),document.currentScript.src))
.then(function(r){return r.json();})
.then(function(data){
cache[file]=data;
callback(data);
})
.catch(function(e){console.error('Translation load failed:',file,e);});
}
};
})();
</script>
