function toggleDropdown() {
  document.getElementById("dropdown").classList.toggle("hidden");
}

function openSection(id) {
  document.querySelectorAll(".card").forEach(c => c.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

/* REVIEWS (local storage) */
function addReview() {
  const stars = document.getElementById("stars").value;
  const text = document.getElementById("reviewText").value;

  const review = { stars, text };

  let reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
  reviews.push(review);
  localStorage.setItem("reviews", JSON.stringify(reviews));

  loadReviews();
}

function loadReviews() {
  let reviews = JSON.parse(localStorage.getItem("reviews") || "[]");

  let html = "";
  reviews.forEach(r => {
    html += `<div class="card">⭐ ${r.stars}<br>${r.text}</div>`;
  });

  document.getElementById("reviewList").innerHTML = html;
  document.getElementById("allReviews").innerHTML = html;
}

loadReviews();

/* ORDER SYSTEM */
async function sendOrder() {
  const data = {
    item: document.getElementById("item").value,
    amount: document.getElementById("amount").value,
    discord: document.getElementById("discord").value,
    mc: document.getElementById("mc").value,
    deadline: document.getElementById("deadline").value
  };

  document.getElementById("orderStatus").innerText =
    "Din beställning måste godkännas av Abbe eller Theo. Du kommer få DM snart.";

  await fetch("/api/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}
