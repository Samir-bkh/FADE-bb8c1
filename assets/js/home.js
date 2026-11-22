/* FADE — animations de l'accueil (GSAP + ScrollTrigger). La page reste complète sans ce fichier. */
(function () {
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Cartes produit : inclinaison 3D au survol (souris uniquement) */
  if (!reduce && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.addEventListener("pointermove", function (e) {
      var el = e.target.closest ? e.target.closest(".card-media") : null;
      document.querySelectorAll(".card-media.is-tilt").forEach(function (c) {
        if (c !== el) { c.classList.remove("is-tilt"); c.style.transform = ""; }
      });
      if (!el) return;
      var r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.classList.add("is-tilt");
      el.style.transform = "rotateY(" + ((x - .5) * 10).toFixed(2) + "deg) rotateX(" + ((.5 - y) * 10).toFixed(2) + "deg)";
      el.style.setProperty("--gx", (x * 100).toFixed(1) + "%");
      el.style.setProperty("--gy", (y * 100).toFixed(1) + "%");
    }, { passive: true });
  }

  if (reduce || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  /* Ouverture : lettres FADE, textes, scène produit */
  var tl = gsap.timeline({ defaults: { ease: "expo.out" } });
  tl.from(".xh .xa", { y: 40, opacity: 0, duration: 1.2, stagger: .1 })
    .from(".xh-bento .xt", { y: 80, opacity: 0, duration: 1.3, stagger: .1 }, 0.25)
    .from(".xh-bento .xt img", { scale: 1.15, duration: 1.8 }, 0.25)
    .from(".xh-word path", { yPercent: 110, duration: 1.4, stagger: .08 }, 0.5);

  /* Grand logo : glisse au défilement */
  gsap.to(".xh-word svg", { xPercent: -6, ease: "none", scrollTrigger: { trigger: ".xh-word", start: "top bottom", end: "bottom top", scrub: true } });
  gsap.to(".xh-bento .xt--hero img", { yPercent: -6, ease: "none", scrollTrigger: { trigger: ".xh", start: "top top", end: "bottom top", scrub: true } });

  /* Sections produit : épinglées sur grand écran, arguments un par un */
  var mm = gsap.matchMedia();
  mm.add("(min-width: 960px)", function () {
    gsap.utils.toArray(".xs").forEach(function (sec) {
      var pts = sec.querySelectorAll(".xs-points li");
      var img = sec.querySelector(".xs-media img");
      var t = gsap.timeline({ scrollTrigger: { trigger: sec, start: "top top", end: "+=" + (pts.length * 40) + "%", pin: sec.querySelector(".xs-pin"), scrub: .6 } });
      t.from(sec.querySelector(".xs-media"), { y: 80, scale: .9, opacity: 0, duration: 1 })
       .from(sec.querySelector(".xs-head"), { x: -60, opacity: 0, duration: .8 }, 0)
       .from(pts, { x: 60, opacity: 0, duration: .6, stagger: .5 }, .4)
       .to(img, { scale: 1.05, duration: 1 }, ">");
    });
  });
  mm.add("(max-width: 959px)", function () {
    gsap.utils.toArray(".xs").forEach(function (sec) {
      gsap.from(sec.querySelectorAll(".xs-head, .xs-media, .xs-points li"), { y: 40, opacity: 0, duration: .9, stagger: .1, ease: "expo.out", scrollTrigger: { trigger: sec, start: "top 75%" } });
    });
  });

  /* Apparition douce des autres sections */
  gsap.utils.toArray(".section .section-head, .story, .steps .step").forEach(function (el) {
    gsap.from(el, { y: 50, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 85%" } });
  });

  /* Les grilles sont remplies par app.js : recalculer les positions une fois tout chargé */
  window.addEventListener("load", function () { ScrollTrigger.refresh(); });
})();
