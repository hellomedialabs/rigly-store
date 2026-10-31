// ===== EDIT ONLY THIS BLOCK =====
const RIGLY = {
  // Paste a Formspree (or similar) form endpoint URL here to enable the contact form
  contactForm: "",
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

const form = document.getElementById("contact-form");
if (form) {
  if (RIGLY.contactForm) { form.action = RIGLY.contactForm; form.hidden = false; }
  else { document.getElementById("form-pending").hidden = false; }
}
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
