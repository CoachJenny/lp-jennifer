/* ============================================================
   email.js — capture lead + envoi vers le webhook
   Branché APRÈS quiz.js. Intercepte le bouton "Découvrir mon profil"
   et le bouton "Passer cette étape" pour :
     1. valider les champs (prénom, email, RGPD)
     2. calculer le scoring (via les fonctions exposées par quiz.js)
     3. POSTer le payload vers WEBHOOK_URL
     4. afficher un mini-loader pendant l'envoi
     5. passer à l'écran résultat (succès OU erreur OU skip)

   IMPORTANT : ce fichier ne touche ni au design, ni au scoring,
   ni aux textes. Il se contente de brancher la couche réseau.
   ============================================================ */

const WEBHOOK_URL = "/api/brevo"; // Netlify Function (chemin relatif → marche en local netlify dev et en prod)

// ---------- 1. UTM (lus une fois au DOMContentLoaded) ----------

const UTM = { utm_source: '', utm_medium: '', utm_campaign: '' };

function readUtmParams() {
  try {
    const params = new URLSearchParams(window.location.search);
    UTM.utm_source = params.get('utm_source') || '';
    UTM.utm_medium = params.get('utm_medium') || '';
    UTM.utm_campaign = params.get('utm_campaign') || '';
  } catch (err) {
    // Si URLSearchParams échoue (cas extrême), on garde les valeurs vides.
    console.warn('[email.js] Impossible de lire les UTM :', err);
  }
}

// ---------- 2. VALIDATION ----------

function isEmailValid(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim());
}

// ---------- 3. CONSTRUCTION DU PAYLOAD ----------

function buildPayload() {
  // Toutes ces fonctions/objets viennent de quiz.js + results.js,
  // exposés au scope global via leurs `const` top-level.
  const scores = computeScores();
  const profileKey = resolveProfileKey(scores);
  const profile = (typeof PROFILES !== 'undefined' && PROFILES[profileKey]) || null;
  const appui = pickAppui(scores);
  const tension = pickTension(scores);

  return {
    email: state.user.email || '',
    prenom: state.user.firstname || '',
    quiz_completed_at: new Date().toISOString(),
    profile_code: profileKey,
    profile_title: profile ? profile.title : '',
    score_stress: scores.stress,
    score_flex: scores.flex,
    score_resol: scores.resol,
    score_rel: scores.rel,
    appui_dominant: appui,
    tension_principale: tension,
    utm_source: UTM.utm_source,
    utm_medium: UTM.utm_medium,
    utm_campaign: UTM.utm_campaign
  };
}

// ---------- 4. ENVOI WEBHOOK ----------

async function sendLead(payload) {
  const res = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (res.status < 200 || res.status >= 300) {
    throw new Error('HTTP ' + res.status);
  }
  return res;
}

// ---------- 5. MICRO-LOADER (spinner CSS injecté à la volée) ----------

function injectSpinnerStyles() {
  if (document.getElementById('email-spinner-style')) return;
  const style = document.createElement('style');
  style.id = 'email-spinner-style';
  style.textContent = `
    .btn-spinner {
      display: inline-block;
      width: 14px;
      height: 14px;
      margin-right: 8px;
      vertical-align: -2px;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: btn-spin 0.7s linear infinite;
    }
    @keyframes btn-spin {
      to { transform: rotate(360deg); }
    }
    .is-loading {
      cursor: progress;
      opacity: 0.85;
    }
  `;
  document.head.appendChild(style);
}

function setLoading(button, loading) {
  if (loading) {
    if (!button.dataset.originalLabel) {
      button.dataset.originalLabel = button.textContent;
    }
    button.classList.add('is-loading');
    button.disabled = true;
    button.innerHTML = '<span class="btn-spinner" aria-hidden="true"></span>Chargement...';
  } else {
    button.classList.remove('is-loading');
    button.disabled = false;
    if (button.dataset.originalLabel) {
      button.textContent = button.dataset.originalLabel;
      delete button.dataset.originalLabel;
    }
  }
}

// ---------- 6. NAVIGATION VERS LE RÉSULTAT (toujours sûre) ----------

function goToResult() {
  try {
    renderResult();
  } catch (err) {
    console.error('[email.js] Erreur pendant renderResult :', err);
  }
}

// ---------- 7. BRANCHEMENT DES HANDLERS SUR LE GATE ----------

function attachHandlers() {
  const screen = document.getElementById('screen-gate');
  if (!screen) return;

  const form = screen.querySelector('.gate-form');
  const firstname = screen.querySelector('#field-firstname');
  const email = screen.querySelector('#field-email');
  const checkbox = screen.querySelector('#field-rgpd');
  const oldSubmit = screen.querySelector('#gate-submit');
  if (!form || !firstname || !email || !checkbox || !oldSubmit) return;

  // quiz.js (setupGate) a déjà branché ses propres listeners click sur ce
  // bouton. On le remplace par un clone pour repartir d'une ardoise vierge,
  // sinon les deux handlers se déclencheraient en parallèle.
  const submit = oldSubmit.cloneNode(true);
  oldSubmit.parentNode.replaceChild(submit, oldSubmit);

  // Re-brancher la logique d'activation/désactivation du bouton submit en
  // temps réel — quiz.js l'avait branchée sur l'ancien bouton qui n'existe
  // plus dans le DOM.
  function refreshValidity() {
    const ok = firstname.value.trim().length > 0 &&
               isEmailValid(email.value) &&
               checkbox.checked;
    submit.disabled = !ok;
  }
  [firstname, email, checkbox].forEach(el => {
    el.addEventListener('input', refreshValidity);
    el.addEventListener('change', refreshValidity);
  });
  refreshValidity();

  async function handleSubmit(e) {
    if (e) e.preventDefault();
    if (submit.disabled) return;

    const prenom = firstname.value.trim();
    const mail = email.value.trim();
    if (!prenom) return;
    if (!isEmailValid(mail)) return;
    if (!checkbox.checked) return;

    // Persister dans state pour cohérence avec le reste de l'app.
    if (typeof state !== 'undefined' && state && state.user) {
      state.user.firstname = prenom;
      state.user.email = mail;
    }

    setLoading(submit, true);
    const payload = buildPayload();

    try {
      await sendLead(payload);
    } catch (err) {
      console.error('[email.js] Échec de l\'envoi du lead :', err);
      // On ne bloque PAS l'utilisateur — on passe quand même à l'écran résultat.
    } finally {
      setLoading(submit, false);
      goToResult();
    }
  }

  submit.addEventListener('click', handleSubmit);
  // Supporter aussi la touche Entrée dans les inputs.
  form.addEventListener('submit', handleSubmit);
}

// ---------- 8. INITIALISATION ----------

document.addEventListener('DOMContentLoaded', () => {
  readUtmParams();
  injectSpinnerStyles();
  // attachHandlers tourne APRÈS le DOMContentLoaded de quiz.js (qui a été
  // chargé avant ce fichier dans index.html), donc setupGate() a déjà
  // installé ses propres handlers — qu'on remplace ici par les nôtres.
  attachHandlers();
});
