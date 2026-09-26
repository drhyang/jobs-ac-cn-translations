/* Jobs.ac.cn Navigation Translation Test */
(function(){
'use strict';

JobsAcTranslation.load('navigation.json',function(translations){
console.log('navigation.json loaded:',translations);

document.querySelectorAll('header,nav,footer').forEach(function(container){
container.querySelectorAll('*').forEach(function(el){
if(el.children.length===0){
var text=el.textContent.trim();
if(translations[text]){
el.textContent=translations[text];
}
}
});
});
});

})();
