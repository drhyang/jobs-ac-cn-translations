/* Jobs.ac.cn Homepage SEO */
(function(){
'use strict';

window.JobsAcTranslation.load(
'home.json',
function(data){

console.log('home.json loaded:', data);

if(data.title){
document.title=data.title;
}


var description=document.querySelector(
'meta[name="description"]'
);

if(description && data.meta_description){

description.setAttribute(
'content',
data.meta_description
);

}

});

})();
