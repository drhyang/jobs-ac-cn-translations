/* Jobs.ac.cn Navigation Translation */
(function(){
'use strict';

var originalText=new WeakMap();

function updateNavigation(){

if(!window.JobsAcLanguage||!window.JobsAcLanguage.replaceTextNodes){
setTimeout(updateNavigation,100);
return;
}

var containers=document.querySelectorAll('header,nav,footer');

if(!containers.length){
setTimeout(updateNavigation,100);
return;
}

window.JobsAcTranslation.load('navigation.json',function(translations){

console.log('navigation loaded',translations);
console.log('containers',containers.length);

containers.forEach(function(container){

window.JobsAcLanguage.replaceTextNodes(
container,
translations,
originalText,
window.JobsAcLanguage.isChinese()
);

});

});

}

updateNavigation();

document.addEventListener('DOMContentLoaded',updateNavigation,{once:true});
document.addEventListener('turbo:load',updateNavigation);
document.addEventListener('jobsac:language-change',updateNavigation);

})();
