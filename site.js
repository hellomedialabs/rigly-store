// ===== EDIT ONLY THIS BLOCK =====
const RIGLY = {
  // Web3Forms public access key (safe to publish)
  contactKey: "4473c871-a0b8-4d91-99d3-b998170749c2",
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
  const status = document.getElementById("form-status");
  form.addEventListener("submit", async e => {
    e.preventDefault();
    const data = new FormData(form);
    data.append("access_key", RIGLY.contactKey);
    data.append("subject", "Rigly store message");
    status.textContent = "Sending...";
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json();
      if (json.success) { status.textContent = "Thanks! We will reply within 2 business days."; form.reset(); }
      else { status.textContent = "Sorry, something went wrong. Please try again later."; }
    } catch (err) {
      status.textContent = "Sorry, something went wrong. Please try again later.";
    }
  });
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
