
(function () {
 var msg=document.getElementById('msgs');
 if (!omarGroup) { msg.textContent='هذا الإصدار غير مدرج. افتح الصفحة من PS4 بإصدار مطابق.'; return; }
 var ac=window.applicationCache;
 var onlineMode=/(?:\?|&)online=1(?:&|$)/.test(location.search);
 if (!onlineMode && (!ac || ac.status === 0 || ac.status === 5)) {
   location.replace('cache-'+omarGroup+'.html'); return;
 }
 msg.textContent='جارٍ تحميل GoldHEN · '+omarFirmware;
 document.getElementById('hint').textContent='انتظر نتيجة التشغيل من الأداة. بقاء هذه العبارة لا يعني نجاح التفعيل.';
 var s=document.createElement('script');
 s.onerror=function(){msg.textContent='تعذّر تحميل ملفات التشغيل. أعد فتح الصفحة مع اتصال بالإنترنت.';};
 if(omarGroup==='900'){s.type='module';s.src='900/alert.js';}
 else if(omarGroup==='css'){
   try {localStorage.setItem('exploitChain','lapse');}catch(e){}
   s.src='css/main.js';s.onload=function(){setTimeout(function(){doJb();},500);};
 } else {
   s.type='module';
   var n=parseInt(omarFirmware.split('.')[0],10)*100+parseInt(omarFirmware.split('.')[1],10);
   s.src=n<=1202?'slopkit/chain_lapse.js':(n<=1300?'slopkit/chain_poops.js':'slopkit/jb.js?v=10');
 }
 document.head.appendChild(s);
})();
