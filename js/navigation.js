(function(){
'use strict';

var count=0;

var timer=setInterval(function(){
count++;

console.log(
'check',
count,
window.JobsAcLanguage
);

if(window.JobsAcLanguage){
clearInterval(timer);
console.log('FOUND',window.JobsAcLanguage);
}

if(count>20){
clearInterval(timer);
console.log('NOT FOUND');
}

},500);

})();
