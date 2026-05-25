let reviews = [];

document.addEventListener("DOMContentLoaded", () => {
  loadReviews();
  playXpLoop();
});

/* -------------------------
   NAVIGATION
------------------------- */
function toggleDropdown() {
  document.getElementById("dropdown").classList.toggle("hidden");
}

function openSection(id) {
  document.querySelectorAll(".card").forEach(c => c.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");

  playSound("click");
}

/* -------------------------
   REVIEWS FIX (GLOBAL SYNC)
------------------------- */
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
      ${r.text}
    </div>
  `).join("");

  document.getElementById("reviewList").innerHTML = html;
  document.getElementById("allReviews").innerHTML = html;
}

function addReview() {
  const stars = Number(document.getElementById("stars").value);
  const text = document.getElementById("reviewText").value;

  if (!text) return;

  reviews.push({ stars, text });
  saveReviews();
  renderReviews();

  document.getElementById("reviewText").value = "";
  playSound("pop");
}

/* -------------------------
   ORDER SYSTEM
------------------------- */
async function sendOrder() {
  const data = {
    item: item.value,
    amount: amount.value,
    discord: discord.value,
    mc: mc.value,
    deadline: deadline.value
  };

  document.getElementById("orderStatus").innerText =
    "Din beställning måste godkännas av Abbe eller Theo...";

  playSound("anvil");

  await fetch("/api/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}

/* -------------------------
   MINECRAFT SOUND ENGINE
------------------------- */
function playSound(type) {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();

  const o = ctx.createOscillator();
  const g = ctx.createGain();

  o.connect(g);
  g.connect(ctx.destination);

  if (type === "click") o.frequency.value = 600;
  if (type === "pop") o.frequency.value = 900;
  if (type === "anvil") o.frequency.value = 120;

  g.gain.value = 0.1;

  o.start();
  o.stop(ctx.currentTime + 0.1);
}

/* -------------------------
   XP LEVEL SYSTEM
------------------------- */
let xp = 0;

function playXpLoop() {
  setInterval(() => {
    xp += 1;

    const level = Math.floor(xp / 20);

    const bar = document.getElementById("xpbar");
    if (bar) {
      bar.style.width = (xp % 20) * 5 + "%";
      bar.innerText = "Level " + level;
    }
  }, 1000);
}
