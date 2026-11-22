#!/usr/bin/env node
/*
 * FADE — build SEO (sans dépendance).
 * - une page HTML par produit (produit-<id>.html) avec données structurées Google (schema.org/Product)
 * - balises canonical / Open Graph absolues
 * - sitemap.xml et robots.txt
 * Lancé automatiquement par Netlify à chaque déploiement (voir netlify.toml).
 * Adresse du site : variable URL de Netlify (domaine principal), sinon config.siteUrl.
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const CFG = require(path.join(ROOT, "assets/js/config.js"));
const { products, categories } = require(path.join(ROOT, "assets/js/products.js"));
const SITE = (process.env.URL || CFG.siteUrl || "").replace(/\/$/, "");
const today = new Date().toISOString().slice(0, 10);

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const write = (f, s) => fs.writeFileSync(path.join(ROOT, f), s);
const ld = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`;
const abs = (p) => `${SITE}/${p.replace(/^\//, "")}`;
const imgFor = (p) => {
  const png = `assets/img/products/${p.id}.png`;
  return (p.images && p.images[0]) || (fs.existsSync(path.join(ROOT, png)) ? png : "assets/img/og.jpg");
};

function setSEO(html, file, extra, ogImage) {
  const canonical = file === "index.html" ? `${SITE}/` : abs(file);
  const block = `<!--SEO--><link rel="canonical" href="${canonical}">\n<meta property="og:url" content="${canonical}">${extra ? "\n" + extra : ""}<!--/SEO-->`;
  html = html.replace(/<!--SEO-->(?:[\s\S]*?<!--\/SEO-->)?/, block);
  html = html.replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${abs(ogImage || "assets/img/og.jpg")}">`);
  return html;
}

// 1. Pages produit
const template = read("produit.html");
const productFiles = [];
for (const p of products) {
  const file = `produit-${p.id}.html`;
  const title = `${p.name} — FADE Barbers`;
  const desc = `${p.desc} ${p.size}. ${String(p.price.toFixed(2)).replace(".", ",")} €. Livraison ou retrait au salon.`.slice(0, 300);
  const img = imgFor(p);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    sku: p.id,
    description: p.desc,
    image: [abs(img)],
    brand: { "@type": "Brand", name: "FADE Barbers" },
    category: (categories.find((c) => c.id === p.category) || {}).label,
    offers: {
      "@type": "Offer",
      url: abs(file),
      priceCurrency: "EUR",
      price: p.price.toFixed(2),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: "FADE Barbers" },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: { "@type": "MonetaryAmount", value: String((CFG.shipping.find((s) => s.needsAddress) || { price: 0 }).price), currency: "EUR" },
        shippingDestination: { "@type": "DefinedRegion", addressCountry: "FR" },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 2, unitCode: "DAY" },
          transitTime: { "@type": "QuantitativeValue", minValue: 2, maxValue: 4, unitCode: "DAY" }
        }
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "FR",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 14,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/ReturnShippingFees"
      }
    }
  };
  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Boutique", item: abs("boutique.html") },
      { "@type": "ListItem", position: 2, name: p.name, item: abs(file) }
    ]
  };
  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(desc)}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(title)}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(desc)}">`)
    .replace(/<meta property="og:type" content="[^"]*">/, `<meta property="og:type" content="product">`)
    .replace(/<meta name="robots"[^>]*>\n?/, "")
    .replace(/<body data-page="product"[^>]*>/, `<body data-page="product" data-product="${p.id}">`)
    .replace(/<div class="wrap" id="pdp-root">[\s\S]*?<\/div>\n<\/main>/,
      `<div class="wrap" id="pdp-root"><div class="page-head"><span class="eyebrow">${esc(p.size)}</span><h1>${esc(p.name)}</h1><p class="pdp-price price">${p.price.toFixed(2).replace(".", ",")} €</p><p class="lead">${esc(p.desc)}</p></div></div>\n</main>`);
  html = setSEO(html, file, ld(schema) + "\n" + ld(crumbs), img);
  write(file, html);
  productFiles.push(file);
}

// 2. Pages fixes
const indexable = ["index.html", "boutique.html", "a-propos.html", "contact.html", "legal.html"];
for (const f of indexable.concat(["commande.html", "merci.html", "produit.html"])) {
  let html = read(f);
  let extra = "";
  if (f === "index.html") {
    extra = ld({
      "@context": "https://schema.org",
      "@graph": [
        { "@type": "Organization", "@id": `${SITE}/#org`, name: "FADE Barbers", alternateName: "FADE", url: `${SITE}/`, logo: abs("assets/img/icon-512.png"), sameAs: CFG.instagram ? [`https://www.instagram.com/${CFG.instagram}/`] : [] },
        { "@type": "WebSite", name: "FADE Barbers", url: `${SITE}/`, inLanguage: "fr-FR", publisher: { "@id": `${SITE}/#org` } }
      ]
    });
  }
  if (f === "produit.html" && !/name="robots"/.test(html)) html = html.replace("<!--SEO-->", '<meta name="robots" content="noindex">\n<!--SEO-->');
  write(f, setSEO(html, f, extra));
}

// 3. sitemap + robots
const urls = indexable.map((f) => (f === "index.html" ? `${SITE}/` : abs(f))).concat(productFiles.map(abs));
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join("\n")}\n</urlset>\n`);
write("robots.txt", `User-agent: *\nAllow: /\nDisallow: /commande.html\nDisallow: /merci.html\nDisallow: /api/\nDisallow: /guide/\n\nSitemap: ${SITE}/sitemap.xml\n`);

console.log(`FADE build OK — ${productFiles.length} pages produit, site : ${SITE}`);
