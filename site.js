// ===== EDIT ONLY THIS BLOCK =====
const RIGLY = {
  supportEmail: "luis@hellomdlabs.com",
  // Paste Stripe Payment Link URLs here after Stripe is set up (Phase 4)
  links: {
    tripod: "https://buy.stripe.com/7sYbIT7dJ3ma37w9yB5ZC02",
    light: "https://buy.stripe.com/9B6dR1eGb2i637w6mp5ZC03"
  },
  // Confirm against real CJ cost before publishing
  prices: {
    tripod: "$24.99",
    light: "$19.99"
  }
};
// ===== END EDIT BLOCK =====

document.querySelectorAll("[data-email]").forEach(el => {
  el.textContent = RIGLY.supportEmail;
  el.href = "mailto:" + RIGLY.supportEmail;
});
document.querySelectorAll("[data-buy]").forEach(el => {
  const key = el.dataset.buy;
  el.href = RIGLY.links[key] || "#";
  if (!RIGLY.links[key] || RIGLY.links[key] === "#") {
    el.addEventListener("click", e => { e.preventDefault(); alert("Checkout is not live yet."); });
  }
});
document.querySelectorAll("[data-price]").forEach(el => {
  el.textContent = RIGLY.prices[el.dataset.price];
});
