# FADE Barbers — boutique en ligne

Site e-commerce de la marque **FADE** (produits de coiffure de jesuispassechezsouf).
Site statique rapide + paiement sécurisé **Stripe** via des fonctions serveur **Netlify**. Aucune dépendance npm.

## Fonctionnalités
- Accueil, boutique (filtres, tri), une page par produit, à propos, contact + FAQ, mentions légales / CGV / confidentialité, 404.
- Panier persistant, tiroir panier, bouton d'achat collant sur mobile.
- **Paiement en ligne sécurisé** : carte bancaire, Apple Pay, Google Pay sur la page Stripe (PCI-DSS, 3D Secure).
  Les prix sont recalculés côté serveur : impossible de les modifier depuis le navigateur.
- Retrait au salon (paiement sur place possible) ou livraison (offerte dès 50 €).
- Page de confirmation qui vérifie le paiement auprès de Stripe. Reçu envoyé automatiquement par Stripe.
- **SEO** : pages produit indexables, données structurées Google (Produit, Organisation, fil d'Ariane), sitemap, robots, Open Graph.
- **Sécurité** : HTTPS forcé (HSTS), Content-Security-Policy stricte, anti-clickjacking, aucune donnée bancaire sur le site.

## Mise en ligne (Netlify)
1. Créer un compte **Stripe** (stripe.com) et l'activer (identité, IBAN). Récupérer la **clé secrète** (`sk_live_…`, ou `sk_test_…` pour tester).
2. Sur **Netlify** → le site → *Site configuration → Environment variables* → ajouter `STRIPE_SECRET_KEY` = votre clé secrète.
   Ne jamais mettre cette clé dans le code ni l'envoyer par message.
3. Redéployer (*Deploys → Trigger deploy*). `/api/status` doit répondre `"payments": true`.
4. Dans Stripe : *Paramètres → E-mails clients* → activer les reçus de paiement ; *Notifications* → recevoir un e-mail à chaque paiement.
   Les commandes (articles, adresse, téléphone) apparaissent dans *Paiements*.

Sans clé Stripe, le site fonctionne quand même : la commande est envoyée par Instagram / WhatsApp / e-mail.

## Nom de domaine et Google
- Acheter un domaine (ex. `fade-barbers.fr`, ~10 €/an chez OVH, Gandi, Namecheap…) puis Netlify → *Domain management → Add a domain*. HTTPS automatique.
- Google : https://search.google.com/search-console → ajouter le domaine → envoyer `https://votre-domaine/sitemap.xml`.
- Créer une fiche **Google Business Profile** pour le salon avec le lien du site, et mettre le lien dans la bio Instagram.

## Modifier le site
- Produits et prix : `assets/js/products.js` · Réglages (livraison, WhatsApp, e-mail, mentions légales) : `assets/js/config.js`
- Pages HTML : `python3 scripts/pages.py` · Pages produit + sitemap : `node scripts/build.js` (lancé automatiquement par Netlify)
- Visuels produits PNG : `node scripts/render-images.js` (Playwright)
- Les produits autres que la coloration Noir et tous les prix sont des exemples à ajuster.

## Développement local
```
npx netlify-cli dev     # site + fonctions sur http://localhost:8888
```

## Statistiques (Umami, gratuit, sans cookie)
1. Créer un compte sur https://cloud.umami.is (offre gratuite « Hobby »).
2. *Add website* : nom FADE, domaine du site. Copier le **Website ID**.
3. Le coller dans `assets/js/config.js` → `umamiWebsiteId`.

Mesuré automatiquement : visiteurs, pages vues, durée de visite, provenance (Instagram, Google…), appareil, pays,
et les événements : `vue-produit`, `ajout-panier`, `retrait-panier`, `ouverture-panier`, `filtre-boutique`,
`validation-commande`, `commande-envoyee`, `achat` (avec chiffre d'affaires), `temps-sur-page`, `defilement`.
