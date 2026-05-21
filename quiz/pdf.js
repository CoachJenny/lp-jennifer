/* ============================================================
   pdf.js — Génération PNG du résultat
   Construit dynamiquement un conteneur visible, le capture via
   html2canvas, déclenche le téléchargement PNG, puis nettoie.
   Dépend des globales définies dans quiz.js et results.js :
     INTERFACE, DIMENSIONS, PROFILES, computeScores,
     resolveProfileKey, level, levelLabel
   ============================================================ */

(function () {

  const MONTHS_FR = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
  ];

  function formatDateFr(d) {
    return `${d.getDate()} ${MONTHS_FR[d.getMonth()]} ${d.getFullYear()}`;
  }

  function esc(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // ---------- Construction du contenu à capturer ----------

  function buildContent() {
    const scores = computeScores();
    const profileKey = resolveProfileKey(scores);
    const profile = PROFILES[profileKey];
    const dateStr = formatDateFr(new Date());

    const dimsOrder = ['stress', 'flex', 'resol', 'rel'];
    const scoresHtml = dimsOrder.map(k => {
      const meta = DIMENSIONS[k];
      const sc = scores[k];
      const pct = Math.max(0, Math.min(100, Math.round(((sc - 3) / 6) * 100)));
      const ll = levelLabel(level(sc));
      return `
        <div style="margin-bottom: 14px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 6px;">
            <span style="font-size: 11px; color: #666; letter-spacing: 0.02em;">${esc(meta.label)}</span>
            <span style="font-size: 11px; font-weight: 500; color: ${meta.color};">${esc(ll)}</span>
          </div>
          <div style="background: #f0f0f0; height: 6px; border-radius: 3px; overflow: hidden;">
            <div style="background: ${meta.color}; height: 100%; width: ${pct}%; border-radius: 3px;"></div>
          </div>
        </div>
      `;
    }).join('');

    const tensionInner = profile.tension.title
      ? `<p style="font-size: 14px; font-weight: 600; color: #6B3FA0; margin: 0 0 10px 0; font-family: 'Playfair Display', serif;">${esc(profile.tension.title)}</p>
         <p style="font-size: 12px; line-height: 1.7; color: #1a1a1a; margin: 0;">${esc(profile.tension.text).replace(/\n/g, '<br>')}</p>`
      : `<p style="font-size: 12px; line-height: 1.7; color: #1a1a1a; margin: 0;">${esc(profile.tension.text).replace(/\n/g, '<br>')}</p>`;

    const calendlyUrl = INTERFACE.calendly_url;

    const el = document.createElement('div');
    el.style.cssText = 'position:absolute;top:0;left:0;width:680px;padding:32px;background:#ffffff;font-family:"Inter",sans-serif;color:#1a1a1a;z-index:1;';

    el.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:baseline;padding-bottom:12px;border-bottom:1px solid #eee;">
        <span style="font-family:'Playfair Display',serif;font-size:13px;font-weight:600;color:#1a1a1a;">Jennifer Perrault · Nahara Coaching</span>
        <span style="font-size:11px;color:#666;">${esc(dateStr)}</span>
      </div>

      <h1 style="font-family:'Playfair Display',serif;font-size:26px;font-weight:700;line-height:1.25;color:#1a1a1a;margin:28px 0 24px 0;">${esc(profile.title)}</h1>

      <div style="margin-bottom:28px;">${scoresHtml}</div>

      <p style="font-size:10px;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;color:#666;margin:0 0 10px 0;">${esc(INTERFACE.section_characterizes)}</p>
      <p style="font-size:12px;line-height:1.7;color:#1a1a1a;margin:0 0 24px 0;">${esc(profile.anchor)}</p>

      <p style="font-size:10px;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;color:#666;margin:0 0 10px 0;">${esc(INTERFACE.section_attention)}</p>
      <div style="border-left:2px solid #6B3FA0;padding:2px 0 2px 14px;margin-bottom:28px;">${tensionInner}</div>

      <div style="background:#fafafa;padding:18px 16px;border-radius:6px;margin-bottom:24px;">
        <p style="font-family:'Playfair Display',serif;font-size:13px;font-weight:600;color:#1a1a1a;margin:0 0 8px 0;">${esc(INTERFACE.cta_title)}</p>
        <p style="font-size:11px;line-height:1.7;color:#444;margin:0 0 10px 0;">${esc(INTERFACE.cta_button)}</p>
        <a href="${calendlyUrl}" style="font-size:11px;color:#6B3FA0;text-decoration:underline;word-break:break-all;">${esc(calendlyUrl)}</a>
      </div>

      <div style="border-top:1px solid #eee;padding-top:12px;text-align:center;">
        <p style="font-size:10px;color:#666;margin:0 0 4px 0;">nahara-coaching.com</p>
        <p style="font-size:10px;color:#666;margin:0;">jennifer.perrault@nahara-coaching.com</p>
      </div>
    `;

    return el;
  }

  // ---------- Overlay loader ----------

  function showLoader() {
    const overlay = document.createElement('div');
    overlay.id = 'img-loader';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(8,7,32,0.92);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);z-index:99999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;font-family:"Inter",sans-serif;color:#fff;font-size:15px;';
    overlay.innerHTML = `
      <div style="width:42px;height:42px;border:3px solid rgba(107,63,160,0.25);border-top-color:#6B3FA0;border-radius:50%;animation:imgSpin .9s linear infinite;"></div>
      <span>Génération de ton image…</span>
    `;
    if (!document.getElementById('img-spin-style')) {
      const s = document.createElement('style');
      s.id = 'img-spin-style';
      s.textContent = '@keyframes imgSpin{to{transform:rotate(360deg)}}';
      document.head.appendChild(s);
    }
    document.body.appendChild(overlay);
    return overlay;
  }

  // ---------- Capture PNG ----------

  function generateImage() {
    if (typeof html2canvas === 'undefined') {
      console.error('pdf.js : html2canvas non chargé');
      return;
    }

    const container = buildContent();
    const overlay = showLoader();

    // Sauvegarder et désactiver overflow-x:hidden de body
    const prevOverflow = document.body.style.overflowX;
    document.body.style.overflowX = 'visible';

    document.body.appendChild(container);
    void container.offsetHeight; // force reflow

    if (container.offsetHeight === 0) {
      console.error('pdf.js : conteneur vide, abandon');
      cleanup();
      return;
    }

    function cleanup() {
      if (container.parentNode) container.parentNode.removeChild(container);
      if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
      document.body.style.overflowX = prevOverflow;
    }

    const fontsReady = (document.fonts && document.fonts.ready)
      ? document.fonts.ready
      : new Promise(r => setTimeout(r, 300));

    fontsReady.then(() => {
      setTimeout(() => {
        html2canvas(container, {
          scale: 2,
          useCORS: true,
          backgroundColor: '#ffffff',
          logging: false
        }).then(canvas => {
          // Déclencher le téléchargement
          const link = document.createElement('a');
          link.download = 'mon-profil-reflexes-sous-pression.png';
          link.href = canvas.toDataURL('image/png');
          link.click();
          cleanup();
        }).catch(err => {
          console.error('pdf.js : erreur capture', err);
          cleanup();
        });
      }, 100);
    });
  }

  // ---------- Wire-up ----------
  document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'btn-download') {
      e.preventDefault();
      generateImage();
    }
  });

})();
