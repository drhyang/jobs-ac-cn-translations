/* Jobs.ac.cn Static Pages SEO */
(function(){
'use strict';

function getPageKey(){

var path=window.location.pathname;

// remove zh-cn prefix
path=path.replace(/^\/zh-cn/,'');

// remove trailing slash
path=path.replace(/\/$/,'');

if(path===''){
return 'home';
}

return path.replace(/^\//,'');

}


window.JobsAcTranslation.load(
'pages.json',
function(pages){

var key=getPageKey();

var data=pages[key];

if(!data){
return;
}


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


var ogTitle=document.querySelector(
'meta[property="og:title"]'
);

if(ogTitle && data.meta_title){

ogTitle.setAttribute(
'content',
data.meta_title
);

}


var twitterTitle=document.querySelector(
'meta[name="twitter:title"]'
);

if(twitterTitle && data.meta_title){

twitterTitle.setAttribute(
'content',
data.meta_title
);

}


var twitterDescription=document.querySelector(
'meta[name="twitter:description"]'
);

if(twitterDescription && data.meta_description){

twitterDescription.setAttribute(
'content',
data.meta_description
);

}


var ogDescription=document.querySelector(
'meta[property="og:description"]'
);

if(ogDescription && data.meta_description){

ogDescription.setAttribute(
'content',
data.meta_description
);

}

});

})();
