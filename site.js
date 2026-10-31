// ===== EDIT ONLY THIS BLOCK =====
const RIGLY = {
  // Web3Forms public access key (safe to publish)
  contactKey: "4473c871-a0b8-4d91-99d3-b998170749c2",
  links: {
    tripod: "https://buy.stripe.com/aFaaEPapV2i6eQe9yB5ZC05",
    light: "https://buy.stripe.com/8x26ozbtZ7CqfUi2695ZC06",
    facetrack: "https://buy.stripe.com/4gM00beGb5ui4bA8ux5ZC07",
    powerbank: "https://buy.stripe.com/bJeeV569F1e223sbGJ5ZC08",
    micusbc: "https://buy.stripe.com/aFa7sDfKf7CqcI6h135ZC09",
    miclightning: "https://buy.stripe.com/14A5kv7dJe0O37wcKN5ZC0a",
    ringlight: "https://buy.stripe.com/00w7sD2Xt7Cq0ZoeSV5ZC0d",
    gimbal: "https://buy.stripe.com/28E7sDgOj7Cq0ZoeSV5ZC0c"
  },
  // Landed cost on CJ (product + US shipping): Magnetic Light $14.49, Tripod Stick $11.94, Face-Tracking $23.29,
  // Power Bank $16.58, Mic $13.98, Ring Light $10.67, Folding Gimbal $48.68
  prices: {
    tripod: "24.99",
    light: "29.99",
    facetrack: "44.99",
    powerbank: "34.99",
    micusbc: "29.99",
    miclightning: "29.99",
    ringlight: "19.99",
    gimbal: "79.99"
  }
};
// ===== END EDIT BLOCK =====

(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Buy links and prices
  document.querySelectorAll("[data-buy]").forEach(function (el) {
    var url = RIGLY.links[el.dataset.buy];
    if (url) { el.href = url; el.rel = "noopener"; }
  });
  document.querySelectorAll("[data-price]").forEach(function (el) {
    el.textContent = RIGLY.prices[el.dataset.price];
  });

  // Contact form
  var form = document.getElementById("contact-form");
  if (form) {
    var status = document.getElementById("form-status");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = new FormData(form);
      data.append("access_key", RIGLY.contactKey);
      data.append("subject", "Rigly store message");
      status.textContent = "Sending...";
      fetch("https://api.web3forms.com/submit", { method: "POST", body: data })
        .then(function (r) { return r.json(); })
        .then(function (j) {
          if (j.success) { status.textContent = "Thanks! We will reply within 2 business days."; form.reset(); }
          else { status.textContent = "Sorry, something went wrong. Please try again later."; }
        })
        .catch(function () { status.textContent = "Sorry, something went wrong. Please try again later."; });
    });
  }

  // Scroll reveal: like Apple's scroll groups, fire once an element's top passes 70% of the viewport
  var rv = document.querySelectorAll(".rv");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting || en.boundingClientRect.top < 0) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -30% 0px", threshold: 0 });
    rv.forEach(function (el) { io.observe(el); });
  } else {
    rv.forEach(function (el) { el.classList.add("in"); });
  }

  // Scroll-scrubbed product images (scale and rise as they enter), plus sticky local nav
  var wraps = document.querySelectorAll(".shot-wrap");
  var tiles = document.querySelectorAll("#magnetic-light, #tripod-stick");
  var lnav = document.getElementById("lnav");
  var ltitle = document.getElementById("ltitle");
  var lprice = document.getElementById("lprice");
  var lbuy = document.getElementById("lbuy");
  var names = { "magnetic-light": ["Rigly Magnetic Light", "light"], "tripod-stick": ["Rigly Tripod Stick", "tripod"] };
  var current = "";
  var ticking = false;

  function frame() {
    ticking = false;
    var vh = window.innerHeight;
    if (!reduce) {
      wraps.forEach(function (w) {
        var r = w.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        var p = Math.min(1, Math.max(0, (vh * 0.95 - r.top) / (vh * 0.55)));
        w.style.setProperty("--p", p.toFixed(3));
      });
    }
    if (lnav) {
      var first = document.querySelector(".hero .cta");
      var pastHero = first && first.getBoundingClientRect().bottom < 44;
      var lastEnd = tiles.length ? tiles[tiles.length - 1].getBoundingClientRect().bottom : 0;
      lnav.classList.toggle("show", !!pastHero && lastEnd > 140);
      var active = "";
      tiles.forEach(function (t) {
        var r = t.getBoundingClientRect();
        if (r.top < vh * 0.5 && r.bottom > vh * 0.3) active = t.id;
      });
      if (active && active !== current && names[active]) {
        current = active;
        var n = names[active];
        ltitle.textContent = n[0];
        lprice.textContent = "$" + RIGLY.prices[n[1]];
        lbuy.href = RIGLY.links[n[1]];
      }
    }
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  frame();

  // Liquid Glass: specular highlight follows the pointer
  if (!reduce && window.matchMedia("(hover: hover)").matches) {
    var glass = document.querySelectorAll(".glass");
    window.addEventListener("pointermove", function (e) {
      glass.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        el.style.setProperty("--mx", (e.clientX - r.left) + "px");
        el.style.setProperty("--my", (e.clientY - r.top) + "px");
      });
    }, { passive: true });
  }
})();
