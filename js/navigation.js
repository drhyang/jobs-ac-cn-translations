/* Jobs.ac.cn Navigation Translation Test */
(function(){
'use strict';

function translateNavigation(){

if(!window.JobsAcTranslation){
setTimeout(translateNavigation,100);
return;
}

window.JobsAcTranslation.load('navigation.json',function(translations){

document.querySelectorAll('header a,nav a,footer a').forEach(function(link){

var text=link.textContent.trim();

if(translations[text]){
link.textContent=translations[text];
}

});

});

}

translateNavigation();

document.addEventListener('turbo:load',translateNavigation);

})();
