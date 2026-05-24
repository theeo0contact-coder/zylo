let stars = 5;

const webhookURL = "https://discordapp.com/api/webhooks/1508170237080637550/13HyxB90DlBXZ3Rx8eDjsT_Niz4W9lJZQ1FDV5J7tsm6vCc2cgQWWEa5GxlswUpMA8JF";

function rate(value) {

stars = value;

alert(
"Du valde " + value + " stjärnor"
);

}

function leaveReview() {

let text =
document.getElementById("reviewText").value;

let box =
document.getElementById("reviewList");

box.innerHTML += `

<div class="review">

${"⭐".repeat(stars)}

<br><br>

${text}

</div>

`;

}

function openOrder() {

document
.getElementById("orderMenu")
.classList
.remove("hidden");

}

function submitOrder() {

let discordName =
document.getElementById("discordName").value;

let mcName =
document.getElementById("mcName").value;

let block =
document.getElementById("blockSelect").value;

let amount =
document.getElementById("amount").value;

let deadline =
document.getElementById("deadline").value;

// kontroll
if (!discordName || !mcName || !block || !amount || !deadline) {
alert("Fyll i alla fält!");
return;
}

let message = {
content:
`🚀 NY BESTÄLLNING 🚀

Discord: ${discordName}
Minecraft: ${mcName}
Beställning: ${amount}x ${block}
Behövs senast: ${deadline}

⚠️ OBS! Beställningen måste granskas av Zylo teamet, du får ett DM om vi kan fixa detta.`
};

fetch(webhookURL, {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify(message)
})
.then(() => {
alert("Beställning skickad!");
document.getElementById("orderMenu").classList.add("hidden");
})
.catch(() => {
alert("Något gick fel vid beställningen.");
});

}
