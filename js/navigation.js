/* Jobs.ac.cn Navigation Translation */
(function(){
'use strict';
var originalText=new WeakMap();

function updateNavigation(){
window.JobsAcTranslation.load('navigation.json',function(translations){
document.querySelectorAll('header,nav,footer').forEach(function(container){
window.JobsAcLanguage.replaceTextNodes(
container,
translations,
originalText,
window.JobsAcLanguage.isChinese()
);
});
});
}

if(document.readyState==='loading'){
document.addEventListener('DOMContentLoaded',updateNavigation,{once:true});
}else{
updateNavigation();
}

document.addEventListener('turbo:load',updateNavigation);
document.addEventListener('jobsac:language-change',updateNavigation);
})();
