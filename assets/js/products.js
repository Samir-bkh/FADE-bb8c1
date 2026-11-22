/*
 * FADE — catalogue.
 * Pour ajouter un produit : copiez un bloc, changez l'id (lettres, chiffres, tirets),
 * le nom, le prix… "kind" choisit le visuel dessiné automatiquement :
 * nozzle (flacon applicateur), jar (pot), dropper (compte-gouttes), tall (flacon),
 * spray (vaporisateur), box (coffret). "image" remplace le visuel par une photo.
 */
(function (g) {
g.FADE_CATEGORIES = [
  { id: "coloration", label: "Coloration", desc: "Semi-permanente, pigments riches." },
  { id: "accessoire", label: "Accessoires", desc: "Le matériel du salon." },
  { id: "coffret", label: "Packs", desc: "Les essentiels en lot." }
];

g.FADE_PRODUCTS = [
  {
    id: "coloration-noir",
    name: "Coloration semi-permanente Noir",
    label: ["COLORATION", "SEMI-PERMANENTE"],
    variant: "NOIR",
    category: "coloration",
    price: 30,
    size: "60 ml · 2.0 fl.oz",
    kind: "nozzle",
    images: ["assets/img/products/coloration-noir-60ml.jpg"],
    badge: "Best-seller",
    featured: true,
    claims: ["Pigments riches", "Résultat naturel", "Longue tenue"],
    desc: "La coloration utilisée au salon pour redessiner un contour, densifier une barbe ou intensifier un dégradé. Son embout fin permet un tracé précis, ligne par ligne.",
    usage: [
      "Faire un test d'allergie 48 h avant la première utilisation.",
      "Appliquer sur cheveux ou barbe propres et secs à l'aide de l'embout.",
      "Laisser poser 5 à 15 minutes selon l'intensité souhaitée.",
      "Rincer abondamment à l'eau tiède."
    ],
    info: "Usage professionnel – Barber supply. Composition complète indiquée sur l'emballage."
  },
  {
    id: "pack-4-colorations",
    name: "Pack 4 Colorations Noir",
    label: ["PACK", "4 COLORATIONS"],
    variant: "NOIR",
    category: "coffret",
    price: 100,
    compareAt: 120,
    size: "4 × 60 ml",
    kind: "box",
    images: ["assets/img/products/coloration-noir-60ml.jpg"],
    badge: "-17 %",
    featured: true,
    claims: ["4 flacons", "Économie", "Idéal pour les pros"],
    desc: "Quatre flacons de coloration semi-permanente Noir 60 ml à prix réduit. Le bon format pour les barbiers ou pour ne jamais tomber à court.",
    usage: [
      "Contient : 4 × Coloration semi-permanente Noir 60 ml.",
      "Faire un test d'allergie 48 h avant la première utilisation."
    ],
    info: "Voir la fiche Coloration semi-permanente Noir pour le détail d'utilisation."
  },
  {
    id: "airbrush",
    name: "Airbrush FADE",
    label: ["AIRBRUSH", "SANS FIL"],
    variant: "NOIR & OR",
    category: "accessoire",
    price: 80,
    size: "Livré avec son flacon",
    kind: "spray",
    images: ["assets/img/products/airbrush.jpg"],
    badge: "Nouveau",
    featured: true,
    claims: ["Pulvérisation fine", "Sans fil", "Finition salon"],
    desc: "L'airbrush FADE pour appliquer la coloration en pulvérisation fine : contours nets, dégradés et barbe, avec le rendu du salon.",
    usage: [
      "Remplir le flacon avec la coloration.",
      "Pulvériser à quelques centimètres de la zone à traiter, par petites touches.",
      "Nettoyer le flacon et la buse à l'eau après chaque utilisation."
    ],
    info: "Usage professionnel – Barber supply."
  }
];
if (typeof module === "object" && module.exports) module.exports = { categories: g.FADE_CATEGORIES, products: g.FADE_PRODUCTS };
})(typeof window !== "undefined" ? window : globalThis);
