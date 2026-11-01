// Oversættelser af invitationen. Dansk står direkte i index.html og app.js;
// her ligger spansk (Peru, høflig "usted"-form). Værdier som [ental, flertal]
// vælges ud fra gæstens navn (fx "Ana y Luis" eller "Familia Pérez" = flertal).
window.DAAB_I18N = (() => {
  'use strict';
  let lang = 'da';
  let pl = false;

  // Tekster på siden: [CSS-selektor, hvad der ændres, spansk tekst]
  // text = tekst, html = tekst med formatering, ph = pladsholder i felt,
  // aria = skjult beskrivelse til skærmlæsere, tail = sidste tekst efter et ikon,
  // attr:navn = en egenskab
  const PAGE_ES = [
    ['#scene', 'aria', 'Su invitación'],
    ['.el-kicker', 'text', 'Invitación al'],
    ['.el-title', 'text', 'bautizo de Vilfred'],
    ['.env-to', 'text', 'Para'],
    ['.env-name', 'attr:data-navn', 'usted'],
    ['#seal', 'aria', 'Rompa el sello y abra la invitación'],
    ['.hint', 'text', 'Toque el sello para abrir'],

    ['.hero .kicker', 'text', 'Bautizo de'],
    ['.hero-date', 'text', 'Sábado 23 de enero de 2027 · 11:00 a. m.'],

    ['#greeting', 'attr:data-fallback', '¡Hola!'],
    ['.letter .paper p:nth-of-type(1)', 'text', 'Soy yo, Vilfred. Tengo solo 2 meses, pero ya aprendí muchísimas cosas: a sonreír, a dormir (a veces) y a comer (todo el tiempo).'],
    ['.letter .paper p:nth-of-type(2)', 'html', 'Ahora me van a bautizar, y me hará muy feliz que <span data-dig="usted me acompañe" data-jer="ustedes me acompañen">usted me acompañe</span>. Mamá y papá prometieron que después habrá comida rica, y yo prometí hacer lo posible por no llorar en la iglesia.'],
    ['.letter .sign', 'html', 'Con cariño,<br><span>Vilfred</span>'],

    ['#photos-h', 'text', 'Un poquito sobre mí'],
    ['#slides', 'aria', 'Fotos de Vilfred. Use las flechas para cambiar de foto.'],
    ['#slide-prev', 'aria', 'Foto anterior'],
    ['#slide-next', 'aria', 'Foto siguiente'],

    ['#program-h', 'text', 'Programa del día'],
    ['.timeline li:nth-child(1) .t-time', 'text', '11:00'],
    ['.timeline li:nth-child(1) h3', 'text', 'Bautizo en la iglesia Nathanaels Kirke'],
    ['.timeline li:nth-child(2) .t-time', 'text', '12:30'],
    ['.timeline li:nth-child(2) h3', 'text', 'Almuerzo en Little House'],
    ['.timeline li:nth-child(2) p', 'text', 'Lindgreens Allé 1, 2300 København S · hasta las 4:30 p. m.'],
    ['.timeline .link-btn', 'tail', 'Cómo llegar'],
    ['.program .note', 'tail', 'Hay estacionamiento gratuito en la zona.'],
    ['#cal-ics', 'tail', 'Agregar al calendario'],
    ['#cal-alt', 'html', '¿Usa Google Calendar? <a id="cal-google" href="#" target="_blank" rel="noopener">Agréguelo aquí</a>'],

    ['#wish-h', 'text', 'Lista de deseos'],
    ['.wish p:not(.wish-note)', 'text', 'Mamá y papá reunieron algunos deseos para mí aquí (la página está en danés)'],
    ['#wishlist', 'text', 'Ver la lista de deseos'],
    ['#wish-note', 'text', 'No es definitiva, se actualiza continuamente'],

    ['#rsvp-h', 'text', 'Confirmación de asistencia'],
    ['.rsvp-intro', 'text', ['Por favor, confirme a más tardar el 15 de diciembre.', 'Por favor, confirmen a más tardar el 15 de diciembre.']],
    ['#rsvp-who', 'html', 'Respuesta de <strong id="rsvp-guest"></strong>'],
    ['#lbl-navn', 'text', 'Nombre(s)'],
    ['#f-navn', 'ph', 'Ej.: Familia Pérez'],
    ['#lbl-deltager', 'text', ['¿Podrá acompañarnos?', '¿Podrán acompañarnos?']],
    ['input[name=deltager][value=ja] + span', 'text', ['Sí, asistiré', 'Sí, asistiremos']],
    ['input[name=deltager][value=nej] + span', 'text', ['Lamentablemente no podré', 'Lamentablemente no podremos']],
    ['label[for=f-voksne]', 'text', 'Adultos'],
    ['label[for=f-boern]', 'text', 'Niños'],
    ['[data-for=f-voksne][data-step="-1"]', 'aria', 'Menos adultos'],
    ['[data-for=f-voksne][data-step="1"]', 'aria', 'Más adultos'],
    ['[data-for=f-boern][data-step="-1"]', 'aria', 'Menos niños'],
    ['[data-for=f-boern][data-step="1"]', 'aria', 'Más niños'],
    ['#lbl-dele', 'text', ['¿A qué parte asistirá?', '¿A qué parte asistirán?']],
    ['input[name=dele][value=begge] + span', 'text', 'Iglesia y almuerzo'],
    ['input[name=dele][value=kirke] + span', 'text', 'Solo la iglesia'],
    ['input[name=dele][value=frokost] + span', 'text', 'Solo el almuerzo'],
    ['#lbl-allergier', 'html', 'Alergias o restricciones alimentarias <em>(opcional)</em>'],
    ['#f-allergier', 'ph', 'Ej.: sin gluten, vegetariano'],
    ['#lbl-vaegt', 'html', ['Adivine cuánto pesará Vilfred el día del bautizo <em>(opcional)</em>', 'Adivinen cuánto pesará Vilfred el día del bautizo <em>(opcional)</em>']],
    ['#f-vaegt', 'ph', 'Ej.: 7.4'],
    ['#help-vaegt', 'text', 'Revelaremos quién estuvo más cerca durante el almuerzo.'],
    ['#lbl-hilsen', 'html', 'Un mensaje para Vilfred <em>(opcional)</em>'],
    ['#f-hilsen', 'ph', 'Guardaremos los mensajes para cuando sea grande.'],
    ['#rsvp-send', 'text', 'Enviar respuesta'],
    ['#rsvp-edit', 'text', 'Cambiar respuesta'],

    ['.foot p', 'text', ['Nos encantará celebrar este día con usted.', 'Nos encantará celebrar este día con ustedes.']],
    ['#replay', 'tail', 'Abrir el sobre otra vez'],
  ];

  // Tekster, som app.js laver undervejs
  const STR_ES = {
    title: 'Bautizo de Vilfred',
    greet: '¡Hola, {navn}!',
    send: 'Enviar respuesta',
    sending: 'Enviando…',
    soundOff: 'Silenciar',
    soundOn: 'Activar sonido',
    cdDay1: 'día', cdDayN: 'días', cdHour1: 'hora', cdHourN: 'horas', cdMin1: 'minuto', cdMinN: 'minutos',
    today: '¡Hoy es el gran día!',
    thanksCame: '¡Gracias por acompañarnos!',
    slideOf: '{i} de {n}',
    photo: 'Foto {i}',
    photoAlt: 'Foto {i} de Vilfred',
    showPhoto: 'Ver foto {i}',
    doneYesTitle: ['¡Qué alegría que venga!', '¡Qué alegría que vengan!'],
    doneNoTitle: 'Gracias por avisarnos',
    doneNoText: ['Qué pena que no pueda venir. Pensaremos en usted ese día.', 'Qué pena que no puedan venir. Pensaremos en ustedes ese día.'],
    doneGuess: 'Su apuesta del peso de Vilfred: {kg} kg.',
    doneMsg: 'Gracias por el mensaje, lo guardaremos para Vilfred.',
    errChoose: ['Por favor, indique si podrá acompañarnos.', 'Por favor, indiquen si podrán acompañarnos.'],
    errName: 'Por favor, escriba su nombre.',
    errWeight: 'Indique un peso entre 2 y 20 kg.',
    errGeneric: 'Algo salió mal. Inténtelo de nuevo en un momento.',
    errLink: 'El enlace no es válido.',
    calSummary: 'Bautizo de Vilfred',
    calDesc: '11:00 a. m.: Bautizo en la iglesia Nathanaels Kirke, Holmbladsgade 19, 2300 København S.\\n12:30–4:30 p. m.: Almuerzo en Little House, Lindgreens Allé 1, 2300 København S.\\nEstacionamiento gratuito en la zona.',
  };

  const pick = (v, plural) => (Array.isArray(v) ? v[(typeof plural === 'boolean' ? plural : pl) ? 1 : 0] : v);
  const fill = (s, vars) => String(s).replace(/\{(\w+)\}/g, (m, k) => (vars && k in vars ? vars[k] : m));

  function t(key, da, vars, plural) {
    if (lang !== 'es' || !(key in STR_ES)) return fill(da, vars);
    return fill(pick(STR_ES[key], plural), vars);
  }

  function setTail(el, text) {
    const nodes = Array.from(el.childNodes).filter((n) => n.nodeType === 3 && n.textContent.trim());
    if (nodes.length) nodes[nodes.length - 1].textContent = text;
    else el.appendChild(document.createTextNode(text));
  }

  function apply(newLang, plural) {
    lang = newLang === 'es' ? 'es' : 'da';
    pl = !!plural;
    if (lang !== 'es') return;
    document.documentElement.lang = 'es';
    document.title = STR_ES.title;
    PAGE_ES.forEach(([sel, how, val]) => {
      const v = pick(val);
      document.querySelectorAll(sel).forEach((el) => {
        if (how === 'text') el.textContent = v;
        else if (how === 'html') el.innerHTML = v;
        else if (how === 'ph') el.setAttribute('placeholder', v);
        else if (how === 'aria') el.setAttribute('aria-label', v);
        else if (how === 'tail') setTail(el, v);
        else if (how.indexOf('attr:') === 0) el.setAttribute(how.slice(5), v);
      });
    });
  }

  return { t, apply, get lang() { return lang; } };
})();
