/* FADE — boutique (vanilla JS, aucune dépendance). */
(function () {
  "use strict";

  var CFG = window.FADE_CONFIG || {};
  var PRODUCTS = window.FADE_PRODUCTS || [];
  var CATS = window.FADE_CATEGORIES || [];
  var CART_KEY = "fade_cart_v1";
  var ORDER_KEY = "fade_last_order_v1";
  var THEME_KEY = "fade_theme";

  /* ---------- utils ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var fmt = new Intl.NumberFormat("fr-FR", { style: "currency", currency: CFG.currency || "EUR" });
  function money(n) { return fmt.format(n); }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function store(key, val) {
    try {
      if (val === undefined) { var v = localStorage.getItem(key); return v ? JSON.parse(v) : null; }
      if (val === null) localStorage.removeItem(key); else localStorage.setItem(key, JSON.stringify(val));
    } catch (e) { return null; }
  }
  function byId(id) { for (var i = 0; i < PRODUCTS.length; i++) if (PRODUCTS[i].id === id) return PRODUCTS[i]; return null; }
  function catLabel(id) { for (var i = 0; i < CATS.length; i++) if (CATS[i].id === id) return CATS[i].label; return id; }

  /* ---------- theme ---------- */
  var savedTheme = store(THEME_KEY);
  if (savedTheme === "dark" || savedTheme === "light") document.documentElement.setAttribute("data-theme", savedTheme);

  /* ---------- icons ---------- */
  var I = {
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 7h18M3 12h18M3 17h18"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 5l14 14M19 5L5 19"/></svg>',
    bag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 8h14l-1 13H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 5v14M5 12h14"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 12.5l5 5L20 6.5"/></svg>',
    ig: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor"/></svg>',
    wa: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 20l1.3-4A8 8 0 1 1 8 18.7L4 20z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a4 4 0 0 1-2-2l.8-1-1-2L9 9.5z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 6l9 7 9-7"/></svg>',
    copy: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="8" y="8" width="12" height="12" rx="1"/><path d="M16 8V4H4v12h4"/></svg>'
  };
  var LOGO_PATHS = '<path d="M0 0h52v12H12v19h34v11H12v30H0z"/><path d="M62 72 100 0l38 72h-14L100 26.5 76 72z"/><path d="M152 0h30a36 36 0 0 1 0 72h-30zM164 12v48h18a24 24 0 0 0 0-48z"/><path d="M232 0h68v12h-68zM232 30h68v12h-68zM232 60h68v12h-68z"/>';
  function logo(cls) { return '<svg class="' + (cls || "logo") + '" viewBox="0 0 300 72" role="img" aria-label="FADE"><g fill="currentColor" fill-rule="evenodd">' + LOGO_PATHS + "</g></svg>"; }

  /* ---------- product renders (SVG, style packaging FADE) ---------- */
  var LABEL = "#c9c9c5", BODY = "#121212", CAP = "#0a0a0a";
  function labelSVG(b, p, compact) {
    var H = compact ? 104 : 190;
    var s = Math.min(b.w / 130, b.h / H);
    var tx = b.x + (b.w - 130 * s) / 2, ty = b.y + (b.h - H * s) / 2;
    var l1 = esc(p.label[0] || ""), l2 = esc(p.label[1] || ""), v = esc(p.variant || "");
    var t = 'font-family="Jost, Futura, Century Gothic, sans-serif" text-anchor="middle"';
    var g = '<g transform="translate(' + tx.toFixed(1) + " " + ty.toFixed(1) + ") scale(" + s.toFixed(3) + ')">';
    if (compact) {
      g += '<g transform="translate(25 10) scale(.2667)" fill="#111" fill-rule="evenodd">' + LOGO_PATHS + "</g>";
      g += "<text " + t + ' x="65" y="42" font-size="6.6" letter-spacing="2.6" fill="#222">BARBERS</text>';
      g += "<text " + t + ' x="65" y="60" font-size="8" letter-spacing="1.2" fill="#1a1a1a">' + l1 + " " + l2 + "</text>";
      g += '<rect x="22" y="72" width="86" height="16" fill="#111"/>';
      g += "<text " + t + ' x="65" y="83.2" font-size="7" letter-spacing="2" fill="#f2f2f0">' + v + "</text>";
    } else {
      g += '<g transform="translate(25 20) scale(.2667)" fill="#111" fill-rule="evenodd">' + LOGO_PATHS + "</g>";
      g += "<text " + t + ' x="65" y="52" font-size="7.2" letter-spacing="2.8" fill="#222">BARBERS</text>';
      g += '<rect x="53" y="61" width="24" height=".8" fill="#222"/>';
      g += "<text " + t + ' x="65" y="84" font-size="8.4" letter-spacing="1.3" fill="#1a1a1a">' + l1 + "</text>";
      g += "<text " + t + ' x="65" y="97" font-size="8.4" letter-spacing="1.3" fill="#1a1a1a">' + l2 + "</text>";
      g += '<rect x="17" y="107" width="96" height="17" fill="#111"/>';
      g += "<text " + t + ' x="65" y="118.8" font-size="7.4" letter-spacing="2.2" fill="#f2f2f0">' + v + "</text>";
      g += "<text " + t + ' x="65" y="172" font-size="6.8" letter-spacing="1.2" fill="#333">' + esc((p.size || "").split("·")[0].trim().toUpperCase()) + "</text>";
    }
    return g + "</g>";
  }
  function art(p) {
    var k = p.kind || "tall", o = "";
    var defs = '<defs><linearGradient id="sh" x1="0" x2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".22" stop-color="#fff" stop-opacity=".14"/><stop offset=".4" stop-color="#fff" stop-opacity="0"/><stop offset=".85" stop-color="#000" stop-opacity=".25"/></linearGradient><radialGradient id="fl" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#000" stop-opacity=".22"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs>';
    var shadow = '<ellipse cx="200" cy="446" rx="130" ry="14" fill="url(#fl)"/>';
    function body(x, y, w, h, r) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + r + '" fill="' + BODY + '"/>'; }
    function gloss(x, y, w, h, r) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + r + '" fill="url(#sh)"/>'; }
    function lab(x, y, w, h) { return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="' + LABEL + '"/>'; }
    if (k === "nozzle") {
      o += '<path d="M172 122 L192 50 h16 L228 122z" fill="#e9e9e7" fill-opacity=".75" stroke="#9a9a98" stroke-width="1"/><rect x="194" y="38" width="12" height="14" rx="3" fill="#111"/>';
      o += '<rect x="156" y="118" width="88" height="56" rx="6" fill="' + CAP + '"/>';
      for (var i = 0; i < 9; i++) o += '<rect x="' + (162 + i * 9.4) + '" y="124" width="2.2" height="44" fill="#222"/>';
      o += body(130, 166, 140, 280, 34) + lab(130, 222, 140, 196) + labelSVG({ x: 130, y: 222, w: 140, h: 196 }, p) + gloss(130, 166, 140, 280, 34);
    } else if (k === "jar") {
      o += body(102, 250, 196, 180, 16) + lab(102, 286, 196, 118) + labelSVG({ x: 102, y: 286, w: 196, h: 118 }, p, true) + gloss(102, 250, 196, 180, 16);
      o += '<rect x="96" y="196" width="208" height="60" rx="8" fill="' + CAP + '"/>' + gloss(96, 196, 208, 60, 8);
      for (var j = 0; j < 22; j++) o += '<rect x="' + (102 + j * 9.2) + '" y="204" width="1.6" height="44" fill="#1d1d1d"/>';
    } else if (k === "dropper") {
      o += '<ellipse cx="200" cy="130" rx="27" ry="46" fill="#1e1e1e"/><rect x="186" y="168" width="28" height="18" fill="#1e1e1e"/>';
      o += '<rect x="166" y="180" width="68" height="46" rx="6" fill="' + CAP + '"/><rect x="180" y="222" width="40" height="18" fill="' + BODY + '"/>';
      o += body(144, 236, 112, 210, 24) + lab(144, 280, 112, 150) + labelSVG({ x: 144, y: 280, w: 112, h: 150 }, p) + gloss(144, 236, 112, 210, 24);
    } else if (k === "spray") {
      o += '<rect x="150" y="104" width="26" height="10" rx="2" fill="#1c1c1c"/><rect x="172" y="92" width="56" height="52" rx="8" fill="' + CAP + '"/><rect x="168" y="140" width="64" height="40" rx="4" fill="#1a1a1a"/>';
      o += body(138, 172, 124, 274, 28) + lab(138, 224, 124, 194) + labelSVG({ x: 138, y: 224, w: 124, h: 194 }, p) + gloss(138, 172, 124, 274, 28);
    } else if (k === "box") {
      o += '<path d="M96 132 L126 112 H336 L306 132z" fill="#dededb"/><path d="M306 132 L336 112 V420 L306 442z" fill="#a8a8a5"/>';
      o += '<rect x="96" y="132" width="210" height="310" fill="' + LABEL + '"/>' + labelSVG({ x: 96, y: 150, w: 210, h: 280 }, p);
    } else {
      o += '<rect x="158" y="102" width="84" height="56" rx="12" fill="' + CAP + '"/>';
      o += body(138, 150, 124, 296, 22) + lab(138, 204, 124, 210) + labelSVG({ x: 138, y: 204, w: 124, h: 210 }, p) + gloss(138, 150, 124, 296, 22);
    }
    return '<svg viewBox="0 0 400 500" role="img" aria-label="' + esc(p.name) + '" preserveAspectRatio="xMidYMid meet">' + defs + shadow + o + "</svg>";
  }
  function media(p, idx) {
    var list = [];
    if (p.images) p.images.forEach(function (src) { list.push('<img src="' + src + '" alt="' + esc(p.name) + '" loading="lazy" decoding="async">'); });
    if (!list.length) list.push(art(p));
    return idx === undefined ? list : list[Math.min(idx, list.length - 1)];
  }
  function cardMedia(p) { return media(p, 0); }

  /* ---------- cart ---------- */
  var cart = (store(CART_KEY) || []).filter(function (l) { return byId(l.id) && l.qty > 0; });
  function saveCart() { store(CART_KEY, cart); renderCartUI(); }
  function addToCart(id, qty) {
    qty = Math.max(1, qty || 1);
    var line = cart.filter(function (l) { return l.id === id; })[0];
    if (line) line.qty = Math.min(99, line.qty + qty); else cart.push({ id: id, qty: qty });
    saveCart();
    var c = $(".cart-count"); if (c) { c.classList.remove("bump"); void c.offsetWidth; c.classList.add("bump"); }
    var p = byId(id);
    toast(esc(p.name) + " ajouté au panier", "Voir", openCart);
  }
  function setQty(id, qty) {
    cart = cart.map(function (l) { if (l.id === id) l.qty = Math.min(99, qty); return l; }).filter(function (l) { return l.qty > 0; });
    saveCart();
  }
  function count() { return cart.reduce(function (s, l) { return s + l.qty; }, 0); }
  function subtotal() { return cart.reduce(function (s, l) { return s + byId(l.id).price * l.qty; }, 0); }
  function shippingCost(opt, sub) {
    if (!opt) return 0;
    if (opt.price > 0 && CFG.freeShippingFrom && sub >= CFG.freeShippingFrom) return 0;
    return opt.price;
  }

  /* ---------- layout ---------- */
  var NAV = [["index.html", "Accueil"], ["boutique.html", "Boutique"], ["a-propos.html", "À propos"], ["contact.html", "Contact"]];
  function currentFile() { var f = location.pathname.split("/").pop(); return f || "index.html"; }
  function renderChrome() {
    var cur = currentFile();
    var navLinks = NAV.map(function (n) { return '<a href="' + n[0] + '"' + (cur === n[0] ? ' aria-current="page"' : "") + ">" + n[1] + "</a>"; }).join("");
    var header = $("#site-header");
    if (header) {
      header.className = "site-header";
      header.innerHTML = '<div class="wrap header-inner">' +
        '<button class="icon-btn menu-btn" type="button" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="mobile-menu">' + I.menu + "</button>" +
        '<a class="brand" href="index.html" aria-label="FADE — accueil">' + logo() + "</a>" +
        '<nav class="nav-desktop" aria-label="Navigation principale">' + navLinks.replace('<a href="index.html"', '<a hidden href="index.html"') + "</nav>" +
        '<button class="icon-btn cart-btn" type="button" aria-label="Ouvrir le panier">' + I.bag + '<span class="cart-count" hidden>0</span></button>' +
        "</div>";
    }
    var igUrl = "https://instagram.com/" + encodeURIComponent(CFG.instagram || "");
    var extra = document.createElement("div");
    extra.innerHTML =
      '<div class="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu">' +
        '<div class="top">' + logo("logo") + '<button class="icon-btn" type="button" data-close-menu aria-label="Fermer le menu">' + I.close + "</button></div>" +
        "<nav>" + navLinks + "</nav>" +
        '<div class="bottom"><a href="' + igUrl + '" target="_blank" rel="noopener">@' + esc(CFG.instagram) + "</a><span>Produits de coiffure professionnels</span></div>" +
      "</div>" +
      '<div class="scrim" data-close-cart></div>' +
      '<aside class="drawer" id="cart-drawer" role="dialog" aria-modal="true" aria-label="Panier" aria-hidden="true">' +
        '<div class="drawer-head"><h2>Panier</h2><button class="icon-btn" type="button" data-close-cart aria-label="Fermer le panier">' + I.close + "</button></div>" +
        '<div class="drawer-body" id="drawer-body"></div><div class="drawer-foot" id="drawer-foot"></div>' +
      "</aside>" +
      '<div class="toast" role="status" aria-live="polite"><span class="toast-msg"></span><button type="button" class="toast-act" hidden></button></div>';
    while (extra.firstChild) document.body.appendChild(extra.firstChild);

    var footer = $("#site-footer");
    if (footer) {
      footer.className = "site-footer";
      footer.innerHTML = '<div class="wrap"><div class="footer-grid">' +
        '<div class="footer-brand">' + logo() + '<p class="muted">Produits de coiffure professionnels, pensés et testés au salon par ' + esc(CFG.owner) + ".</p></div>" +
        '<div class="footer-cols">' +
          '<div class="footer-col"><b>Boutique</b>' + CATS.map(function (c) { return '<a href="boutique.html#' + c.id + '">' + c.label + "</a>"; }).join("") + "</div>" +
          '<div class="footer-col"><b>Aide</b><a href="contact.html">Contact</a><a href="contact.html#faq">FAQ</a><a href="legal.html#livraison">Livraison & retours</a></div>' +
          '<div class="footer-col"><b>Infos</b><a href="legal.html#mentions">Mentions légales</a><a href="legal.html#cgv">CGV</a><a href="legal.html#confidentialite">Confidentialité</a><a href="' + igUrl + '" target="_blank" rel="noopener">Instagram</a></div>' +
        "</div></div>" +
        '<div class="footer-bottom"><span>© ' + new Date().getFullYear() + " FADE Barbers. Tous droits réservés.</span>" +
        '<button type="button" class="theme-toggle" id="theme-toggle">Thème : auto</button></div></div>';
    }
    bindChrome();
  }
  function bindChrome() {
    var menu = $("#mobile-menu"), mbtn = $(".menu-btn");
    function setMenu(open) {
      if (!menu) return;
      menu.classList.toggle("open", open);
      if (mbtn) mbtn.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    }
    if (mbtn) mbtn.addEventListener("click", function () { setMenu(true); });
    $$("[data-close-menu]").forEach(function (b) { b.addEventListener("click", function () { setMenu(false); }); });
    $$("#mobile-menu nav a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    var cbtn = $(".cart-btn"); if (cbtn) cbtn.addEventListener("click", openCart);
    $$("[data-close-cart]").forEach(function (b) { b.addEventListener("click", closeCart); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { closeCart(); setMenu(false); } });

    var tt = $("#theme-toggle");
    if (tt) {
      var order = ["auto", "light", "dark"], names = { auto: "auto", light: "clair", dark: "sombre" };
      var curT = store(THEME_KEY) || "auto";
      tt.textContent = "Thème : " + names[curT];
      tt.addEventListener("click", function () {
        curT = order[(order.indexOf(curT) + 1) % 3];
        if (curT === "auto") { document.documentElement.removeAttribute("data-theme"); store(THEME_KEY, null); }
        else { document.documentElement.setAttribute("data-theme", curT); store(THEME_KEY, curT); }
        tt.textContent = "Thème : " + names[curT];
      });
    }
  }

  var toastTimer;
  function toast(html, actLabel, act) {
    var t = $(".toast"); if (!t) return;
    $(".toast-msg", t).innerHTML = html;
    var b = $(".toast-act", t);
    if (actLabel) { b.hidden = false; b.textContent = actLabel; b.onclick = function () { t.classList.remove("show"); act(); }; } else b.hidden = true;
    t.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.classList.remove("show"); }, 3200);
  }

  function openCart() {
    var d = $("#cart-drawer"); if (!d) return;
    d.classList.add("open"); d.setAttribute("aria-hidden", "false"); $(".scrim").classList.add("open");
    document.body.style.overflow = "hidden";
    setTimeout(function () { var c = $("[data-close-cart].icon-btn", d); if (c) c.focus(); }, 50);
  }
  function closeCart() {
    var d = $("#cart-drawer"); if (!d || !d.classList.contains("open")) return;
    d.classList.remove("open"); d.setAttribute("aria-hidden", "true"); $(".scrim").classList.remove("open");
    document.body.style.overflow = "";
  }

  function shipMeter(sub) {
    if (!CFG.freeShippingFrom) return "";
    var left = CFG.freeShippingFrom - sub, pct = Math.min(100, (sub / CFG.freeShippingFrom) * 100);
    var msg = left > 0 ? "Plus que <b>" + money(left) + "</b> pour la livraison offerte" : "<b>Livraison offerte</b> sur votre commande";
    return '<div class="ship-meter"><span>' + msg + '</span><div class="bar"><i style="width:' + pct.toFixed(0) + '%"></i></div></div>';
  }
  function qtyCtl(id, q) {
    return '<div class="qty qty--sm" data-id="' + id + '"><button type="button" data-q="-1" aria-label="Diminuer">−</button><span>' + q + '</span><button type="button" data-q="1" aria-label="Augmenter">+</button></div>';
  }
  function renderCartUI() {
    var n = count();
    $$(".cart-count").forEach(function (c) { c.textContent = n; c.hidden = n === 0; });
    var cb = $(".cart-btn"); if (cb) cb.setAttribute("aria-label", "Ouvrir le panier (" + n + " article" + (n > 1 ? "s" : "") + ")");
    var body = $("#drawer-body"), foot = $("#drawer-foot");
    if (!body) return;
    if (!cart.length) {
      body.innerHTML = '<div class="drawer-empty">' + I.bag + '<p>Votre panier est vide.</p><a class="btn btn--ghost btn--sm" href="boutique.html">Découvrir la boutique</a></div>';
      foot.innerHTML = ""; foot.hidden = true;
    } else {
      var sub = subtotal();
      body.innerHTML = shipMeter(sub) + cart.map(function (l) {
        var p = byId(l.id);
        return '<div class="line-item"><a class="li-media" href="produit-' + p.id + '.html" tabindex="-1">' + cardMedia(p) + "</a>" +
          '<div class="li-main"><div class="li-top"><a href="produit-' + p.id + '.html">' + esc(p.name) + '</a><span class="price">' + money(p.price * l.qty) + "</span></div>" +
          '<span class="li-sub">' + esc(p.size) + "</span>" +
          '<div class="li-actions">' + qtyCtl(p.id, l.qty) + '<button type="button" class="remove" data-remove="' + p.id + '">Retirer</button></div></div></div>';
      }).join("");
      foot.hidden = false;
      foot.innerHTML = '<div class="totals"><div class="grand"><span>Sous-total</span><span class="price">' + money(sub) + '</span></div></div>' +
        '<p class="note">Frais de livraison calculés à l\'étape suivante. Retrait au salon gratuit.</p>' +
        '<a class="btn btn--block" href="commande.html">Commander</a>';
    }
    bindQty(body);
    if (typeof onCartChange === "function") onCartChange();
  }
  function bindQty(root) {
    $$(".qty[data-id] button", root).forEach(function (b) {
      b.addEventListener("click", function () {
        var id = b.parentNode.getAttribute("data-id"), line = cart.filter(function (l) { return l.id === id; })[0];
        if (line) setQty(id, line.qty + parseInt(b.getAttribute("data-q"), 10));
      });
    });
    $$("[data-remove]", root).forEach(function (b) { b.addEventListener("click", function () { setQty(b.getAttribute("data-remove"), 0); }); });
  }
  var onCartChange = null;

  /* ---------- cards ---------- */
  function card(p) {
    var sz = p.size.split("·")[0].trim();
    return '<article class="card reveal"><div class="card-media-wrap"><a href="produit-' + p.id + '.html" class="card-media" aria-label="' + esc(p.name) + '">' + cardMedia(p) +
      (p.badge ? '<span class="card-badge">' + esc(p.badge) + "</span>" : "") + "</a>" +
      '<button class="card-quick" type="button" data-add="' + p.id + '" aria-label="Ajouter ' + esc(p.name) + ' au panier">' + I.plus + "</button></div>" +
      '<a href="produit-' + p.id + '.html" class="card-body"><span class="card-cat">' + esc(catLabel(p.category)) + "</span>" +
      '<span class="card-title">' + esc(p.name) + "</span>" +
      '<span class="card-meta"><span class="price">' + money(p.price) + (p.compareAt ? ' <s class="muted">' + money(p.compareAt) + "</s>" : "") + '</span><span class="card-size">' + esc(sz.length > 18 ? "" : sz) + "</span></span></a></article>";
  }
  function bindAdd(root) {
    $$("[data-add]", root).forEach(function (b) {
      b.addEventListener("click", function (e) { e.preventDefault(); addToCart(b.getAttribute("data-add"), 1); });
    });
  }
  /* ---------- pages ---------- */
  var pages = {};

  pages.home = function () {
    var g = $("#featured");
    if (g) {
      g.innerHTML = PRODUCTS.filter(function (p) { return p.featured; }).slice(0, 4).map(card).join("");
      bindAdd(g);
    }
    var cats = $("#cats");
    if (cats) cats.innerHTML = CATS.map(function (c) {
      var list = PRODUCTS.filter(function (p) { return p.category === c.id; });
      if (!list.length) return "";
      var n = list.length, img = list[0].images && list[0].images[0];
      return '<a class="cat" href="boutique.html#' + c.id + '">' + (img ? '<span class="cat-media"><img src="' + img + '" alt="" loading="lazy"></span>' : "") + '<span class="cat-body"><i>' + n + " produit" + (n > 1 ? "s" : "") + "</i><b>" + c.label + "</b><span>" + c.desc + "</span></span></a>";
    }).join("");
  };

  pages.shop = function () {
    var grid = $("#shop-grid"), chips = $("#chips"), sort = $("#sort"), countEl = $("#shop-count");
    var filter = "all";
    chips.innerHTML = '<button class="chip" type="button" data-f="all">Tout</button>' + CATS.map(function (c) { return '<button class="chip" type="button" data-f="' + c.id + '">' + c.label + "</button>"; }).join("");
    function render() {
      var list = PRODUCTS.filter(function (p) { return filter === "all" || p.category === filter; });
      var s = sort.value;
      if (s === "asc") list = list.slice().sort(function (a, b) { return a.price - b.price; });
      if (s === "desc") list = list.slice().sort(function (a, b) { return b.price - a.price; });
      if (s === "name") list = list.slice().sort(function (a, b) { return a.name.localeCompare(b.name, "fr"); });
      grid.innerHTML = list.length ? list.map(card).join("") : '<p class="empty">Aucun produit dans cette catégorie pour le moment.</p>';
      countEl.textContent = list.length + " produit" + (list.length > 1 ? "s" : "");
      $$(".chip", chips).forEach(function (c) { c.setAttribute("aria-pressed", String(c.getAttribute("data-f") === filter)); });
      bindAdd(grid);
    }
    function fromHash() {
      var h = decodeURIComponent(location.hash.slice(1));
      filter = CATS.some(function (c) { return c.id === h; }) ? h : "all";
      render();
    }
    chips.addEventListener("click", function (e) {
      var b = e.target.closest(".chip"); if (!b) return;
      filter = b.getAttribute("data-f");
      try { history.replaceState(null, "", filter === "all" ? location.pathname : "#" + filter); } catch (err) { /* ignore */ }
      render();
    });
    sort.addEventListener("change", render);
    window.addEventListener("hashchange", fromHash);
    fromHash();
  };

  pages.product = function () {
    var root = $("#pdp-root");
    function render() {
      var id = document.body.getAttribute("data-product") || decodeURIComponent(location.hash.slice(1)) || (PRODUCTS[0] && PRODUCTS[0].id);
      var p = byId(id);
      if (!p) {
        root.innerHTML = '<div class="empty" style="padding:6rem 0"><h1 style="font-size:2rem">Produit introuvable</h1><p style="margin:1rem 0 2rem">Ce produit n\'existe plus ou le lien est incomplet.</p><a class="btn" href="boutique.html">Voir la boutique</a></div>';
        return;
      }
      document.title = p.name + " — FADE";
      var md = media(p), qty = 1;
      root.innerHTML =
        '<nav class="breadcrumb" aria-label="Fil d\'Ariane"><a href="boutique.html">Boutique</a><span>/</span><a href="boutique.html#' + p.category + '">' + esc(catLabel(p.category)) + "</a><span>/</span><span>" + esc(p.name) + "</span></nav>" +
        '<div class="pdp">' +
          '<div class="gallery"><div class="gallery-main" id="g-main">' + md[0] + "</div>" +
            (md.length > 1 ? '<div class="thumbs">' + md.map(function (m, i) { return '<button class="thumb" type="button" data-i="' + i + '" aria-pressed="' + (i === 0) + '" aria-label="Visuel ' + (i + 1) + '">' + m + "</button>"; }).join("") + "</div>" : "") +
          "</div>" +
          '<div class="pdp-info">' +
            '<span class="eyebrow">' + esc(catLabel(p.category)) + " · " + esc(p.size) + "</span>" +
            "<h1>" + esc(p.name) + "</h1>" +
            (p.variant ? '<span class="pdp-variant">' + esc(p.variant) + "</span>" : "") +
            '<div class="pdp-price price">' + money(p.price) + (p.compareAt ? ' <s class="muted" style="font-size:.7em">' + money(p.compareAt) + "</s>" : "") + "</div>" +
            '<p class="lead">' + esc(p.desc) + "</p>" +
            '<div class="pdp-claims">' + (p.claims || []).map(function (c) { return "<span>" + esc(c) + "</span>"; }).join("") + "</div>" +
            '<div class="buy-row" id="buy-row"><div class="qty" aria-label="Quantité"><button type="button" id="q-minus" aria-label="Diminuer">−</button><output id="q-val" aria-live="polite">1</output><button type="button" id="q-plus" aria-label="Augmenter">+</button></div>' +
            '<button class="btn" type="button" id="add-btn">Ajouter au panier</button></div>' +
            '<span class="stock">En stock · expédié sous 48 h ou disponible au salon</span>' +
            "<div>" +
              '<details class="acc" open><summary>Utilisation</summary><div class="acc-body"><ul>' + (p.usage || []).map(function (u) { return "<li>" + esc(u) + "</li>"; }).join("") + "</ul></div></details>" +
              '<details class="acc"><summary>Informations</summary><div class="acc-body"><p>' + esc(p.info || "") + "</p></div></details>" +
              '<details class="acc"><summary>Livraison & retrait</summary><div class="acc-body"><p>Retrait gratuit au salon ' + esc(CFG.owner) + ". Livraison à domicile " + money((CFG.shipping[1] || {}).price || 0) + (CFG.freeShippingFrom ? ", offerte dès " + money(CFG.freeShippingFrom) : "") + '. <a href="legal.html#livraison">En savoir plus</a></p></div></details>' +
            "</div>" +
          "</div>" +
        "</div>" +
        '<section class="section" style="padding-top:2rem"><div class="section-head"><div><span class="eyebrow">À associer</span><h2>Vous aimerez aussi</h2></div></div><div class="grid grid--4" id="related"></div></section>';

      var sticky = $("#sticky-buy");
      if (!sticky) { sticky = document.createElement("div"); sticky.id = "sticky-buy"; sticky.className = "sticky-buy"; document.body.appendChild(sticky); }
      sticky.innerHTML = '<div class="sb-info"><b>' + esc(p.name) + '</b><span class="price muted">' + money(p.price) + '</span></div><button class="btn btn--sm" type="button" id="sb-add">Ajouter</button>';

      function setQ(v) { qty = Math.max(1, Math.min(99, v)); $("#q-val").textContent = qty; }
      $("#q-minus").onclick = function () { setQ(qty - 1); };
      $("#q-plus").onclick = function () { setQ(qty + 1); };
      $("#add-btn").onclick = function () { addToCart(p.id, qty); setQ(1); };
      $("#sb-add").onclick = function () { addToCart(p.id, 1); };
      $$(".thumb", root).forEach(function (t) {
        t.addEventListener("click", function () {
          $("#g-main").innerHTML = md[+t.getAttribute("data-i")];
          $$(".thumb", root).forEach(function (x) { x.setAttribute("aria-pressed", String(x === t)); });
        });
      });
      var rel = PRODUCTS.filter(function (x) { return x.id !== p.id && (x.category === p.category || x.featured); }).slice(0, 4);
      var rg = $("#related"); rg.innerHTML = rel.map(card).join(""); bindAdd(rg);

      if ("IntersectionObserver" in window) {
        var io = new IntersectionObserver(function (en) { sticky.classList.toggle("show", !en[0].isIntersecting && en[0].boundingClientRect.top < 0); });
        io.observe($("#buy-row"));
      }
      window.scrollTo(0, 0);
    }
    window.addEventListener("hashchange", render);
    render();
  };

  pages.checkout = function () {
    var form = $("#checkout-form"), sumEl = $("#summary"), wrap = $("#checkout-wrap"), done = $("#confirm");
    var shipOpts = $("#ship-options"), payOpts = $("#pay-options"), addr = $("#address-fields");
    shipOpts.innerHTML = CFG.shipping.map(function (s, i) {
      return '<label class="option"><input type="radio" name="shipping" value="' + s.id + '"' + (i === 0 ? " checked" : "") + '><span><b>' + esc(s.label) + "</b><small>" + esc(s.desc) + '</small></span><span class="price" data-ship-price="' + s.id + '"></span></label>';
    }).join("");
    payOpts.innerHTML = CFG.payment.map(function (s, i) {
      return '<label class="option" data-online="' + (s.online ? 1 : "") + '" data-only="' + (s.only || "") + '"><input type="radio" name="payment" value="' + s.id + '"' + (i === 0 ? " checked" : "") + '><span><b>' + esc(s.label) + "</b><small>" + esc(s.desc) + "</small></span><span></span></label>";
    }).join("");

    function selShip() { var v = (form.querySelector('input[name="shipping"]:checked') || {}).value; return CFG.shipping.filter(function (s) { return s.id === v; })[0] || CFG.shipping[0]; }
    function selPay() { var v = (form.querySelector('input[name="payment"]:checked') || {}).value; return CFG.payment.filter(function (s) { return s.id === v; })[0] || CFG.payment[0]; }

    function renderSummary() {
      if (!cart.length && done.hidden) {
        wrap.innerHTML = '<div class="drawer-empty" style="padding:5rem 0">' + I.bag + '<h1 style="font-size:2rem">Votre panier est vide</h1><p class="muted">Ajoutez des produits pour passer commande.</p><a class="btn" href="boutique.html">Voir la boutique</a></div>';
        return;
      }
      if (!cart.length) return;
      var sub = subtotal(), sh = selShip(), shc = shippingCost(sh, sub);
      CFG.shipping.forEach(function (s) { var el = form.querySelector('[data-ship-price="' + s.id + '"]'); if (el) el.textContent = shippingCost(s, sub) === 0 ? "Offert" : money(shippingCost(s, sub)); });
      var needAddr = !!sh.needsAddress;
      $$(".option[data-only]", payOpts).forEach(function (o) {
        var only = o.getAttribute("data-only"), inp = $("input", o);
        var off = (!!only && only !== sh.id) || (!!o.getAttribute("data-online") && !payReady);
        o.hidden = off; inp.disabled = off; if (off && inp.checked) inp.checked = false;
      });
      if (!payOpts.querySelector("input:checked")) { var first = payOpts.querySelector("input:not([disabled])"); if (first) first.checked = true; }
      addr.hidden = !needAddr;
      $$("input", addr).forEach(function (i) { if (i.hasAttribute("data-req")) i.required = needAddr; });
      sumEl.innerHTML = "<h2>Récapitulatif</h2>" + cart.map(function (l) {
        var p = byId(l.id);
        return '<div class="sum-item"><span class="li-media">' + cardMedia(p) + '<span class="q">' + l.qty + "</span></span><span><b>" + esc(p.name) + '</b><span class="li-sub">' + esc(p.size) + '</span></span><span class="price">' + money(p.price * l.qty) + "</span></div>";
      }).join("") + shipMeter(sub) +
        '<div class="totals"><div><span>Sous-total</span><span class="price">' + money(sub) + "</span></div><div><span>" + esc(sh.label) + '</span><span class="price">' + (shc === 0 ? "Offert" : money(shc)) + '</span></div><div class="grand"><span>Total</span><span class="price">' + money(sub + shc) + "</span></div></div>" +
        '<a href="boutique.html" class="note" style="text-decoration:underline">Continuer mes achats</a>';
    }
    var payReady = false;
    onCartChange = renderSummary;
    form.addEventListener("change", renderSummary);
    renderSummary();
    if (!cart.length) return;

    // Paiement en ligne disponible ? (fonction serveur + clé Stripe configurées)
    if (CFG.onlinePayment && window.fetch) {
      fetch("/api/status", { headers: { Accept: "application/json" } })
        .then(function (r) { return r.ok ? r.json() : { payments: false }; })
        .then(function (s) {
          payReady = !!s.payments;
          if (payReady) { var on = payOpts.querySelector('.option[data-online="1"] input'); if (on) { on.disabled = false; on.checked = true; } }
          renderSummary();
        })
        .catch(function () { /* hébergement statique : commande par message */ });
    }
    if (/[?&]annule=1/.test(location.search)) payMsg("Paiement annulé. Votre panier est conservé, vous pouvez réessayer.", true);

    function payMsg(t, err) { var el = $("#pay-status"); if (!el) return; el.hidden = !t; el.className = "status-line" + (err ? " err" : ""); el.textContent = t || ""; }

    // restore draft
    var draft = store("fade_checkout_draft") || {};
    ["name", "phone", "email", "street", "zip", "city", "note"].forEach(function (k) { var el = form.elements[k]; if (el && draft[k]) el.value = draft[k]; });
    form.addEventListener("input", function () {
      var d = {}; ["name", "phone", "email", "street", "zip", "city", "note"].forEach(function (k) { var el = form.elements[k]; if (el) d[k] = el.value; });
      store("fade_checkout_draft", d);
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var sub = subtotal(), sh = selShip(), pay = selPay(), shc = shippingCost(sh, sub);
      var d = new Date(), pad = function (n) { return (n < 10 ? "0" : "") + n; };
      var no = "FADE-" + String(d.getFullYear()).slice(2) + pad(d.getMonth() + 1) + pad(d.getDate()) + "-" + Math.random().toString(36).slice(2, 6).toUpperCase();
      var f = form.elements;
      var order = {
        number: no, date: d.toISOString(),
        items: cart.map(function (l) { var p = byId(l.id); return { id: p.id, name: p.name, qty: l.qty, unit: p.price, total: +(p.price * l.qty).toFixed(2) }; }),
        subtotal: +sub.toFixed(2), shipping: { method: sh.label, cost: shc }, payment: pay.label, total: +(sub + shc).toFixed(2),
        customer: { name: f.name.value.trim(), phone: f.phone.value.trim(), email: f.email.value.trim(), street: sh.needsAddress ? f.street.value.trim() : "", zip: sh.needsAddress ? f.zip.value.trim() : "", city: sh.needsAddress ? f.city.value.trim() : "", note: f.note.value.trim() }
      };
      var lines = [
        "Bonjour, voici ma commande FADE :", "",
        "Commande " + no
      ].concat(order.items.map(function (it) { return "• " + it.name + " × " + it.qty + " — " + money(it.total); })).concat([
        "",
        "Sous-total : " + money(order.subtotal),
        "Livraison : " + sh.label + " — " + (shc === 0 ? "offert" : money(shc)),
        "TOTAL : " + money(order.total),
        "Paiement : " + pay.label,
        "",
        "Nom : " + order.customer.name,
        "Téléphone : " + order.customer.phone,
        order.customer.email ? "E-mail : " + order.customer.email : null,
        sh.needsAddress ? "Adresse : " + order.customer.street + ", " + order.customer.zip + " " + order.customer.city : null,
        order.customer.note ? "Note : " + order.customer.note : null
      ]).filter(function (x) { return x !== null; });
      order.text = lines.join("\n");
      store(ORDER_KEY, order);

      if (pay.online && payReady) {
        var btn = form.querySelector('button[type="submit"]'), label = btn.textContent;
        btn.disabled = true; btn.textContent = "Redirection vers le paiement sécurisé…"; payMsg("");
        fetch("/api/checkout", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ orderNo: no, items: cart.map(function (l) { return { id: l.id, qty: l.qty }; }), shipping: sh.id, customer: order.customer })
        })
          .then(function (r) { return r.json().then(function (j) { if (!r.ok || !j.url) throw new Error(j.error || "Erreur de paiement"); return j; }); })
          .then(function (j) { location.href = j.url; })
          .catch(function (err) {
            btn.disabled = false; btn.textContent = label;
            payMsg(err.message + " Vous pouvez réessayer ou choisir un autre mode de paiement.", true);
          });
        return;
      }

      showConfirm(order);
      cart = []; saveCart(); store("fade_checkout_draft", null);
    });

    var last = null;
    function showConfirm(order) {
      last = order;
      wrap.hidden = true; done.hidden = false;
      $("#order-no").textContent = order.number;
      $("#order-total").textContent = money(order.total);
      $("#recap").value = order.text;
      var txt = encodeURIComponent(order.text);
      var btns = [];
      if (CFG.whatsapp) btns.push('<a class="btn" target="_blank" rel="noopener" href="https://wa.me/' + encodeURIComponent(CFG.whatsapp) + "?text=" + txt + '">' + I.wa + " Envoyer sur WhatsApp</a>");
      if (CFG.instagram) btns.push('<a class="btn' + (btns.length ? " btn--ghost" : "") + '" target="_blank" rel="noopener" data-ig href="https://ig.me/m/' + encodeURIComponent(CFG.instagram) + '">' + I.ig + " Envoyer sur Instagram</a>");
      if (CFG.email) btns.push('<a class="btn btn--ghost" href="mailto:' + esc(CFG.email) + "?subject=" + encodeURIComponent("Commande " + order.number) + "&body=" + txt + '">' + I.mail + " Envoyer par e-mail</a>");
      btns.push('<button class="btn btn--ghost" type="button" id="copy-recap">' + I.copy + " Copier le récapitulatif</button>");
      $("#send-grid").innerHTML = btns.join("");
      $("#ig-hint").hidden = !CFG.instagram;
      var igB = $("[data-ig]");
      if (igB) igB.addEventListener("click", function () { copyText(order.text, true); });
      $("#copy-recap").addEventListener("click", function () { copyText(order.text); });
      window.scrollTo(0, 0);

      if (CFG.formEndpoint) {
        var st = $("#form-status"); st.hidden = false; st.className = "status-line"; st.textContent = "Transmission de la commande…";
        fetch(CFG.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ _subject: "Nouvelle commande " + order.number, commande: order.number, total: money(order.total), message: order.text, email: order.customer.email || undefined }) })
          .then(function (r) { if (!r.ok) throw new Error(r.status); st.className = "status-line ok"; st.textContent = "Commande transmise à la boutique. Vous serez recontacté pour confirmation."; })
          .catch(function () { st.className = "status-line err"; st.textContent = "La transmission automatique a échoué. Envoyez-nous le récapitulatif avec un des boutons ci-dessus."; });
      }
    }
    function copyText(t, silent) {
      function fallback() { var r = $("#recap"); r.focus(); r.select(); toast("Récapitulatif sélectionné : copiez-le puis collez-le dans le message"); }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(t).then(function () { toast(silent ? "Récapitulatif copié : collez-le dans la conversation Instagram" : "Récapitulatif copié"); }, fallback);
      } else fallback();
    }
  };

  pages.thanks = function () {
    var root = $("#thanks-root"), id = (location.search.match(/[?&]session_id=([^&]+)/) || [])[1];
    function fail(msg) {
      root.innerHTML = '<span class="eyebrow">Commande</span><h1>Vérification impossible</h1><p class="lead">' + esc(msg) + '</p><a class="btn" href="contact.html">Nous contacter</a>';
    }
    if (!id) return fail("Aucune commande à afficher. Si vous venez de payer, vous avez reçu un reçu par e-mail.");
    fetch("/api/order?session_id=" + encodeURIComponent(id), { headers: { Accept: "application/json" } })
      .then(function (r) { return r.json(); })
      .then(function (o) {
        if (o.error) return fail(o.error);
        if (o.paid) { cart = []; saveCart(); store("fade_checkout_draft", null); }
        var retrait = o.delivery === "retrait";
        root.innerHTML =
          '<div class="confirm-badge">' + I.check + "</div>" +
          '<span class="eyebrow">' + (o.paid ? "Paiement confirmé" : "Paiement en attente") + "</span>" +
          "<h1>" + (o.paid ? "Merci" + (o.name ? " " + esc(o.name.split(" ")[0]) : "") + ", c'est validé." : "Commande en cours de traitement") + "</h1>" +
          '<p class="lead">Commande <span class="order-no">' + esc(o.order || "") + "</span>. " +
          (o.paid ? "Un reçu a été envoyé à " + esc(o.email || "votre adresse e-mail") + ". " + (retrait ? "Nous vous contactons très vite pour fixer le créneau de retrait au salon." : "Votre colis part sous 48 h ouvrées, vous recevrez le suivi par e-mail.") : "Nous vous confirmerons la commande dès réception du paiement.") + "</p>" +
          '<div class="summary">' + o.items.map(function (it) {
            return '<div class="totals"><div><span>' + esc(it.name) + " × " + it.qty + '</span><span class="price">' + money(it.total) + "</span></div></div>";
          }).join("") +
          '<div class="totals"><div><span>Livraison</span><span class="price">' + (o.shipping ? money(o.shipping) : "Offert") + '</span></div><div class="grand"><span>Total payé</span><span class="price">' + money(o.total) + "</span></div></div></div>" +
          '<div><a class="btn" href="boutique.html">Retour à la boutique</a></div>';
      })
      .catch(function () { fail("Connexion impossible. Votre paiement reste valable : vérifiez le reçu reçu par e-mail."); });
  };

  /* ---------- boot ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    renderChrome();
    renderCartUI();
    var page = document.body.getAttribute("data-page");
    if (pages[page]) pages[page]();
    $$("[data-cfg]").forEach(function (el) {
      var k = el.getAttribute("data-cfg");
      if (k === "instagram") { el.textContent = "@" + CFG.instagram; if (el.tagName === "A") el.href = "https://instagram.com/" + encodeURIComponent(CFG.instagram); }
      else if (k === "owner") el.textContent = CFG.owner;
      else if (CFG.legal && CFG.legal[k]) el.textContent = CFG.legal[k];
    });
    $$("[data-show-if]").forEach(function (el) { if (!CFG[el.getAttribute("data-show-if")]) el.hidden = true; });
    $$("[data-cfg-link]").forEach(function (el) {
      var k = el.getAttribute("data-cfg-link"), v = CFG[k];
      if (!v) return;
      var span = el.querySelector("[data-val]");
      if (k === "whatsapp") { el.href = "https://wa.me/" + v; if (span) span.textContent = "+" + v; }
      if (k === "email") { el.href = "mailto:" + v; if (span) span.textContent = v; }
    });
  });

  window.FADE = { addToCart: addToCart, openCart: openCart, art: art };
})();
