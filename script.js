let reviews = [];
let xp = 0;

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
  loadReviews();
  setInterval(() => addXp(1), 2000);
});

/* MENU */
function openSection(id) {
  document.querySelectorAll(".card").forEach(c => c.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  addXp(2);
}

/* REVIEWS (GLOBAL SYSTEM - SIMPLE API) */
async function loadReviews() {
  try {
    const res = await fetch("https://YOUR_API_URL/reviews");
    reviews = await res.json();
  } catch {
    reviews = [];
  }
  renderReviews();
}

function renderReviews() {
  const box = document.getElementById("reviewList");

  if (!box) return;

  box.innerHTML = reviews.map(r => `
    <div class="mc-item">
      ⭐ ${"★".repeat(r.stars)}${"☆".repeat(5 - r.stars)}<br>
      ${escapeHtml(r.text)}
    </div>
  `).join("");
}

async function addReview() {
  const stars = +document.getElementById("stars").value;
  const text = document.getElementById("reviewText").value.trim();

  if (!text) return;

  await fetch("https://YOUR_API_URL/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stars, text, time: Date.now() })
  });

  document.getElementById("reviewText").value = "";
  loadReviews();
  addXp(5);
}

/* ORDER */
async function sendOrder() {
  const data = {
    item: item.value,
    amount: amount.value,
    discord: discord.value,
    mc: mc.value,
    deadline: deadline.value
  };

  document.getElementById("orderStatus").innerText =
    "Din beställning måste godkännas av Abbe eller Theo.";

  await fetch("/api/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  addXp(10);
}

/* XP */
function addXp(amount) {
  xp += amount;

  const level = Math.floor(xp / 20);
  const bar = document.getElementById("xpbar");

  if (bar) {
    bar.style.width = (xp % 20) * 5 + "%";
    bar.innerText = "Level " + level;
  }
}

/* SAFE TEXT */
function escapeHtml(str) {
  return str.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
