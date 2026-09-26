/* Jobs.ac.cn Navigation Translation */
(function(){
'use strict';

function isChinese(){
return window.JobsAcContext &&
window.JobsAcContext.lang==='zh-cn';
}

function updateNavigation(){

if(!isChinese()){
return;
}

window.JobsAcTranslation.load('navigation.json',function(translations){

document.querySelectorAll('header,nav,footer').forEach(function(container){

var walker=document.createTreeWalker(
container,
NodeFilter.SHOW_TEXT,
null
);

var node;

while(node=walker.nextNode()){

var text=node.textContent.trim();

if(translations[text]){
node.textContent=node.textContent.replace(
text,
translations[text]
);
}

}

});

});

}

document.addEventListener('DOMContentLoaded',updateNavigation);
document.addEventListener('turbo:load',updateNavigation);

})();
