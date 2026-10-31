// ===== EDIT ONLY THIS BLOCK =====
const RIGLY = {
  // Web3Forms public access key (safe to publish)
  contactKey: "4473c871-a0b8-4d91-99d3-b998170749c2",
  // Stripe Payment Links, one per product
  links: {
    light: "https://buy.stripe.com/00w7sD41x4qeazYcKN5ZC0l",
    tripod: "https://buy.stripe.com/4gM6ozbtZg8W5fE9yB5ZC0m",
    facetrack: "https://buy.stripe.com/6oUcMX8hN8Gu8rQbGJ5ZC0n",
    powerbank: "https://buy.stripe.com/00w00b41xe0O8rQaCF5ZC0o",
    micusbc: "https://buy.stripe.com/fZu5kv69F09Y4bAh135ZC0p",
    miclightning: "https://buy.stripe.com/14A7sDdC77Cq23s1255ZC0q",
    ringlight: "https://buy.stripe.com/6oU4gr2Xt5ui6jI5il5ZC0r"
  },
  // Display prices (must match the Stripe links above)
  prices: {
    light: "22.99",
    tripod: "22.99",
    facetrack: "29.99",
    powerbank: "24.99",
    micusbc: "24.99",
    miclightning: "24.99",
    ringlight: "17.99"
  }
};
// ===== END EDIT BLOCK =====

(function () {
  "use strict";
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Buy links and prices
  document.querySelectorAll("[data-buy]").forEach(function (el) {
    var url = RIGLY.links[el.dataset.buy];
    if (url) { el.href = url; el.rel = "noopener"; }
  });
  document.querySelectorAll("[data-price]").forEach(function (el) {
    el.textContent = RIGLY.prices[el.dataset.price];
  });

  // Contact form (Web3Forms)
  var form = document.getElementById("contact-form");
  if (form) {
    var status = document.getElementById("form-status");
    var fail = "Sorry, something went wrong. Please try again later.";
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
          else { status.textContent = fail; }
        })
        .catch(function () { status.textContent = fail; });
    });
  }

  // Scroll reveal: fire once an element passes 70% of the viewport (like Apple's scroll groups)
  var revealed = document.querySelectorAll(".rv");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting || en.boundingClientRect.top < 0) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: "0px 0px -30% 0px", threshold: 0 });
    revealed.forEach(function (el) { io.observe(el); });
  } else {
    revealed.forEach(function (el) { el.classList.add("in"); });
  }

  // Scroll-scrubbed product images: scale and rise as they enter the viewport
  var wraps = document.querySelectorAll(".shot-wrap");
  var ticking = false;
  function scrub() {
    ticking = false;
    var vh = window.innerHeight;
    wraps.forEach(function (w) {
      var r = w.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      var p = Math.min(1, Math.max(0, (vh * 0.95 - r.top) / (vh * 0.55)));
      w.style.setProperty("--p", p.toFixed(3));
    });
  }
  if (!reduceMotion && wraps.length) {
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; requestAnimationFrame(scrub); }
    }, { passive: true });
    window.addEventListener("resize", scrub, { passive: true });
    scrub();
  }

  // Liquid Glass: the specular highlight follows the pointer
  if (!reduceMotion && window.matchMedia("(hover: hover)").matches) {
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
