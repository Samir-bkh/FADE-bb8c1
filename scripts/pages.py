# Génère les pages HTML statiques du site (python3 scripts/pages.py), puis lancer node scripts/build.js
import os
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOGO='<svg viewBox="0 0 300 72" role="img" aria-label="FADE"><g fill="currentColor" fill-rule="evenodd"><path d="M0 0h52v12H12v19h34v11H12v30H0z"/><path d="M62 72 100 0l38 72h-14L100 26.5 76 72z"/><path d="M152 0h30a36 36 0 0 1 0 72h-30zM164 12v48h18a24 24 0 0 0 0-48z"/><path d="M232 0h68v12h-68zM232 30h68v12h-68zM232 60h68v12h-68z"/></g></svg>'

def page(fname, title, desc, dpage, main, extra_head="", extra_foot=""):
    html=f'''<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>{title}</title>
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="claude:viewport-fit-sides" content="cover">
<meta name="description" content="{desc}">
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0b0b0b" media="(prefers-color-scheme: dark)">
<meta property="og:type" content="website">
<meta property="og:site_name" content="FADE Barbers">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{desc}">
<meta property="og:image" content="assets/img/og.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="assets/img/icon-180.png">
<link rel="manifest" href="manifest.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Jost:wght@400;500&display=swap">
<link rel="stylesheet" href="assets/css/style.css">
<!--SEO-->
{extra_head}</head>
<body data-page="{dpage}">
<a class="sr-only" href="#main">Aller au contenu</a>
<header id="site-header" class="site-header"></header>
<main id="main">
{main}
</main>
<footer id="site-footer" class="site-footer"></footer>
<script src="assets/js/config.js"></script>
<script src="assets/js/products.js"></script>
<script src="assets/js/app.js"></script>
{extra_foot}</body>
</html>
'''
    open(os.path.join(ROOT,fname),"w",encoding="utf-8").write(html)

ICON_DROP='<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="20" cy="20" r="18.5"/><path d="M20 11c3.5 4.6 5.5 7.8 5.5 10.6a5.5 5.5 0 0 1-11 0C14.5 18.8 16.5 15.6 20 11z"/></svg>'
ICON_SHIELD='<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="20" cy="20" r="18.5"/><path d="M20 11l7 2.6v5.2c0 4.6-3 8-7 9.7-4-1.7-7-5.1-7-9.7v-5.2L20 11z"/><path d="M16.8 19.6l2.3 2.3 4.2-4.4"/></svg>'
ICON_WAVE='<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="20" cy="20" r="18.5"/><path d="M15 13c-1.6 2 1.6 4-0 6s1.6 4 0 6.5M20 13c-1.6 2 1.6 4 0 6s1.6 4 0 6.5M25 13c-1.6 2 1.6 4 0 6s1.6 4 0 6.5"/></svg>'
ICON_STAR='<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.2"><circle cx="20" cy="20" r="18.5"/><path d="M20 11.5c.7 4.6 3.9 7.8 8.5 8.5-4.6.7-7.8 3.9-8.5 8.5-.7-4.6-3.9-7.8-8.5-8.5 4.6-.7 7.8-3.9 8.5-8.5z"/></svg>'

home=f'''<section class="xh" aria-label="FADE Barbers">
  <div class="wrap">
    <div class="xh-top">
      <div class="xh-copy">
        <p class="xh-eyebrow xa">Barber supply · Annemasse</p>
        <h1 class="xh-title xa">Le rendu du salon,<br>chez vous.</h1>
      </div>
      <div class="xh-side xa">
        <p class="xh-lead">Coloration semi-permanente prête à l'emploi et airbrush sans fil. Le matériel que nos barbiers utilisent tous les jours.</p>
        <div class="xh-actions">
          <a class="xbtn xbtn--dark" href="boutique.html">Voir la boutique <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </div>
    <div class="xh-bento">
      <a class="xt xt--hero" href="produit-coloration-noir.html">
        <span class="xt-tag">Best-seller</span>
        <img src="assets/img/products/coloration-noir-60ml.jpg" alt="Coloration semi-permanente FADE Noir 60 ml" fetchpriority="high">
        <span class="xt-info"><span><i>Coloration semi-permanente</i><b>Noir · 60 ml</b></span><em>30 €</em></span>
      </a>
      <a class="xt xt--air" href="produit-airbrush.html">
        <span class="xt-tag">Nouveau</span>
        <img src="assets/img/products/airbrush.jpg" alt="Airbrush FADE sans fil">
        <span class="xt-info"><span><i>Sans fil · USB</i><b>Airbrush FADE</b></span><em>80 €</em></span>
      </a>
      <a class="xt xt--dark xt--pack" href="produit-pack-4-colorations.html">
        <i>Pack pro</i>
        <b>4 colorations Noir</b>
        <span class="xt-price"><em>100 €</em><s>120 €</s></span>
        <span class="xt-arrow" aria-hidden="true">→</span>
      </a>
      <div class="xt xt--stat">
        <b>0</b><span>rinçage.<br>Prête à l'emploi : on applique, c'est fini.</span>
      </div>
    </div>
  </div>
  <div class="xh-word" aria-hidden="true">{LOGO}</div>
</section>

<div class="xm" aria-hidden="true">
  <div class="xm-track"><span>Coloration</span><i>✦</i><span class="o">Airbrush</span><i>✦</i><span>FADE Barbers</span><i>✦</i><span class="o">Contour net</span><i>✦</i><span>Coloration</span><i>✦</i><span class="o">Airbrush</span><i>✦</i><span>FADE Barbers</span><i>✦</i><span class="o">Contour net</span><i>✦</i></div>
</div>

<section class="xs" aria-labelledby="xs1-t">
  <div class="xs-pin">
    <div class="wrap xs-grid">
      <div class="xs-head">
        <span class="xs-n">01 — Coloration</span>
        <h2 id="xs1-t">Un trait net.<br>Sans attendre.</h2>
        <a class="xbtn xbtn--dark" href="produit-coloration-noir.html">Découvrir · 30 €</a>
      </div>
      <div class="xs-media"><img src="assets/img/products/coloration-noir-60ml.jpg" alt="Coloration semi-permanente FADE Noir" loading="lazy"></div>
      <ul class="xs-points">
        <li><b>Prête à l'emploi</b><span>Déjà mélangée, aucune préparation.</span></li>
        <li><b>Sans rinçage</b><span>On applique, c'est fini.</span></li>
        <li><b>Embout précis</b><span>Contours et barbe, ligne par ligne.</span></li>
        <li><b>Pigments riches</b><span>Un noir profond, un rendu naturel.</span></li>
      </ul>
    </div>
  </div>
</section>

<section class="xs xs--dark" aria-labelledby="xs2-t">
  <div class="xs-pin">
    <div class="wrap xs-grid">
      <div class="xs-head">
        <span class="xs-n">02 — Airbrush</span>
        <h2 id="xs2-t">La précision,<br>sans fil.</h2>
        <a class="xbtn" href="produit-airbrush.html">Découvrir · 80 €</a>
      </div>
      <div class="xs-media"><img src="assets/img/products/airbrush.jpg" alt="Airbrush FADE" loading="lazy"></div>
      <ul class="xs-points">
        <li><b>Sans fil</b><span>Liberté totale autour du client.</span></li>
        <li><b>Rechargeable USB</b><span>Une charge, plusieurs sessions.</span></li>
        <li><b>Jet ultra fin</b><span>Dégradés et contours propres.</span></li>
        <li><b>Facile à rincer</b><span>Nettoyage en quelques secondes.</span></li>
      </ul>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head">
      <div><span class="eyebrow">Les incontournables</span><h2>Best-sellers</h2></div>
      <a class="link" href="boutique.html">Tout voir</a>
    </div>
    <div class="grid grid--4" id="featured"></div>
  </div>
</section>

<section class="section band">
  <div class="wrap story">
    <div class="story-logo">{LOGO}</div>
    <div class="story-copy">
      <span class="eyebrow">Né au salon</span>
      <h2>Le geste du barbier, en flacon.</h2>
      <p class="muted">FADE est la marque de produits de <a href="a-propos.html" style="color:inherit">jesuispassechezsouf</a>. Chaque référence est d'abord utilisée sur les clients du salon, puis ajustée jusqu'à tenir ses promesses : un contour net, une couleur qui reste naturelle, une coiffure qui tient la journée.</p>
      <div><a class="btn" href="a-propos.html">Notre histoire</a></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="wrap">
    <div class="section-head"><div><span class="eyebrow">La gamme</span><h2>Par catégorie</h2></div></div>
    <div class="cats" id="cats"></div>
  </div>
</section>

<section class="section" style="padding-top:0">
  <div class="wrap">
    <div class="section-head"><div><span class="eyebrow">Simple et rapide</span><h2>Comment commander</h2></div></div>
    <div class="steps">
      <div class="step"><span class="step-n">01</span><h3>Choisissez vos produits</h3><p class="muted">Ajoutez-les au panier depuis la boutique, sur mobile comme sur ordinateur.</p></div>
      <div class="step"><span class="step-n">02</span><h3>Indiquez vos infos</h3><p class="muted">Retrait gratuit au salon ou livraison à domicile, offerte dès 60 €.</p></div>
      <div class="step"><span class="step-n">03</span><h3>Payez en toute sécurité</h3><p class="muted">Paiement par carte sur la page sécurisée Stripe, ou sur place au retrait. Vous recevez un reçu par e-mail.</p></div>
    </div>
  </div>
</section>'''
page("index.html","FADE Barbers","FADE Barbers, produits de coiffure professionnels : coloration semi-permanente et airbrush. Commandez en ligne, retrait au salon ou livraison.","home",home,extra_head='<link rel="stylesheet" href="assets/css/home.css">\n',extra_foot='<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>\n<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>\n<script src="assets/js/home.js"></script>\n')

shop='''<div class="wrap">
  <div class="page-head">
    <span class="eyebrow">Boutique</span>
    <h1>Toute la gamme</h1>
    <p class="lead">Produits utilisés et testés au salon. Retrait gratuit ou livraison à domicile.</p>
  </div>
  <div class="toolbar">
    <div class="chips" id="chips" role="group" aria-label="Filtrer par catégorie"></div>
    <div style="display:flex;gap:1rem;align-items:center">
      <span class="muted" id="shop-count" style="font-size:.85rem"></span>
      <label class="sr-only" for="sort">Trier</label>
      <select class="select" id="sort">
        <option value="featured">Pertinence</option>
        <option value="asc">Prix croissant</option>
        <option value="desc">Prix décroissant</option>
        <option value="name">Nom A–Z</option>
      </select>
    </div>
  </div>
  <div class="grid grid--4" id="shop-grid"></div>
  <div style="height:3rem"></div>
</div>'''
page("boutique.html","Boutique FADE","Toute la gamme FADE Barbers : coloration semi-permanente, packs et airbrush.","shop",shop)

page("produit.html","Produit FADE","Fiche produit FADE Barbers.","product",'<div class="wrap" id="pdp-root"></div>')

checkout='''<div class="wrap">
  <div id="checkout-wrap">
    <div class="page-head"><span class="eyebrow">Commande</span><h1>Finaliser</h1></div>
    <div class="checkout">
      <form class="form" id="checkout-form" novalidate>
        <fieldset>
          <legend>Vos coordonnées</legend>
          <div class="field"><label for="name">Nom et prénom</label><input class="input" id="name" name="name" autocomplete="name" required></div>
          <div class="row-2">
            <div class="field"><label for="phone">Téléphone</label><input class="input" id="phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" pattern="[0-9+ ]{8,20}" required></div>
            <div class="field"><label for="email">E-mail (facultatif)</label><input class="input" id="email" name="email" type="email" autocomplete="email"></div>
          </div>
        </fieldset>
        <fieldset>
          <legend>Mode de réception</legend>
          <div class="options" id="ship-options"></div>
          <div id="address-fields" hidden style="display:grid;gap:1rem">
            <div class="field"><label for="street">Adresse</label><input class="input" id="street" name="street" autocomplete="street-address" data-req></div>
            <div class="row-2">
              <div class="field"><label for="zip">Code postal</label><input class="input" id="zip" name="zip" autocomplete="postal-code" inputmode="numeric" pattern="[0-9]{5}" data-req></div>
              <div class="field"><label for="city">Ville</label><input class="input" id="city" name="city" autocomplete="address-level2" data-req></div>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>Paiement</legend>
          <div class="options" id="pay-options"></div>
        </fieldset>
        <fieldset>
          <legend>Note</legend>
          <div class="field"><label for="note">Une précision ? (créneau de retrait, teinte, etc.)</label><textarea class="input" id="note" name="note" rows="3"></textarea></div>
        </fieldset>
        <label class="check"><input type="checkbox" id="cgv" name="cgv" required><span>J'ai lu et j'accepte les <a href="legal.html#cgv" target="_blank">conditions générales de vente</a>.</span></label>
        <p class="status-line" id="pay-status" hidden></p>
        <button class="btn btn--block" type="submit"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="1"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/></svg> Valider et payer</button>
        <p class="note">Paiement par carte : vous êtes redirigé vers la page sécurisée Stripe (HTTPS, 3D Secure). Vos coordonnées bancaires ne passent jamais par ce site. Paiement au retrait : votre récapitulatif s'affiche et vous l'envoyez à la boutique en un clic.</p>
      </form>
      <aside class="summary" id="summary" aria-label="Récapitulatif de commande"></aside>
    </div>
  </div>

  <section class="confirm" id="confirm" hidden aria-live="polite">
    <div class="confirm-badge"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 12.5l5 5L20 6.5"/></svg></div>
    <span class="eyebrow">Commande préparée</span>
    <h1 style="font-size:clamp(2rem,5vw,3rem)">Dernière étape : envoyez-la nous.</h1>
    <p class="lead">Commande <span class="order-no" id="order-no"></span> · Total <b class="price" id="order-total"></b>. Envoyez le récapitulatif avec l'un des boutons ci-dessous. Nous vous répondons pour confirmer la disponibilité, le retrait ou la livraison, et le paiement.</p>
    <p class="status-line" id="form-status" hidden></p>
    <div class="send-grid" id="send-grid"></div>
    <p class="note" id="ig-hint">Instagram : le récapitulatif est copié automatiquement. Collez-le dans la conversation qui s'ouvre, puis envoyez.</p>
    <label class="sr-only" for="recap">Récapitulatif de la commande</label>
    <textarea class="recap" id="recap" readonly></textarea>
    <div><a class="link" href="boutique.html">Retour à la boutique</a></div>
  </section>
</div>'''
page("commande.html","Commande FADE","Finalisez votre commande FADE Barbers.","checkout",checkout,'<meta name="robots" content="noindex">\n')

about=f'''<div class="wrap narrow">
  <div class="page-head"><span class="eyebrow">À propos</span><h1>FADE, la marque du salon.</h1></div>
  <div class="prose">
    <p class="lead">FADE est née derrière le fauteuil, chez <span data-cfg="owner">jesuispassechezsouf</span>. L'idée : proposer aux clients les mêmes produits que ceux utilisés pendant la coupe, sans compromis sur le résultat.</p>
    <h2>Une gamme courte, des produits qui servent</h2>
    <p>Pas de catalogue à rallonge. Chaque produit répond à un besoin précis du quotidien d'un barbier : redessiner un contour ou densifier une barbe avec la coloration semi-permanente, l'appliquer en pulvérisation fine avec l'airbrush.</p>
    <h2>Testé sur de vrais clients</h2>
    <p>Avant d'arriver sur la boutique, chaque référence passe des semaines au salon. On garde ce qui tient, ce qui reste naturel et ce que les clients redemandent.</p>
    <h2>Minimaliste, par choix</h2>
    <p>Un packaging gris et noir, des noms simples, des instructions claires. Le résultat doit se voir sur vous, pas sur l'étiquette.</p>
  </div>
</div>
<section class="section band" style="margin-top:4rem">
  <div class="wrap story">
    <div class="story-logo">{LOGO}</div>
    <div class="story-copy">
      <span class="eyebrow">Suivez le salon</span>
      <h2>Les coupes, les produits, les coulisses.</h2>
      <div><a class="btn" data-cfg="instagram" href="https://instagram.com/jesuispassechezsouf" target="_blank" rel="noopener">@jesuispassechezsouf</a></div>
    </div>
  </div>
</section>'''
page("a-propos.html","À propos de FADE","FADE, la marque de produits de coiffure du salon jesuispassechezsouf.","about",about)

contact='''<div class="wrap">
  <div class="page-head"><span class="eyebrow">Contact</span><h1>Une question ?</h1><p class="lead">Conseil produit, suivi de commande, revendeur : écrivez-nous, on répond vite.</p></div>
  <div class="contact-grid">
    <a class="contact-card" data-cfg-link="instagram" href="https://ig.me/m/jesuispassechezsouf" target="_blank" rel="noopener"><b>Instagram</b><span data-cfg="instagram">@jesuispassechezsouf</span><span class="muted">Le plus rapide. Message privé.</span></a>
    <a class="contact-card" data-cfg-link="whatsapp" data-show-if="whatsapp" href="#" target="_blank" rel="noopener"><b>WhatsApp</b><span data-val></span><span class="muted">Commandes et questions.</span></a>
    <a class="contact-card" data-cfg-link="email" data-show-if="email" href="#"><b>E-mail</b><span data-val></span><span class="muted">Réponse sous 24 h ouvrées.</span></a>
    <div class="contact-card"><b>Salon</b><span data-cfg="owner">jesuispassechezsouf</span><span class="muted">Retrait des commandes sur rendez-vous, confirmé par message.</span></div>
  </div>

  <section class="section" id="faq">
    <div class="section-head"><div><span class="eyebrow">FAQ</span><h2>Questions fréquentes</h2></div></div>
    <div class="faq narrow" style="max-width:820px">
      <details class="acc" open><summary>Comment se passe une commande ?</summary><div class="acc-body"><p>Ajoutez vos produits au panier, renseignez vos coordonnées puis envoyez le récapitulatif (Instagram, WhatsApp ou e-mail). Nous confirmons la disponibilité et les modalités de paiement par message.</p></div></details>
      <details class="acc"><summary>Quels sont les délais de livraison ?</summary><div class="acc-body"><p>Expédition sous 48 h ouvrées après confirmation, puis 2 à 4 jours ouvrés en Colissimo suivi. La livraison est offerte dès 60 € d'achat.</p></div></details>
      <details class="acc"><summary>Puis-je récupérer ma commande au salon ?</summary><div class="acc-body"><p>Oui, le retrait au salon est gratuit. Nous vous proposons un créneau dès que la commande est prête.</p></div></details>
      <details class="acc"><summary>La coloration convient-elle à la barbe ?</summary><div class="acc-body"><p>Oui, elle s'utilise sur les cheveux et la barbe. Faites toujours un test d'allergie 48 h avant la première application.</p></div></details>
      <details class="acc"><summary>Combien de temps tient la coloration ?</summary><div class="acc-body"><p>C'est une coloration semi-permanente : elle s'estompe progressivement au fil des lavages, en général sur deux à trois semaines selon la fréquence des shampoings.</p></div></details>
      <details class="acc"><summary>Je suis barbier, puis-je revendre FADE ?</summary><div class="acc-body"><p>Contactez-nous sur Instagram pour les tarifs professionnels et les commandes en volume.</p></div></details>
    </div>
  </section>
</div>'''
page("contact.html","Contact FADE","Contactez FADE Barbers : conseil produit, suivi de commande, revendeurs.","contact",contact)

legal='''<div class="wrap narrow">
  <div class="page-head"><span class="eyebrow">Informations</span><h1>Informations légales</h1></div>
  <div class="prose">
    <h2 id="mentions">Mentions légales</h2>
    <p><b>Éditeur du site :</b> <span data-cfg="company">JE SUIS PASSE CHEZ SOUF</span>, <span data-cfg="status"></span>, exploitant la marque FADE Barbers. Siège social : <span data-cfg="address"></span>. SIRET : <span data-cfg="siret"></span> – RCS Thonon-les-Bains 899 751 150. N° de TVA intracommunautaire : FR27899751150.</p>
    <p><b>Contact :</b> <a href="mailto:jesuispassechezsouf@gmail.com">jesuispassechezsouf@gmail.com</a> – 07 60 33 55 10.</p>
    <p><b>Directeur de la publication :</b> <span data-cfg="publisher"></span>, président.</p>
    <p><b>Hébergement :</b> <span data-cfg="host"></span>.</p>
    <p>Les marques, logos et visuels FADE sont la propriété de leur titulaire. Toute reproduction sans autorisation est interdite.</p>

    <h2 id="cgv">Conditions générales de vente</h2>
    <h3>1. Objet</h3>
    <p>Les présentes conditions régissent les ventes de produits FADE effectuées via ce site auprès de clients consommateurs. Le vendeur est la société JE SUIS PASSE CHEZ SOUF, SAS, 1 allée François Truffaut, 74100 Annemasse, SIRET 899 751 150 00025.</p>
    <h3>2. Commande</h3>
    <p>Le client compose son panier, renseigne ses coordonnées et transmet sa commande à la boutique. La commande devient ferme après confirmation par la boutique de la disponibilité des produits et des modalités de paiement.</p>
    <h3>3. Prix</h3>
    <p>Les prix sont indiqués en euros toutes taxes comprises, hors frais de livraison affichés avant la validation de la commande.</p>
    <h3>4. Paiement</h3>
    <p>Le paiement en ligne s'effectue par carte bancaire (CB, Visa, Mastercard), Apple Pay ou Google Pay via notre prestataire Stripe, certifié PCI-DSS niveau 1. Le paiement est sécurisé par chiffrement TLS et authentification 3D Secure ; les données bancaires sont saisies sur la page sécurisée de Stripe et ne sont jamais transmises ni conservées par FADE. Le débit intervient à la validation de la commande. En cas de retrait au salon, le paiement peut aussi être effectué sur place.</p>
    <h3 id="livraison">5. Livraison et retrait</h3>
    <p>Retrait gratuit au salon sur rendez-vous. Livraison en France métropolitaine par Colissimo suivi, expédition sous 48 h ouvrées puis 2 à 4 jours ouvrés d'acheminement. Frais de livraison : 5,90 €, offerts dès 60 € d'achat.</p>
    <h3>6. Droit de rétractation</h3>
    <p>Conformément à l'article L221-18 du Code de la consommation, le client dispose de 14 jours à compter de la réception pour exercer son droit de rétractation. Pour l'exercer, le client nous informe de sa décision par e-mail (jesuispassechezsouf@gmail.com) puis renvoie le produit dans les 14 jours ; le remboursement intervient dans les 14 jours suivant la réception de sa décision, par le même moyen de paiement. Pour des raisons d'hygiène, les colorations descellées après livraison ne peuvent être reprises (art. L221-28). Les frais de retour sont à la charge du client.</p>
    <h3>7. Précautions d'emploi</h3>
    <p>Respecter les indications d'utilisation figurant sur l'emballage. Pour les colorations, un test d'allergie 48 h avant chaque application est indispensable.</p>
    <h3>8. Garanties et litiges</h3>
    <p>Les produits bénéficient de la garantie légale de conformité et de la garantie des vices cachés. En cas de litige, une solution amiable sera recherchée en priorité ; à défaut, le client peut recourir gratuitement à un médiateur de la consommation.</p>

    <h2 id="confidentialite">Politique de confidentialité</h2>
    <p>Les informations saisies lors d'une commande (nom, téléphone, e-mail, adresse) servent uniquement à traiter et livrer la commande. Elles ne sont ni revendues ni utilisées à des fins publicitaires sans votre accord.</p>
    <p>Le panier est enregistré uniquement dans votre navigateur (stockage local) et n'est transmis à personne tant que vous ne validez pas votre commande. Le site n'utilise ni cookie publicitaire ni outil de suivi : aucun bandeau cookies n'est donc nécessaire.</p>
    <p>Les paiements sont traités par Stripe Payments Europe Ltd., qui agit en tant que responsable de traitement pour les données de paiement (voir stripe.com/fr/privacy). Les données de commande sont conservées le temps nécessaire à la gestion de la commande et aux obligations comptables (10 ans).</p>
    <p>Conformément au RGPD, vous pouvez demander l'accès, la rectification ou la suppression de vos données en nous contactant via la page <a href="contact.html">Contact</a>.</p>
  </div>
  <div style="height:4rem"></div>
</div>'''
page("legal.html","Informations légales FADE","Mentions légales, CGV et politique de confidentialité FADE Barbers.","legal",legal)

nf=f'''<div class="wrap" style="padding-block:6rem;display:grid;gap:1.4rem;justify-items:start">
  <span class="eyebrow">Erreur 404</span>
  <h1>Page introuvable.</h1>
  <p class="lead">Le lien est peut-être incomplet ou la page a été déplacée.</p>
  <a class="btn" href="index.html">Retour à l'accueil</a>
</div>'''
page("404.html","Page introuvable — FADE","Page introuvable.","notfound",nf,'<base href="/">\n<meta name="robots" content="noindex">\n')

merci='''<div class="wrap"><section class="confirm" id="thanks-root" aria-live="polite">
  <span class="eyebrow">Commande</span>
  <h1>Vérification du paiement…</h1>
  <p class="lead">Un instant, nous confirmons votre commande auprès de notre partenaire de paiement.</p>
</section></div>'''
page("merci.html","Merci — FADE","Confirmation de commande FADE Barbers.","thanks",merci,'<meta name="robots" content="noindex">\n')
print("ok")
