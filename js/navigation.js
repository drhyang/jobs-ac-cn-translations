/* Jobs.ac.cn Navigation Translation */
(function(){
'use strict';

console.log('navigation.js loaded');
console.log('JobsAcLanguage:',window.JobsAcLanguage);

function check(){
console.log('check JobsAcLanguage:',window.JobsAcLanguage);

if(window.JobsAcLanguage){
console.log('JobsAcLanguage found');
return;
}

setTimeout(check,500);
}

check();

})();
