/* Jobs.ac.cn Email Application */
(function(){
'use strict';

function isJobDetailPage(){
var path=window.location.pathname;
return /^\/(?:zh-cn\/)?jobs\/[^/]+$/.test(path);
}

function isChinesePage(){
return (
window.location.pathname.startsWith('/zh-cn/') ||
document.documentElement.lang==='zh-CN'
);
}

function setupEmailApply(){

if(!isJobDetailPage()){
return;
}

var applyButton=document.getElementById('apply-btn');

if(!applyButton||applyButton.dataset.emailHandled==='true'){
return;
}

var href=applyButton.getAttribute('href');

if(!href||!/^mailto:/i.test(href)){
return;
}

applyButton.dataset.emailHandled='true';

applyButton.addEventListener('click',function(event){

var email=href
.replace(/^mailto:/i,'')
.split('?')[0];

event.preventDefault();

setTimeout(function(){
showApplicationModal(email);
},0);

},true);
}

function showApplicationModal(email){

var existingModal=document.getElementById(
'jobs-email-apply-modal'
);

if(existingModal){
existingModal.remove();
}

var chinese=isChinesePage();

var modal=document.createElement('div');
modal.id='jobs-email-apply-modal';

var overlay=document.createElement('div');
overlay.className='jobs-email-apply-overlay';

var dialog=document.createElement('div');
dialog.className='jobs-email-apply-dialog';
dialog.setAttribute('role','dialog');
dialog.setAttribute('aria-modal','true');
dialog.setAttribute(
'aria-labelledby',
'jobs-email-apply-title'
);

var closeButton=document.createElement('button');
closeButton.type='button';
closeButton.className='jobs-email-apply-close';
closeButton.setAttribute(
'aria-label',
chinese?'关闭':'Close'
);
closeButton.textContent='×';

var title=document.createElement('h2');
title.id='jobs-email-apply-title';
title.textContent=chinese
?'如何申请'
:'How to Apply';

var message=document.createElement('p');
message.textContent=chinese
?'请将您的申请材料发送至：'
:'Please send your application to:';

var emailAddress=document.createElement('div');
emailAddress.className='jobs-email-apply-address';
emailAddress.textContent=email;

var copyButton=document.createElement('button');
copyButton.type='button';
copyButton.className='jobs-email-apply-copy';
copyButton.textContent=chinese
?'复制邮箱地址'
:'Copy Email Address';

dialog.appendChild(closeButton);
dialog.appendChild(title);
dialog.appendChild(message);
dialog.appendChild(emailAddress);
dialog.appendChild(copyButton);

overlay.appendChild(dialog);
modal.appendChild(overlay);
document.body.appendChild(modal);

function closeModal(){
modal.remove();
}

closeButton.addEventListener('click',closeModal);

overlay.addEventListener('click',function(event){
if(event.target===overlay){
closeModal();
}
});

copyButton.addEventListener('click',function(){

if(
navigator.clipboard &&
navigator.clipboard.writeText
){

navigator.clipboard.writeText(email).then(function(){

copyButton.textContent=chinese
?'邮箱地址已复制'
:'Email Address Copied';

setTimeout(function(){
if(document.body.contains(copyButton)){
copyButton.textContent=chinese
?'复制邮箱地址'
:'Copy Email Address';
}
},2000);

});

}else{

var textarea=document.createElement('textarea');

textarea.value=email;
textarea.style.position='fixed';
textarea.style.opacity='0';

document.body.appendChild(textarea);

textarea.select();
document.execCommand('copy');

textarea.remove();

copyButton.textContent=chinese
?'邮箱地址已复制'
:'Email Address Copied';

setTimeout(function(){
if(document.body.contains(copyButton)){
copyButton.textContent=chinese
?'复制邮箱地址'
:'Copy Email Address';
}
},2000);

}

});

function handleEscape(event){

if(event.key==='Escape'){

closeModal();

document.removeEventListener(
'keydown',
handleEscape
);

}

}

document.addEventListener(
'keydown',
handleEscape
);

}

if(document.readyState==='loading'){
document.addEventListener(
'DOMContentLoaded',
setupEmailApply
);
}else{
setupEmailApply();
}

document.addEventListener(
'turbo:load',
setupEmailApply
);

})();
