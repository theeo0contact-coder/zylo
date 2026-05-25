let stars = 5;
let reviews = [];

const webhookURL =
"KLISTRA_IN_DIN_WEBHOOK_HÄR";

let selectedItem = "Firework Rocket";

function openTab(tab) {

document
.querySelectorAll(".tab")
.forEach(x => {
x.style.display = "none";
});

document
.getElementById(tab)
.style.display =
"block";

}

function selectItem(item) {

selectedItem = item;

document
.getElementById(
"selectedItem"
)
.innerText =
item;

openTab("order");

}

function rate(value){

stars=value;

let row=
document
.querySelectorAll(
"#stars span"
);

row.forEach(
(s,index)=>{

s.style.opacity=
index<value
?1
:0.3;

});

}

function leaveReview(){

let text=
document
.getElementById(
"reviewText"
)
.value
.trim();

if(!text){

alert(
"Skriv en review först"
);

return;

}

reviews.push({

stars,
text

});

renderReviews();

document
.getElementById(
"reviewText"
)
.value="";

}

function renderReviews(){

let box=
document
.getElementById(
"reviewList"
);

box.innerHTML="";

let total=0;

reviews.forEach(r=>{

total+=r.stars;

box.innerHTML+=`

<div class="review">

${"⭐".repeat(r.stars)}

<div>

${r.text}

</div>

</div>

`;

});

let avg=
reviews.length
?
(
total/
reviews.length
)
.toFixed(1)
:
0;

document
.getElementById(
"reviewStats"
)
.innerHTML=`

⭐ Snitt:
${avg}

<br>

📝 Totalt:
${reviews.length}

`;

}

async function submitOrder(){

let dropdown=

document
.getElementById(
"itemSelect"
)
.value;

let custom=

document
.getElementById(
"customItem"
)
.value
.trim();

let item=

custom
||
dropdown
||
selectedItem;

let discord=

document
.getElementById(
"discordName"
)
.value;

let mc=

document
.getElementById(
"mcName"
)
.value;

let amount=

document
.getElementById(
"amount"
)
.value;

let deadline=

document
.getElementById(
"deadline"
)
.value;

if(

!discord||
!mc||
!amount||
!deadline

){

alert(
"Fyll i alla fält!"
);

return;

}

let embed={

embeds:[

{

title:
"🚀 Ny Zylo Beställning",

description:
"Ny order från hemsidan",

color:
3066993,

thumbnail:{

url:
"https://static.wikia.nocookie.net/minecraft_gamepedia/images/e/e5/Firework_Rocket_JE2_BE2.png"

},

fields:[

{
name:
"👤 Discord",

value:
discord,

inline:true
},

{
name:
"⛏ Minecraft",

value:
mc,

inline:true
},

{
name:
"📦 Produkt",

value:
item,

inline:false
},

{
name:
"🔢 Antal",

value:
amount,

inline:true
},

{
name:
"⏰ Senast",

value:
deadline,

inline:true
}

],

footer:{

text:
"OBS! Beställningen måste granskas av Zylo teamet. Du får DM om vi kan fixa detta."

}

}

]

};

try{

await fetch(

webhookURL,

{

method:
"POST",

headers:{

"Content-Type":
"application/json"

},

body:
JSON.stringify(
embed
)

}

);

alert(
"Beställning skickad!"
);

document
.querySelectorAll(
"input"
)
.forEach(
x=>x.value=""
);

}
catch{

alert(
"Kunde inte skicka."
);

}

}

window.onload=()=>{

openTab(
"product"
);

renderReviews();

};
