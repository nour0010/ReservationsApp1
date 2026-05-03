'use strict';

/* ══ ICONS ══ */
function ico(id, sz) {
  return '<svg style="width:' + (sz || 15) + 'px;height:' + (sz || 15) + 'px"><use href="#' + id + '"/></svg>';
}

/* ══ UTILS ══ */
const $ = function(id) {
  return document.getElementById(id);
};
const fmt = function(n) {
  return (+n || 0).toLocaleString('ar-IQ') + ' د.ع';
};
const uid = function() {
  return Math.random().toString(36).slice(2, 9);
};
const tod = function() {
  return new Date().toISOString().slice(0, 10);
};
const esc = function(s) {
  return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
};
const sT = function(s) {
  return s.patients.reduce(function(a, p) {
    return a + p.bookingFee + p.opFee;
  }, 0);
};
const sP = function(s) {
  return s.patients.filter(function(p) {
    return p.paid;
  }).reduce(function(a, p) {
    return a + p.bookingFee + p.opFee;
  }, 0);
};

/* ══ TOAST ══ */
var _tt;

function toast(msg, type, iconId) {
  type = type || 'ok';
  iconId = iconId || '';
  document.querySelectorAll('.toast').forEach(function(e) {
    e.remove();
  });
  clearTimeout(_tt);
  var el = document.createElement('div');
  el.className = 'toast t' + type;
  var imap = {
    ok: 'I-check',
    err: 'I-x',
    inf: 'I-cloud'
  };
  var iid = iconId || (imap[type] || '');
  el.innerHTML = (iid ? ico(iid, 14) : '') + '<span>' + msg + '</span>';
  document.body.appendChild(el);
  _tt = setTimeout(function() {
    el.remove();
  }, 3200);
}

/* ══ STATE ══ */
var V = {
  cur: 'home',
  prev: null,
  sid: null,
  epid: null,
  sq: ''
};

/* ══ TRANSLATIONS ══ */
var TR = {
  ar: {
    appName: 'حجوزات',
    appSub: 'نظام إدارة مراجعي العيادة',
    home: 'الرئيسية',
    sheets: 'أوراق الحجوزات',
    search: 'بحث عن مراجع',
    backup: 'النسخ الاحتياطي',
    settings: 'الإعدادات',
    newSheet: 'ورقة جديدة',
    allSheets: 'كل الأوراق',
    logout: 'تسجيل الخروج',
    todayPaid: 'إجمالي اليوم المدفوع',
    recentSheets: 'أحدث الأوراق',
    noSheets: 'لا توجد أوراق بعد',
    noPatients: 'لا يوجد مراجعون — اضغط إضافة مراجع',
    noSearch: 'اكتب اسم المراجع للبحث',
    noResults: 'لا توجد نتائج',
    addPatient: 'مراجع',
    export: 'تصدير',
    totalSheets: 'ورقة',
    totalPatients: 'مراجع',
    totalPaid: 'المدفوع',
    todayPaidStat: 'اليوم',
    paidStatus: 'مدفوع',
    unpaidStatus: 'لم يدفع',
    editBtn: 'تعديل',
    deleteBtn: 'حذف',
    searchPh: 'بحث عن مراجع...',
    searchPh2: 'اكتب اسم المراجع...',
    sheetOf: 'ورقة',
    loginBtn: 'تسجيل الدخول بـ Google',
    skipBtn: 'متابعة بدون تسجيل دخول',
    backupTitle: 'النسخ الاحتياطي',
    driveTitle: 'Google Drive - مزامنة تلقائية',
    driveDesc: 'تحفظ بياناتك تلقائياً عند أي تغيير.',
    syncNow: 'مزامنة الآن',
    restore: 'استعادة',
    exportTitle: 'تصدير البيانات',
    exportDesc: 'تصدير بياناتك بصيغ مختلفة.',
    importJSON: 'استيراد JSON',
    pdfAll: 'PDF كامل',
    xlsAll: 'Excel كامل',
    csvAll: 'CSV كامل',
    dangerTitle: 'منطقة الخطر',
    dangerDesc: 'حذف كافة البيانات المحلية نهائياً.',
    delBtn: 'حذف كل البيانات',
    settingsTitle: 'الإعدادات',
    appearTitle: 'المظهر',
    lightLbl: 'الوضع الفاتح',
    lightDesc: 'تبديل بين الوضع الداكن والفاتح',
    langTitle: 'اللغة',
    langLbl: 'اللغة',
    langDesc: 'تغيير لغة واجهة التطبيق',
    fontTitle: 'الخط',
    pricesTitle: 'الأسعار الافتراضية',
    bookingLbl: 'سعر الحجز (د.ع)',
    opLbl: 'سعر العملية (د.ع)',
    setDangerTitle: 'منطقة الخطر',
    setDangerDesc: 'حذف كافة البيانات المحلية نهائياً — لا يمكن التراجع',
    setDelBtn: 'حذف كل البيانات',
    confirmTitle: 'تأكيد الحذف النهائي',
    confirmDesc: 'هذا الإجراء سيحذف جميع البيانات نهائياً ولا يمكن التراجع.',
    confirmBtn: 'نعم، احذف كل شيء',
    cancel: 'إلغاء',
    notLoggedIn: 'غير مسجّل الدخول',
    noNet: 'غير متصل - المزامنة معلّقة',
    connected: 'متصل بـ Drive',
    lastSync: 'آخر مزامنة: ',
    noSyncYet: 'لم تتم مزامنة بعد',
    onlineMsg: 'تم الاتصال',
    offlineMsg: 'انقطع الاتصال',
    pendingMsg: 'سيتم الحفظ عند الاتصال',
    syncOk: 'تم الحفظ في Google Drive',
    sessionEnd: 'انتهت جلسة Google',
    demoMode: 'وضع تجريبي',
    logoutConfirm: 'تسجيل الخروج؟',
    confirmDelete: 'هل تريد حذف هذا المراجع؟',
    deletedAll: 'تم حذف كل البيانات',
    exportedJSON: 'تم تصدير JSON',
    exportedPDF: 'تم تصدير PDF',
    exportedExcel: 'تم تصدير Excel',
    exportedCSV: 'تم تصدير CSV',
    importedMsg: 'تم استيراد ',
    sheetsWord: ' ورقة',
    badFormat: 'تنسيق غير صحيح',
    importConfirm: 'سيتم استبدال البيانات. هل أنت متأكد؟',
    fullName: 'الاسم الكامل',
    namePh: 'اسم المراجع',
    time: 'وقت الموعد',
    age: 'العمر (سنة)',
    weight: 'الوزن (كغ)',
    bookingFee: 'سعر الحجز (د.ع)',
    opFee: 'سعر العملية (د.ع)',
    totalAmt: 'المبلغ الإجمالي',
    notes: 'ملاحظات',
    notesPh: 'اختياري...',
    paid2: 'تم الدفع',
    save: 'حفظ المراجع',
    sheetDateLbl: 'تاريخ الورقة',
    createBtn: 'إنشاء الورقة',
    neb_backup: 'النسخ',
    neb_settings: 'الإعدادات',
    year: 'سنة',
    kg: 'كغ',
    noteLabel: 'ملاحظة',
    statusLabel: 'الحالة',
    exportSheetTitle: 'تصدير الورقة',
    exportPDF: 'تصدير PDF',
    exportExcel: 'تصدير Excel',
    exportCSV: 'تصدير CSV',
    remaining: 'المتبقي',
    dir: 'rtl',
    lang: 'ar'
  },
  en: {
    appName: 'Hujuzat',
    appSub: 'Clinic Patient Management',
    home: 'Home',
    sheets: 'Booking Sheets',
    search: 'Search',
    backup: 'Backup',
    settings: 'Settings',
    newSheet: 'New Sheet',
    allSheets: 'All Sheets',
    logout: 'Sign Out',
    todayPaid: "Today Revenue",
    recentSheets: 'Recent Sheets',
    noSheets: 'No sheets yet',
    noPatients: 'No patients - tap Add Patient',
    noSearch: 'Type patient name to search',
    noResults: 'No results found',
    addPatient: 'Patient',
    export: 'Export',
    totalSheets: 'Sheets',
    totalPatients: 'Patients',
    totalPaid: 'Paid',
    todayPaidStat: 'Today',
    paidStatus: 'Paid',
    unpaidStatus: 'Unpaid',
    editBtn: 'Edit',
    deleteBtn: 'Delete',
    searchPh: 'Search patient...',
    searchPh2: 'Type patient name...',
    sheetOf: 'Sheet',
    loginBtn: 'Sign in with Google',
    skipBtn: 'Continue without signing in',
    backupTitle: 'Backup',
    driveTitle: 'Google Drive - Auto Sync',
    driveDesc: 'Data is saved automatically on every change.',
    syncNow: 'Sync Now',
    restore: 'Restore',
    exportTitle: 'Export Data',
    exportDesc: 'Export your data in different formats.',
    importJSON: 'Import JSON',
    pdfAll: 'Full PDF',
    xlsAll: 'Full Excel',
    csvAll: 'Full CSV',
    dangerTitle: 'Danger Zone',
    dangerDesc: 'Permanently delete all local data.',
    delBtn: 'Delete All Data',
    settingsTitle: 'Settings',
    appearTitle: 'Appearance',
    lightLbl: 'Light Mode',
    lightDesc: 'Switch between dark and light mode',
    langTitle: 'Language',
    langLbl: 'Language',
    langDesc: 'Change app interface language',
    fontTitle: 'Font',
    pricesTitle: 'Default Prices',
    bookingLbl: 'Booking Fee (IQD)',
    opLbl: 'Op Fee (IQD)',
    setDangerTitle: 'Danger Zone',
    setDangerDesc: 'Permanently delete all local data — cannot be undone',
    setDelBtn: 'Delete All Data',
    confirmTitle: 'Confirm Permanent Delete',
    confirmDesc: 'This will permanently delete all data and cannot be undone.',
    confirmBtn: 'Yes, delete everything',
    cancel: 'Cancel',
    notLoggedIn: 'Not signed in',
    noNet: 'Offline - sync pending',
    connected: 'Connected to Drive',
    lastSync: 'Last sync: ',
    noSyncYet: 'Not synced yet',
    onlineMsg: 'Back online',
    offlineMsg: 'Connection lost',
    pendingMsg: 'Will sync when online',
    syncOk: 'Saved to Google Drive',
    sessionEnd: 'Google session expired',
    demoMode: 'Demo mode',
    logoutConfirm: 'Sign out?',
    confirmDelete: 'Delete this patient?',
    deletedAll: 'All data deleted',
    exportedJSON: 'JSON exported',
    exportedPDF: 'PDF exported',
    exportedExcel: 'Excel exported',
    exportedCSV: 'CSV exported',
    importedMsg: 'Imported ',
    sheetsWord: ' sheets',
    badFormat: 'Invalid format',
    importConfirm: 'This will replace all data. Are you sure?',
    fullName: 'Full Name',
    namePh: 'Patient name',
    time: 'Appointment Time',
    age: 'Age (years)',
    weight: 'Weight (kg)',
    bookingFee: 'Booking Fee (IQD)',
    opFee: 'Op Fee (IQD)',
    totalAmt: 'Total Amount',
    notes: 'Notes',
    notesPh: 'Optional...',
    paid2: 'Paid',
    save: 'Save Patient',
    sheetDateLbl: 'Sheet Date',
    createBtn: 'Create Sheet',
    neb_backup: 'Backup',
    neb_settings: 'Settings',
    year: 'y',
    kg: 'kg',
    noteLabel: 'Note',
    statusLabel: 'Status',
    exportSheetTitle: 'Export Sheet',
    exportPDF: 'Export PDF',
    exportExcel: 'Export Excel',
    exportCSV: 'Export CSV',
    remaining: 'Remaining',
    dir: 'ltr',
    lang: 'en'
  }
};

function t(k) {
  return (TR[CFG.lang] || TR.ar)[k] || k;
}

/* ══ SETTINGS ══ */
var CFG = {
  theme: 'dark',
  font: 'Cairo',
  defBooking: 20000,
  defOp: 0,
  lang: 'ar'
};
try {
  var _c = JSON.parse(localStorage.getItem('hj_cfg') || '{}');
  for (var k in _c) {
    CFG[k] = _c[k];
  }
} catch (e) {}

function saveCFG() {
  localStorage.setItem('hj_cfg', JSON.stringify(CFG));
}

function applySettings() {
  document.documentElement.dataset.theme = CFG.theme;
  document.documentElement.style.setProperty('--font', "'" + CFG.font + "', sans-serif");
  var tl = $('tog-light');
  if (tl) tl.checked = CFG.theme === 'light';
  document.querySelectorAll('.font-opt').forEach(function(el) {
    el.classList.toggle('sel', el.style.fontFamily.indexOf(CFG.font) >= 0);
  });
  var db = $('def-booking'),
    dop = $('def-op');
  if (db) db.value = CFG.defBooking;
  if (dop) dop.value = CFG.defOp;
}

function toggleTheme(light) {
  CFG.theme = light ? 'light' : 'dark';
  saveCFG();
  applySettings();
}

function setFont(font, el) {
  CFG.font = font;
  saveCFG();
  document.querySelectorAll('.font-opt').forEach(function(e) {
    e.classList.remove('sel');
  });
  el.classList.add('sel');
  document.documentElement.style.setProperty('--font', "'" + font + "', sans-serif");
}

function saveDef() {
  CFG.defBooking = +$('def-booking').value || 20000;
  CFG.defOp = +$('def-op').value || 0;
  saveCFG();
}

function setLang(lang) {
  CFG.lang = lang;
  saveCFG();
  applyLang();
  render(V.cur);
}

function applyLang() {
  var L = TR[CFG.lang] || TR.ar;
  document.documentElement.lang = L.lang;
  document.documentElement.dir = L.dir;
  // update all static text
  function st(id, txt) {
    var el = $(id);
    if (el) el.textContent = txt;
  }
  st('app-title', L.appName);
  st('app-sub', L.appSub);
  st('recent-lbl', L.recentSheets);
  st('sheets-page-title', L.sheets);
  st('search-page-title', L.search);
  st('backup-page-title', L.backupTitle);
  st('settings-page-title', L.settingsTitle);
  st('bk-drive-title', L.driveTitle);
  st('bk-drive-desc', L.driveDesc);
  st('bk-sync-btn', L.syncNow);
  st('bk-restore-btn', L.restore);
  st('bk-export-title', L.exportTitle);
  st('bk-export-desc', L.exportDesc);
  st('bk-import-btn', L.importJSON);
  st('bk-danger-title', L.dangerTitle);
  st('bk-danger-desc', L.dangerDesc);
  st('bk-del-btn', L.delBtn);
  st('exp-pdf-txt', L.pdfAll);
  st('exp-xls-txt', L.xlsAll);
  st('exp-csv-txt', L.csvAll);
  st('set-appear-title', L.appearTitle);
  st('set-light-lbl', L.lightLbl);
  st('set-light-desc', L.lightDesc);
  st('set-lang-title', L.langTitle);
  st('set-lang-lbl', L.langLbl);
  st('set-lang-desc', L.langDesc);
  st('set-font-title', L.fontTitle);
  st('set-prices-title', L.pricesTitle);
  st('lbl-booking', L.bookingLbl);
  st('lbl-op', L.opLbl);
  st('set-danger-title', L.setDangerTitle);
  st('set-danger-desc', L.setDangerDesc);
  st('set-del-btn', L.setDelBtn);
  st('sb-today-lbl', L.todayPaid);
  st('sb-logout-txt', L.logout);
  st('neb-bk-txt', L.neb_backup);
  st('neb-st-txt', L.neb_settings);
  // nav search
  var ns = $('nav-s');
  if (ns) ns.placeholder = L.searchPh;
  var si = $('s-inp');
  if (si) si.placeholder = L.searchPh2;
  // sidebar items
  document.querySelectorAll('.sbi-txt').forEach(function(el) {
    var key = el.getAttribute('data-key');
    if (key && L[key]) el.textContent = L[key];
  });
  // buttons with data-key
  document.querySelectorAll('[data-key]').forEach(function(el) {
    if (el.tagName !== 'SPAN') return;
    var key = el.getAttribute('data-key');
    if (key && L[key]) el.textContent = L[key];
  });
  // lang buttons active state
  var ba = $('btn-ar'),
    be = $('btn-en');
  if (ba) ba.classList.toggle('la', CFG.lang === 'ar');
  if (be) be.classList.toggle('la', CFG.lang === 'en');
  // update nav extra active
  updateNavExtra();
}

/* ══ DATA ══ */
var DB = [];
try {
  DB = JSON.parse(localStorage.getItem('hj_db')) || [];
} catch (e) {}
if (!DB.length) DB = [{
  id: 's0',
  date: '2025-02-10',
  patients: [{
      id: 1,
      name: 'أحمد محمد علي',
      age: 35,
      weight: 78,
      time: '09:00',
      bookingFee: 20000,
      opFee: 0,
      paid: true,
      notes: ''
    },
    {
      id: 2,
      name: 'فاطمة حسن',
      age: 28,
      weight: 62,
      time: '09:30',
      bookingFee: 20000,
      opFee: 150000,
      paid: false,
      notes: 'عملية استئصال'
    },
    {
      id: 3,
      name: 'كريم عبدالله',
      age: 52,
      weight: 90,
      time: '10:00',
      bookingFee: 20000,
      opFee: 0,
      paid: true,
      notes: ''
    }
  ]
}];

function saveLocal() {
  try {
    localStorage.setItem('hj_db', JSON.stringify(DB));
  } catch (e) {}
}

/* ══ GOOGLE DRIVE ══ */
var GD = {
  clientId: '213490399348-vqtb9psmtl351o8v04s40u3unaaca7ie.apps.googleusercontent.com',
  scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
  token: null,
  user: null,
  fileId: null,
  fileName: 'hujuzat_clinic_data.json',
  pending: false
};
try {
  var _s = JSON.parse(localStorage.getItem('hj_sess') || '{}');
  if (_s.token) {
    GD.token = _s.token;
    GD.user = _s.user;
    GD.fileId = _s.fileId || null;
  }
} catch (e) {}

function saveSession() {
  localStorage.setItem('hj_sess', JSON.stringify({
    token: GD.token,
    user: GD.user,
    fileId: GD.fileId
  }));
}

function startGoogleLogin() {
  if (GD.clientId.indexOf('YOUR_') === 0) {
    demoLogin();
    return;
  }
  try {
    var client = google.accounts.oauth2.initTokenClient({
      client_id: GD.clientId,
      scope: GD.scope,
      callback: function(resp) {
        if (resp.error) {
          toast('فشل تسجيل الدخول', 'err');
          return;
        }
        GD.token = resp.access_token;
        fetchUserInfo().then(function() {
          saveSession();
          onLoginSuccess();
        });
      }
    });
    client.requestAccessToken();
  } catch (e) {
    demoLogin();
  }
}

function fetchUserInfo() {
  return fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: 'Bearer ' + GD.token
      }
    })
    .then(function(r) {
      return r.json();
    })
    .then(function(j) {
      GD.user = j;
    })
    .catch(function() {
      GD.user = {
        name: 'مستخدم',
        email: '',
        picture: ''
      };
    });
}

function demoLogin() {
  GD.token = 'demo';
  GD.user = {
    name: 'مستخدم تجريبي',
    email: 'demo@clinic.app',
    picture: ''
  };
  saveSession();
  onLoginSuccess();
  toast(t('demoMode'), 'inf');
}

function skipLogin() {
  GD.token = null;
  GD.user = null;
  $('login-screen').classList.add('hidden');
  initApp();
}

function onLoginSuccess() {
  $('login-screen').classList.add('hidden');
  initApp();
  if (GD.token && GD.token !== 'demo') loadFromDrive(true);
}

function logout() {
  if (!confirm(t('logoutConfirm'))) return;
  GD.token = null;
  GD.user = null;
  GD.fileId = null;
  localStorage.removeItem('hj_sess');
  updateUserUI();
  $('login-screen').classList.remove('hidden');
  closeSB();
}

function updateUserUI() {
  var has = !!GD.user;
  var nu = $('nav-user'),
    ni = $('nav-user-txt');
  if (has) {
    nu.classList.add('show');
    if (GD.user.picture) {
      var img = document.createElement('img');
      img.src = GD.user.picture;
      img.style.cssText = 'width:100%;height:100%;object-fit:cover;border-radius:50%';
      img.onerror = function() {
        ni.innerHTML = ico('I-user', 15);
      };
      ni.innerHTML = '';
      ni.appendChild(img);
    } else {
      ni.innerHTML = ico('I-user', 15);
    }
    $('sdot').classList.add('show');
  } else {
    nu.classList.remove('show');
    $('sdot').classList.remove('show');
  }
  var sr = $('sb-urow');
  if (has) {
    sr.classList.add('show');
    var sav = $('sb-uav');
    if (GD.user.picture) {
      sav.innerHTML = '';
      var simg = document.createElement('img');
      simg.src = GD.user.picture;
      simg.style.cssText = 'width:38px;height:38px;border-radius:50%;object-fit:cover';
      sav.appendChild(simg);
    } else {
      $('sb-utxt').innerHTML = ico('I-user', 18);
    }
    $('sb-uname').textContent = GD.user.name || '';
    $('sb-uemail').textContent = GD.user.email || '';
    $('sb-out').classList.add('show');
  } else {
    sr.classList.remove('show');
    $('sb-out').classList.remove('show');
  }
}

function setSyncDot(st) {
  var d = $('sdot');
  if (!GD.user) {
    d.classList.remove('show');
    return;
  }
  d.classList.add('show');
  var c = {
    ok: '#4ade80',
    syncing: 'var(--accent2)',
    err: '#f87171',
    off: '#6b7280'
  };
  d.style.cssText = 'width:7px;height:7px;border-radius:50%;flex-shrink:0;display:block;transition:all .3s;background:' + (c[st] || c.ok) + ';box-shadow:' + (st === 'off' ? 'none' : '0 0 5px ' + (c[st] || c.ok)) + ';animation:' + (st === 'syncing' ? 'pulse 1s ease infinite' : 'none');
}

var _syncT;

function save() {
  saveLocal();
  if (GD.token && GD.token !== 'demo' && navigator.onLine) {
    clearTimeout(_syncT);
    setSyncDot('syncing');
    _syncT = setTimeout(forceDriveSync, 2500);
  }
}

function forceDriveSync() {
  if (!GD.token || GD.token === 'demo') {
    toast(t('notLoggedIn'), 'inf');
    return;
  }
  if (!navigator.onLine) {
    GD.pending = true;
    setSyncDot('off');
    toast(t('pendingMsg'), 'inf');
    return;
  }
  setSyncDot('syncing');
  var content = JSON.stringify({
    v: 2,
    ts: Date.now(),
    data: DB
  });
  var p;
  if (GD.fileId) {
    p = fetch('https://www.googleapis.com/upload/drive/v3/files/' + GD.fileId + '?uploadType=media', {
      method: 'PATCH',
      headers: {
        Authorization: 'Bearer ' + GD.token,
        'Content-Type': 'application/json'
      },
      body: content
    }).then(function(r) {
      if (r.status === 401) {
        GD.token = null;
        saveSession();
        setSyncDot('err');
        toast(t('sessionEnd'), 'err');
        throw new Error('401');
      }
      if (!r.ok) throw new Error(r.status);
      return null;
    });
  } else {
    var form = new FormData();
    form.append('metadata', new Blob([JSON.stringify({
      name: GD.fileName,
      mimeType: 'application/json'
    })], {
      type: 'application/json'
    }));
    form.append('file', new Blob([content], {
      type: 'application/json'
    }));
    p = fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + GD.token
        },
        body: form
      }).then(function(r) {
        if (!r.ok) throw new Error(r.status);
        return r.json();
      })
      .then(function(j) {
        if (j.id) {
          GD.fileId = j.id;
          saveSession();
        }
      });
  }
  p.then(function() {
    GD.pending = false;
    var now = new Date().toLocaleString('ar');
    localStorage.setItem('hj_last_sync', now);
    setSyncDot('ok');
    $('sb-usync').textContent = t('lastSync') + now;
    updateBackupUI();
    toast(t('syncOk'));
  }).catch(function(err) {
    setSyncDot('err');
    if (err.message !== '401') toast(t('syncOk').replace('تم', 'فشل'), 'err');
  });
}

function loadFromDrive(silent) {
  if (!GD.token || GD.token === 'demo') {
    if (!silent) toast(t('notLoggedIn'), 'inf');
    return;
  }
  if (!navigator.onLine) {
    toast(t('noNet'), 'inf');
    return;
  }
  if (!silent) setSyncDot('syncing');
  var fid = GD.fileId;
  var p;
  if (!fid) {
    p = fetch("https://www.googleapis.com/drive/v3/files?q=name='" + GD.fileName + "'+and+trashed=false&fields=files(id,modifiedTime)&orderBy=modifiedTime+desc", {
        headers: {
          Authorization: 'Bearer ' + GD.token
        }
      }).then(function(r) {
        return r.json();
      })
      .then(function(d) {
        if (!d.files || !d.files.length) {
          if (!silent) toast(t('notLoggedIn'), 'inf');
          setSyncDot('ok');
          return null;
        }
        GD.fileId = d.files[0].id;
        saveSession();
        return GD.fileId;
      });
  } else {
    p = Promise.resolve(fid);
  }
  p.then(function(id) {
    if (!id) return;
    return fetch('https://www.googleapis.com/drive/v3/files/' + id + '?alt=media', {
        headers: {
          Authorization: 'Bearer ' + GD.token
        }
      }).then(function(r) {
        if (!r.ok) throw new Error(r.status);
        return r.json();
      })
      .then(function(obj) {
        var imp = obj.data || obj;
        if (!Array.isArray(imp)) throw new Error(t('badFormat'));
        if (!silent && !confirm(t('importConfirm'))) return;
        DB = imp;
        saveLocal();
        var now = new Date().toLocaleString('ar');
        localStorage.setItem('hj_last_sync', now);
        render(V.cur);
        setSyncDot('ok');
        if (!silent) toast(t('importedMsg') + DB.length + t('sheetsWord'));
        updateBackupUI();
      });
  }).catch(function(err) {
    setSyncDot('err');
    if (!silent) toast(err.message, 'err');
  });
}

window.addEventListener('online', function() {
  if (GD.pending) forceDriveSync();
  toast(t('onlineMsg'));
});
window.addEventListener('offline', function() {
  setSyncDot('off');
  toast(t('offlineMsg'), 'inf');
});

function updateBackupUI() {
  var box = $('bk-ssbox'),
    txt = $('bk-ss-txt'),
    ico_el = $('bk-ss-ico');
  if (!box) return;
  var last = localStorage.getItem('hj_last_sync');
  $('last-sync-lbl').textContent = last ? (t('lastSync') + last) : t('noSyncYet');
  if (!GD.token) {
    box.className = 'ssbox ssoff';
    ico_el.innerHTML = '<use href="#I-warn"/>';
    txt.textContent = t('notLoggedIn');
  } else if (!navigator.onLine) {
    box.className = 'ssbox sswait';
    ico_el.innerHTML = '<use href="#I-wifi0"/>';
    txt.textContent = t('noNet');
  } else {
    box.className = 'ssbox ssok';
    ico_el.innerHTML = '<use href="#I-check"/>';
    txt.textContent = t('connected') + ' · ' + (GD.user ? GD.user.email || '' : '');
  }
}

/* ══ NAVIGATION ══ */
function go(view, sid) {
  V.prev = V.cur;
  V.cur = view;
  if (sid !== undefined) V.sid = sid;
  document.querySelectorAll('.pg').forEach(function(p) {
    p.classList.remove('on');
  });
  var pg = $('pg-' + view);
  if (pg) {
    pg.classList.remove('on');
    void pg.offsetWidth;
    pg.classList.add('on');
  }
  $('back-btn').classList.toggle('show', view !== 'home');
  document.querySelectorAll('.sbi[id]').forEach(function(el) {
    el.classList.remove('act');
  });
  var si = $('sbi-' + view);
  if (si) si.classList.add('act');
  closeSB();
  render(view);
  updateNavExtra();
}

function goBack() {
  go(V.prev && V.prev !== V.cur ? V.prev : 'home');
}

function updateNavExtra() {
  document.querySelectorAll('.neb').forEach(function(b) {
    b.classList.remove('act');
  });
  var nb = $('neb-' + V.cur);
  if (nb) nb.classList.add('act');
}

/* ══ SIDEBAR ══ */
function openSB() {
  $('sb').classList.add('on');
  $('sbo').classList.add('on');
  updateStat();
}

function closeSB() {
  $('sb').classList.remove('on');
  $('sbo').classList.remove('on');
}

function updateStat() {
  var td = tod();
  var tm = DB.filter(function(s) {
    return s.date === td;
  }).reduce(function(a, s) {
    return a + sP(s);
  }, 0);
  $('sb-val').textContent = fmt(tm);
  $('sb-dt').textContent = td;
}

/* ══ RENDER ══ */
function render(v) {
  if (v === 'home') renderHome();
  if (v === 'sheets') renderSheets();
  if (v === 'sheet') renderSheet();
  if (v === 'search') renderSearch();
  if (v === 'backup') renderBackupPage();
  if (v === 'settings') renderSettingsPage();
  updateStat();
}

function statC(val, lbl, c, bg, icoId) {
  return '<div class="sc" style="background:' + bg + '">' + (icoId ? '<div class="sc-ico"><svg style="width:18px;height:18px;color:' + c + '"><use href="#' + icoId + '"/></svg></div>' : '') + '<div class="scv" style="color:' + c + '">' + val + '</div><div class="scl">' + lbl + '</div></div>';
}

function sheetCard(s, delay) {
  delay = delay || 0;
  return '<div class="shc" style="animation-delay:' + delay + 's" onclick="go(\'sheet\',\'' + esc(s.id) + '\')">' +
    '<div class="sh-row"><div>' +
    '<div class="sht">' + ico('I-cal', 14) + ' ' + t('sheetOf') + ' ' + esc(s.date) + '</div>' +
    '<div class="sh-chips">' +
    '<span class="chip chip-b">' + ico('I-persons', 11) + ' ' + s.patients.length + ' ' + t('totalPatients') + '</span>' +
    '<span class="chip chip-g">' + ico('I-check', 11) + ' ' + fmt(sP(s)) + '</span>' +
    '<span class="chip chip-r">' + ico('I-x', 11) + ' ' + fmt(sT(s) - sP(s)) + '</span>' +
    '</div></div>' +
    '<div style="color:var(--accent2)">' + ico('I-back', 16) + '</div>' +
    '</div></div>';
}

function renderHome() {
  var tdM = DB.filter(function(s) {
    return s.date === tod();
  }).reduce(function(a, s) {
    return a + sP(s);
  }, 0);
  $('h-stats').innerHTML =
    statC(DB.length, t('totalSheets'), 'var(--accent2)', 'rgba(59,130,246,.08)', 'I-file') +
    statC(DB.reduce(function(a, s) {
      return a + s.patients.length;
    }, 0), t('totalPatients'), '#4ade80', 'rgba(34,197,94,.08)', 'I-persons') +
    statC(fmt(DB.reduce(function(a, s) {
      return a + sP(s);
    }, 0)), t('totalPaid'), 'var(--amber)', 'rgba(245,158,11,.08)', 'I-money') +
    statC(fmt(tdM), t('todayPaidStat'), '#a78bfa', 'rgba(139,92,246,.08)', 'I-star');
  $('h-recent').innerHTML = DB.slice(0, 5).map(function(s, i) {
    return sheetCard(s, i * .05);
  }).join('') ||
    '<div class="empty">' + ico('I-file', 38) + '<br/>' + t('noSheets') + '</div>';
}

function renderSheets() {
  $('sheets-list').innerHTML = DB.length ?
    DB.map(function(s, i) {
      return sheetCard(s, i * .04);
    }).join('') :
    '<div class="empty">' + ico('I-file', 38) + '<br/>' + t('noSheets') + '</div>';
}

function renderSheet() {
  var s = DB.find(function(x) {
    return x.id === V.sid;
  });
  if (!s) return;
  $('sh-title-txt').textContent = t('sheetOf') + ' ' + s.date;
  $('sh-stats').innerHTML =
    statC(s.patients.length, t('totalPatients'), 'var(--accent2)', 'rgba(59,130,246,.08)', 'I-persons') +
    statC(fmt(sT(s)), t('totalPaid'), 'var(--amber)', 'rgba(245,158,11,.08)', 'I-money') +
    statC(fmt(sP(s)), t('paidStatus'), '#4ade80', 'rgba(34,197,94,.08)', 'I-check') +
    statC(fmt(sT(s) - sP(s)), t('remaining'), '#f87171', 'rgba(239,68,68,.08)', 'I-x');
  if (!s.patients.length) {
    $('sh-pats').innerHTML = '<div class="empty">' + ico('I-persons', 38) + '<br/>' + t('noPatients') + '</div>';
    return;
  }
  var sorted = s.patients.slice().sort(function(a, b) {
    return (a.time || '').localeCompare(b.time || '');
  });
  $('sh-pats').innerHTML = sorted.map(function(p, i) {
    var meta = '';
    if (p.time) meta += ico('I-clock', 10) + ' ' + p.time + ' ';
    if (p.age) meta += '· ' + p.age + ' ' + t('year') + ' ';
    if (p.weight) meta += '· ' + p.weight + ' ' + t('kg');
    return '<div class="pr-wrap">' +
      '<div class="pr">' +
      '<div class="pn">' + (i + 1) + '</div>' +
      '<div class="pi">' +
      '<div class="pname">' + esc(p.name) + '</div>' +
      (meta ? '<div class="pmeta">' + meta + '</div>' : '') +
      (p.notes ? '<div class="pmeta">' + ico('I-note', 10) + ' ' + esc(p.notes) + '</div>' : '') +
      '</div>' +
      '<div class="pright">' +
      '<div class="pmt">' + fmt(p.bookingFee + p.opFee) + '</div>' +
      '<button class="bdg ' + (p.paid ? 'bp2' : 'bu') + '" onclick="togglePaid(\'' + esc(V.sid) + '\',' + p.id + ')">' +
      ico(p.paid ? 'I-check' : 'I-x', 9) + ' ' + (p.paid ? t('paidStatus') : t('unpaidStatus')) +
      '</button>' +
      '<button class="pr-toggle" id="pt-' + p.id + '" onclick="toggleDetail(' + p.id + ')"><svg style="width:11px;height:11px"><use href="#I-chev"/></svg></button>' +
      '</div>' +
      '</div>' +
      '<div class="pr-detail" id="pd-' + p.id + '">' +
      '<div class="pds">' + ico('I-money', 12) + ' ' + t('bookingFee') + ': <span>' + fmt(p.bookingFee) + '</span></div>' +
      '<div class="pds">' + ico('I-note', 12) + ' ' + t('opFee') + ': <span>' + fmt(p.opFee) + '</span></div>' +
      (p.notes ? '<div class="pds">' + ico('I-note', 12) + ' ' + t('noteLabel') + ': <span>' + esc(p.notes) + '</span></div>' : '') +
      '<div class="pds">' + ico(p.paid ? 'I-check' : 'I-x', 12) + ' ' + t('statusLabel') + ': <span style="color:' + (p.paid ? '#4ade80' : '#f87171') + '">' + (p.paid ? t('paidStatus') : t('unpaidStatus')) + '</span></div>' +
      '<button class="bsm" onclick="openEditPat(' + p.id + ')">' + ico('I-edit', 12) + ' ' + t('editBtn') + '</button>' +
      '<button class="bsmd" onclick="delPat(' + p.id + ')">' + ico('I-trash', 12) + ' ' + t('deleteBtn') + '</button>' +
      '</div>' +
      '</div>';
  }).join('');
}

function toggleDetail(pid) {
  var d = $('pd-' + pid),
    tog = $('pt-' + pid);
  var open = d.classList.toggle('show');
  tog.classList.toggle('open', open);
}

function renderSearch() {
  $('s-inp').value = V.sq;
  $('sq-lbl').textContent = V.sq ? '«' + V.sq + '»' : '';
  if (!V.sq) {
    $('s-res').innerHTML = '<div class="empty">' + ico('I-search', 38) + '<br/>' + t('noSearch') + '</div>';
    return;
  }
  var q = V.sq.toLowerCase();
  var res = [];
  DB.forEach(function(s) {
    s.patients.forEach(function(p) {
      if (p.name.toLowerCase().indexOf(q) >= 0 || (p.notes || '').toLowerCase().indexOf(q) >= 0) {
        res.push({
          p: p,
          sd: s.date,
          si: s.id
        });
      }
    });
  });
  if (!res.length) {
    $('s-res').innerHTML = '<div class="empty">' + ico('I-search', 38) + '<br/>' + t('noResults') + '</div>';
    return;
  }
  $('s-res').innerHTML = res.map(function(r) {
    var p = r.p;
    return '<div class="pr-wrap"><div class="pr">' +
      '<div class="pi">' +
      '<div class="pname">' + esc(p.name) + '</div>' +
      '<div class="pmeta">' + ico('I-cal', 10) + ' ' + esc(r.sd) + ' ' + (p.time ? ico('I-clock', 10) + p.time : '') + '</div>' +
      (p.notes ? '<div class="pmeta">' + ico('I-note', 10) + ' ' + esc(p.notes) + '</div>' : '') +
      '</div>' +
      '<div class="pright">' +
      '<div class="pmt">' + fmt(p.bookingFee + p.opFee) + '</div>' +
      '<span class="bdg ' + (p.paid ? 'bp2' : 'bu') + '">' + (p.paid ? t('paidStatus') : t('unpaidStatus')) + '</span>' +
      '<button class="bsm" onclick="go(\'sheet\',\'' + esc(r.si) + '\')">' + ico('I-back', 12) + '</button>' +
      '</div>' +
      '</div></div>';
  }).join('');
}

function renderBackupPage() {
  updateBackupUI();
}

function renderSettingsPage() {
  applySettings();
  applyLang();
}

function onSearch(val) {
  V.sq = val;
  $('nav-s').value = val;
  if (V.cur !== 'search') go('search');
  else renderSearch();
}

/* ══ MUTATIONS ══ */
function togglePaid(sid, pid) {
  var s = DB.find(function(x) {
    return x.id === sid;
  });
  var p = s.patients.find(function(x) {
    return x.id === pid;
  });
  p.paid = !p.paid;
  save();
  render(V.cur);
}

function delPat(pid) {
  if (!confirm(t('confirmDelete'))) return;
  var s = DB.find(function(x) {
    return x.id === V.sid;
  });
  s.patients = s.patients.filter(function(p) {
    return p.id !== pid;
  });
  save();
  renderSheet();
  updateStat();
}

/* ══ MODALS ══ */
function showModal(html, small) {
  $('mi').className = 'mb' + (small ? ' mbsm' : '');
  $('mi').innerHTML = html;
  $('mw').classList.add('on');
}

function closeModal() {
  $('mw').classList.remove('on');
  $('mi').innerHTML = '';
}

function openAddSheet() {
  showModal(
    '<div class="mh"><div class="mtt">' + ico('I-plus', 17) + ' ' + t('newSheet') + '</div>' +
    '<button class="bsmd" onclick="closeModal()">' + ico('I-x', 13) + '</button></div>' +
    '<label class="lbl">' + t('sheetDateLbl') + '</label>' +
    '<input type="date" id="ns-d" class="inp" style="margin-bottom:16px" value="' + tod() + '"/>' +
    '<div style="display:flex;gap:9px">' +
    '<button class="btn bg2" style="flex:1" onclick="doAddSheet()">' + ico('I-check', 14) + ' ' + t('createBtn') + '</button>' +
    '<button class="btn bd" style="flex:1" onclick="closeModal()">' + ico('I-x', 14) + ' ' + t('cancel') + '</button>' +
    '</div>', true);
}

function doAddSheet() {
  var d = $('ns-d').value;
  if (!d) return;
  var id = 'sh-' + uid();
  DB.unshift({
    id: id,
    date: d,
    patients: []
  });
  save();
  closeModal();
  go('sheet', id);
}

function openAddPat() {
  V.epid = null;
  patModal({
    name: '',
    age: '',
    weight: '',
    time: '',
    bookingFee: CFG.defBooking,
    opFee: CFG.defOp,
    paid: false,
    notes: ''
  }, t('addPatient'));
}

function openEditPat(pid) {
  var s = DB.find(function(x) {
    return x.id === V.sid;
  });
  V.epid = pid;
  patModal(s.patients.find(function(x) {
    return x.id === pid;
  }), t('editBtn'));
}

function patModal(d, title) {
  showModal(
    '<div class="mh"><div class="mtt">' + ico('I-user', 17) + ' ' + title + '</div>' +
    '<button class="bsmd" onclick="closeModal()">' + ico('I-x', 13) + '</button></div>' +
    '<div class="fr">' +
    '<div class="fc"><label class="lbl">' + t('fullName') + '</label><input id="pf-n" class="inp" value="' + esc(d.name) + '" placeholder="' + t('namePh') + '" oninput="calcT()"/></div>' +
    '<div class="fc"><label class="lbl">' + t('time') + '</label><input type="time" id="pf-t" class="inp" value="' + esc(d.time) + '"/></div>' +
    '</div>' +
    '<div class="fr">' +
    '<div class="fc"><label class="lbl">' + t('age') + '</label><input type="number" id="pf-a" class="inp" value="' + (d.age || '') + '" placeholder="0"/></div>' +
    '<div class="fc"><label class="lbl">' + t('weight') + '</label><input type="number" id="pf-w" class="inp" value="' + (d.weight || '') + '" placeholder="0"/></div>' +
    '</div>' +
    '<div class="fr">' +
    '<div class="fc"><label class="lbl">' + t('bookingFee') + '</label><input type="number" id="pf-b" class="inp" value="' + d.bookingFee + '" oninput="calcT()"/></div>' +
    '<div class="fc"><label class="lbl">' + t('opFee') + '</label><input type="number" id="pf-o" class="inp" value="' + d.opFee + '" oninput="calcT()"/></div>' +
    '</div>' +
    '<div class="totb"><div class="totl">' + t('totalAmt') + '</div><div class="totv" id="pf-tot">' + fmt((+d.bookingFee || 0) + (+d.opFee || 0)) + '</div></div>' +
    '<div style="margin-bottom:12px"><label class="lbl">' + t('notes') + '</label><input id="pf-nt" class="inp" value="' + esc(d.notes) + '" placeholder="' + t('notesPh') + '"/></div>' +
    '<label class="cr"><input type="checkbox" id="pf-p" ' + (d.paid ? 'checked' : '') + '/><span>' + t('paid2') + ' ✓</span></label>' +
    '<button class="btn bg2 bfull" onclick="doSavePat()">' + ico('I-check', 14) + ' ' + t('save') + '</button>');
}

function calcT() {
  var b = +($('pf-b') ? $('pf-b').value : 0) || 0;
  var o = +($('pf-o') ? $('pf-o').value : 0) || 0;
  var el = $('pf-tot');
  if (el) el.textContent = fmt(b + o);
}

function doSavePat() {
  var name = ($('pf-n').value || '').trim();
  if (!name) {
    alert(t('fullName'));
    return;
  }
  var pat = {
    name: name,
    time: $('pf-t').value || '',
    age: +$('pf-a').value || 0,
    weight: +$('pf-w').value || 0,
    bookingFee: +$('pf-b').value || 0,
    opFee: +$('pf-o').value || 0,
    paid: $('pf-p').checked,
    notes: ($('pf-nt').value || '').trim()
  };
  var s = DB.find(function(x) {
    return x.id === V.sid;
  });
  if (V.epid) {
    var idx = s.patients.findIndex(function(p) {
      return p.id === V.epid;
    });
    s.patients[idx] = Object.assign({}, s.patients[idx], pat);
  } else {
    pat.id = Date.now();
    s.patients.push(pat);
  }
  save();
  closeModal();
  renderSheet();
  updateStat();
}

/* ══ CONFIRM CLEAR ══ */
function confirmClearAll() {
  showModal(
    '<div class="mh"><div class="mtt" style="color:#f87171">' + ico('I-warn', 17) + ' ' + t('confirmTitle') + '</div>' +
    '<button class="bsmd" onclick="closeModal()">' + ico('I-x', 13) + '</button></div>' +
    '<div style="font-size:13px;color:var(--text2);margin-bottom:20px;line-height:1.8;padding:14px;background:rgba(239,68,68,.06);border:1px solid rgba(239,68,68,.18);border-radius:10px">' +
    ico('I-warn', 13) + ' ' + t('confirmDesc') +
    '</div>' +
    '<div style="display:flex;gap:10px">' +
    '<button class="btn bd bfull" onclick="doConfirmClear()">' + ico('I-trash', 14) + ' ' + t('confirmBtn') + '</button>' +
    '<button class="btn bgh bfull" onclick="closeModal()">' + ico('I-x', 14) + ' ' + t('cancel') + '</button>' +
    '</div>', true);
}

function doConfirmClear() {
  DB = [];
  localStorage.removeItem('hj_db');
  localStorage.removeItem('hj_last_sync');
  closeModal();
  render(V.cur);
  toast(t('deletedAll'), 'inf');
}

/* ══ EXPORT ══ */
function openExportSheet() {
  var s = DB.find(function(x) {
    return x.id === V.sid;
  });
  if (!s) return;
  showModal(
    '<div class="mh"><div class="mtt">' + ico('I-dl', 17) + ' ' + t('exportSheetTitle') + '</div>' +
    '<button class="bsmd" onclick="closeModal()">' + ico('I-x', 13) + '</button></div>' +
    '<div style="font-size:12px;color:var(--text2);margin-bottom:14px">' + t('sheetOf') + ' ' + esc(s.date) + ' — ' + s.patients.length + ' ' + t('totalPatients') + '</div>' +
    '<div style="display:flex;flex-direction:column;gap:10px">' +
    '<button class="exp-btn exp-pdf" style="padding:13px;font-size:13px" onclick="exportSheetPDF();closeModal()">' + ico('I-pdf', 14) + ' ' + t('exportPDF') + '</button>' +
    '<button class="exp-btn exp-xls" style="padding:13px;font-size:13px" onclick="exportSheetExcel();closeModal()">' + ico('I-table', 14) + ' ' + t('exportExcel') + '</button>' +
    '<button class="exp-btn exp-csv" style="padding:13px;font-size:13px" onclick="exportSheetCSV();closeModal()">' + ico('I-note', 14) + ' ' + t('exportCSV') + '</button>' +
    '</div>', true);
}

function buildRows(s) {
  return s.patients.map(function(p, i) {
    return [i + 1, p.name, p.time || '—', p.age || 0, p.weight || 0, p.bookingFee || 0, p.opFee || 0, (p.bookingFee || 0) + (p.opFee || 0), p.paid ? t('paidStatus') : t('unpaidStatus'), p.notes || '—'];
  });
}

function exportSheetPDF() {
  var s = DB.find(function(x) {
    return x.id === V.sid;
  });
  if (!s) return;
  try {
    var doc = new window.jspdf.jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });
    doc.setFontSize(16);
    doc.text('Sheet: ' + s.date, 14, 14);
    doc.setFontSize(10);
    doc.text('Total: ' + fmt(sT(s)) + '  Paid: ' + fmt(sP(s)), 14, 22);
    doc.autoTable({
      startY: 27,
      head: [
        ['#', 'Name', 'Time', 'Age', 'Weight', 'Booking', 'Op', 'Total', 'Status', 'Notes']
      ],
      body: buildRows(s),
      styles: {
        fontSize: 9,
        cellPadding: 3
      },
      headStyles: {
        fillColor: [59, 130, 246]
      }
    });
    doc.save('sheet_' + s.date + '.pdf');
    toast(t('exportedPDF'));
  } catch (e) {
    toast(e.message, 'err');
  }
}

function exportAllPDF() {
  try {
    var doc = new window.jspdf.jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });
    var first = true;
    DB.forEach(function(s) {
      if (!first) doc.addPage();
      first = false;
      doc.setFontSize(14);
      doc.text('Sheet: ' + s.date, 14, 13);
      doc.autoTable({
        startY: 20,
        head: [
          ['#', 'Name', 'Time', 'Age', 'Weight', 'Booking', 'Op', 'Total', 'Status', 'Notes']
        ],
        body: buildRows(s),
        styles: {
          fontSize: 8
        },
        headStyles: {
          fillColor: [59, 130, 246]
        }
      });
    });
    doc.save('all_sheets_' + tod() + '.pdf');
    toast(t('exportedPDF'));
  } catch (e) {
    toast(e.message, 'err');
  }
}

function sheetToWS(s) {
  var rows = [
    ['#', t('fullName'), t('time'), t('age'), t('weight'), t('bookingFee'), t('opFee'), t('totalAmt'), t('statusLabel'), t('notes')]
  ];
  s.patients.forEach(function(p, i) {
    rows.push([i + 1, p.name, p.time || '', p.age || 0, p.weight || 0, p.bookingFee || 0, p.opFee || 0, (p.bookingFee || 0) + (p.opFee || 0), p.paid ? t('paidStatus') : t('unpaidStatus'), p.notes || '']);
  });
  return XLSX.utils.aoa_to_sheet(rows);
}

function exportSheetExcel() {
  var s = DB.find(function(x) {
    return x.id === V.sid;
  });
  if (!s) return;
  try {
    var wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheetToWS(s), 'Sheet ' + s.date);
    XLSX.writeFile(wb, 'sheet_' + s.date + '.xlsx');
    toast(t('exportedExcel'));
  } catch (e) {
    toast(e.message, 'err');
  }
}

function exportAllExcel() {
  try {
    var wb = XLSX.utils.book_new();
    DB.forEach(function(s) {
      XLSX.utils.book_append_sheet(wb, sheetToWS(s), s.date.replace(/-/g, '_').slice(0, 31));
    });
    XLSX.writeFile(wb, 'all_sheets_' + tod() + '.xlsx');
    toast(t('exportedExcel'));
  } catch (e) {
    toast(e.message, 'err');
  }
}

function exportSheetCSV() {
  var s = DB.find(function(x) {
    return x.id === V.sid;
  });
  if (s) exportCSV(s);
}

function exportCSV(s) {
  var rows = ['#,Name,Time,Age,Weight,Booking,Op,Total,Status,Notes'];
  s.patients.forEach(function(p, i) {
    rows.push([i + 1, '"' + p.name + '"', p.time || '', p.age || 0, p.weight || 0, p.bookingFee || 0, p.opFee || 0, (p.bookingFee || 0) + (p.opFee || 0), p.paid ? t('paidStatus') : t('unpaidStatus'), '"' + (p.notes || '') + '"'].join(','));
  });
  dlText(rows.join('\n'), 'sheet_' + s.date + '.csv', 'text/csv');
  toast(t('exportedCSV'));
}

function exportAllCSV() {
  var rows = ['Date,Name,Time,Age,Weight,Booking,Op,Total,Status,Notes'];
  DB.forEach(function(s) {
    s.patients.forEach(function(p) {
      rows.push([s.date, '"' + p.name + '"', p.time || '', p.age || 0, p.weight || 0, p.bookingFee || 0, p.opFee || 0, (p.bookingFee || 0) + (p.opFee || 0), p.paid ? t('paidStatus') : t('unpaidStatus'), '"' + (p.notes || '') + '"'].join(','));
    });
  });
  dlText(rows.join('\n'), 'all_sheets_' + tod() + '.csv', 'text/csv');
  toast(t('exportedCSV'));
}

function exportJSON() {
  var blob = new Blob([JSON.stringify({
    v: 2,
    exported: new Date().toISOString(),
    data: DB
  }, null, 2)], {
    type: 'application/json'
  });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'hujuzat_backup_' + tod() + '.json';
  a.click();
  toast(t('exportedJSON'));
}

function importJSON(e) {
  var file = e.target.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(ev) {
    try {
      var obj = JSON.parse(ev.target.result);
      var imp = obj.data || obj;
      if (!Array.isArray(imp)) throw new Error(t('badFormat'));
      if (!confirm(t('importConfirm'))) return;
      DB = imp;
      save();
      render(V.cur);
      toast(t('importedMsg') + DB.length + t('sheetsWord'));
    } catch (err) {
      toast(err.message, 'err');
    }
    e.target.value = '';
  };
  reader.readAsText(file);
}

function dlText(text, name, mime) {
  var blob = new Blob(['\uFEFF' + text], {
    type: mime + ';charset=utf-8'
  });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
}

/* ══ INIT ══ */
function initApp() {
  applySettings();
  applyLang();
  updateUserUI();
  updateStat();
  $('sb-dt').textContent = tod();
  renderHome();
  if (GD.token && GD.token !== 'demo') setSyncDot('ok');
  updateBackupUI();
  updateNavExtra();
}

if (GD.token) {
  $('login-screen').classList.add('hidden');
  initApp();
}
