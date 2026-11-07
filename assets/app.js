(function () {
  'use strict';
  var ua = navigator.userAgent || '';
  var found = /PlayStation\s+4[\/ ](\d+)\.(\d{1,2})(?!\d)/i.exec(ua);
  var firmware = found ? String(parseInt(found[1], 10)) + '.' + (found[2].length === 1 ? '0' : '') + found[2] : null;
  var isPS4 = /PlayStation\s+4/i.test(ua);
  var preview = '13.52';
  var selected = null;
  var launching = false;
  var goldenFirmwares = ['9.00','9.03','9.04','9.50','9.51','9.60','10.00','10.01','10.50','10.70','10.71','11.00','11.02','11.50','11.52','12.00','12.02','12.50','12.52','13.00'];
  function el(id) { return document.getElementById(id); }
  function text(id, value) { el(id).textContent = value; }
  function inList(list, value) { for (var i = 0; i < list.length; i++) { if (list[i] === value) return true; } return false; }
  function inRange(fw) {
    if (typeof fw !== 'string' || !/^\d+\.\d{2}$/.test(fw)) return false;
    var parts = fw.split('.');
    var version = parseInt(parts[0], 10) * 100 + parseInt(parts[1], 10);
    return version >= 900 && version <= 1352;
  }
  function routeFor(fw) {
    var listed = ["9.00", "9.03", "9.04", "9.50", "9.51", "9.60", "10.00", "10.01", "10.50", "10.70", "10.71", "11.00", "11.02", "11.50", "11.52", "12.00", "12.02", "12.50", "12.52", "13.00", "13.02", "13.04", "13.50", "13.52"];
    if (!inRange(fw) || !inList(listed,fw)) return null;
    return {name:'GoldHEN · '+fw,status:'ملفات داخل موقع عمر سنتر',url:'host/index.html',detail:'يفتح ملفات التشغيل داخل موقع عمر سنتر. اتبع تعليمات حفظ الملفات وراجع نتيجة الأداة.'};
  }
  function render() {
    var fw = firmware || (!isPS4 ? preview : null);
    var outsideRange = fw && !inRange(fw);
    selected = routeFor(fw);
    text('device-label', isPS4 ? 'PlayStation 4' : 'معاينة الواجهة');
    text('firmware', firmware || (isPS4 ? '—' : 'PS4'));
    text('version-label', firmware ? 'إصدار النظام' : (isPS4 ? 'تعذّرت قراءة الإصدار' : 'افتح من جهازك للتشغيل'));
    text('device-state', isPS4 ? (selected ? 'تم التعرف على الجهاز' : 'لا يوجد مسار مطابق') : 'متصفح آخر');
    el('device-state').className = 'badge' + (isPS4 ? (selected ? ' detected' : ' unsupported') : '');
    text('device-note', isPS4 ? (firmware ? 'طابق الرقم مع معلومات النظام قبل التشغيل.' : 'ما گدرنا نقرأ إصدار النظام. افتح الصفحة من متصفح PS4 الأصلي.') : 'هذه معاينة من هاتف أو كمبيوتر. اختيار إصدار هنا لا يعدّل أي جهاز.');
    el('desktop-preview').hidden = isPS4;
    text('route-title', selected ? selected.name : (outsideRange ? 'خارج نطاق الموقع' : 'الإصدار غير مدرج'));
    text('route-status', selected ? selected.status : 'التشغيل غير متاح');
    text('route-detail', selected ? selected.detail : (outsideRange ? 'هذه الواجهة مخصصة للإصدارات المدرجة من 9.00 إلى 13.52 فقط. لن يبدأ التشغيل على هذا الإصدار.' : 'لا يوجد رابط تشغيل مُعد لهذا الإصدار، حتى لو كان ضمن النطاق. راجع رقم النظام؛ لا تختَر إصدارًا مختلفًا عنه.'));
    el('launch').disabled = !isPS4 || !selected || !firmware || launching;
    text('launch-label', !isPS4 ? 'افتح من متصفح PS4 للتشغيل' : (!selected ? 'الإصدار غير مدرج' : (launching ? 'جارٍ فتح ملفات التشغيل…' : 'تشغيل GoldHEN')));
    text('launch-caption', selected ? 'التشغيل داخل موقع عمر سنتر، ويبقى الرابط على نفس النطاق.' : 'لن تبدأ طريقة غير مطابقة للإصدار.');
  }
  el('preview-firmware').addEventListener('change', function () { preview = this.value; render(); });
  el('launch').addEventListener('click', function () {
    if (launching || !isPS4 || !firmware) return;
    var target = routeFor(firmware);
    if (!target) return;

    launching = true;
    render();
    text('action-message','جارٍ فتح ملفات التشغيل داخل موقع عمر سنتر…');
    window.location.assign(target.url);
  });
  window.addEventListener('pageshow',function () { launching = false; text('action-message',''); render(); });
  el('help-toggle').addEventListener('click', function () {
    var expand = this.getAttribute('aria-expanded') !== 'true';
    this.setAttribute('aria-expanded',expand ? 'true' : 'false');
    el('help').hidden = !expand;
    this.querySelector('span').textContent = expand ? '−' : '+';
  });
  document.addEventListener('keydown', function (event) {
    var key = event.keyCode || event.which;
    if (key !== 38 && key !== 40) return;
    if (document.activeElement && /SELECT|INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
    var elements = document.querySelectorAll('a[href],button:not([disabled]),select');
    var items = [], current = -1;
    for (var i=0;i<elements.length;i++) { if (elements[i].offsetWidth || elements[i].offsetHeight) items.push(elements[i]); }
    for (var j=0;j<items.length;j++) { if (items[j] === document.activeElement) current = j; }
    if (!items.length) return;
    var next = current < 0 ? 0 : (current + (key === 40 ? 1 : -1) + items.length) % items.length;
    event.preventDefault(); items[next].focus();
  });
  render();
  if (isPS4 && selected) el('launch').focus();
  var context = document.modelContext;
  if (context && typeof context.registerTool === 'function') {
    try {
      var registration = context.registerTool({
        name:'get_ps4_launch_route',title:'قراءة مسار تشغيل PS4',
        description:'Read the firmware route shown by the Omar Center portal. Does not start a jailbreak or navigate.',
        inputSchema:{type:'object',properties:{},additionalProperties:false},
        annotations:{readOnlyHint:true,untrustedContentHint:false},
        execute:function (input) {
          if (input && Object.keys(input).length) throw new Error('This read-only tool accepts no arguments.');
          return {isPS4:isPS4,detectedFirmware:firmware,previewFirmware:!isPS4?preview:null,route:selected?{name:selected.name,status:selected.status,url:selected.url}:null,launchEnabled:!el('launch').disabled};
        }
      });
      if (registration && typeof registration.catch === 'function') registration.catch(function () {});
    } catch (ignore) {}
  }
})();
