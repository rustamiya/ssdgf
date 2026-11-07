(function(){'use strict';
var match=/PlayStation 5\/(\d+\.\d{2})(?!\d)/.exec(navigator.userAgent||'');
var supported=["9.00", "9.05", "9.20", "9.40", "9.60", "10.00", "10.01", "10.20", "10.40", "10.60", "11.00", "11.20", "11.40", "11.60", "12.00"];
var valid=match&&supported.indexOf(match[1])!==-1;
if(!valid){document.getElementById('ps5-entry-status').textContent='التشغيل متاح من متصفح PS5 وعلى الإصدارات المدرجة فقط. لم يبدأ الجلبريك.';return;}
window.location.replace("slopkit/poops.html?go=1&auto=1&production=1&trigger=netcontrol&attempts=8&only=ps0_preflight,ps1_prepare,ps3_stage0,ps4_validate,ps5_stage1,ps6_stage2,ps8_stage3,ps9_stage4,ps10_stage5&log=debug&payload=1&v=final");
})();
