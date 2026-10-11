# Nahara Coaching — Landing Page

Landing page d'offre pour Jennifer Perrault (coaching narratif + intelligence émotionnelle).

**Stack :** HTML / CSS / JS vanilla. Zéro framework, zéro build, zéro dépendance npm.
**Performance :** ~50 KB total hors fonts. Pas de tracker, pas de cookie.

---

## 📁 Structure du dossier

```
lp-jennifer/
├── index.html                  ← Landing page principale
├── mentions-legales.html       ← Page légale (À COMPLÉTER par Jennifer)
├── confidentialite.html        ← Politique RGPD
├── 404.html                    ← Page d'erreur
├── robots.txt                  ← Indexation moteurs de recherche
├── sitemap.xml                 ← Plan du site
├── netlify.toml                ← Config déploiement Netlify
├── vercel.json                 ← Config déploiement Vercel
├── .gitignore
├── README.md                   ← Ce fichier
└── assets/
    ├── css/styles.css          ← Toutes les styles
    ├── js/main.js              ← Comportements (header sticky, scroll reveal)
    └── img/
        ├── favicon.svg         ← Icône onglet
        └── og-image.svg        ← Image partage Open Graph
```

---

## ✅ À faire AVANT la mise en ligne

### 1. Compléter les mentions légales (obligatoire en France)
Ouvrir `mentions-legales.html` et remplacer toutes les balises `[À COMPLÉTER]` par les vraies informations :
- Statut juridique
- Adresse du siège
- Numéro SIRET
- Code APE / NAF
- TVA intracommunautaire (ou mention de non-assujettissement)
- Coordonnées de l'hébergeur (voir étape « Déploiement »)

### 2. Vérifier la politique de confidentialité
Ouvrir `confidentialite.html`. Si tu ajoutes plus tard :
- Un formulaire de contact direct → mettre à jour
- Un outil d'analytics (Plausible, Matomo, GA) → ajouter une section cookies + bandeau de consentement
- Une newsletter → ajouter la section newsletter

### 3. Remplacer la photo placeholder
Dans `index.html`, section "Qui je suis" : la div `.about-photo` affiche les initiales "JP" sur fond gradient. Pour mettre une vraie photo :

```html
<div class="about-photo reveal">
  <img src="assets/img/jennifer.jpg" alt="Jennifer Perrault" loading="lazy" />
</div>
```

Ajouter le fichier dans `assets/img/jennifer.jpg` (recommandé : carré, 800×800px minimum, optimisé < 150 KB).

### 4. Vérifier les liens
- **Calendly** : `https://calendly.com/jennifer-perrault/coaching-offert-tes-reflexes-sous-pression` — confirmer que le slug est correct.
- **Quiz** : `https://nahara-coaching.com/quiz/`
- **LinkedIn** : `https://www.linkedin.com/in/jennifer-perrault-coach/` — vérifier que c'est la bonne URL du profil.

Les liens apparaissent à plusieurs endroits dans `index.html`, `mentions-legales.html`, `confidentialite.html`, `404.html`. Utilise « Rechercher / Remplacer » dans ton éditeur.

### 5. Mettre à jour les URLs canoniques
Dans `index.html`, `sitemap.xml`, `robots.txt` : remplacer `nahara-coaching.com` par le domaine final s'il diffère.

### 6. Témoignages
Les 4 témoignages (Mohammed, Angélique, Romain, Sarah) sont rédigés dans la voix de Jennifer et alignés sur les résultats du document d'offre, mais ils doivent être **validés et/ou ajustés par Jennifer** avant publication. Section `<!-- TÉMOIGNAGES -->` dans `index.html`.

---

## 🚀 Déploiement

Trois options simples, classées de la plus rapide à la plus avancée.

### Option A — Netlify Drop (le plus simple, 30 secondes)

1. Va sur [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Glisse-dépose le dossier `lp-jennifer/` entier
3. Netlify te donne une URL `xxx.netlify.app` instantanée
4. Pour utiliser ton propre domaine (ex. `nahara-coaching.com`) : Settings → Domain management → Add custom domain

**Avantages :** gratuit, HTTPS automatique, CDN mondial, déploiement instantané.

### Option B — Vercel (similaire)

1. Installer la CLI : `npm i -g vercel` (ou créer un compte sur [vercel.com](https://vercel.com))
2. Dans le dossier `lp-jennifer/`, lancer : `vercel`
3. Suivre les instructions

### Option C — Hébergeur classique (OVH, o2switch, Hostinger…)

1. Connecte-toi en FTP/SFTP à ton espace d'hébergement
2. Upload **le contenu** du dossier `lp-jennifer/` (et non le dossier lui-même) à la racine `www/` ou `public_html/`
3. Vérifie que `index.html` est bien à la racine
4. La page est accessible sur ton domaine

> **Important pour les hébergeurs classiques :** si tu veux que les liens propres (`/mentions-legales` au lieu de `/mentions-legales.html`) fonctionnent, il faudra ajouter un fichier `.htaccess`. Sinon, le site marche tel quel avec les `.html` dans les URLs.

---

## 🧪 Test en local

Pas besoin de serveur — double-clique sur `index.html` pour l'ouvrir dans le navigateur.

Pour un test plus fidèle (avec les chemins absolus, etc.) :

```bash
# Python (déjà installé sur Mac)
cd lp-jennifer
python3 -m http.server 8080
# → ouvrir http://localhost:8080

# Ou avec npx
npx serve .
```

---

## 🔧 Modifier le contenu

### Textes
Tous les textes sont dans `index.html` (et les pages secondaires). Pas de CMS, pas de JSON externe : c'est du HTML lisible, modifie directement.

### Couleurs / tokens visuels
Dans `assets/css/styles.css`, les **variables CSS** sont en haut du fichier sous `:root {}`. Elles correspondent **exactement** à `brand-tokens.json`. Ne pas inventer de couleur en dehors de ces variables.

```css
:root {
  --bg: #080720;         /* Fond principal */
  --coral: #F4785A;      /* Accent principal */
  --gold: #E8A838;       /* Accent secondaire */
  /* ... */
}
```

### Polices
Syne (titres) + DM Sans (corps), chargées depuis Google Fonts. Le `<link>` se trouve dans chaque fichier HTML.

---

## 🎯 Suivi de conversion (étape suivante recommandée)

Pour mesurer les conversions sans casser le RGPD ni alourdir la page, je recommande **Plausible Analytics** (~1 KB, sans cookies, conforme RGPD sans bandeau).

À ajouter dans le `<head>` de `index.html` après inscription sur plausible.io :

```html
<script defer data-domain="nahara-coaching.com" src="https://plausible.io/js/script.js"></script>
```

Pour traquer les clics CTA, ajouter `data-domain="..."` à la balise et tagger les boutons :
```html
<a href="..." class="btn btn-primary" data-event="cta-calendly-hero">Réserve →</a>
```

Si Plausible est ajouté, mettre à jour `confidentialite.html` (section Cookies).

---

## 📊 Performance & accessibilité

- **Mobile-first**, testé jusqu'à 375px (iPhone SE).
- **WCAG AA** : contrastes respectés (texte blanc sur fond `#080720`), focus visible, skip-link, structure sémantique.
- **Reduced motion** : les animations sont désactivées si l'utilisateur a activé `prefers-reduced-motion`.
- **SEO** : meta title/description, Open Graph, Twitter card, canonical, sitemap, robots.txt.
- **Aucun cookie**, aucun tracker, RGPD-friendly par défaut.

---

## 🆘 Support

Pour toute question technique : Khalil (l'auteur du site).
Pour modifier le contenu : Jennifer peut éditer les fichiers `.html` directement dans n'importe quel éditeur de texte (TextEdit, VS Code, etc.).
