function start(){
    document.querySelector(".root").innerHTML = `
    <main>
        <div class="background hidden"></div>
        <header>
            <div class="image">
                <img src="Public/Images/download.png" alt="">
            </div>
            <div class="contats">
                <ion-icon name="people-sharp" onclick=sidebar()></ion-icon>
            </div>
        </header>
        <ul class="container">

        </ul>

        <footer>
            <div>
                <div class="text"><input type="text" placeholder="Escreva aqui..."></div>
                <p>Enviando para Todos</p>
            </div>
            <ion-icon name="paper-plane-outline" onclick=postMessage()></ion-icon>
        </footer>

        <div class="sidebar ocult">
            <h1> Escolha um contato para enviar mensagem:</h1>
            <ul class="participants">

            </ul>
            <h1>Escolha a visibilidade</h1>
            <ul class="visible">
                <li onclick = publicPrivate(this)>
                    <div>
                        <ion-icon name="lock-open-sharp"></ion-icon>
                        <span>Público</span>
                    </div>
                    <ion-icon name="checkmark-sharp" class ="check select"></ion-icon>
                </li>
                <li onclick = publicPrivate(this)>
                    <div>
                        <ion-icon name="lock-closed-sharp"></ion-icon>
                        <span>Reservadamente</span>
                    </div>
                    <ion-icon name="checkmark-sharp" class ="check"></ion-icon>
                </li>
            </ul>
        </div>
    </main>
`
}

start();