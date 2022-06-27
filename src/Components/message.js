let userName


function start(){
    getAPI()  
    setInterval(getAPI, 3000)
    setInterval(Online, 5000)
}

/* ----------------- API ---------------------- */

function getAPI(){
    axios.get("https://mock-api.driven.com.br/api/v6/uol/messages").then(getMessage)
}

function inRoom(){
    userName = String(prompt("Qual o seu nome?"))
    axios.post("https://mock-api.driven.com.br/api/v6/uol/participants ", { name: userName })
    .then(start)
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
            messageInOut(message.time, message.from, message.to, message.text)
        }else{
            if(message.to == "Todos" || message.to == "todos"){
                messages(message.time, message.from, message.to, message.text)
            }
            if (message.to == userName){
                messagePrivate(message.time, message.from, message.to, message.text)
            }
        }
    })
}

function messages(clock, from, to, text){
    document.querySelector(".container").innerHTML += `
    <div class="message"> 
        <div class="clock">(${clock})</div>
        <div class="name">${from}</div>
        <div class="text">para</div>
        <div class="name">${to}:</div>
        <div class="text">${text}</div>
    </div>
    `
}

function messageInOut(clock, from, to, text){
    document.querySelector(".container").innerHTML += `
    <div class="message inOut"> 
        <div class="clock">(${clock})</div>
        <div class="name">${from}</div>
        <div class="text">para</div>
        <div class="name">${to}:</div>
        <div class="text">${text}</div>
    </div>
    `
}

function messagePrivate(clock, from, to, text){
    document.querySelector(".container").innerHTML += `
    <div class="message private"> 
        <div class="clock">(${clock})</div>
        <div class="name">${from}</div>
        <div class="text">reservadamente para</div>
        <div class="name">${to}:</div>
        <div class="text">${text}</div>
    </div>
    `
}

/* ----------------- Enviar mensagens ---------------------- */

inRoom()