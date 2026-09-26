/* Jobs.ac.cn Homepage SEO Translation */
(function(){
'use strict';

function updateHomeSEO(){

if(!window.JobsAcContext||
window.JobsAcContext.lang!=='zh-cn'){
return;
}

if(window.JobsAcContext.path!=='/'){
return;
}

window.JobsAcTranslation.load(
'home.json',
function(data){

if(data.title){
document.title=data.title;
}

var description=document.querySelector(
'meta[name="description"]'
);

if(description&&data.meta_description){
description.setAttribute(
'content',
data.meta_description
);
}

});

}

document.addEventListener(
'DOMContentLoaded',
updateHomeSEO
);

document.addEventListener(
'turbo:load',
updateHomeSEO
);

})();
