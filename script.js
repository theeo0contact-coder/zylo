let stars=5;

let reviews=[];

const webhookURL=
"KLISTRA_WEBHOOK_HÄR";

function openTab(tab){

document
.querySelectorAll(
".tab"
)
.forEach(

x=>
x.style.display=
"none"

);

document
.getElementById(
tab
)
.style.display=
"block";

}

function rate(v){

stars=v;

}

function leaveReview(){

let text=
document
.getElementById(
"reviewText"
)
.value;

if(!text){

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

reviews.forEach(

r=>{

total+=r.stars;

box.innerHTML+=`

<div class="review">

${"⭐".repeat(
r.stars
)}

<br>

${r.text}

</div>

`;

}

);

let avg=

reviews.length

?

(
total
/
reviews.length
)

.toFixed(1)

:

0;

document
.getElementById(
"reviewStats"
)
.innerHTML=

`
⭐ ${avg}
<br>
Reviews:
${reviews.length}
`;

}

async function submitOrder(){

let item=

document
.getElementById(
"customItem"
)
.value

||

document
.getElementById(
"itemSelect"
)
.value;

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

let embed={

embeds:[{

title:

"🚀 Zylo Order",

color:

65280,

fields:[

{
name:"Discord",
value:discord
},

{
name:"Minecraft",
value:mc
},

{
name:"Produkt",
value:item
},

{
name:"Antal",
value:amount
},

{
name:"Deadline",
value:deadline
}

],

footer:{

text:

"Beställningen granskas av Zylo teamet"

}

}]

};

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

}

window.onload=()=>{

openTab(
"product"
);

};
