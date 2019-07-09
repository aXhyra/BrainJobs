//definizione costante dell'url del gateway
/* Versione su https://www.brainjobs.tk
 const base_url = "https://www.brainjobs.tk:8443";
 */
const base_url = "http://localhost:8082"

//funzione che analizza il token mi permette di capire se è un admin oppure no
function parseJwt() {
    var token = localStorage.getItem('token');
    if (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    } else {
        return null
    }
};

//funzione che controlla che l'utente sia loggato
// e se é admin gli mostra i suoi menú
$(document).ready(function () {
    if (localStorage.getItem('token') === null) {
        location.href = "login.html";
    } else if (JSON.parse(parseJwt().isAdmin)) {
        $("#menu3").show();
        $("#menu4").show();
        $("#menu5").show();
        $("#menu3-mobile").show();
        $("#menu4-mobile").show();
        $("#menu5-mobile").show();
    }
});

//per far visualizzare nelle pagine corrette le job
$(document).ready(function () {
    if ((location.href).includes("visualizza.html")) {
        visualizza();
    }
    if ((location.href).includes("visualizza_globale.html")) {
        visualizza_globale();
    }
    if ((location.href).includes("visualizza_singola.html")) {
        campo_vis_singola("ins_job_id", parseJwt().user_id);
    }
    if ((location.href).includes("visualizza_job_utente_specifico.html")) {
        campo_vis_user("ins_user_id_specifico");
    }
    if ((location.href).includes("visualizza_job_specifico_utente_specifico.html")) {
        campo_vis_user("ins_user_id_specifico_specifico");
    }
});

//varie funzioni per la navigazione delle pagine--------------------------------
function vis_ins() {
    location.href = "inserisci.html";
}

function vis_vis_ins() {
    location.href = "visualizza_singola.html";
}

function vis_vis() {
    location.href = "visualizza.html";
}

function vis_glob() {
    location.href = "visualizza_globale.html";
}

function vis_spec() {
    location.href = "visualizza_job_utente_specifico.html";
}

function vis_job_spec() {
    location.href = "visualizza_job_specifico_utente_specifico.html";
}

function logout() {
    localStorage.removeItem('token');
    location.href = "index.html";
}

function vis_home() {
    location.href = "index.html";
}

function nascondi_barra_mobile() {
    var x = document.getElementById("navbar");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}
//fine sezione funzioni per la navigazione delle pagine-------------------------

//funzioni per ripempire le option dei campi di ricerca-------------------------
function campo_vis_singola(identificatore, utente) {
    var tab = document.getElementById(identificatore);
    if (localStorage.getItem('token')) {
        $.ajax({
            type: 'GET',
            url: valore_url(utente),
            headers: {
                "Authorization": localStorage.getItem('token')
            },
            success: function (response) {
                var stringa = "<select class='w3-light-grey w3-large w3-select' id='" + identificatore + "_option'>";
                for (var x in response) {
                    stringa += "<option value=" + response[x].job_id + ">" + response[x].title + "</option>";
                }
                stringa += "</select>";
                tab.innerHTML = stringa;
            },
            error: function (response) {
                //non userò questa funzione per l'errore perchè verrà trattato da altre chiamate successive
            }
        });
    } else {
        location.href = "login.html"
    }
}

function valore_url(utente) {
    if (JSON.parse(parseJwt().isAdmin)) {
        return base_url + "/api/user/" + utente + "/jobs";
    } else {
        return base_url + "/api/jobs";
    }
}

function campo_vis_user(identificatore) {
    var tab = document.getElementById(identificatore);
    $.ajax({
        type: 'GET',
        url: base_url + "/api/users",
        headers: {
            "Authorization": localStorage.getItem('token')
        },
        success: function (response) {
            if ((location.href).includes("visualizza_job_specifico_utente_specifico.html")) {
                var variabile = 'campo_vis_singola("ins_user_job_id_specifico_specifico",document.getElementById("ins_user_id_specifico_specifico_option").value)';
                var stringa = "<select class='w3-light-grey w3-large w3-select' id='" + identificatore + "_option' onchange=" + variabile +">";
                stringa += '<option value="" disabled selected>Seleziona utente</option>'
            } else {
                var stringa = "<select class='w3-light-grey w3-large w3-select' id='" + identificatore + "_option'>";
                stringa += '<option value="" disabled selected>Seleziona utente</option>'
            }
            for (var x in response) {
                stringa += "<option value=" + response[x].user_id + ">" + response[x].username + "</option>";
            }
            stringa += "</select>";
            tab.innerHTML = stringa;
        },
        error: function (response) {
            //non userò questa funzione per l'errore perchè verrà trattato da altre chiamate successive
        }
    });
}
//fine sezione option per i campi di ricerca------------------------------------

//funzionalita per normali utenti loggati
function inserisci() {
    var titolo = document.getElementById("ins_titolo").value;
    var linguaggio = document.getElementById("ins_linguaggio").value;
    var frame = document.getElementById("ins_frame").value;
    var dataset = document.getElementById("ins_dataset").value;
    var datatype = document.getElementById("ins_datatype").value;
    var model = document.getElementById("ins_model").value;
    if (frame == "nessuno") {
        var dati = {
            model: model,
            dataset: dataset,
            dataset_datatype: datatype,
            language: linguaggio,
            title: titolo
        };
    } else {
        var dati = {
            model: model,
            dataset: dataset,
            dataset_datatype: datatype,
            framework: frame,
            language: linguaggio,
            title: titolo
        };
    }
    $.ajax({
        type: "post",
        url: base_url + "/api/jobs",
        headers: {
            "Authorization": localStorage.getItem('token')
        },
        data: dati,
        success: function (response) {
            location.href = "visualizza.html";
        },
        error: function (response) {
            metodo_errore("fiel_inserisci", "errore_inserisci", response);
        }
    })
}

function visualizza() {
    var tab = document.getElementById("visualizza_dati");
    $.ajax({
        type: 'GET',
        url: base_url + "/api/jobs",
        headers: {
            "Authorization": localStorage.getItem('token')
        },
        success: function (response) {
            tab.innerHTML = metodo_visualizza(response);
        },
        error: function () {
            tab.innerHTML = "<center>Nessun job trovato<br><a href='javascript: void (0)' onclick='vis_ins()'> aggiungine uno</a><center>"
        }
    });
}

function visualizza_singola() {
    var job_id = document.getElementById("ins_job_id_option").value;
    var tab = document.getElementById("visualizza_singola_dati");
    $.ajax({
        type: 'GET',
        url: base_url + "/api/job/" + job_id,
        headers: {
            "Authorization": localStorage.getItem('token')
        },
        success: function (response) {
            metodo_sistema_errore("fiel_visualizza_singola", "errore_visualizza_singola");
            tab.innerHTML = metodo_visualizza_singolo(response);
        },
        error: function (response) {
            metodo_errore("fiel_visualizza_singola", "errore_visualizza_singola", response);
        }
    });
}

//funzionalità per utente admin
function visualizza_globale() {
    var tab = document.getElementById("visualizza_globale_dati");
    $.ajax({
        type: 'GET',
        url: base_url + "/api/jobs/all",
        headers: {
            "Authorization": localStorage.getItem('token')
        },
        success: function (response) {
            tab.innerHTML = metodo_visualizza(response);
        },
        error: function (response) {
            tab.style.color = "red";
            tab.innerText = "messaggio di errore: " + response.responseJSON.message;
        }
    });
}

function visualizza_job_specifico() {
    var user = document.getElementById("ins_user_id_specifico_option").value;
    var tab = document.getElementById("visualizza_job_specifico_dati");
    $.ajax({
        type: 'GET',
        url: base_url + "/api/user/" + user + "/jobs",
        headers: {
            "Authorization": localStorage.getItem('token')
        },
        success: function (response) {
            metodo_sistema_errore("fiel_visualizza_job_utente_speciale", "errore_visualizza_job_utente_speciale");
            tab.innerHTML = metodo_visualizza(response);
        },
        error: function (response) {
            metodo_errore("fiel_visualizza_job_utente_speciale", "errore_visualizza_job_utente_speciale", response);
        }
    });
}

function visualizza_job_specifico_utente_specifico() {
    var user = document.getElementById("ins_user_id_specifico_specifico_option").value;
    var job = document.getElementById("ins_user_job_id_specifico_specifico_option").value;
    var tab = document.getElementById("visualizza_job_specifico_utente_specifico_dati");
    $.ajax({
        type: 'GET',
        url: base_url + "/api/user/" + user + "/job/" + job,
        headers: {
            "Authorization": localStorage.getItem('token')
        },
        success: function (response) {
            metodo_sistema_errore("fiel_visualizza_singola_speciale", "errore_visualizza_singola_speciale");
            tab.innerHTML = metodo_visualizza_singolo(response);
        },
        error: function (response) {
            metodo_errore("fiel_visualizza_singola_speciale", "errore_visualizza_singola_speciale", response);
        }
    });
}

//funzioni ausiliarie per le visualizzazioni------------------------------------
function metodo_visualizza(response) {
    var string_tab = "";
    for (var x in response) {
        string_tab += "<div class='div_visualizza'><label class=' w3-text-blue w3-medium'>jobid: </label>" +
            "<label id='value_jobid' >" + response[x].job_id + "</label><br><br>" +
            "<label class=' w3-text-blue w3-medium'>titolo: </label>" +
            "<label id='value_titolo'>" + response[x].title + "</label><br><br>" +
            "<label class=' w3-text-blue w3-medium'>linguaggio: </label>" +
            "<label id='value_linguaggio'>" + response[x].language + "</label><br><br>" +
            "<label class=' w3-text-blue w3-medium'>framework: </label>" +
            "<label id='value_frame' >" + response[x].framework + "</label><br><br>" +
            "<label class=' w3-text-blue w3-medium'>create_at: </label>" +
            "<label id='value_create'>" + response[x].created_at + "</label><br><br>" +
            "<label class=' w3-text-blue w3-medium'>status: </label>" +
            "<label id='value_status' >" + response[x].status + "</label>" +
            "</div>";
    }
    return string_tab;
}

function metodo_visualizza_singolo(response) {
    var stringa = "<div class='div_visualizza'><label class=' w3-text-blue w3-medium'>job_id: </label>" +
        "<label id='value_user_id' >" + response.job_id + "</label><br><br>" +
        "<label class=' w3-text-blue w3-medium'>user_id: </label>" +
        "<label id='value_titolo'>" + response.user_id + "</label><br><br>" +
        "<label class=' w3-text-blue w3-medium'>titolo: </label>" +
        "<label id='value_titolo'>" + response.title + "</label><br><br>" +
        "<label class=' w3-text-blue w3-medium'>linguaggio: </label>" +
        "<label id='value_linguaggio'>" + response.language + "</label><br><br>" +
        "<label class=' w3-text-blue w3-medium'>framework: </label>" +
        "<label id='value_frame' >" + response.framework + "</label><br><br>" +
        "<label class=' w3-text-blue w3-medium'>dataset: </label>" +
        "<label id='value_dataset' >" + response.dataset + "</label><br><br>" +
        "<label class=' w3-text-blue w3-medium'>dataset datatype: </label>" +
        "<label id='value_type_dataset' >" + response.dataset_datatype + "</label><br><br>" +
        "<label class=' w3-text-blue w3-medium'>model: </label>" +
        "<label id='value_model' >" + response.model + "</label><br><br>" +
        "<label class=' w3-text-blue w3-medium'>status: </label>" +
        "<label id='value_status' >" + response.status + "</label><br><br>" +
        "<label class=' w3-text-blue w3-medium'>created_at: </label>" +
        "<label id='value_create'>" + response.created_at + "</label><br><br>" +
        "<label class=' w3-text-blue w3-medium'>updated_at: </label>" +
        "<label id='value_updated_at' >" + response.updated_at + "</label><br><br>" +
        "</div>";
    return stringa;
}
//fine funzioni ausiliarie per le visualizzazioni-------------------------------

//funzioni che avvertono di un errore-------------------------------------------
function metodo_errore(fiel, paragrafo, response) {
    document.getElementById(fiel).style.borderColor = "red";
    var paragrafo_errore = document.getElementById(paragrafo);
    paragrafo_errore.innerText = "Errore: " + response.responseJSON.message;
    paragrafo_errore.style.color = "red";
}

function metodo_sistema_errore(fiel, paragrafo) {
    document.getElementById(fiel).style.borderColor = "white";
    var paragrafo_errore = document.getElementById(paragrafo);
    paragrafo_errore.innerText = "";
    paragrafo_errore.style.color = "black";
}
//fine funzioni che avvertono di un errore--------------------------------------
