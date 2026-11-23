/*
 * FADE — configuration de la boutique.
 * Modifiez ce fichier pour brancher vos vrais canaux de commande.
 * Aucun autre fichier n'a besoin d'être touché.
 */
(function (g) {
g.FADE_CONFIG = {
  brand: "FADE",
  // Adresse publique du site (sans "/" final). Mise à jour automatique sur Netlify.
  siteUrl: "https://fade-barbers.netlify.app",

  // Paiement en ligne sécurisé par Stripe (carte, Apple Pay, Google Pay).
  // Nécessite la variable STRIPE_SECRET_KEY sur l'hébergeur (voir README).
  onlinePayment: true,
  tagline: "Barbers",
  owner: "jesuispassechezsouf",

  // Canaux de réception des commandes ----------------------------------
  // Instagram : utilisé par défaut (fonctionne sans autre réglage).
  instagram: "jesuispassechezsouf",
  // WhatsApp : numéro au format international SANS "+" ni espaces, ex. "33612345678".
  // Laisser vide pour masquer le bouton WhatsApp.
  whatsapp: "",
  // E-mail de réception, ex. "commandes@fade-barbers.fr". Vide = masqué.
  email: "jesuispassechezsouf@gmail.com",
  // Optionnel : URL d'un formulaire Formspree (https://formspree.io) pour recevoir
  // chaque commande automatiquement par e-mail, ex. "https://formspree.io/f/abcdwxyz".
  formEndpoint: "",

  // Statistiques de visite (Umami Cloud, gratuit, sans cookie) ----------
  // Créer un compte sur https://cloud.umami.is, ajouter le site, puis coller ici
  // le "Website ID" (ex. "a1b2c3d4-...."). Vide = statistiques désactivées.
  umamiWebsiteId: "",

  // Livraison -----------------------------------------------------------
  currency: "EUR",
  freeShippingFrom: 60, // livraison offerte dès ce montant (€). 0 = désactivé.
  shipping: [
    {
      id: "retrait",
      label: "Retrait au salon",
      desc: "Chez jesuispassechezsouf. On vous confirme le créneau par message.",
      price: 0,
      needsAddress: false
    },
    {
      id: "livraison",
      label: "Livraison à domicile",
      desc: "Colissimo suivi, 2 à 4 jours ouvrés en France métropolitaine.",
      price: 5.9,
      needsAddress: true
    }
  ],
  payment: [
    { id: "carte", label: "Carte bancaire, Apple Pay, Google Pay", desc: "Paiement 100 % sécurisé par Stripe (3D Secure). Vos données bancaires ne transitent jamais par ce site.", online: true },
    { id: "remise", label: "Paiement au retrait", desc: "Espèces ou carte au salon.", only: "retrait" }
  ],

  // Mentions légales (à compléter avant mise en ligne définitive) -------
  legal: {
    company: "JE SUIS PASSE CHEZ SOUF",
    status: "SAS",
    siret: "899 751 150 00025",
    address: "1 allée François Truffaut, 74100 Annemasse, France",
    publisher: "Sofiane Boukhdimi",
    host: "Netlify, Inc., 101 2nd Street, San Francisco, CA 94105, USA — www.netlify.com"
  }
};
if (typeof module === "object" && module.exports) module.exports = g.FADE_CONFIG;
})(typeof window !== "undefined" ? window : globalThis);
