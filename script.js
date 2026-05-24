let stars = 5;
let reviews = [];

const webhookURL =
"https://discordapp.com/api/webhooks/1508170237080637550/13HyxB90DlBXZ3Rx8eDjsT_Niz4W9lJZQ1FDV5J7tsm6vCc2cgQWWEa5GxlswUpMA8JF";

function openTab(tabName) {

let tabs = document.querySelectorAll(".tab");

tabs.forEach(t => t.classList.remove("active"));

document.getElementById(tabName).classList.add("active");

}

function rate(value) {
stars = value;
alert("Du valde " + value + " stjärnor");
}

function leaveReview() {

let text = document.getElementById("reviewText").value;

if (!text) return;

reviews.push({ stars, text });

renderReviews();

document.getElementById("reviewText").value = "";
}

function renderReviews() {

let box = document.getElementById("reviewList");
box.innerHTML = "";

let total = 0;

reviews.forEach(r => {

total += r.stars;

box.innerHTML += `
<div class="review">
${"⭐".repeat(r.stars)}
<br><br>
${r.text}
</div>
`;

});

let avg = reviews.length ? (total / reviews.length).toFixed(1) : 0;

document.getElementById("reviewStats").innerText =
`⭐ Snitt: ${avg} | Reviews: ${reviews.length}`;
}

function submitOrder() {

let discordName = document.getElementById("discordName").value;
let mcName = document.getElementById("mcName").value;
let amount = document.getElementById("amount").value;
let deadline = document.getElementById("deadline").value;

if (!discordName || !mcName || !amount || !deadline) {
alert("Fyll i alla fält!");
return;
}

let msg =
`🚀 NY BESTÄLLNING 🚀

Discord: ${discordName}
Minecraft: ${mcName}
Produkt: Zylos Raketer
Antal: ${amount}
Deadline: ${deadline}

⚠️ OBS! Beställningen måste granskas av Zylo teamet.`;

fetch(webhookURL, {
method: "POST",
headers: {"Content-Type": "application/json"},
body: JSON.stringify({ content: msg })
});

alert("Beställning skickad!");
}

function verifyAdmin() {

let code = document.getElementById("adminCode").value;

if (code === "ZyloAdmin123") {
document.getElementById("adminStatus").innerText =
"✅ Admin verifierad!";
} else {
document.getElementById("adminStatus").innerText =
"❌ Fel kod";
}

}
