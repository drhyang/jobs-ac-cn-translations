/* Jobs.ac.cn Homepage SEO */
(function(){
'use strict';

window.JobsAcTranslation.load(
'home.json',
function(data){

if(data.title){
document.title=data.title;
}

if(data.meta_title){

var ogTitle=document.querySelector(
'meta[property="og:title"]'
);

if(ogTitle){
ogTitle.setAttribute(
'content',
data.meta_title
);
}

}

if(data.meta_description){

var description=document.querySelector(
'meta[name="description"]'
);

if(description){
description.setAttribute(
'content',
data.meta_description
);
}

}

});

})();
