/* Shared user-settings panel — loaded by the landing page and both books. No dependencies. */
(function () {
  'use strict';
  var KEY = 'mq-settings';
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); if (v === null) localStorage.removeItem(k); else localStorage.setItem(k, v); } catch (e) { return null; } }
  var DEF = { zb: 100, za: 100, zu: 100, ze: 100, lh: 2.1, cw: 190, mw: 1000, cAr: '', cUr: '', cEn: '', ur: true, showAns: false };
  var S = {}; try { S = JSON.parse(store(KEY) || '{}') || {}; } catch (e) { S = {}; }
  Object.keys(DEF).forEach(function (k) { if (S[k] === undefined) S[k] = DEF[k]; });
  function save() { store(KEY, JSON.stringify(S)); }
  var root = document.documentElement;
  function apply() {
    var st = root.style;
    st.setProperty('--zb', S.zb / 100); st.setProperty('--za', S.za / 100); st.setProperty('--zu', S.zu / 100); st.setProperty('--ze', S.ze / 100);
    st.setProperty('--lh', S.lh); st.setProperty('--cw', S.cw + 'px'); st.setProperty('--mw', S.mw + 'px'); st.setProperty('--cwide', Math.max(S.cw * 2.2, 300) + 'px');
    [['cAr', '--c-ar'], ['cUr', '--c-ur'], ['cEn', '--c-en']].forEach(function (p) { if (S[p[0]]) st.setProperty(p[1], S[p[0]]); else st.removeProperty(p[1]); });
    if (document.body) { document.body.classList.toggle('no-ur', !S.ur); document.body.classList.toggle('show-ans', !!S.showAns); }
  }
  function theme() { return store('mq-theme') || 'auto'; }
  function setTheme(v) {
    if (v === 'auto') { root.removeAttribute('data-theme'); store('mq-theme', null); } else { root.setAttribute('data-theme', v); store('mq-theme', v); }
  }
  function A() { return window.MQAPI || {}; }
  function hk() { return A().getHK ? A().getHK() : store('mq-hk') !== '0'; }
  function en() { return A().getEN ? A().getEN() : store('mq-en') !== '0'; }
  function setHK(v) { if (A().setHK) A().setHK(v); else store('mq-hk', v ? '1' : '0'); }
  function setEN(v) { if (A().setEN) A().setEN(v); else store('mq-en', v ? '1' : '0'); }
  function colorOf(name, cls) { var m = document.createElement('span'); m.className = cls; m.style.display = 'none'; document.body.appendChild(m); var c = getComputedStyle(m).color; m.remove(); var r = c.match(/\d+/g) || [0, 0, 0]; return '#' + r.slice(0, 3).map(function (x) { return ('0' + (+x).toString(16)).slice(-2); }).join(''); }

  var ov;
  function sw(id, label, on) { return '<div class="row"><label for="' + id + '">' + label + '</label><span class="sw"><input type="checkbox" id="' + id + '"' + (on ? ' checked' : '') + '><i></i></span></div>'; }
  function rg(id, label, min, max, step, val, unit) { return '<div class="row"><label for="' + id + '">' + label + '</label><input type="range" id="' + id + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + val + '"><span class="val" id="' + id + 'v">' + val + (unit || '') + '</span></div>'; }
  function build() {
    if (ov) ov.remove();
    ov = document.createElement('div'); ov.className = 'stov'; ov.setAttribute('role', 'dialog'); ov.setAttribute('aria-label', 'ترتیبات');
    var qn = +(store('mq-qn') || 20), isBook = !!window.MQ && !!window.MQ.lessons && window.MQ.lessons.length;
    ov.innerHTML = '<div class="stp"><h2>ترتیبات <button class="x" type="button" id="stx" aria-label="بند کریں">×</button></h2>' +
      '<p style="margin:0;color:var(--mute);font-size:.85rem">تمام تبدیلیاں فوراً لاگو ہوتی ہیں اور اسی براؤزر میں محفوظ رہتی ہیں (دونوں کتابوں پر یکساں)۔</p>' +
      '<h3>دکھانے کا انداز</h3>' + sw('s-hk', 'اعراب (زبر، زیر، پیش)', hk()) + sw('s-en', 'انگریزی معانی', en()) + sw('s-ur', 'اردو معانی', S.ur) + (isBook ? sw('s-ans', 'مشق میں جوابات خود بخود دکھائیں', S.showAns) : '') +
      '<h3>سائز</h3>' + rg('s-zb', 'پورے صفحے کا سائز', 70, 160, 5, S.zb, '%') + rg('s-za', 'عربی', 70, 260, 5, S.za, '%') + rg('s-zu', 'اردو', 70, 220, 5, S.zu, '%') + rg('s-ze', 'انگریزی', 70, 260, 5, S.ze, '%') + rg('s-lh', 'سطروں کا فاصلہ', 1.4, 2.8, 0.1, S.lh, '') + rg('s-cw', 'کارڈ کی چوڑائی', 130, 360, 10, S.cw, 'px') + rg('s-mw', 'صفحے کی چوڑائی', 640, 1600, 20, S.mw, 'px') +
      '<h3>رنگ</h3><div class="row"><label for="s-car">عربی کا رنگ</label><input type="color" id="s-car"></div><div class="row"><label for="s-cur">اردو کا رنگ</label><input type="color" id="s-cur"></div><div class="row"><label for="s-cen">انگریزی کا رنگ</label><input type="color" id="s-cen"></div><div class="row"><span></span><button class="btn" type="button" id="s-colr">رنگ پہلے جیسے کریں</button></div>' +
      '<div class="pv"><span class="ar" lang="ar" dir="rtl" style="font-size:1.8rem">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</span><br><span class="ur" style="font-size:1.2rem">اللہ کے نام سے جو بڑا مہربان نہایت رحم والا ہے</span><span class="en" style="font-size:1rem;display:block">In the name of Allah, the Most Gracious, the Most Merciful</span></div>' +
      '<h3>تھیم</h3><div class="row"><label for="s-th">رنگ سکیم</label><select id="s-th"><option value="auto">خودکار (ڈیوائس کے مطابق)</option><option value="light">روشن</option><option value="dark">گہری</option></select></div>' +
      (isBook ? '<h3>کوئز</h3><div class="row"><label for="s-qn">ہر کوئز میں سوالات</label><select id="s-qn">' + [10, 20, 30, 50, 100, 0].map(function (v) { return '<option value="' + v + '"' + (v === qn ? ' selected' : '') + '>' + (v || 'تمام') + '</option>'; }).join('') + '</select></div>' : '') +
      '<h3>ڈیٹا</h3><div class="row"><button class="btn" type="button" id="s-rs">تمام ترتیبات ڈیفالٹ کریں</button></div>' +
      '<div class="row"><button class="btn danger" type="button" id="s-rp">سبق مکمل ہونے کا ریکارڈ صفر کریں</button></div><p id="s-msg" style="color:var(--ok);font-size:.9rem;margin:2px 0"></p></div>';
    document.body.appendChild(ov);
    function $(id) { return ov.querySelector('#' + id); }
    $('s-car').value = S.cAr || colorOf('ar', 'ar'); $('s-cur').value = S.cUr || colorOf('ur', 'ur'); $('s-cen').value = S.cEn || colorOf('en', 'en');
    $('s-th').value = theme();
    function bindRange(id, key, unit, num) { var el = $(id); el.oninput = function () { S[key] = num ? +el.value : el.value; $(id + 'v').textContent = el.value + unit; apply(); save(); }; }
    bindRange('s-zb', 'zb', '%', 1); bindRange('s-za', 'za', '%', 1); bindRange('s-zu', 'zu', '%', 1); bindRange('s-ze', 'ze', '%', 1); bindRange('s-lh', 'lh', '', 1); bindRange('s-cw', 'cw', 'px', 1); bindRange('s-mw', 'mw', 'px', 1);
    $('s-hk').onchange = function () { setHK(this.checked); }; $('s-en').onchange = function () { setEN(this.checked); };
    $('s-ur').onchange = function () { S.ur = this.checked; apply(); save(); };
    if ($('s-ans')) $('s-ans').onchange = function () { S.showAns = this.checked; apply(); save(); };
    $('s-car').oninput = function () { S.cAr = this.value; apply(); save(); }; $('s-cur').oninput = function () { S.cUr = this.value; apply(); save(); }; $('s-cen').oninput = function () { S.cEn = this.value; apply(); save(); };
    $('s-colr').onclick = function () { S.cAr = S.cUr = S.cEn = ''; apply(); save(); $('s-car').value = colorOf('ar', 'ar'); $('s-cur').value = colorOf('ur', 'ur'); $('s-cen').value = colorOf('en', 'en'); };
    $('s-th').onchange = function () { setTheme(this.value); };
    if ($('s-qn')) $('s-qn').onchange = function () { store('mq-qn', this.value); };
    $('s-rs').onclick = function () { S = JSON.parse(JSON.stringify(DEF)); save(); apply(); setHK(true); setEN(true); setTheme('auto'); store('mq-qn', null); build(); open(); $('s-msg').textContent = 'ترتیبات ڈیفالٹ کر دی گئیں۔'; };
    var armed = false; $('s-rp').onclick = function () { if (!armed) { armed = true; this.textContent = 'یقیناً صفر کریں؟ دوبارہ دبائیں'; return; } ['mq-done', 'mq2-done'].forEach(function (k) { store(k, null); }); this.textContent = 'ریکارڈ صفر کر دیا گیا — صفحہ تازہ کریں'; armed = false; if (location.reload) setTimeout(function () { location.reload(); }, 600); };
    $('stx').onclick = close; ov.addEventListener('click', function (e) { if (e.target === ov) close(); });
  }
  function open() { if (!ov) build(); else build(); ov.classList.add('on'); var c = ov.querySelector('#stx'); if (c) c.focus(); }
  function close() { if (ov) ov.classList.remove('on'); var b = document.getElementById('st'); if (b) b.focus(); }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && ov && ov.classList.contains('on')) close(); });
  function init() {
    apply();
    var nav = document.querySelector('.top nav'), b = document.getElementById('st');
    if (!b && nav) { b = document.createElement('button'); b.id = 'st'; b.type = 'button'; b.textContent = '⚙ ترتیبات'; b.setAttribute('aria-label', 'ترتیبات کھولیں'); nav.appendChild(b); }
    if (b) b.onclick = open;
  }
  window.MQSettings = { open: open, apply: apply };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
