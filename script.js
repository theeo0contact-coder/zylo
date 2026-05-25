let reviews = [];
let xp = 0;

/* =========================
   INIT
========================= */
document.addEventListener("DOMContentLoaded", () => {
  loadReviews();
  initXpSystem();
  playSound("pop");
});

/* =========================
   NAV / UI
========================= */
function toggleDropdown() {
  document.getElementById("dropdown")?.classList.toggle("hidden");
  playSound("click");
}

function openSection(id) {
  document.querySelectorAll(".card").forEach(c => c.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");

  playSound("click");
  addXp(2);
}

/* =========================
   REVIEWS SYSTEM (FIXED)
========================= */
function loadReviews() {
  reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
  renderReviews();
}

function saveReviews() {
  localStorage.setItem("reviews", JSON.stringify(reviews));
}

function renderReviews() {
  const html = reviews.map(r => `
    <div class="mc-item">
      ⭐ ${"★".repeat(r.stars)}${"☆".repeat(5 - r.stars)}<br>
      ${escapeHtml(r.text)}
    </div>
  `).join("");

  const list = document.getElementById("reviewList");
  const all = document.getElementById("allReviews");

  if (list) list.innerHTML = html;
  if (all) all.innerHTML = html;
}

function addReview() {
  const stars = Number(document.getElementById("stars").value);
  const text = document.getElementById("reviewText").value.trim();

  if (!text) return;

  reviews.push({ stars, text });
  saveReviews();
  renderReviews();

  document.getElementById("reviewText").value = "";

  playSound("pop");
  addXp(5);
}

/* =========================
   ORDER SYSTEM (DISCORD)
========================= */
async function sendOrder() {
  const data = {
    item: document.getElementById("item").value,
    amount: document.getElementById("amount").value,
    discord: document.getElementById("discord").value,
    mc: document.getElementById("mc").value,
    deadline: document.getElementById("deadline").value
  };

  document.getElementById("orderStatus").innerText =
    "Din beställning måste godkännas av Abbe eller Theo. Du kommer få DM inom kort.";

  playSound("anvil");
  addXp(10);

  try {
    await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  } catch (e) {
    console.log("Order failed:", e);
  }
}

/* =========================
   MINECRAFT SOUND ENGINE
========================= */
function playSound(type) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();

  const o = ctx.createOscillator();
  const g = ctx.createGain();

  o.connect(g);
  g.connect(ctx.destination);

  if (type === "click") o.frequency.value = 600;
  if (type === "pop") o.frequency.value = 900;
  if (type === "anvil") o.frequency.value = 120;

  g.gain.value = 0.08;

  o.start();
  o.stop(ctx.currentTime + 0.12);
}

/* =========================
   XP / LEVEL SYSTEM
========================= */
function initXpSystem() {
  setInterval(() => {
    addXp(1);
  }, 2000);
}

function addXp(amount) {
  xp += amount;

  const level = Math.floor(xp / 20);
  const progress = (xp % 20) * 5;

  const bar = document.getElementById("xpbar");
  if (bar) {
    bar.style.width = progress + "%";
    bar.innerText = "Level " + level;
  }
}

/* =========================
   MINECRAFT POLISH EFFECTS
========================= */
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("slot")) {
    addXp(3);
    playSound("click");
    blockBreakEffect(e.target);
  }
});

function blockBreakEffect(el) {
  el.style.transform = "scale(0.95)";
  setTimeout(() => el.style.transform = "scale(1)", 100);
}

/* =========================
   SECURITY / CLEAN TEXT
========================= */
function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
