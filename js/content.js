/* Jobs.ac.cn Page Content Translation */
(function(){
'use strict';

function updateContent(){

window.JobsAcTranslation.load(
'content.json',
function(translations){

document.querySelectorAll('body').forEach(function(container){

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

if(document.readyState==='loading'){

document.addEventListener(
'DOMContentLoaded',
updateContent,
{once:true}
);

}else{

updateContent();

}

document.addEventListener(
'turbo:load',
updateContent
);

})();
