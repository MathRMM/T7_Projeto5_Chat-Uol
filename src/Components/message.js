let userName =""
let address = "Todos"
let type = "message"

function start(){
    getAPI() 
    getApiParticipants() 
    setInterval(getAPI, 3000)
    setInterval(Online, 5000)
    setInterval(getApiParticipants,10000)
}

/* ----------------- API ---------------------- */

function getAPI(){
    axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
    .then(getMessage)
}

function inRoom(){
    while (userName == ""){
        userName = String(prompt("Qual o seu nome?"))
    }
   const promisse = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants ", { name: userName })
    promisse.then(start)
}

function getApiParticipants(){
    axios.get("https://mock-api.driven.com.br/api/v6/uol/participants")
    .then(renderParticipanst)
}

function Online(){
    axios.post("https://mock-api.driven.com.br/api/v6/uol/status", { name: userName })
}

/* ----------------- Mostrar mensagens ---------------------- */

function getMessage (promise){
    let listMessage = promise.data

    document.querySelector(".container").innerHTML = ""
    listMessage.map((message)=>{
        if (message.type == "status"){
            messageInOut(message.time, message.from, message.text)
        }
        if (message.type == "message"){
                messages(message.time, message.from, message.text, message.to) 
        }
        if (message.type == "private_message"){
            if (message.to == userName || message.from == userName || message.to == "Todos" || message.to == "todos"){
                messagePrivate(message.time, message.from, message.text,  message.to,)
            }
        }
    })
    rollEndPage()
}

function messages(clock, from, text, to){
    document.querySelector(".container").innerHTML += `
    <li class="message"> 
        <div class="clock">(${clock})</div>
        <div class="name">${from}</div>
        <div class="text">para</div>
        <div class="name">${to}:</div>
        <div class="text">${text}</div>
    </li>
    `
}

function messageInOut(clock, from, text){
    document.querySelector(".container").innerHTML += `
    <li class="message inOut"> 
        <div class="clock">(${clock})</div>
        <div class="name">${from}</div>
        <div class="text">${text}</div>
    </li>
    `
}

function messagePrivate(clock, from, text, to){
    document.querySelector(".container").innerHTML += `
    <li class="message private"> 
        <div class="clock">(${clock})</div>
        <div class="name">${from}</div>
        <div class="text">reservadamente para</div>
        <div class="name">${to}:</div>
        <div class="text">${text}</div>
    </li>
    `
}
function rollEndPage() {
    const ultimaMensagem = document.querySelector(
      ".container li:last-child"
    );
    ultimaMensagem.scrollIntoView() ;
  }

/* ----------------- Destinatario e reservados ---------------------- */
function chooseTo(element){
   address = String(element.querySelector("span").innerHTML)
   document.querySelector("footer div p").innerHTML =`Enviando para ${address}`
}

function publicPrivate(element){
    let way = String(element.querySelector("span").innerHTML)
    console.log(way)
    switch (way) {
        case "Público":
            type = "message"
            document.querySelector("footer div p").innerHTML =`Enviando para ${address}`
            break
        case "Reservadamente":
            type = "private_message"
            document.querySelector("footer div p").innerHTML =`Enviando para ${address} (reservadamente)`
            break
    }
}

/* ----------------- Enviar mensagens ---------------------- */

function postMessage(){
    let text = document.querySelector("footer input").value
    
    if(text != ""){
        axios.post("https://mock-api.driven.com.br/api/v6/uol/messages",{
            from : userName,
            to : address,
            text : text,
            type: type
        })
        document.querySelector("footer input").value = ""
    }
    
}
/* ----------------- Listar Participantes ---------------------- */
function renderParticipanst(event){
    document.querySelector(".sidebar .participants").innerHTML =`
    <li onclick = chooseTo(this)>
        <ion-icon name="people-sharp"></ion-icon>
        <span>Todos</span>
    </li>
    `
    event.data.map((name)=>{
        document.querySelector(".sidebar .participants").innerHTML += `
        <li onclick = chooseTo(this)>
            <ion-icon name="person-circle-sharp"></ion-icon>
            <span>${name.name}</span>
        </li>
        `
    })
}

/* ----------------- Sidebar ---------------------- */

function sidebar(){
    document.querySelector(".background").classList.remove("hidden")
    document.querySelector(".sidebar").classList.remove("ocult")
}

function eventsListenrs(){
    document.querySelector(".background").addEventListener("click",()=>{
        document.querySelector(".background").classList.add("hidden")
        document.querySelector(".sidebar").classList.add("ocult")
    })

    document.addEventListener("keydown",(event)=>{
        if(event.key === "Enter"){
            postMessage();
        }
    })
}

eventsListenrs()
inRoom()