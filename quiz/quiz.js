/* ============================================================
   quiz.js — Tes réflexes sous pression
   Flow : welcome → 12 questions (une par une) → email gate → résultat
   Scoring + tie-break reproduits à l'identique de l'original.
   ============================================================ */

// ---------- 1. CONTENU (verbatim depuis quiz-content.json) ----------

const INTERFACE = {
  header: 'Jennifer Perrault · Nahara Coaching',
  eyebrow: 'Mini-évaluation',
  title_html: 'Comment tu tiens — <span>vraiment</span> — quand la pression monte ?',
  subtitle: "12 situations, 3 façons de les vivre. Pour chacune, choisis l'affirmation qui te ressemble le plus — sans réfléchir trop longtemps, la première réponse est souvent la bonne.",
  question_label_format: 'Situation {n} sur 12',
  result_eyebrow: 'Ce qui se joue pour toi en ce moment',
  result_intro: 'Voici ce que tes réponses révèlent — non pas un diagnostic, mais une petite lucarne sur ce qui se joue pour toi en ce moment.',
  section_characterizes: 'Ce qui te caractérise',
  section_attention: 'Ce qui mérite attention',
  cta_title: 'Cette lucarne éclaire ta stratégie actuelle.',
  cta_text_html: "Elle est utile, mais elle te coûte cher quelque part.<br><br>Tu aimerais faire bouger ces lignes ? En 30 minutes, on peut déjà identifier le levier pour mieux respirer dans ton business.<br><br>Réserve ton créneau. C'est offert, c'est direct, et ça pourrait bien être le point de bascule dont tu as besoin.",
  cta_button: 'Réserver mon coaching gratuit →',
  download_button: '↓ Télécharger mes résultats',
  restart_button: 'Recommencer',
  calendly_url: 'https://calendly.com/jennifer-perrault/coaching-offert-tes-reflexes-sous-pression'
};

const DIMENSIONS = {
  stress: { label: 'Accueil de la pression',       color: '#6B3FA0' },
  flex:   { label: 'Quand les repères bougent',    color: '#FFE66D' },
  resol:  { label: "De l'obstacle à la solution",  color: '#9B8EF0' },
  rel:    { label: 'La relation aux autres',       color: '#5DCAA5' }
};

const QUESTIONS = [
  { id: 1, dimension: 'stress', options: [
    { text: "Même quand le Stress tente de m'envahir, je parviens à garder une distance suffisante pour que l'Énervement ne prenne pas le contrôle de ma voix ou de mes gestes.", points: 3 },
    { text: "Il y a des jours où l'Énervement réussit à se glisser dans mes réactions sous pression, et d'autres où je parviens à l'inviter à rester à la porte.", points: 2 },
    { text: "Dès que le Stress pointe son nez, l'Énervement a tendance à s'installer si vite que j'ai du mal à me souvenir comment agir autrement.", points: 1 }
  ]},
  { id: 2, dimension: 'stress', options: [
    { text: "Face aux difficultés, je sais créer un espace de sécurité autour de moi où le Calme peut s'exprimer, ce qui m'évite d'être aspiré par l'agitation ambiante.", points: 3 },
    { text: "Le Calme est un allié précieux mais parfois capricieux : il est présent pour les petites secousses, mais il lui arrive de m'abandonner lors des grands séismes.", points: 2 },
    { text: "L'agitation des situations difficiles prend généralement toute la place, ne laissant que de très rares miettes pour que le Calme puisse se manifester.", points: 1 }
  ]},
  { id: 3, dimension: 'stress', options: [
    { text: "J'ai développé une forme de boussole intérieure qui me permet, même au cœur du chaos, de trouver le chemin vers une issue qui respecte mes valeurs.", points: 3 },
    { text: "Dans les tempêtes, il m'arrive de perdre le cap ; je finis par m'en sortir, mais j'ai parfois l'impression que c'est davantage dû au hasard qu'à mes propres choix.", points: 2 },
    { text: "Quand une situation devient difficile, les murs semblent se refermer et je perds de vue les compétences qui pourraient m'aider à ouvrir de nouvelles portes.", points: 1 }
  ]},
  { id: 4, dimension: 'flex', options: [
    { text: "Le Changement arrive souvent comme une tempête qui secoue mes racines ; il me faut beaucoup d'énergie pour retrouver mon équilibre après son passage.", points: 1 },
    { text: "Le Changement me demande un temps d'adaptation : j'ai besoin de comprendre ce qu'il m'apporte avant de lui laisser une place dans mon quotidien.", points: 2 },
    { text: "J'accueille le Changement comme un souffle d'air frais qui vient dépoussiérer mes habitudes et m'ouvrir à d'autres manières d'être.", points: 3 }
  ]},
  { id: 5, dimension: 'flex', options: [
    { text: "L'Inconnu se présente souvent à moi comme un invité inquiétant ; je préfère rester sur les terres familières où je connais chaque recoin.", points: 1 },
    { text: "L'Inconnu m'intimide un peu au début, mais si j'emporte avec moi quelques repères solides, je finis par l'apprivoiser avec le temps.", points: 2 },
    { text: "Je vois les situations inconnues comme des pages blanches qui m'invitent à écrire de nouveaux chapitres de mon histoire sans a priori.", points: 3 }
  ]},
  { id: 6, dimension: 'flex', options: [
    { text: "Une fois que j'ai tissé une conviction qui me semble juste, je la protège avec détermination contre les tentatives d'érosion par des avis extérieurs.", points: 1 },
    { text: "Je reste volontiers fidèle à mes idées, sauf si une nouvelle perspective parvient à me démontrer qu'elle servirait mieux mes intentions.", points: 2 },
    { text: "Je laisse volontiers mes conclusions évoluer ; j'aime l'idée que mon avis puisse être un chantier permanent plutôt qu'un monument figé.", points: 3 }
  ]},
  { id: 7, dimension: 'resol', options: [
    { text: "L'Inquiétude écrit des scénarios de catastrophes si bruyants que j'ai beaucoup de mal à entendre la voix de mes compétences de résolution.", points: 1 },
    { text: "J'écoute les mises en garde de l'Inquiétude, mais j'essaie de ne pas la laisser devenir la seule narratrice de la situation.", points: 2 },
    { text: "Face à un défi, je refuse de laisser l'Inquiétude monopoliser la parole ; je consacre mon énergie à dessiner les contours d'une issue possible.", points: 3 }
  ]},
  { id: 8, dimension: 'resol', options: [
    { text: "L'Évitement me semble souvent être la seule issue sûre, même si je sens que cela donne au Problème un territoire de plus en plus vaste dans ma vie.", points: 1 },
    { text: "Selon la taille du Problème, il m'arrive de faire un détour pour me préparer ou d'attendre d'avoir de meilleurs alliés avant de faire face.", points: 2 },
    { text: "Je préfère regarder le Problème droit dans les yeux dès qu'il surgit, afin de ne pas lui laisser le temps de s'installer ou de grandir dans mon dos.", points: 3 }
  ]},
  { id: 9, dimension: 'resol', options: [
    { text: "Mes émotions prennent souvent le siège du conducteur lors des décisions, laissant peu de place à ma pensée réflexive pour s'exprimer.", points: 1 },
    { text: "L'intensité de ce que je ressens vient parfois troubler la surface de mes réflexions, rendant la décision plus floue pendant un certain temps.", points: 2 },
    { text: "Je sais faire la distinction entre ce que je ressens sur le moment et ce qui est juste de décider ; mes émotions sont des consultantes, pas des dirigeantes.", points: 3 }
  ]},
  { id: 10, dimension: 'rel', options: [
    { text: "Le talent de tisser des liens est très présent chez moi ; je sais naturellement ouvrir des portes qui invitent les autres à entrer dans mon cercle.", points: 3 },
    { text: "Ma capacité à créer des liens dépend du contexte ; il me faut parfois un temps d'observation avant de laisser la place à une nouvelle relation.", points: 2 },
    { text: "La Réserve ou la Prudence occupent souvent tout l'espace lors de nouvelles rencontres, ce qui rend l'accès au lien plus long et plus complexe.", points: 1 }
  ]},
  { id: 11, dimension: 'rel', options: [
    { text: "L'échange avec les autres est une véritable nourriture pour moi ; je saisis presque chaque occasion pour engager une conversation et découvrir l'histoire de mon interlocuteur.", points: 3 },
    { text: "Mon goût pour la discussion fluctue ; selon mon énergie, je peux être très moteur dans l'échange ou préférer rester en retrait.", points: 2 },
    { text: "Le Silence ou le besoin d'être seul l'emportent souvent sur l'envie de parler ; l'interaction sociale me demande un effort qui dépasse mon plaisir immédiat.", points: 1 }
  ]},
  { id: 12, dimension: 'rel', options: [
    { text: "Je cultive naturellement une atmosphère de confiance qui invite les autres à déposer leurs histoires et leurs secrets entre mes mains.", points: 3 },
    { text: "Certaines personnes perçoivent mon écoute et se confient, tandis que pour d'autres, je garde une distance qui ne favorise pas les confidences.", points: 2 },
    { text: "L'Espace de Sécurité que je propose est souvent restreint ; les autres perçoivent sans doute que ce n'est pas le moment ou l'endroit pour se livrer.", points: 1 }
  ]}
];

// ---------- 2. ÉTAT GLOBAL ----------

const state = {
  current: 'welcome',     // 'welcome' | 'q1'..'q12' | 'gate' | 'result'
  currentQ: 0,            // 0..11 (index dans QUESTIONS)
  answers: {},            // { [questionId]: points }
  shuffledOptions: {},    // { [questionId]: [options shuffled] } — figé après 1er affichage
  user: { firstname: '', email: '' }
};

// ---------- 3. UTILITAIRES ----------

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function level(s) {
  if (s <= 4) return 'bas';
  if (s <= 6) return 'moyen';
  return 'élevé';
}

function levelLabel(l) {
  if (l === 'élevé') return "Point d'appui";
  if (l === 'moyen') return 'Zone de nuance';
  return 'À explorer';
}

// Reproduction EXACTE du tie-break original :
// (a,b) => scores[a] > scores[b] ? a : b  →  en cas d'égalité, b gagne (la dernière clé l'emporte)
function pickAppui(scores) {
  const keys = ['stress', 'flex', 'resol', 'rel'];
  return keys.reduce((a, b) => (scores[a] > scores[b] ? a : b));
}
function pickTension(scores) {
  const keys = ['stress', 'flex', 'resol', 'rel'];
  return keys.reduce((a, b) => (scores[a] < scores[b] ? a : b));
}

// ---------- 4. SCORING + PROFIL ----------

function computeScores() {
  const scores = { stress: 0, flex: 0, resol: 0, rel: 0 };
  QUESTIONS.forEach(q => {
    scores[q.dimension] += state.answers[q.id] || 0;
  });
  return scores;
}

function resolveProfileKey(scores) {
  const keys = ['stress', 'flex', 'resol', 'rel'];
  const levels = {};
  keys.forEach(k => { levels[k] = level(scores[k]); });

  const vals = keys.map(k => scores[k]);
  const spread = Math.max(...vals) - Math.min(...vals);

  if (spread <= 2) {
    if (keys.every(k => levels[k] === 'élevé')) return 'balanced-high';
    if (keys.every(k => levels[k] === 'bas'))   return 'balanced-low';
    return 'balanced-nuance';
  }

  const appui   = pickAppui(scores);
  const tension = pickTension(scores);
  const key = `${appui}-${tension}`;
  return PROFILES[key] ? key : 'stress-flex';
}

// ---------- 5. NAVIGATION ENTRE ÉCRANS ----------

function showScreen(name, direction = 'right') {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('is-active'));
  const el = document.getElementById('screen-' + name);
  if (!el) return;
  el.classList.remove('slide-in-right', 'slide-in-left');
  // force reflow so the animation re-runs
  void el.offsetWidth;
  el.classList.add(direction === 'left' ? 'slide-in-left' : 'slide-in-right');
  el.classList.add('is-active');
  state.current = name;
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
}

// ---------- 6. RENDU D'UNE QUESTION ----------

function renderQuestion(index, direction = 'right') {
  const q = QUESTIONS[index];
  state.currentQ = index;

  const screen = document.getElementById('screen-question');
  const num = screen.querySelector('.question-num');
  const fill = screen.querySelector('.progress-fill');
  const optionsWrap = screen.querySelector('.options-wrap');
  const backBtn = screen.querySelector('.btn-back');

  num.textContent = `Situation ${index + 1} sur 12`;
  fill.style.width = `${((index + 1) / 12) * 100}%`;

  // Shuffle figé : on ne re-shuffle pas si l'utilisateur revient en arrière
  if (!state.shuffledOptions[q.id]) {
    state.shuffledOptions[q.id] = shuffle(q.options);
  }
  const options = state.shuffledOptions[q.id];

  optionsWrap.innerHTML = '';
  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option';
    btn.textContent = opt.text;
    if (state.answers[q.id] === opt.points) {
      btn.classList.add('selected');
    }
    btn.addEventListener('click', () => {
      state.answers[q.id] = opt.points;
      optionsWrap.querySelectorAll('.option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      // Auto-advance après 400ms
      setTimeout(() => {
        if (index < QUESTIONS.length - 1) {
          renderQuestion(index + 1, 'right');
        } else {
          showScreen('gate', 'right');
        }
      }, 400);
    });
    optionsWrap.appendChild(btn);
  });

  backBtn.style.display = index === 0 ? 'none' : '';
  backBtn.onclick = () => {
    if (index > 0) renderQuestion(index - 1, 'left');
  };

  showScreen('question', direction);
}

// ---------- 7. EMAIL GATE ----------

function setupGate() {
  const screen = document.getElementById('screen-gate');
  const firstname = screen.querySelector('#field-firstname');
  const email = screen.querySelector('#field-email');
  const checkbox = screen.querySelector('#field-rgpd');
  const submit = screen.querySelector('#gate-submit');

  function emailValid(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  }
  function refresh() {
    const ok = firstname.value.trim().length > 0 &&
               emailValid(email.value) &&
               checkbox.checked;
    submit.disabled = !ok;
  }

  [firstname, email, checkbox].forEach(el => {
    el.addEventListener('input', refresh);
    el.addEventListener('change', refresh);
  });

  submit.addEventListener('click', (e) => {
    e.preventDefault();
    if (submit.disabled) return;
    state.user.firstname = firstname.value.trim();
    state.user.email = email.value.trim();
    // Pas d'envoi réseau ici — sera branché en phase ultérieure.
    renderResult();
  });

  refresh();
}

// ---------- 8. RENDU DU RÉSULTAT ----------

function renderResult() {
  const scores = computeScores();
  const profileKey = resolveProfileKey(scores);
  const profile = PROFILES[profileKey];

  const screen = document.getElementById('screen-result');

  // Score cards (verbatim formula : pct = round((sc-3)/6*100))
  const dimsOrder = ['stress', 'flex', 'resol', 'rel'];
  const cardsHtml = dimsOrder.map(k => {
    const meta = DIMENSIONS[k];
    const sc = scores[k];
    const pct = Math.round(((sc - 3) / 6) * 100);
    const lv = level(sc);
    const ll = levelLabel(lv);
    return `
      <div class="score-card">
        <p class="score-card-label">${escapeHtml(meta.label)}</p>
        <div class="score-bar-bg">
          <div class="score-bar-fill" data-target="${pct}" style="background:${meta.color}"></div>
        </div>
        <p class="score-level" style="color:${meta.color}">${ll}</p>
      </div>
    `;
  }).join('');

  const tensionHtml = profile.tension.title
    ? `<div class="tension-block">
         <p class="tension-title">${escapeHtml(profile.tension.title)}</p>
         <p class="tension-text">${escapeHtml(profile.tension.text).replace(/\n/g, '<br>')}</p>
       </div>`
    : `<div class="tension-block">
         <p class="tension-text">${escapeHtml(profile.tension.text).replace(/\n/g, '<br>')}</p>
       </div>`;

  // Mail pré-rédigé pour le lien "Partage-moi mon profil" — version
  // technique à valider/ajuster par Jennifer.
  const mailSubject = 'Analyse de mon profil — Tes réflexes sous pression';
  const mailBody =
    `Bonjour Jennifer,\n\n` +
    `Je viens de passer ton quiz "Tes réflexes sous pression" et mon profil est : ${profile.title}.\n\n` +
    `J'aimerais qu'on l'analyse ensemble.\n\n` +
    `À bientôt,`;
  const mailtoHref = `mailto:jennifer.perrault@nahara-coaching.com` +
    `?subject=${encodeURIComponent(mailSubject)}` +
    `&body=${encodeURIComponent(mailBody)}`;

  screen.innerHTML = `
    <div class="logo">${escapeHtml(INTERFACE.header)}</div>
    <p class="result-eyebrow">${escapeHtml(INTERFACE.result_eyebrow)}</p>
    <h2 class="result-title">${escapeHtml(profile.title)}</h2>
    <p class="result-intro">${escapeHtml(INTERFACE.result_intro)}</p>

    <div class="score-grid">${cardsHtml}</div>

    <p class="section-label">${escapeHtml(INTERFACE.section_characterizes)}</p>
    <div class="profile-card">
      <p class="profile-card-text">${escapeHtml(profile.anchor)}</p>
    </div>

    <p class="section-label">${escapeHtml(INTERFACE.section_attention)}</p>
    ${tensionHtml}

    <button type="button" class="btn-download" id="btn-download">${escapeHtml(INTERFACE.download_button)}</button>

    <aside class="share-card">
      <p class="share-card-eyebrow">Envie d'aller plus loin ?</p>
      <h3 class="share-card-title">Partage-moi ton profil</h3>
      <p class="share-card-text">Envoie-moi ton résultat — je te réponds personnellement avec une première lecture, gratuitement.</p>
      <a class="btn-share-card" href="${mailtoHref}">
        ✉ Envoyer mon profil à Jennifer
      </a>
    </aside>

    <button type="button" class="btn-retry" id="btn-retry">${escapeHtml(INTERFACE.restart_button)}</button>

    <div class="cta-block">
      <div class="cta-photo-placeholder" aria-label="Photo de Jennifer Perrault"></div>
      <p class="cta-title">${escapeHtml(INTERFACE.cta_title)}</p>
      <p class="cta-text">${INTERFACE.cta_text_html}</p>
      <a href="${INTERFACE.calendly_url}" target="_blank" rel="noopener" class="btn-cta">${escapeHtml(INTERFACE.cta_button)}</a>
    </div>

    <span class="footer-mark">${escapeHtml(INTERFACE.header)}</span>
  `;

  // Restart
  screen.querySelector('#btn-retry').addEventListener('click', () => {
    if (window.confirm('Tu es sûr·e ? Tes réponses seront perdues.')) {
      location.reload();
    }
  });

  // Téléchargement PDF : géré par pdf.js (délégation document)

  showScreen('result', 'right');

  // Animer les barres de score (width 0 → cible) après l'apparition
  requestAnimationFrame(() => {
    setTimeout(() => {
      screen.querySelectorAll('.score-bar-fill').forEach(bar => {
        const target = bar.getAttribute('data-target');
        bar.style.width = `${target}%`;
      });
    }, 80);
  });
}

// ---------- 9. UTILITAIRE HTML-ESCAPE ----------

function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ---------- 10. INITIALISATION ----------

function init() {
  // Welcome screen content
  const welcome = document.getElementById('screen-welcome');
  welcome.querySelector('.intro-eyebrow').textContent = INTERFACE.eyebrow;
  welcome.querySelector('.intro-title').innerHTML = INTERFACE.title_html;
  welcome.querySelector('.intro-sub').textContent = INTERFACE.subtitle;
  welcome.querySelector('.btn-submit').addEventListener('click', () => {
    renderQuestion(0, 'right');
  });

  // Logo (header) sur welcome
  welcome.querySelector('.logo').textContent = INTERFACE.header;

  // Logo sur question screen
  const qScreen = document.getElementById('screen-question');
  qScreen.querySelector('.logo').textContent = INTERFACE.header;

  // Logo sur gate
  const gScreen = document.getElementById('screen-gate');
  gScreen.querySelector('.logo').textContent = INTERFACE.header;

  setupGate();
  showScreen('welcome', 'right');
}

document.addEventListener('DOMContentLoaded', init);
