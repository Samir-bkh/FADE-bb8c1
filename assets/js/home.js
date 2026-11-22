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
  tl.from(".xh-logo .xl", { yPercent: 120, opacity: 0, duration: 1.3, stagger: .09 })
    .from(".xh .xa", { y: 28, opacity: 0, duration: 1, stagger: .08 }, "-=0.9")
    .from(".xh-disc", { scale: .6, opacity: 0, duration: 1.6 }, 0.2)
    .from(".xh-bottle", { y: 120, opacity: 0, duration: 1.6 }, 0.45)
    .from(".xh-air", { x: -80, opacity: 0, duration: 1.6 }, 0.65)
    .from(".xh-chip", { scale: .6, opacity: 0, duration: .9, stagger: .15, ease: "back.out(2)" }, 1.1);

  /* Parallaxe du hero */
  gsap.to(".xh-stage", { yPercent: 12, ease: "none", scrollTrigger: { trigger: ".xh", start: "top top", end: "bottom top", scrub: true } });
  gsap.to(".xh-copy", { yPercent: -10, opacity: .25, ease: "none", scrollTrigger: { trigger: ".xh", start: "top top", end: "bottom top", scrub: true } });

  /* Sections produit : épinglées sur grand écran, arguments un par un */
  var mm = gsap.matchMedia();
  mm.add("(min-width: 960px)", function () {
    gsap.utils.toArray(".xs").forEach(function (sec) {
      var pts = sec.querySelectorAll(".xs-points li");
      var img = sec.querySelector(".xs-media img");
      var t = gsap.timeline({ scrollTrigger: { trigger: sec, start: "top top", end: "+=" + (pts.length * 40) + "%", pin: sec.querySelector(".xs-pin"), scrub: .6 } });
      t.from(img, { scale: .7, rotate: -6, opacity: 0, duration: 1 })
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
