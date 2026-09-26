/* Jobs.ac.cn Navigation Translation */
(function(){
'use strict';

var originalText=new WeakMap();

function updateNavigation(){

console.log('navigation update fired');

if(!window.JobsAcLanguage||!window.JobsAcLanguage.replaceTextNodes){
console.log('language not ready');
return;
}

window.JobsAcTranslation.load('navigation.json',function(translations){

console.log('translation loaded');

var containers=document.querySelectorAll('header,nav,footer');

console.log('containers:',containers.length);

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

document.addEventListener('DOMContentLoaded',updateNavigation);
document.addEventListener('turbo:load',updateNavigation);
document.addEventListener('jobsac:language-change',updateNavigation);

})();
