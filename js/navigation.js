/* Jobs.ac.cn Navigation Translation */
(function(){
'use strict';

function isChinese(){
return window.location.pathname.indexOf('/zh-cn')===0;
}

function replaceNavigation(){

if(!isChinese()){
return;
}

window.JobsAcTranslation.load(
'navigation.json',
function(translations){

document.querySelectorAll(
'header,nav,footer'
).forEach(function(container){

var walker=document.createTreeWalker(
container,
NodeFilter.SHOW_TEXT
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

window.JobsAcTranslation.finish();

});

}

document.addEventListener(
'DOMContentLoaded',
replaceNavigation
);

document.addEventListener(
'turbo:load',
replaceNavigation
);

})();
