/* Jobs.ac.cn Navigation Translation */
(function(){
'use strict';

var originalText=new WeakMap();

function updateNavigation(){
if(!window.JobsAcLanguage)return;

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

function waitForLanguage(){
if(window.JobsAcLanguage){
updateNavigation();
}else{
setTimeout(waitForLanguage,100);
}
}

waitForLanguage();

document.addEventListener('turbo:load',updateNavigation);
document.addEventListener('jobsac:language-change',updateNavigation);

})();
