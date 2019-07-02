//definizione costante dell'url del gateway
/* Versione su https://www.brainjobs.tk
const base_url = "https://www.brainjobs.tk:8443";
*/
const base_url = "http://localhost:8082"

//funzione per il login dell'utente
function login() {
    var user = document.getElementById("user").value;
    var password = document.getElementById("password").value;
    var dati = {
        username: user,
        password: password
    };
    $.ajax({
        type: "post",
        url: base_url + "/login",
        data: dati,
        success: function (response) {
            localStorage.setItem('token', response["token"]);
            location.href = "visualizza.html";
        },
        error: function (response) {
            metodo_errore("fiel1", "errore_login", response);
        }
    })
}

//funzione per la registrazione del utente
function registrazione() {
    var email = document.getElementById("reg_email").value;
    var iduser = document.getElementById("reg_iduser").value;
    var password = document.getElementById("reg_password").value;
    var dati = {
        username: iduser,
        password: password,
        email: email
    };
    $.ajax({
        type: "post",
        url: base_url + "/register",
        data: dati,
        success: function (response) {
            location.href = "login.html";
        },
        error: function (response) {
            metodo_errore("fiel2", "errore_registrazione", response);
        }
    })
}

//funzione che avvisa di un errore
function metodo_errore(fiel, paragrafo, response) {
    document.getElementById(fiel).style.borderColor = "red";
    var paragrafo_errore = document.getElementById(paragrafo);
    paragrafo_errore.innerText = "Errore: " + response.responseJSON.message;
    paragrafo_errore.style.color = "red";
}

//funzioni per la navigazione delle pagine--------------------------------------
function vis_login() {
    location.href = "login.html";
}

function vis_home() {
    location.href = "index.html";
}

function vis_registrazione() {
    location.href = "registrazione.html";
}

function nascondi_barra_mobile() {
    var x = document.getElementById("navbar");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}
//fine funzione per la navigazione delle pagine---------------------------------
