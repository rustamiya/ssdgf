
(function(){
 var msg=document.getElementById('msgs'), hint=document.getElementById('hint'), button=document.getElementById('continue');
 if(!omarGroup){msg.textContent='هذا الإصدار غير مدرج.';return;}
 var expected=document.documentElement.getAttribute('data-group');
 if(omarGroup!==expected){location.replace('cache-'+omarGroup+'.html');return;}
 var ac=window.applicationCache;
 function ready(){msg.textContent='اكتمل تحميل ملفات التشغيل';hint.textContent='اضغط متابعة التشغيل. احتفظ برابط موقع عمر سنتر للمرة القادمة.';button.hidden=false;button.focus();}
 function failed(){msg.textContent='لم يكتمل التخزين دون إنترنت';hint.textContent='يمكنك متابعة التشغيل مع بقاء الإنترنت متصلًا، أو إعادة تحميل الصفحة للمحاولة.';button.href='index.html?online=1';button.hidden=false;}
 if(!ac){failed();return;}
 msg.textContent='جارٍ حفظ ملفات التشغيل…';
 ac.addEventListener('progress',function(e){if(e.total)msg.textContent='حفظ الملفات: '+Math.round(e.loaded/e.total*100)+'%';},false);
 ac.addEventListener('cached',ready,false);
 ac.addEventListener('noupdate',ready,false);
 ac.addEventListener('updateready',function(){try{ac.swapCache();}catch(e){}ready();},false);
 ac.addEventListener('error',failed,false);
 ac.addEventListener('obsolete',failed,false);
 if(ac.status===1)ready();
 if(ac.status===4){try{ac.swapCache();}catch(e){}ready();}
})();
