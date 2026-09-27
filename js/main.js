/* PLUMBING_V 4 — Bespoke Studio · meccanica invisibile canonica.
   ────────────────────────────────────────────────────────────────
   CONFINE (inviolabile): questo file contiene SOLO plumbing — la meccanica
   che il visitatore non percepisce come design. NIENTE markup di sezioni,
   NIENTE stile, NIENTE struttura: concept, griglia, tipografia, hero e
   animazioni-firma si progettano DA ZERO per ogni cliente (GATE #3).
   Se qui dentro scivola del layout, questo diventa il nuovo scheletro
   condiviso — cioè il difetto "copia-incolla" che il metodo combatte.

   Come si usa: si COPIA nella cartella js/ del sito e si adatta la sola
   costante SITE. Le animazioni-firma del sito si scrivono nel proprio
   main.js DOPO questo file (o in coda a questo file, sotto il marcatore).
   Ogni bug nuovo si corregge QUI (bump PLUMBING_V + changelog nel README)
   e poi nel sito: mai il contrario.

   Fix già incorporati (non rimuovere):
   - ScrollTrigger registrato SUBITO allo script load, MAI dentro l'intro
     o un setTimeout (bug APF #5 del 16/7: race col watchdog → sezioni
     che sparivano allo scroll).
   - Reveal con once:true (niente re-animazioni da zero ri-scorrendo).
   - Watchdog 1,5s che forza visibile e UCCIDE i trigger non scattati.
   - Lightbox su [hidden] + override CSS !important (bug: display:flex
     batteva [hidden] e la lightbox restava visibile).
   - Foto-contenuto MAI lazy (regola workflow §8): il plumbing non tocca
     il loading, ma il lint lo verifica.
   - Orari Europe/Rome con finestre multiple e scavalco di mezzanotte
     (pattern Il Cavallante 18:00–00:30). */

(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) root.classList.add('reduced-motion');

  /* ══════════ CONFIG PER-SITO — l'unica parte da adattare ══════════ */
  var SITE = {
    slug: 'tocco-magico',
    whatsapp: {
      number: '', // WhatsApp non dichiarato: si prenota al telefono (339 815 5884)
      message: '',
      ids: [],
    },
    /* scheda Google (27/9/2026): dal martedì al sabato 9–18:30 continuato, domenica e lunedì chiuso */
    hours: {
      0: [],
      1: [],
      2: [['09:00', '18:30']],
      3: [['09:00', '18:30']],
      4: [['09:00', '18:30']],
      5: [['09:00', '18:30']],
      6: [['09:00', '18:30']],
    },
    hoursStatusId: 'orarioStato',
    hoursTableSelector: '[data-day]',
    todayClass: 'is-today',
    introId: 'intro',
    introDuration: 1800,
    revealSelector: '.reveal',
    inViewClass: 'in-view',
    breakpointMenu: 1000,
    EN: {
      "m.salta": "Skip to the programme",
      "m.top": "Tocco magico, back to the top",
      "m.sezioni": "Sections",
      "m.lingua": "Language",
      "m.menu": "Open the menu",
      "m.ingrandisci": "Enlarge the photo",
      "m.lightbox": "Enlarged photo",
      "m.chiudi": "Close",
      "m.ovvero": "or",
      "v.programma": "The programme",
      "v.pubblico": "The audience",
      "v.biglietteria": "Box office",
      "t.prenota": "Bookings",
      "h.dove": "Via Lorenteggio 43 · Milan",
      "h.pensate": "Think of",
      "h.colore": "a colour.",
      "h.patter": "Think of a colour.",
      "h.uno": "Any colour at all.",
      "h.mestiere": "Hairdresser for her and for him",
      "h.alt": "A client seen from behind against the salon’s black wall: soft golden-brown curls and, on her shoulders, the rainbow-striped cape",
      "h.ecco": "Ta-da.",
      "h.sugg": "(tap the photo: the cape comes back)",
      "h.tel": "Bookings: 339 815 5884",
      "h.voti": "on Google · 154 reviews",
      "a.saluto": "Dear audience,",
      "a.p1": "think of a colour, a cut, the curls you never had. Think hard, even if you can’t find the right words. Then come to Via Lorenteggio 43, sit down and tell us: at Tocco magico the most requested act is exactly this one, turning what you have in mind into real hair.",
      "a.cit": "«whatever you have in mind, they make it happen»",
      "a.chi": "a client, on Google (translated)",
      "a.spettacolo": "Continuous",
      "a.continuato": "performance",
      "a.quando": "Tuesday to Saturday, 9 am to 6:30 pm",
      "a.nota": "<em>lunch hour included · Sunday and Monday closed</em>",
      "p.t": "Programme",
      "p.sotto": "Five acts, on stage from Tuesday to Saturday.",
      "n1.n": "Act 1",
      "n1.t": "Mind reading",
      "n1.c": "the consultation",
      "n1.alt": "The salon: the hood dryer, the station with the mirror, the black chairs and the black brick wall",
      "n1.p": "The first act is performed sitting down, before the scissors come out. Tell us what you have in mind, even halfway; we look at your hair, ask a couple of questions and decide together what can really be done, honestly. It’s the act clients remember most: they write that here they understand straight away what they want.",
      "n1.mano": "Every act on the programme starts here.",
      "n2.n": "Act 2",
      "n2.t": "The transformation",
      "n2.c": "colour",
      "n2.alt": "Wavy platinum blonde hair seen from behind: soft waves and very light ends over a black jumper",
      "n2.p": "From black to platinum blonde, from red to white, from brown to highlights: the colour is chosen in front of the mirror and done calmly, with care for your hair. In the clients’ photos there are bright blondes, natural reflections and bold colours, like a purple streak on platinum blonde.",
      "n2.mano": "Colour, highlights, lightening, reflections.",
      "n3.n": "Act 3",
      "n3.t": "The rings",
      "n3.c": "curls and perms",
      "n3.alt": "A short men’s perm seen from behind: tight, soft curls, the salon in the background",
      "n3.p": "The act of the rings is performed with hair: the perm, for those who want curls, and the light body wave, which adds volume without turning everything upside down. For those who already have curls, the right cut for frizzy curls and the products to keep them in shape. For her and for him.",
      "n3.mano": "Perm, body wave, cuts for curls, anti-frizz.",
      "n4.n": "Act 4",
      "n4.t": "Torn and restored",
      "n4.c": "hair to be rescued",
      "n4.alt": "Long brown hair with wavy, glossy ends, seen from behind on the salon chair",
      "n4.p": "In the theatres of old, a newspaper was torn to pieces and restored whole. Here people often arrive with hair damaged by treatments done elsewhere, burnt, frizzy: first we listen to the problem, then we choose the way, from keratin to an anti-frizz treatment, down to a cut that puts everything back in order.",
      "n4.mano": "Keratin straightening, anti-frizz, rescue cuts.",
      "n5.n": "Act 5",
      "n5.t": "The scissors",
      "n5.c": "cut and blow-dry",
      "n5.alt": "Golden curls in three-quarter view against the black wall, on the shoulders the purple, red and orange cape",
      "n5.p": "The most classic act, and without sawing anyone in half: cut, shampoo and blow-dry for her, cut for him. Up-to-date or timeless cuts, on straight, wavy or curly hair, and the blow-dry that sends you out of the salon just as you had it in mind.",
      "n5.mano": "For her and for him.",
      "r.t": "The audience’s verdict",
      "r.su": "on Google · 154 reviews",
      "r.r1": "«They changed me completely....for the better. From medium-length red to a short shaded white....exactly what I wanted!!!»",
      "r.r2": "«Very helpful and professional. I arrived without an appointment, with my hair burnt by another hairdresser. He gave me a very nice cut despite the difficulties. Lots of my friends liked the new hairstyle. Thank you.»",
      "r.r3": "«Kindness and professionalism a step from home... For difficult hair like mine.. Frizzy curls, he got the cut right first time and recommended a fabulous product... Also tried the anti-frizz treatment...»",
      "r.r4": "«What can I say, my hair was a bit damaged by treatments done elsewhere! They suggested a light body wave and the result? I’m so happy!!! Thank you from the ♥️»",
      "r.r6": "«SUPER SATISFIED IT HAD BEEN YEARS SINCE I HAD SUCH A BEAUTIFUL COLOUR TOCCO MAGICO I LOVE YOU»",
      "r.tradotta": "on Google (translated from Italian)",
      "r.inglese": "on Google",
      "r.nota": "From the reviews on Google, as they were written.",
      "b.t": "Box office",
      "b.come": "Bookings by phone",
      "b.cap": "Opening hours",
      "b.k1": "Address",
      "b.k2": "Metro",
      "b.v2": "M4 Tolstoj, about 150 metres away",
      "b.k3": "Phone",
      "b.strada": "Directions to Via Lorenteggio 43 →",
      "b.mappa": "Map: Tocco magico, Via Lorenteggio 43, Milan",
      "b.promessa": "uses no trapdoors and no false bottoms: only scissors, colour and patience.",
      "g.lun": "Monday",
      "g.mar": "Tuesday",
      "g.mer": "Wednesday",
      "g.gio": "Thursday",
      "g.ven": "Friday",
      "g.sab": "Saturday",
      "g.dom": "Sunday",
      "g.riposo": "closed",
      "z.tipo": "Hairdresser for her and for him",
      "z.cred": "Demo website made by <a href=\"https://bespokestud.io\" rel=\"noopener\">Bespoke Studio</a> · clients’ photos and public reviews from the salon’s Google listing (September 2026).",
      "z.su": "Back to the top ↑"
    },
    LANGS: null,
    RTL: ['ar', 'he', 'fa', 'ur'],
    HOURS_I18N: null,
  };
  /* normalizzazione: EN storico -> LANGS */
  if (!SITE.LANGS) SITE.LANGS = SITE.EN && Object.keys(SITE.EN).length ? { en: SITE.EN } : {};
  var LANG_CODES = Object.keys(SITE.LANGS);   // senza 'it', che è il DOM
  /* ═════════════════════════════════════════════════════════════════ */

  /* ---------- WhatsApp wiring ---------- */
  if (SITE.whatsapp.number) {
    var waHref = 'https://wa.me/' + SITE.whatsapp.number + '?text=' +
      encodeURIComponent(SITE.whatsapp.message);
    SITE.whatsapp.ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) { el.href = waHref; el.target = '_blank'; el.rel = 'noopener'; }
    });
  }

  /* ---------- GSAP: registrazione IMMEDIATA + reveal + watchdog ---------- */
  var hasGsap = typeof gsap !== 'undefined';
  var hasST = hasGsap && typeof ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  function showAllReveals() {
    var els = document.querySelectorAll(SITE.revealSelector);
    els.forEach(function (el) { el.classList.add(SITE.inViewClass); });
    if (hasGsap) {
      if (hasST) {
        els.forEach(function (el) {
          ScrollTrigger.getAll().forEach(function (st) {
            if (st.trigger === el && !st.progress) st.kill();
          });
        });
      }
      gsap.set(els, { opacity: 1, y: 0, x: 0 });
    }
  }
  // FIX FOUC (18/7): il watchdog è SOLO un fallback se GSAP non c'è (o reduced-motion).
  // Rivelare in anticipo tutti i .reveal mentre gli scroll-trigger sono attivi causava il
  // flash (scompaiono/ricompaiono) sotto la piega. Con GSAP attivo, rivelano gli ScrollTrigger.
  setTimeout(function () { if (!hasGsap || reducedMotion) showAllReveals(); }, 1500);

  if (hasGsap && !reducedMotion) {
    // reveal generico: le animazioni-FIRMA del sito vanno oltre questo,
    // ma si registrano ANCHE LORO subito, mai dopo l'intro.
    // ⚠️ REGOLA ANTI-FLASH (18/7): un elemento .reveal deve avere UNA SOLA animazione che
    // ne porta l'opacità a 1. Se un elemento ha una FIRMA che ne anima l'opacità (stagger,
    // timeline, ecc.), ESCLUDILO da qui via SITE.revealSelector (es. '.reveal:not(.mondo)'),
    // altrimenti il reveal generico + la firma si sovrappongono e l'elemento FLASHA.
    // immediateRender:false → lo stato "from" (opacity:0) NON viene ri-applicato ad ogni
    // ScrollTrigger.refresh() (che scatta al window.load mentre scrolli) → niente flash su refresh.
    gsap.utils.toArray(SITE.revealSelector).forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });
  } else {
    // fallback senza GSAP: IntersectionObserver + classe
    if ('IntersectionObserver' in window && !reducedMotion) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add(SITE.inViewClass); io.unobserve(e.target); }
        });
      }, { threshold: 0.12 });
      document.querySelectorAll(SITE.revealSelector).forEach(function (el) { io.observe(el); });
    } else {
      showAllReveals();
    }
  }

  /* ---------- intro skippabile (NON gate-a nulla) ---------- */
  var intro = document.getElementById(SITE.introId);
  /* ⚠️ L'hook si legge AL MOMENTO DELLA CHIAMATA, mai catturato per valore
     qui. Il codice-firma vive sotto il marcatore di fine plumbing — cioè
     gira DOPO questa riga — quindi `window.bespokeHeroEntrance ||
     function(){}` congelava la funzione vuota e l'entrata dell'hero non
     partiva più: titolo a opacity 0 per sempre, hero vuota sul live.
     (20/7/2026, riprodotto a schermo su Benessere Futuro #159.) */
  function heroEntrance() {
    if (typeof window.bespokeHeroEntrance === 'function') window.bespokeHeroEntrance();
  }
  function hideIntro() {
    if (!intro) return;
    var el = intro; intro = null;
    el.classList.add('hide');
    setTimeout(function () { el.remove(); }, 700);
    heroEntrance();
  }
  // rimozione IMMEDIATA (niente fade): serve quando qualcosa deve stare sopra
  // l'intro subito, es. l'apertura del menu. Durante il fade l'intro resta
  // hit-testable e i link del drawer non sono cliccabili.
  function killIntroNow() {
    if (!intro) return;
    var el = intro; intro = null;
    el.remove();
    heroEntrance();
  }
  if (reducedMotion || !intro) {
    if (intro) { intro.remove(); intro = null; }
    /* ⚠️ setTimeout 0 NON è decorativo: senza intro questo ramo gira in modo
       SINCRONO, cioè PRIMA che il codice-firma — che sta sotto il marcatore
       di fine plumbing, dentro questa stessa IIFE — abbia assegnato
       `window.bespokeHeroEntrance`. Il risultato è un'entrata dell'hero MUTA:
       nessun errore, elementi visibili, animazione semplicemente mai partita.
       Rimandando di un tick la IIFE è conclusa e l'hook esiste.
       (14/8/2026, A.S.FA. Sicilia: misurato h1 a opacity 1 già al load.)
       Cugino del bug `hero-hook-congelato` del 20/7: lì l'hook era catturato
       troppo presto, qui è CHIAMATO troppo presto. */
    setTimeout(heroEntrance, 0);
  } else {
    setTimeout(hideIntro, SITE.introDuration);
    setTimeout(hideIntro, 6000); // safety net: l'intro non può incastrarsi
    intro.addEventListener('click', hideIntro);
  }

  /* ---------- burger menu (inert + focus + Escape + resize) ---------- */
  var burger = document.getElementById('burger');
  /* 26/7/2026 (Il Papiro #168) — IL PANNELLO SI RISOLVE DA `aria-controls`.
     Il canone apriva sempre `#mainNav`, dando per scontato che la nav
     desktop FOSSE anche il drawer. Molti siti invece hanno un drawer
     separato (`#mobile-menu`) con `hidden`, mentre `#mainNav` su mobile è
     `display:none`: il burger aggiungeva `nav-open` a un elemento nascosto
     e il menu non si apriva. È la stessa decisione già presa il 20/7 per
     qa-motion — «è lì che il markup accessibile dice qual è il pannello» —
     che però non era mai rientrata qui. */
  var nav = (function () {
    var byAria = burger && burger.getAttribute('aria-controls');
    return (byAria && document.getElementById(byAria)) || document.getElementById('mainNav');
  })();
  if (burger && nav) {
    var navUsaHidden = nav.hasAttribute('hidden');
    var lastFocus = null;
    var closeNav = function () {
      nav.classList.remove('nav-open');
      if (navUsaHidden) nav.hidden = true;
      burger.setAttribute('aria-expanded', 'false');
      if (lastFocus) { lastFocus.focus(); lastFocus = null; }
    };
    var openNav = function () {
      // L'intro ha z-index alto ed è figlia del body: se è ancora a schermo
      // copre il drawer (che vive nello stacking context dell'header) e i link
      // risultano non cliccabili. Aprire il menu chiude l'intro.
      // (bug trovato da qa-motion su Linea Uomo, 19/7/2026 → PLUMBING_V 2)
      if (typeof killIntroNow === 'function') killIntroNow();
      lastFocus = document.activeElement;
      if (navUsaHidden) nav.hidden = false;
      nav.classList.add('nav-open');
      burger.setAttribute('aria-expanded', 'true');
      var first = nav.querySelector('a, button');
      if (first) first.focus();
    };
    burger.addEventListener('click', function () {
      nav.classList.contains('nav-open') ? closeNav() : openNav();
    });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeNav();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > SITE.breakpointMenu) closeNav();
    });
  }

  /* ---------- lightbox accessibile ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  if (lightbox && lightboxImg) {
    var opener = null;
    var openLb = function (src, alt) {
      lightboxImg.src = src; lightboxImg.alt = alt || '';
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      if (lightboxClose) lightboxClose.focus();
    };
    var closeLb = function () {
      lightbox.hidden = true; lightboxImg.src = '';
      document.body.style.overflow = '';
      if (opener) { opener.focus(); opener = null; }
    };
    document.querySelectorAll('[data-full]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        opener = btn;
        var img = btn.querySelector('img');
        openLb(btn.getAttribute('data-full'), img ? img.alt : '');
      });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !lightbox.hidden) closeLb();
    });
  }

  /* ---------- orari dinamici Europe/Rome (finestre multiple + scavalco) ---------- */
  function romeNow() {
    try {
      var f = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false,
      });
      var p = f.formatToParts(new Date());
      var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var get = function (t) { return p.find(function (x) { return x.type === t; }).value; };
      return { day: map[get('weekday')], mins: parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10) };
    } catch (e) {
      var d = new Date();
      return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() };
    }
  }
  var toMin = function (hm) {
    var a = hm.split(':');
    return parseInt(a[0], 10) * 60 + parseInt(a[1], 10);
  };
  var fmt = function (m) {
    m = m % 1440;
    return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2);
  };
  var DAYS_IT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var HOURS_BASE = {
    it: { open: 'Aperto ora', closesAt: 'chiude alle ', opensToday: 'Chiuso · apre oggi alle ',
          opensOn: 'Chiuso · apre {day} alle ', closed: 'Chiuso', days: DAYS_IT },
    en: { open: 'Open now', closesAt: 'closes at ', opensToday: 'Closed · opens today at ',
          opensOn: 'Closed · opens {day} at ', closed: 'Closed', days: DAYS_EN },
  };
  /* risolve le etichette orari per la lingua richiesta, con fallback en -> it */
  function strings(lang) {
    var custom = (SITE.HOURS_I18N && SITE.HOURS_I18N[lang]) || null;
    var base = HOURS_BASE[lang] || HOURS_BASE.en;
    if (!custom) return base;
    var outp = {};
    Object.keys(HOURS_BASE.it).forEach(function (k) {
      outp[k] = custom[k] !== undefined ? custom[k] : base[k];
    });
    return outp;
  }

  function hoursState() {
    var now = romeNow();
    // finestra del giorno corrente
    var wins = SITE.hours[now.day] || [];
    for (var i = 0; i < wins.length; i++) {
      var s = toMin(wins[i][0]), e = toMin(wins[i][1]);
      if (now.mins >= s && now.mins < Math.min(e, 1440)) {
        return { open: true, day: now.day, closesAt: fmt(e) };
      }
    }
    // coda dopo mezzanotte della sera PRIMA
    var prev = (now.day + 6) % 7;
    var pw = SITE.hours[prev] || [];
    for (var j = 0; j < pw.length; j++) {
      var pe = toMin(pw[j][1]);
      if (pe > 1440 && now.mins < pe - 1440) {
        return { open: true, day: prev, closesAt: fmt(pe) };
      }
    }
    // chiuso: prossima apertura (oggi o nei prossimi 7 giorni)
    for (var k = 0; k < wins.length; k++) {
      if (now.mins < toMin(wins[k][0])) {
        return { open: false, day: now.day, opensToday: fmt(toMin(wins[k][0])) };
      }
    }
    for (var d = 1; d <= 7; d++) {
      var nd = (now.day + d) % 7;
      var nw = SITE.hours[nd] || [];
      if (nw.length) return { open: false, day: now.day, opensDay: nd, opensAt: fmt(toMin(nw[0][0])) };
    }
    return { open: false, day: now.day };
  }

  function renderHours() {
    var el = document.getElementById(SITE.hoursStatusId);
    var st = hoursState();
    document.querySelectorAll(SITE.hoursTableSelector).forEach(function (row) {
      row.classList.toggle(SITE.todayClass,
        parseInt(row.getAttribute('data-day'), 10) === st.day);
    });
    if (!el) return;
    /* V4: le etichette si risolvono per lingua corrente, non con un booleano
       en/it. Fallback a catena lingua -> en -> it, così un sito con AR o FR
       che non traduce lo stato orari resta comunque leggibile. */
    var L = strings(root.lang);
    var txt;
    if (st.open) {
      txt = L.open + ' · ' + L.closesAt + st.closesAt;
    } else if (st.opensToday) {
      txt = L.opensToday + st.opensToday;
    } else if (st.opensAt !== undefined) {
      txt = L.opensOn.replace('{day}', L.days[st.opensDay]) + st.opensAt;
    } else {
      txt = L.closed;
    }
    el.textContent = txt;
  }
  renderHours();
  setInterval(renderHours, 60000);

  /* ---------- i18n overlay (EN sopra l'IT del DOM) ---------- */
  var originals = {}; // attr -> key -> testo IT
  var I18N_ATTRS = [
    ['data-i18n', null],
    ['data-i18n-aria', 'aria-label'],
    ['data-i18n-alt', 'alt'],
    ['data-i18n-placeholder', 'placeholder'],
    ['data-i18n-title', 'title'],
  ];
  function setLang(lang) {
    /* V4: qualunque lingua dichiarata in SITE.LANGS, non più solo 'en'.
       'it' resta la lingua del DOM: nessun dizionario, nessuna sostituzione.
       Una lingua sconosciuta ricade su 'it' invece di rompere la pagina. */
    root.lang = (lang === 'it' || LANG_CODES.indexOf(lang) !== -1) ? lang : 'it';
    root.dir = SITE.RTL.indexOf(root.lang) !== -1 ? 'rtl' : 'ltr';
    var dict = SITE.LANGS[root.lang] || null;
    I18N_ATTRS.forEach(function (pair) {
      var dattr = pair[0], target = pair[1];
      if (!originals[dattr]) originals[dattr] = {};
      document.querySelectorAll('[' + dattr + ']').forEach(function (el) {
        var key = el.getAttribute(dattr);
        var store = originals[dattr];
        /* innerHTML, NON textContent: gli elementi tradotti contengono
           quasi sempre markup (<strong>, <br>) e con textContent il primo
           passaggio a EN lo appiattisce — tornando in italiano il grassetto
           non torna più. I valori del dizionario sono statici e scritti da
           noi. (20/7/2026: la flotta era già così, il boilerplate no.) */
        if (!(key in store)) store[key] = target ? el.getAttribute(target) : el.innerHTML;
        var val = dict && dict[key] !== undefined ? dict[key] : store[key];
        if (target) el.setAttribute(target, val); else el.innerHTML = val;
      });
    });
    renderHours();
    /* stato visivo della coppia di bottoni lingua, se il sito la usa */
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      var on = b.getAttribute('data-lang') === root.lang;
      b.classList.toggle('is-on', on);
      if (b.tagName === 'BUTTON') b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    try { localStorage.setItem(SITE.slug + '-lang', lang); } catch (e) {}
  }
  /* 26/7/2026 (Il Papiro #168) — SI CABLANO ENTRAMBE LE FORME DI SELETTORE.
     Il canone conosceva solo il toggle singolo `#langToggle`, ma nella
     flotta esiste da tempo anche la COPPIA di bottoni `[data-lang]`
     (Warsa, Mido…): `i18n-roundtrip` era già stato insegnato a riconoscerle
     il 20/7, il plumbing no. Chi copiava il boilerplate e usava la coppia
     si ritrovava il cambio lingua MORTO, e nessun lint statico se ne
     accorgeva (lo becca solo qa-motion, a runtime). */
  var langToggle = document.getElementById('langToggle');
  if (langToggle) {
    /* V4: il toggle singolo CICLA sull'anello ['it', ...LANG_CODES].
       Con due lingue il comportamento è identico a prima (it <-> en). */
    var RING = ['it'].concat(LANG_CODES);
    langToggle.addEventListener('click', function () {
      var i = RING.indexOf(root.lang);
      setLang(RING[(i + 1) % RING.length]);
    });
  }
  document.querySelectorAll('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });
  try {
    var saved = localStorage.getItem(SITE.slug + '-lang');
    if (saved && saved !== 'it' && LANG_CODES.indexOf(saved) !== -1) setLang(saved);
  } catch (e) {}

  /* ---------- action-bar mobile (opzionale: #actionBar) ---------- */
  var actionBar = document.getElementById('actionBar');
  if (actionBar) {
    var onScroll = function () {
      actionBar.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ══════════ FINE PLUMBING — da qui in giù SOLO il codice-firma
     del sito (animazioni e interazioni uniche del cliente), che si
     registra comunque SUBITO, mai dentro setTimeout/intro. ══════════ */

  /* ══════════ TOCCO MAGICO — «Pensate a un colore. Uno qualsiasi.» ══════════
     La pagina è il manifesto tipografico del loro spettacolo (alla «Challenge to Houdini»): il programma sono i servizi.
     la FIRMA — la mantellina tolta con un colpo: la loro mantellina a strisce arcobaleno copre la foto del palco come il
     drappo del prestigiatore; un attimo, e un colpo secco la tira via in alto a destra: la stoffa si piega, ondeggia e vola
     fuori. È una stoffa simulata: una griglia di punti (Verlet a passo fisso, 1/120 s: stesso risultato a ogni frame
     rate), vincoli di lunghezza, gravità, attrito dell'aria sulle facce, la foto come parete (z ≥ 0); ogni faccia è
     ombreggiata dalla sua normale, fronte e retro. Toccando la foto (o Invio/Spazio) la mantellina ricade e si ritira via.
     Stato finale = l'HTML: la foto scoperta, il canvas nascosto. Senza JS o con reduced-motion non c'è mantellina; durante
     l'attesa la copre il drappo CSS (classe firma-attesa messa nell'head), identico al primo fotogramma del canvas: sei
     strisce piatte, bordo -2 %, larghe il 104 %. Se questo codice non parte, l'head toglie la classe dopo 2,5 s. */
  var palco = document.getElementById('palco');
  var cornice = document.getElementById('palcoCornice');
  var tela = palco && palco.querySelector('.palco__stoffa');
  var ctx = tela && tela.getContext ? tela.getContext('2d') : null;
  var PALCO = { it: 'La mantellina: toccate la foto, torna e si toglie di nuovo', en: 'The cape: tap the photo, it comes back and is pulled away again' };

  /* lo stato degli orari anche nella biglietteria, col pallino verde quando è aperto */
  function copiaStato() {
    var primo = document.getElementById(SITE.hoursStatusId);
    if (!primo) return;
    var aperto = hoursState().open;
    ['orarioStato', 'orarioStato2'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      if (el !== primo) el.textContent = primo.textContent;
      el.classList.toggle('is-aperto', aperto);
    });
  }
  function etichettaPalco() {
    if (!cornice || cornice.getAttribute('role') !== 'button') return;
    cornice.setAttribute('aria-label', PALCO[root.lang] || PALCO.it);
  }
  copiaStato();
  setInterval(copiaStato, 60000);
  new MutationObserver(function () { copiaStato(); etichettaPalco(); }).observe(root, { attributes: true, attributeFilter: ['lang'] });

  var STRISCE = [[228, 23, 42], [238, 106, 18], [233, 204, 28], [62, 148, 66], [63, 102, 214], [110, 53, 144]];
  var NX = 37, NY = 31;                 /* punti: 36 colonne (6 per striscia) × 30 file */
  var DT = 1 / 120, ITER = 8;
  var LUCE = norm([-0.42, -0.58, 0.7]);  /* dall'alto a sinistra, davanti */
  var MEZZA = norm([LUCE[0], LUCE[1], LUCE[2] + 1]);
  var DIFF0 = LUCE[2], SPEC0 = Math.pow(MEZZA[2], 30);
  var W = 0, H = 0, DPR = 1, CW = 0, CH = 0, X0 = 0, DX = 0, DY = 0, FOC = 1;
  var P, Q, R0, FISSO, META, VA, VB, VL, VK, ORD, KEY, PX, PY, VN, OMB, OMB2 = null, FORZE, FILA = new Uint8Array(NX);
  var fase = 'fatto', tSim = 0, acc = 0, ultimo = 0, raf = 0, guardia = 0, attesa = 0;

  function norm(v) { var l = Math.hypot(v[0], v[1], v[2]) || 1; return [v[0] / l, v[1] / l, v[2] / l]; }
  function idx(i, j) { return j * NX + i; }

  function misura() {
    var r = cornice.getBoundingClientRect();
    W = r.width; H = r.height;
    DPR = Math.min(2, window.devicePixelRatio || 1);
    tela.width = Math.round(W * DPR); tela.height = Math.round(H * DPR);
    CW = W * 1.04; CH = H * 1.03; X0 = -W * 0.02; DX = CW / (NX - 1); DY = CH / (NY - 1);
    FOC = W * 2.4;
  }

  /* la griglia a riposo: piatta sulla foto (z = 0), la fila in alto appesa al bordo della cornice */
  function prepara(dy) {
    var n = NX * NY;
    P = new Float64Array(n * 3); Q = new Float64Array(n * 3); R0 = new Float64Array(n * 3);
    FISSO = new Uint8Array(n); META = new Float64Array(n * 3); FORZE = new Float64Array(n * 3);
    PX = new Float64Array(n); PY = new Float64Array(n); VN = new Float64Array(n * 3); OMB = new Float64Array(n * 2);
    for (var j = 0; j < NY; j++) for (var i = 0; i < NX; i++) {
      var k = idx(i, j) * 3;
      R0[k] = X0 + i * DX; R0[k + 1] = j * DY; R0[k + 2] = 0;
      /* quando ricade (dy < 0) la stoffa ha un filo d'onda, così frenando si piega invece di restare un foglio */
      var z = dy ? 1.5 * (1 + Math.sin(i * 0.9 + j * 0.35)) : 0;
      P[k] = Q[k] = R0[k]; P[k + 1] = Q[k + 1] = R0[k + 1] + (dy || 0); P[k + 2] = Q[k + 2] = z;
    }
    /* vincoli: lungo la trama e l'ordito rigidi (la stoffa non si allunga), in diagonale morbidi (la seta cede di sbieco) */
    var a = [], b = [], rig = [];
    for (j = 0; j < NY; j++) for (i = 0; i < NX; i++) {
      if (i < NX - 1) { a.push(idx(i, j)); b.push(idx(i + 1, j)); rig.push(1); }
      if (j < NY - 1) { a.push(idx(i, j)); b.push(idx(i, j + 1)); rig.push(1); }
      if (i < NX - 1 && j < NY - 1) { a.push(idx(i, j)); b.push(idx(i + 1, j + 1)); rig.push(0.35); a.push(idx(i + 1, j)); b.push(idx(i, j + 1)); rig.push(0.35); }
      /* flessione: fra punti a due celle, morbida. Senza, la griglia vibra a scala di cella (punti vicini alternati avanti
         e indietro) e le pieghe si vedono a quadretti (27/9, pellicola del colpo) */
      if (i < NX - 2) { a.push(idx(i, j)); b.push(idx(i + 2, j)); rig.push(0.22); }
      if (j < NY - 2) { a.push(idx(i, j)); b.push(idx(i, j + 2)); rig.push(0.22); }
    }
    VA = Int32Array.from(a); VB = Int32Array.from(b); VK = Float64Array.from(rig); VL = new Float64Array(a.length);
    for (var c = 0; c < a.length; c++) {
      var p = a[c] * 3, q = b[c] * 3;
      VL[c] = Math.hypot(R0[q] - R0[p], R0[q + 1] - R0[p + 1]);
    }
    var nq = (NX - 1) * (NY - 1);
    ORD = new Int32Array(nq); KEY = new Float64Array(nq);
    for (var o = 0; o < nq; o++) ORD[o] = o;
  }

  /* la mano del prestigiatore: afferra l'angolo in alto a destra e tira in alto a destra, verso chi guarda, accelerando;
     il primo decimo di secondo è la presa (la stoffa si stacca dall'angolo), poi il colpo, in circa un secondo */
  function mano(t) {
    var u = t / 0.95;
    return [W * (0.15 * u + 2.6 * u * u), -H * (0.05 * u + 1.15 * u * u), W * (1.1 * u + 0.2 * u * u)];
  }
  function appendi(fila, dx, dy, dz) {
    for (var i = 0; i < NX; i++) {
      var k = idx(i, 0);
      if (!fila[i]) { FISSO[k] = 0; continue; }
      FISSO[k] = 1;
      META[k * 3] = R0[k * 3] + dx; META[k * 3 + 1] = R0[k * 3 + 1] + dy; META[k * 3 + 2] = R0[k * 3 + 2] + dz;
    }
  }

  function simula(t) {
    var n = NX * NY, g = H * 4.2 * DT * DT, i, k, p;
    /* chi tiene la stoffa: nella caduta tutta la fila in alto (che scende e si ferma), nel colpo solo l'angolo a destra */
    if (fase === 'torna') {
      /* la ricaduta: per 0,32 s la stoffa cade tutta insieme, accelerando come un corpo che cade (nessun punto spinge
         l'altro: spingere una stoffa dall'alto la accartoccia, 27/9); poi la fila in alto si ferma sul bordo e il resto,
         simulato, continua per inerzia e si assesta */
      var TD = 0.36;
      if (t < TD) {
        var uu = t / TD, off = -CH * 1.08 * (1 - uu * uu * (3 - 2 * uu)); /* scende e frena: arriva ferma, niente rimbalzo */
        for (i = 0; i < n; i++) {
          k = i * 3;
          Q[k] = P[k]; Q[k + 1] = P[k + 1]; Q[k + 2] = P[k + 2];
          P[k] = R0[k]; P[k + 1] = R0[k + 1] + off; P[k + 2] = R0[k + 2] + 1.5 * (1 + Math.sin((i % NX) * 0.9 + Math.floor(i / NX) * 0.35));
        }
        return;
      }
      for (i = 0; i < NX; i++) FILA[i] = 1;
      appendi(FILA, 0, 0, 0);
    } else {
      var m = mano(t);
      for (i = 0; i < NX; i++) FILA[i] = i >= NX - 4 ? 1 : 0;
      appendi(FILA, m[0], m[1], m[2]);
    }
    /* attrito dell'aria sulle facce: frena la stoffa lungo la sua normale, così si gonfia invece di cadere a piombo */
    var F = FORZE;
    F.fill(0);
    for (var jj = 0; jj < NY - 1; jj++) for (var ii = 0; ii < NX - 1; ii++) {
      var a = idx(ii, jj), b = idx(ii + 1, jj), c = idx(ii, jj + 1), d = idx(ii + 1, jj + 1);
      var ex = P[b * 3] - P[a * 3], ey = P[b * 3 + 1] - P[a * 3 + 1], ez = P[b * 3 + 2] - P[a * 3 + 2];
      var fx = P[c * 3] - P[a * 3], fy = P[c * 3 + 1] - P[a * 3 + 1], fz = P[c * 3 + 2] - P[a * 3 + 2];
      var nx = ey * fz - ez * fy, ny = ez * fx - ex * fz, nz = ex * fy - ey * fx;
      var area = Math.hypot(nx, ny, nz) || 1; nx /= area; ny /= area; nz /= area;
      var vx = 0, vy = 0, vz = 0, qq = [a, b, c, d];
      for (p = 0; p < 4; p++) { k = qq[p] * 3; vx += P[k] - Q[k]; vy += P[k + 1] - Q[k + 1]; vz += P[k + 2] - Q[k + 2]; }
      var vn = (vx * nx + vy * ny + vz * nz) * 0.25;
      var f = -vn * 0.08;
      for (p = 0; p < 4; p++) { k = qq[p] * 3; F[k] += f * nx; F[k + 1] += f * ny; F[k + 2] += f * nz; }
    }
    for (i = 0; i < n; i++) {
      k = i * 3;
      if (FISSO[i]) { Q[k] = P[k]; Q[k + 1] = P[k + 1]; Q[k + 2] = P[k + 2]; P[k] = META[k]; P[k + 1] = META[k + 1]; P[k + 2] = META[k + 2]; continue; }
      var x = P[k], y = P[k + 1], z = P[k + 2];
      P[k] += (x - Q[k]) * 0.992 + F[k];
      P[k + 1] += (y - Q[k + 1]) * 0.992 + g + F[k + 1];
      P[k + 2] += (z - Q[k + 2]) * 0.992 + F[k + 2];
      Q[k] = x; Q[k + 1] = y; Q[k + 2] = z;
    }
    for (var it = 0; it < ITER; it++) {
      for (var cc = 0; cc < VA.length; cc++) {
        var pa = VA[cc], pb = VB[cc], ka = pa * 3, kb = pb * 3;
        var dx = P[kb] - P[ka], dy = P[kb + 1] - P[ka + 1], dz = P[kb + 2] - P[ka + 2];
        var dist = Math.sqrt(dx * dx + dy * dy + dz * dz) || 1e-6;
        var diff = (dist - VL[cc]) / dist * VK[cc];
        var wa = FISSO[pa] ? 0 : 1, wb = FISSO[pb] ? 0 : 1, ws = wa + wb;
        if (!ws) continue;
        var sa = diff * wa / ws, sb = diff * wb / ws;
        P[ka] += dx * sa; P[ka + 1] += dy * sa; P[ka + 2] += dz * sa;
        P[kb] -= dx * sb; P[kb + 1] -= dy * sb; P[kb + 2] -= dz * sb;
      }
      /* la foto è una parete: la stoffa non ci passa dietro, e ci striscia sopra con un po' di attrito */
      for (i = 0; i < n; i++) {
        k = i * 3;
        if (P[k + 2] < 0) { P[k + 2] = 0; Q[k] += (P[k] - Q[k]) * 0.15; Q[k + 1] += (P[k + 1] - Q[k + 1]) * 0.15; }
      }
    }
  }

  function disegna() {
    var n = NX * NY, cx = W / 2, cy = H / 2, i, k;
    for (i = 0; i < n; i++) {
      k = i * 3;
      var s = FOC / Math.max(FOC * 0.2, FOC - P[k + 2]);
      PX[i] = cx + (P[k] - cx) * s; PY[i] = cy + (P[k + 1] - cy) * s;
    }
    var nq = (NX - 1) * (NY - 1), q;
    for (q = 0; q < nq; q++) {
      var qi = q % (NX - 1), qj = (q - qi) / (NX - 1);
      KEY[q] = P[idx(qi, qj) * 3 + 2] + P[idx(qi + 1, qj + 1) * 3 + 2] + P[idx(qi + 1, qj) * 3 + 2] + P[idx(qi, qj + 1) * 3 + 2];
    }
    var ord = Array.prototype.slice.call(ORD).sort(function (a, b) { return KEY[a] - KEY[b] || a - b; });
    /* ombreggiatura liscia: la normale di ogni punto è la media delle facce intorno (pesate per area), la luce si calcola
       sui punti (fronte e retro) e ogni triangolo prende la media dei suoi tre: niente scalini fra una faccia e l'altra */
    VN.fill(0);
    var ci, cj, a, b, c, d;
    for (q = 0; q < nq; q++) {
      ci = q % (NX - 1); cj = (q - ci) / (NX - 1);
      a = idx(ci, cj); b = idx(ci + 1, cj); c = idx(ci, cj + 1); d = idx(ci + 1, cj + 1);
      var ex = P[d * 3] - P[a * 3], ey = P[d * 3 + 1] - P[a * 3 + 1], ez = P[d * 3 + 2] - P[a * 3 + 2];
      var fx = P[c * 3] - P[b * 3], fy = P[c * 3 + 1] - P[b * 3 + 1], fz = P[c * 3 + 2] - P[b * 3 + 2];
      var nx = ey * fz - ez * fy, ny = ez * fx - ex * fz, nz = ex * fy - ey * fx;
      var vv = [a, b, c, d];
      for (var v = 0; v < 4; v++) { k = vv[v] * 3; VN[k] += nx; VN[k + 1] += ny; VN[k + 2] += nz; }
    }
    for (i = 0; i < n; i++) {
      k = i * 3;
      var ln = Math.hypot(VN[k], VN[k + 1], VN[k + 2]) || 1;
      var ux = VN[k] / ln, uy = VN[k + 1] / ln, uz = VN[k + 2] / ln;
      /* OMB[2i] = luce vista dal davanti, OMB[2i+1] = vista dal retro (normale ribaltata) */
      for (var lato = 0; lato < 2; lato++) {
        var sx = lato ? -ux : ux, sy = lato ? -uy : uy, sz = lato ? -uz : uz;
        var dif = Math.max(0, sx * LUCE[0] + sy * LUCE[1] + sz * LUCE[2]);
        var luc = Math.max(0, Math.pow(Math.max(0, sx * MEZZA[0] + sy * MEZZA[1] + sz * MEZZA[2]), 30) - SPEC0) * 0.45;
        OMB[i * 2 + lato] = (0.3 + 0.7 * dif / DIFF0) * (lato ? 0.8 : 1) + luc * 4;
      }
    }
    /* due passate di levigatura della luce (media coi quattro vicini): una piega più stretta di una cella non si vede a
       dentini. Stoffa piatta = tutti uguali, la levigatura non cambia niente (il primo fotogramma resta identico al drappo) */
    for (var passata = 0; passata < 2; passata++) {
      if (!OMB2 || OMB2.length !== OMB.length) OMB2 = new Float64Array(OMB.length);
      for (var jj = 0; jj < NY; jj++) for (var ii = 0; ii < NX; ii++) {
        var me = jj * NX + ii;
        for (var ls = 0; ls < 2; ls++) {
          var somma = 0, quanti = 0;
          if (ii > 0) { somma += OMB[(me - 1) * 2 + ls]; quanti++; }
          if (ii < NX - 1) { somma += OMB[(me + 1) * 2 + ls]; quanti++; }
          if (jj > 0) { somma += OMB[(me - NX) * 2 + ls]; quanti++; }
          if (jj < NY - 1) { somma += OMB[(me + NX) * 2 + ls]; quanti++; }
          OMB2[me * 2 + ls] = 0.5 * OMB[me * 2 + ls] + 0.5 * somma / quanti;
        }
      }
      var scambio = OMB; OMB = OMB2; OMB2 = scambio;
    }
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.clearRect(0, 0, W, H);
    ctx.lineJoin = 'round';
    ctx.lineWidth = 0.8;
    for (var o = 0; o < ord.length; o++) {
      q = ord[o];
      ci = q % (NX - 1); cj = (q - ci) / (NX - 1);
      a = idx(ci, cj); b = idx(ci + 1, cj); c = idx(ci, cj + 1); d = idx(ci + 1, cj + 1);
      /* il verso della faccia sullo schermo: fronte o retro della stoffa */
      var area = (PX[d] - PX[a]) * (PY[c] - PY[b]) - (PY[d] - PY[a]) * (PX[c] - PX[b]);
      var lo = area < 0 ? 1 : 0;
      var col = STRISCE[Math.min(5, Math.floor(ci * 6 / (NX - 1)))];
      /* la luce dei quattro punti approssimata da un piano (minimi quadrati sullo schermo) e dipinta come gradiente
         lineare: le facce vicine si raccordano, niente scalini sulle pieghe. Stoffa piatta = tinta unita, identica al drappo */
      var qp = [a, b, d, c], mx = 0, my = 0, ms = 0, v2, sv = [0, 0, 0, 0];
      for (v2 = 0; v2 < 4; v2++) { sv[v2] = OMB[qp[v2] * 2 + lo]; mx += PX[qp[v2]]; my += PY[qp[v2]]; ms += sv[v2]; }
      mx /= 4; my /= 4; ms /= 4;
      var sxx = 0, sxy = 0, syy = 0, sxs = 0, sys = 0, rr = 0;
      for (v2 = 0; v2 < 4; v2++) {
        var ddx = PX[qp[v2]] - mx, ddy = PY[qp[v2]] - my, dds = sv[v2] - ms;
        sxx += ddx * ddx; sxy += ddx * ddy; syy += ddy * ddy; sxs += ddx * dds; sys += ddy * dds;
        rr = Math.max(rr, Math.hypot(ddx, ddy));
      }
      var det = sxx * syy - sxy * sxy, riempi;
      var gb = 0, gc = 0;
      if (Math.abs(det) > 1e-6) { gb = (sxs * syy - sys * sxy) / det; gc = (sys * sxx - sxs * sxy) / det; }
      var gm = Math.hypot(gb, gc);
      if (gm * rr < 0.012 || !isFinite(gm)) riempi = tinta(col, ms);
      else {
        var ux2 = gb / gm, uy2 = gc / gm;
        riempi = ctx.createLinearGradient(mx - ux2 * rr, my - uy2 * rr, mx + ux2 * rr, my + uy2 * rr);
        riempi.addColorStop(0, tinta(col, ms - gm * rr));
        riempi.addColorStop(1, tinta(col, ms + gm * rr));
      }
      ctx.beginPath();
      ctx.moveTo(PX[a], PY[a]); ctx.lineTo(PX[b], PY[b]); ctx.lineTo(PX[d], PY[d]); ctx.lineTo(PX[c], PY[c]); ctx.closePath();
      ctx.fillStyle = riempi; ctx.fill();
      ctx.strokeStyle = riempi; ctx.stroke();
    }
  }
  function tinta(col, sh) {
    sh = Math.max(0.2, Math.min(1.7, sh));
    var lucido = Math.max(0, sh - 1.12) * 0.5, base = Math.min(sh, 1.12);
    return 'rgb(' + Math.min(255, Math.round(col[0] * base + 255 * lucido)) + ',' + Math.min(255, Math.round(col[1] * base + 255 * lucido)) + ',' + Math.min(255, Math.round(col[2] * base + 255 * lucido)) + ')';
  }

  /* fuori scena: nessun punto della stoffa dentro la cornice */
  function fuori() {
    var m = 6;
    for (var i = 0; i < NX * NY; i++) if (PX[i] > -m && PX[i] < W + m && PY[i] > -m && PY[i] < H + m) return false;
    return true;
  }

  function chiudi() {
    cancelAnimationFrame(raf); raf = 0; clearTimeout(guardia); clearTimeout(attesa);
    if (ctx) { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, tela.width, tela.height); }
    palco.classList.remove('is-stoffa');
    root.classList.remove('firma-attesa');
    fase = 'fatto'; palco.setAttribute('data-mantella', 'fatto');
  }

  function passo(ts) {
    if (!ultimo) ultimo = ts;
    var dt = Math.min(0.05, (ts - ultimo) / 1000); ultimo = ts;
    acc += dt;
    while (acc >= DT) {
      simula(tSim);
      tSim += DT; acc -= DT;
      if (fase === 'torna' && tSim >= 0.98) { fase = 'tira'; tSim = 0; palco.setAttribute('data-mantella', 'tira'); }
    }
    disegna();
    if (fase === 'tira' && (fuori() || tSim > 2.2)) { chiudi(); return; }
    raf = requestAnimationFrame(passo);
  }
  function via(f) {
    misura();
    if (!W || !H) { chiudi(); return; }
    fase = f; tSim = 0; acc = 0; ultimo = 0;
    palco.setAttribute('data-mantella', f);
    prepara(f === 'torna' ? -CH * 1.08 : 0);
    if (f === 'tira') {
      /* la stoffa parte piatta (il primo fotogramma è identico al drappo CSS) ma con una piccola spinta verso chi guarda,
         diversa punto per punto: così, tirata, si stacca dalla foto e si piega invece di scivolare come un foglio */
      for (var j = 0; j < NY; j++) for (var i = 0; i < NX; i++) {
        var k = idx(i, j) * 3;
        Q[k + 2] = -0.5 * (1 + Math.sin(i * 0.55 + j * 0.45)) * (0.4 + 0.6 * j / (NY - 1));
      }
    }
    palco.classList.add('is-stoffa');
    disegna();
    root.classList.remove('firma-attesa');
    clearTimeout(guardia);
    guardia = setTimeout(chiudi, f === 'torna' ? 5200 : 4200); /* la foto torna scoperta comunque, anche se il rAF si ferma */
    raf = requestAnimationFrame(passo);
  }
  function tira() { if (fase === 'fatto' || fase === 'attesa') via('tira'); }
  function torna() { if (fase === 'fatto') via('torna'); }

  function inVista() {
    var r = cornice.getBoundingClientRect(), vh = window.innerHeight || 800;
    return Math.min(r.bottom, vh) - Math.max(r.top, 0) > r.height * 0.4;
  }

  var puoGiocare = !reducedMotion && ctx && palco && cornice && tela;
  if (!puoGiocare) {
    root.classList.remove('firma-attesa');
  } else {
    window.__mantellaPronta = true;
    cornice.setAttribute('role', 'button');
    cornice.setAttribute('tabindex', '0');
    etichettaPalco();
    cornice.addEventListener('click', torna);
    cornice.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); torna(); }
    });
    window.addEventListener('resize', function () { if (fase !== 'fatto' && fase !== 'attesa') chiudi(); });
    if (!root.classList.contains('firma-attesa')) {
      fase = 'fatto'; /* l'head ha già tolto la mantellina (codice arrivato tardi): la foto resta scoperta */
    } else {
      fase = 'attesa'; palco.setAttribute('data-mantella', 'attesa');
      if (inVista()) attesa = setTimeout(tira, 750);
      else if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (voci) {
          if (voci[0].isIntersecting) { io.disconnect(); attesa = setTimeout(tira, 380); }
        }, { threshold: 0.45 });
        io.observe(cornice);
      } else chiudi();
    }
  }
})();
