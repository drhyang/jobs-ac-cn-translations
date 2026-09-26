/* Jobs.ac.cn Navigation Translation */
(function(){
'use strict';

var originalText=new WeakMap();

function replaceTextNodes(container,translations,chinese){

var walker=document.createTreeWalker(
container,
NodeFilter.SHOW_TEXT,
null
);

var node;

while(node=walker.nextNode()){

var current=node.textContent.trim();

if(!originalText.has(node)){
originalText.set(node,node.textContent);
}

if(!chinese){
node.textContent=originalText.get(node);
continue;
}

if(translations[current]){
node.textContent=node.textContent.replace(
current,
translations[current]
);
}

}

}

function updateNavigation(){

window.JobsAcTranslation.load('navigation.json',function(translations){

replaceTextNodes(
document.querySelector('header'),
translations,
document.documentElement.lang.toLowerCase()==='zh-cn'
);

});

}

document.addEventListener('DOMContentLoaded',updateNavigation);
document.addEventListener('turbo:load',updateNavigation);

})();
