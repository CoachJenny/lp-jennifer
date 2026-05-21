/* ============================================================
   Netlify Function — proxy quiz → Brevo
   Variables d'env à configurer dans Netlify (Site configuration
   → Environment variables) :
     BREVO_API_KEY  → xkeysib-...
     BREVO_LIST_ID  → 5
   Endpoint exposé : /api/brevo (cf. export config.path en bas)
   ============================================================ */

export default async (request) => {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: cors });
  }
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: cors });
  }

  let payload;
  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'invalid_json' }), {
      status: 400, headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  const email = String(payload.email || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(JSON.stringify({ error: 'invalid_email' }), {
      status: 400, headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  const attributes = {
    FIRSTNAME: payload.prenom || '',
    PROFIL: payload.profile_code || '',
    SCORE_STRESS: Number(payload.score_stress) || 0,
    SCORE_FLEX: Number(payload.score_flex) || 0,
    SCORE_RESOL: Number(payload.score_resol) || 0,
    SCORE_REL: Number(payload.score_rel) || 0,
    APPUI_DOMINANT: payload.appui_dominant || '',
    TENSION_PRINCIPALE: payload.tension_principale || '',
    QUIZ_COMPLETED_AT: payload.quiz_completed_at || new Date().toISOString(),
  };

  const brevoBody = {
    email,
    attributes,
    listIds: [Number(process.env.BREVO_LIST_ID)],
    updateEnabled: true,
  };

  const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
    method: 'POST',
    headers: {
      'accept': 'application/json',
      'content-type': 'application/json',
      'api-key': process.env.BREVO_API_KEY,
    },
    body: JSON.stringify(brevoBody),
  });

  if (!brevoRes.ok) {
    const text = await brevoRes.text();
    console.error('Brevo error', brevoRes.status, text);
    return new Response(JSON.stringify({ error: 'brevo_failed', status: brevoRes.status }), {
      status: 502, headers: { ...cors, 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200, headers: { ...cors, 'Content-Type': 'application/json' },
  });
};

export const config = { path: '/api/brevo' };
