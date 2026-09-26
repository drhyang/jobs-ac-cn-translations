/* Jobs.ac.cn Navigation Translation */
(function(){
'use strict';

var originalText=new WeakMap();

function updateNavigation(){
if(!window.JobsAcLanguage||!window.JobsAcLanguage.replaceTextNodes){
setTimeout(updateNavigation,100);
return;
}

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

document.addEventListener('DOMContentLoaded',updateNavigation,{once:true});
document.addEventListener('turbo:load',updateNavigation);
document.addEventListener('jobsac:language-change',updateNavigation);

})();
