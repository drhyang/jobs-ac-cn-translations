/* Jobs.ac.cn Search Category SEO */
(function(){
'use strict';

var originalH1 = new WeakMap();

var originalMeta = {
  path: null,
  title: null,
  description: null,
  twitterTitle: null,
  twitterDescription: null,
  ogTitle: null,
  ogDescription: null
};


function getSlug(){

var path = window.location.pathname;

var match = path.match(
  /^\/(?:zh-cn\/)?s\/([^/]+)$/
);

return match ? match[1] : null;

}


function saveOriginalMeta(){

var path = window.location.pathname;

if(originalMeta.path===path){
return;
}

originalMeta.path=path;

originalMeta.title=document.title;


var description=document.querySelector(
'meta[name="description"]'
);

var twitterTitle=document.querySelector(
'meta[name="twitter:title"]'
);

var twitterDescription=document.querySelector(
'meta[name="twitter:description"]'
);

var ogTitle=document.querySelector(
'meta[property="og:title"]'
);

var ogDescription=document.querySelector(
'meta[property="og:description"]'
);


originalMeta.description =
description ?
description.getAttribute('content') || '' :
null;

originalMeta.twitterTitle =
twitterTitle ?
twitterTitle.getAttribute('content') || '' :
null;

originalMeta.twitterDescription =
twitterDescription ?
twitterDescription.getAttribute('content') || '' :
null;

originalMeta.ogTitle =
ogTitle ?
ogTitle.getAttribute('content') || '' :
null;

originalMeta.ogDescription =
ogDescription ?
ogDescription.getAttribute('content') || '' :
null;

}


function updateH1(text){

document.querySelectorAll('h1').forEach(function(h1){

var walker=document.createTreeWalker(
h1,
NodeFilter.SHOW_TEXT,
null
);

var node;

while(node=walker.nextNode()){

if(!originalH1.has(node)){
originalH1.set(node,node.textContent);
}

node.textContent=text;

break;

}

});

}


function updateSearch(){

var slug=getSlug();

if(!slug){
return;
}


window.JobsAcTranslation.load(
'search.json',
function(categories){

var category=categories[slug];

if(!category){
return;
}

saveOriginalMeta();


// title
if(category.title){

document.title=category.title;

}


// description
var description=document.querySelector(
'meta[name="description"]'
);

if(description){
description.setAttribute(
'content',
category.description
);
}


// twitter
var twitterTitle=document.querySelector(
'meta[name="twitter:title"]'
);

if(twitterTitle){
twitterTitle.setAttribute(
'content',
category.title
);
}


var twitterDescription=document.querySelector(
'meta[name="twitter:description"]'
);

if(twitterDescription){
twitterDescription.setAttribute(
'content',
category.description
);
}


// og
var ogTitle=document.querySelector(
'meta[property="og:title"]'
);

if(ogTitle){
ogTitle.setAttribute(
'content',
category.title
);
}


var ogDescription=document.querySelector(
'meta[property="og:description"]'
);

if(ogDescription){
ogDescription.setAttribute(
'content',
category.description
);
}


// H1
if(category.h1){
updateH1(category.h1);
}

});

}


function run(){

updateSearch();

setTimeout(
updateSearch,
300
);

}


if(document.readyState==='loading'){

document.addEventListener(
'DOMContentLoaded',
run,
{once:true}
);

}else{

run();

}


document.addEventListener(
'turbo:load',
run
);


})();
