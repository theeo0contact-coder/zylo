let stars=5

function rate(value){

stars=value

alert(
"Du valde "
+value+
" stjärnor"
)

}

function leaveReview(){

let text=
document
.getElementById(
"reviewText"
).value

let box=
document
.getElementById(
"reviewList"
)

box.innerHTML+=`

<div class="review">

${"⭐".repeat(stars)}

<br><br>

${text}

</div>

`

}

function openOrder(){

document
.getElementById(
"orderMenu"
)
.classList
.remove(
"hidden"
)

}

function submitOrder(){

let block=
document
.getElementById(
"blockSelect"
)
.value

let amount=
document
.getElementById(
"amount"
)
.value

alert(
`Beställning:
${amount}x ${block}`
)

}
