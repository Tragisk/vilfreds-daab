// Vilfreds dåb – fælles logik for begge versioner
(() => {
  'use strict';
  const C = window.DAAB;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch (e) { /* ignoreres */ } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { /* ignoreres */ } },
  };
  const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------------------------------------------------------------- Ikoner
  const ICON = {
    church: '<path d="M12 2v4M10 4h4M5 21V11l7-5 7 5v10M9 21v-4a3 3 0 0 1 6 0v4M3 21h18"/>',
    food: '<path d="M7 3v18M4.5 3v5a2.5 2.5 0 0 0 5 0V3M17.5 21V3c-2.2 1.2-3.5 4-3.5 7.5V13h3.5"/>',
    pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    cal: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    gift: '<rect x="3" y="8" width="18" height="4" rx="1"/><path d="M5 12v9h14v-9M12 8v13M12 8C10.5 4.5 6 4 6 6.5S9 8 12 8M12 8c1.5-3.5 6-4 6-1.5S15 8 12 8"/>',
    park: '<circle cx="12" cy="12" r="9"/><path d="M10 17V7h3a3 3 0 0 1 0 6h-3"/>',
    sound: '<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/>',
    mute: '<path d="M4 9v6h4l5 4V5L8 9H4z"/><path d="M17 9.5l5 5M22 9.5l-5 5"/>',
    replay: '<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/>',
    left: '<path d="M15 5l-7 7 7 7"/>',
    right: '<path d="M9 5l7 7-7 7"/>',
    camera: '<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
    heart: '<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.6 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  };
  const svg = (name) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON[name] || ''}</svg>`;
  function drawIcons(root = document) {
    $$('[data-icon]', root).forEach((el) => { el.innerHTML = svg(el.dataset.icon); });
  }

  // ---------------------------------------------------------------- Lyd (syntetiseret, rolig)
  const Snd = {
    ctx: null, master: null,
    on: store.get('daab_lyd') !== 'fra',
    init() {
      if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      try {
        this.ctx = new AC();
        this.master = this.ctx.createGain();
        this.master.gain.value = this.on ? C.lydstyrke : 0;
        this.master.connect(this.ctx.destination);
      } catch (e) { this.ctx = null; }
    },
    toggle() {
      this.on = !this.on;
      store.set('daab_lyd', this.on ? 'til' : 'fra');
      if (this.master) this.master.gain.value = this.on ? C.lydstyrke : 0;
      return this.on;
    },
    noise(dur) {
      const c = this.ctx;
      const buf = c.createBuffer(1, Math.ceil(c.sampleRate * dur), c.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      const s = c.createBufferSource();
      s.buffer = buf;
      return s;
    },
    chain(src, nodes) {
      let n = src;
      nodes.forEach((x) => { n.connect(x); n = x; });
      n.connect(this.master);
    },
    crack() {
      if (!this.ctx) return;
      const c = this.ctx, t = c.currentTime;
      [0, 0.035].forEach((off, i) => {
        const s = this.noise(0.12);
        const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = i ? 1300 : 2200; bp.Q.value = 0.9;
        const g = c.createGain();
        g.gain.setValueAtTime(0.0001, t + off);
        g.gain.linearRampToValueAtTime(i ? 0.6 : 1, t + off + 0.004);
        g.gain.exponentialRampToValueAtTime(0.001, t + off + 0.09);
        this.chain(s, [bp, g]);
        s.start(t + off); s.stop(t + off + 0.12);
      });
    },
    rustle(dur = 0.8) {
      if (!this.ctx) return;
      const c = this.ctx, t = c.currentTime;
      const s = this.noise(dur);
      const hp = c.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = 1800;
      const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 4200; bp.Q.value = 0.5;
      const g = c.createGain();
      g.gain.setValueAtTime(0.0001, t);
      for (let k = 0; k < 12; k++) g.gain.setTargetAtTime(0.15 + Math.random() * 0.55, t + (k * dur) / 12, 0.015);
      g.gain.setTargetAtTime(0.0001, t + dur * 0.92, 0.03);
      this.chain(s, [hp, bp, g]);
      s.start(t); s.stop(t + dur + 0.1);
    },
    swish(dur = 0.9) {
      if (!this.ctx) return;
      const c = this.ctx, t = c.currentTime;
      const s = this.noise(dur);
      const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.Q.value = 1.1;
      bp.frequency.setValueAtTime(500, t);
      bp.frequency.exponentialRampToValueAtTime(2400, t + dur);
      const g = c.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(0.55, t + dur * 0.35);
      g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      this.chain(s, [bp, g]);
      s.start(t); s.stop(t + dur + 0.05);
    },
    chime() {
      if (!this.ctx) return;
      const c = this.ctx, t = c.currentTime;
      [784, 988, 1175, 1568].forEach((f, i) => {
        const o = c.createOscillator(); o.type = 'sine'; o.frequency.value = f;
        const g = c.createGain();
        const st = t + i * 0.13;
        g.gain.setValueAtTime(0.0001, st);
        g.gain.linearRampToValueAtTime(0.32, st + 0.01);
        g.gain.exponentialRampToValueAtTime(0.0008, st + 1.8);
        this.chain(o, [g]);
        o.start(st); o.stop(st + 1.9);
      });
    },
  };

  // ---------------------------------------------------------------- Effekter (konfetti / blade)
  const Fx = {
    burst(mode, small) {
      if (reduce) return;
      const cv = document.createElement('canvas');
      cv.className = 'fx-canvas';
      cv.setAttribute('aria-hidden', 'true');
      document.body.appendChild(cv);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W = innerWidth, H = innerHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      const ctx = cv.getContext('2d');
      ctx.scale(dpr, dpr);
      const colors = (getComputedStyle(document.body).getPropertyValue('--fx-colors') || '#4A6378')
        .split(',').map((s) => s.trim()).filter(Boolean);
      const leaves = mode === 'leaves';
      const N = leaves ? (small ? 14 : 34) : (small ? 70 : 170);
      const P = [];
      for (let i = 0; i < N; i++) {
        if (leaves) {
          P.push({ x: Math.random() * W, y: -20 - Math.random() * H * 0.6, vx: 0, vy: 0.6 + Math.random() * 0.9,
            s: 6 + Math.random() * 7, r: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.03,
            ph: Math.random() * 6.28, c: colors[i % colors.length] });
        } else {
          const a = -Math.PI / 2 + (Math.random() - 0.5) * 1.6;
          const sp = 7 + Math.random() * 9;
          P.push({ x: W / 2 + (Math.random() - 0.5) * W * 0.3, y: H * 0.62, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp,
            s: 5 + Math.random() * 6, r: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.3,
            ph: Math.random() * 6.28, c: colors[i % colors.length], round: Math.random() < 0.3 });
        }
      }
      const life = leaves ? 6500 : 4200;
      const t0 = performance.now();
      const frame = (now) => {
        const el = now - t0;
        ctx.clearRect(0, 0, W, H);
        const fade = Math.max(0, Math.min(1, (life - el) / 900));
        P.forEach((p) => {
          if (leaves) {
            p.ph += 0.03; p.x += Math.sin(p.ph) * 0.8; p.y += p.vy; p.r += p.vr;
          } else {
            p.vy += 0.28; p.vx *= 0.985; p.vy *= 0.985; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.ph += 0.12;
          }
          ctx.save();
          ctx.globalAlpha = fade;
          ctx.translate(p.x, p.y); ctx.rotate(p.r);
          ctx.fillStyle = p.c;
          if (leaves) {
            ctx.beginPath();
            ctx.moveTo(0, -p.s);
            ctx.quadraticCurveTo(p.s * 0.75, 0, 0, p.s);
            ctx.quadraticCurveTo(-p.s * 0.75, 0, 0, -p.s);
            ctx.fill();
          } else if (p.round) {
            ctx.beginPath(); ctx.arc(0, 0, p.s * 0.45, 0, 6.28); ctx.fill();
          } else {
            ctx.scale(1, Math.cos(p.ph));
            ctx.fillRect(-p.s / 2, -p.s * 0.3, p.s, p.s * 0.6);
          }
          ctx.restore();
        });
        if (el < life) requestAnimationFrame(frame); else cv.remove();
      };
      requestAnimationFrame(frame);
    },
  };

  // ---------------------------------------------------------------- Database
  async function rpc(fn, args) {
    const r = await fetch(`${C.sbUrl}/rest/v1/rpc/${fn}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', apikey: C.sbKey, Authorization: 'Bearer ' + C.sbKey },
      body: JSON.stringify(args),
    });
    const txt = await r.text();
    let data = null;
    try { data = txt ? JSON.parse(txt) : null; } catch (e) { data = null; }
    if (!r.ok) throw new Error((data && data.message) || 'Noget gik galt. Prøv igen om lidt.');
    return data;
  }

  // ---------------------------------------------------------------- Gæst
  const params = new URLSearchParams(location.search);
  let token = params.get('g') || store.get('daab_token') || '';
  let gaest = null;
  const flertal = (n) => /(&|\bog\b|,|\+)/i.test(n || '');

  function personalize() {
    const navn = gaest && gaest.navn;
    const pl = navn ? flertal(navn) : false;
    $$('[data-navn]').forEach((el) => { el.textContent = navn || el.dataset.navn; });
    $$('[data-dig]').forEach((el) => { el.textContent = navn && pl ? el.dataset.jer : el.dataset.dig; });
    const greet = $('#greeting');
    if (greet) greet.textContent = navn ? `Kære ${navn}` : (greet.dataset.fallback || 'Hej med dig');
  }

  async function loadGuest() {
    if (!token) { personalize(); return; }
    try {
      gaest = await rpc('daab_hent', { p_token: token });
      if (!gaest) { token = ''; store.del('daab_token'); }
    } catch (e) { gaest = null; }
    personalize();
    renderRsvpState();
  }

  // ---------------------------------------------------------------- Konvolut
  let opened = false;
  function openEnvelope() {
    if (opened) return;
    opened = true;
    Snd.init();
    const env = $('#envelope');
    $('#scene').classList.add('opening');
    if (reduce) { reveal(true); return; }
    Snd.crack();
    if (navigator.vibrate) { try { navigator.vibrate(25); } catch (e) { /* ignoreres */ } }
    env.classList.add('cracked');
    setTimeout(() => { env.classList.add('open'); Snd.rustle(); }, 380);
    setTimeout(() => { env.classList.add('letter-out'); Snd.swish(); }, 1150);
    setTimeout(unfold, 2300);
  }

  function unfold() {
    const letter = $('#env-letter');
    const r = letter.getBoundingClientRect();
    const ov = document.createElement('div');
    ov.className = 'unfold';
    document.body.appendChild(ov);
    const from = { left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px', borderRadius: getComputedStyle(letter).borderRadius };
    const to = { left: '0px', top: '0px', width: innerWidth + 'px', height: innerHeight + 'px', borderRadius: '0px' };
    Object.assign(ov.style, from);
    const a = ov.animate([from, to], { duration: 780, easing: 'cubic-bezier(.7,0,.2,1)', fill: 'forwards' });
    a.onfinish = () => {
      reveal(false);
      const b = ov.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 650, easing: 'ease-out', fill: 'forwards' });
      b.onfinish = () => ov.remove();
    };
  }

  function reveal(instant) {
    $('#scene').hidden = true;
    const main = $('#main');
    main.hidden = false;
    document.body.classList.add('is-open');
    window.scrollTo(0, 0);
    Slides.start();
    if (!instant) {
      Snd.chime();
      setTimeout(() => Fx.burst(document.body.dataset.fx || 'confetti'), 150);
    }
    const h = $('#main h1');
    if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
  }

  function replay() {
    Slides.stop();
    const env = $('#envelope');
    env.classList.remove('cracked', 'open', 'letter-out');
    $('#scene').classList.remove('opening');
    $('#main').hidden = true;
    $('#scene').hidden = false;
    document.body.classList.remove('is-open');
    opened = false;
    window.scrollTo(0, 0);
    $('#seal').focus({ preventScroll: true });
  }

  // ---------------------------------------------------------------- Billeder
  const Slides = {
    cur: 0, timer: null, pauseUntil: 0, slides: [], dots: [],
    init() {
      const track = $('#slides');
      if (!track) return;
      const list = C.billeder || [];
      list.forEach((b, i) => {
        const fig = document.createElement('figure');
        fig.className = 'slide';
        fig.setAttribute('role', 'group');
        fig.setAttribute('aria-roledescription', 'billede');
        fig.setAttribute('aria-label', `${i + 1} af ${list.length}`);
        const frame = document.createElement('div');
        frame.className = 'slide-img';
        if (b.src) {
          const img = new Image();
          img.src = b.src; img.alt = b.tekst || `Billede ${i + 1} af Vilfred`;
          img.loading = i < 2 ? 'eager' : 'lazy'; img.decoding = 'async';
          frame.appendChild(img);
        } else {
          frame.classList.add('ph');
          frame.innerHTML = svg('camera');
          const s = document.createElement('span');
          s.textContent = `Billede ${i + 1}`;
          frame.appendChild(s);
        }
        fig.appendChild(frame);
        const cap = document.createElement('figcaption');
        cap.textContent = b.tekst || '';
        fig.appendChild(cap);
        track.appendChild(fig);
        this.slides.push(fig);
      });
      const dotsEl = $('#slide-dots');
      if (dotsEl) {
        list.forEach((b, i) => {
          const d = document.createElement('button');
          d.type = 'button';
          d.className = 'dot';
          d.setAttribute('aria-label', `Vis billede ${i + 1}`);
          d.addEventListener('click', () => { this.hold(); this.set(i); });
          dotsEl.appendChild(d);
          this.dots.push(d);
        });
      }
      const prev = $('#slide-prev'), next = $('#slide-next');
      if (prev) prev.addEventListener('click', () => { this.hold(); this.set(this.cur - 1); });
      if (next) next.addEventListener('click', () => { this.hold(); this.set(this.cur + 1); });
      let x0 = null;
      track.addEventListener('pointerdown', (e) => { x0 = e.clientX; this.hold(); });
      track.addEventListener('pointerup', (e) => {
        if (x0 === null) return;
        const dx = e.clientX - x0; x0 = null;
        if (Math.abs(dx) > 40) this.set(this.cur + (dx < 0 ? 1 : -1));
      });
      track.addEventListener('pointercancel', () => { x0 = null; });
      track.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { this.hold(); this.set(this.cur - 1); }
        if (e.key === 'ArrowRight') { this.hold(); this.set(this.cur + 1); }
      });
      track.addEventListener('mouseenter', () => this.hold());
      this.set(0);
    },
    set(i) {
      const n = this.slides.length;
      if (!n) return;
      this.cur = ((i % n) + n) % n;
      this.slides.forEach((s, k) => {
        let off = k - this.cur;
        if (off > n / 2) off -= n;
        if (off < -n / 2) off += n;
        s.style.setProperty('--off', off);
        s.style.setProperty('--abs', Math.abs(off));
        s.dataset.pos = off === 0 ? 'cur' : off < 0 ? 'before' : 'after';
        s.setAttribute('aria-hidden', off === 0 ? 'false' : 'true');
      });
      this.dots.forEach((d, k) => d.setAttribute('aria-current', k === this.cur ? 'true' : 'false'));
      const c = $('#slide-count');
      if (c) c.textContent = `${this.cur + 1} / ${n}`;
    },
    hold() { this.pauseUntil = Date.now() + 9000; },
    start() {
      if (this.timer || reduce) return;
      this.timer = setInterval(() => {
        if (document.hidden || Date.now() < this.pauseUntil) return;
        this.set(this.cur + 1);
      }, 4200);
    },
    stop() { clearInterval(this.timer); this.timer = null; },
  };

  // ---------------------------------------------------------------- Nedtælling
  function tick() {
    const el = $('#countdown');
    if (!el) return;
    const ms = new Date(C.dato) - Date.now();
    if (ms <= 0) {
      const done = new Date(C.slut) - Date.now() > 0;
      el.innerHTML = '';
      const p = document.createElement('p');
      p.className = 'cd-done';
      p.textContent = done ? 'I dag er dagen!' : 'Tak fordi I var med!';
      el.appendChild(p);
      return;
    }
    const d = Math.floor(ms / 864e5), h = Math.floor((ms % 864e5) / 36e5), m = Math.floor((ms % 36e5) / 6e4);
    const set = (id, v) => { const x = $('#' + id); if (x) x.textContent = v; };
    set('cd-d', d); set('cd-h', h); set('cd-m', m);
    set('cd-d-l', d === 1 ? 'dag' : 'dage'); set('cd-h-l', h === 1 ? 'time' : 'timer'); set('cd-m-l', m === 1 ? 'minut' : 'minutter');
  }

  // ---------------------------------------------------------------- Kalender
  function initCalendar() {
    const z = (d) => new Date(d).toISOString().replace(/[-:]/g, '').replace(/\.\d+/, '');
    const start = z(C.dato), end = z(C.slut), stamp = z(Date.now());
    const desc = 'Kl. 11.00: Dåb i Nathanaels Kirke, Holmbladsgade 19, 2300 København S.\\nKl. 12.30–16.30: Frokost på Little House, Lindgreens Allé 1, 2300 København S.\\nGratis parkering i området.';
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Vilfreds daab//DA', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
      'BEGIN:VEVENT', 'UID:vilfreds-daab-20270123@tragisk.github.io', 'DTSTAMP:' + stamp,
      'DTSTART:' + start, 'DTEND:' + end, 'SUMMARY:Vilfreds barnedåb',
      'LOCATION:Nathanaels Kirke\\, Holmbladsgade 19\\, 2300 København S', 'DESCRIPTION:' + desc,
      'END:VEVENT', 'END:VCALENDAR',
    ].join('\r\n');
    const a = $('#cal-ics');
    if (a) { a.href = 'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics); a.download = 'vilfreds-daab.ics'; }
    const g = $('#cal-google');
    if (g) {
      const u = new URL('https://calendar.google.com/calendar/render');
      u.searchParams.set('action', 'TEMPLATE');
      u.searchParams.set('text', 'Vilfreds barnedåb');
      u.searchParams.set('dates', `${start}/${end}`);
      u.searchParams.set('location', 'Nathanaels Kirke, Holmbladsgade 19, 2300 København S');
      u.searchParams.set('details', desc.replace(/\\n/g, '\n'));
      g.href = u.toString();
    }
    const w = $('#wishlist');
    if (w) w.href = C.oenskesky;
    $$('[data-frist]').forEach((el) => { el.textContent = C.svarFrist; });
  }

  // ---------------------------------------------------------------- Tilmelding
  const F = {};
  function initRsvp() {
    const form = $('#rsvp');
    if (!form) return;
    ['navn', 'voksne', 'boern', 'allergier', 'vaegt', 'hilsen'].forEach((k) => { F[k] = $('#f-' + k); });
    form.addEventListener('change', syncJa);
    $$('[data-step]').forEach((b) => {
      b.addEventListener('click', () => {
        const inp = $('#' + b.dataset.for);
        const v = (parseInt(inp.value, 10) || 0) + parseInt(b.dataset.step, 10);
        inp.value = Math.max(+inp.min, Math.min(+inp.max, v));
      });
    });
    form.addEventListener('submit', submit);
    const edit = $('#rsvp-edit');
    if (edit) edit.addEventListener('click', () => { showForm(); F.voksne && form.querySelector('input[name=deltager]:checked')?.focus(); });
    syncJa();
    renderRsvpState();
  }

  function syncJa() {
    const v = $('#rsvp input[name=deltager]:checked');
    const box = $('#ja-felter');
    if (box) box.hidden = !(v && v.value === 'ja');
    const sendBtn = $('#rsvp-send');
    if (sendBtn) sendBtn.textContent = v && v.value === 'nej' ? 'Send afbud' : 'Send svar';
  }

  function renderRsvpState() {
    const form = $('#rsvp');
    if (!form) return;
    const who = $('#rsvp-who');
    const nameField = $('#name-field');
    if (gaest) {
      if (who) { who.hidden = false; $('#rsvp-guest').textContent = gaest.navn; }
      if (nameField) nameField.hidden = true;
      if (!gaest.svaret_at && F.voksne) F.voksne.value = flertal(gaest.navn) ? 2 : 1;
    } else {
      if (who) who.hidden = true;
      if (nameField) nameField.hidden = false;
    }
    if (gaest && gaest.svaret_at) { fillForm(gaest); showDone(false); } else { showForm(); }
  }

  function fillForm(g) {
    const r = $(`#rsvp input[name=deltager][value=${g.deltager ? 'ja' : 'nej'}]`);
    if (r) r.checked = true;
    if (g.deltager) {
      F.voksne.value = g.voksne ?? 1;
      F.boern.value = g.boern ?? 0;
      const d = $(`#rsvp input[name=dele][value=${g.dele || 'begge'}]`);
      if (d) d.checked = true;
      F.allergier.value = g.allergier || '';
    }
    F.vaegt.value = g.vaegt_gaet != null ? String(g.vaegt_gaet).replace('.', ',') : '';
    F.hilsen.value = g.hilsen || '';
    syncJa();
  }

  function showForm() {
    $('#rsvp').hidden = false;
    const done = $('#rsvp-done');
    if (done) done.hidden = true;
  }

  function showDone(fresh) {
    const g = gaest;
    $('#rsvp').hidden = true;
    const done = $('#rsvp-done');
    done.hidden = false;
    const pl = flertal(g.navn);
    const title = $('#done-title'), text = $('#done-text');
    if (g.deltager) {
      title.textContent = pl ? 'Hurra – I kommer!' : 'Hurra – du kommer!';
      const n = (x, en, fl) => `${x} ${x === 1 ? en : fl}`;
      const dele = g.dele === 'kirke' ? 'kun kirken' : g.dele === 'frokost' ? 'kun frokosten' : 'både kirke og frokost';
      text.textContent = `Vi har noteret ${n(g.voksne, 'voksen', 'voksne')}${g.boern ? ' og ' + n(g.boern, 'barn', 'børn') : ''} til ${dele}.` +
        (g.allergier ? ` Hensyn: ${g.allergier}.` : '');
    } else {
      title.textContent = 'Tak for beskeden';
      text.textContent = pl ? 'Hvor er det ærgerligt, at I ikke kan komme. Vi tænker på jer på dagen.' : 'Hvor er det ærgerligt, at du ikke kan komme. Vi tænker på dig på dagen.';
    }
    const extra = $('#done-extra');
    if (extra) {
      const bits = [];
      if (g.vaegt_gaet != null) bits.push(`Dit gæt på Vilfreds vægt: ${String(g.vaegt_gaet).replace('.', ',')} kg.`);
      if (g.hilsen) bits.push('Tak for hilsenen – den gemmer vi til Vilfred.');
      extra.textContent = bits.join(' ');
    }
    if (fresh) {
      Snd.chime();
      if (g.deltager) Fx.burst(document.body.dataset.fx || 'confetti', true);
      done.setAttribute('tabindex', '-1');
      done.focus({ preventScroll: true });
      done.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    }
  }

  async function submit(e) {
    e.preventDefault();
    const msg = $('#rsvp-msg');
    msg.textContent = '';
    const v = $('#rsvp input[name=deltager]:checked');
    if (!v) { msg.textContent = 'Vælg om I kommer.'; return; }
    const ja = v.value === 'ja';
    const navn = F.navn ? F.navn.value.trim() : '';
    if (!gaest && !navn) { msg.textContent = 'Skriv jeres navn.'; F.navn.focus(); return; }
    let vaegt = null;
    const vRaw = (F.vaegt.value || '').trim().replace(',', '.').replace(/[^\d.]/g, '');
    if (vRaw) {
      vaegt = parseFloat(vRaw);
      if (!(vaegt >= 2 && vaegt <= 20)) { msg.textContent = 'Gæt på en vægt mellem 2 og 20 kg.'; F.vaegt.focus(); return; }
    }
    const btn = $('#rsvp-send');
    btn.disabled = true;
    const label = btn.textContent;
    btn.textContent = 'Sender …';
    try {
      const dele = $('#rsvp input[name=dele]:checked');
      const res = await rpc('daab_svar', {
        p_token: gaest ? token : null,
        p_navn: gaest ? null : navn,
        p_deltager: ja,
        p_voksne: ja ? parseInt(F.voksne.value, 10) || 1 : 0,
        p_boern: ja ? parseInt(F.boern.value, 10) || 0 : 0,
        p_dele: ja && dele ? dele.value : null,
        p_allergier: ja ? F.allergier.value : null,
        p_hilsen: F.hilsen.value,
        p_vaegt: vaegt,
      });
      token = res.token;
      store.set('daab_token', token);
      try {
        const u = new URL(location.href);
        u.searchParams.set('g', token);
        history.replaceState(null, '', u.toString());
      } catch (err) { /* ignoreres */ }
      gaest = await rpc('daab_hent', { p_token: token });
      personalize();
      renderRsvpState();
      showDone(true);
    } catch (err) {
      msg.textContent = err.message;
    } finally {
      btn.disabled = false;
      btn.textContent = label;
    }
  }

  // ---------------------------------------------------------------- Lydknap
  function initSoundBtn() {
    const b = $('#sound-toggle');
    if (!b) return;
    const paint = () => {
      b.innerHTML = svg(Snd.on ? 'sound' : 'mute');
      b.setAttribute('aria-label', Snd.on ? 'Slå lyd fra' : 'Slå lyd til');
      b.setAttribute('aria-pressed', Snd.on ? 'false' : 'true');
    };
    b.addEventListener('click', () => { Snd.init(); Snd.toggle(); paint(); });
    paint();
  }

  // ---------------------------------------------------------------- Start
  document.addEventListener('DOMContentLoaded', () => {
    drawIcons();
    initCalendar();
    Slides.init();
    initRsvp();
    initSoundBtn();
    tick();
    setInterval(tick, 30000);
    $('#seal').addEventListener('click', (e) => { e.stopPropagation(); openEnvelope(); });
    $('#envelope').addEventListener('click', openEnvelope);
    const rp = $('#replay');
    if (rp) rp.addEventListener('click', replay);
    loadGuest();
  });
})();
