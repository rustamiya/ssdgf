var omarFirmware = null, omarGroup = null;
(function () {
 var match = /PlayStation\s+4[\/ ](\d+)\.(\d{1,2})(?!\d)/i.exec(navigator.userAgent || '');
 if (!match) return;
 var fw = parseInt(match[1],10) + '.' + (match[2].length === 1 ? '0' : '') + match[2];
 var groups = {"900": ["9.00", "9.03", "9.04", "9.50", "9.51", "9.60"], "css": ["10.00", "10.01", "10.50", "10.70", "10.71", "11.00", "11.02"], "slopkit": ["11.50", "11.52", "12.00", "12.02", "12.50", "12.52", "13.00", "13.02", "13.04", "13.50", "13.52"]};
 for (var group in groups) if (Object.prototype.hasOwnProperty.call(groups,group)) {
  for (var i=0;i<groups[group].length;i++) if (groups[group][i] === fw) { omarFirmware=fw; omarGroup=group; return; }
 }
})();
