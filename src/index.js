function start(){
    document.querySelector(".root").innerHTML = `
<header>
    <div class="image">
        <img src="Public/Images/download.png" alt="">
    </div>
    <div class="contats">
        <ion-icon name="people-sharp"></ion-icon>
    </div>
</header>
<div class="container">

</div>

<footer>
    <div class="text"><input type="text" placeholder="Escreva aqui..."></div>
    <ion-icon name="paper-plane-outline" onclick = postMessage(this)></ion-icon>
</footer>
`
}

/* start(); */