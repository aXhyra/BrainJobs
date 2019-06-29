const BASEURL = 'https://www.brainjobs.tk:8443'


//per nascondere le sezioni dove solo l'admin può accedere
$(document).ready(function()
{
    if(localStorage.getItem('admin')=="false")
    {
        $("#menu3").hide();
        $("#menu4").hide();
        $("#menu5").hide();
    }
});

//per far visualizzare nelle pagine corrette le job
$(document).ready(function(){
    if((location.href).includes("visualizza.html"))
    {
        visualizza();
    }
    if((location.href).includes("visualizza_globale.html"))
    {
        visualizza_globale();
    }
});

//varie funzioni per la navigazione-----------------------------------
function vis_ins()
{
    location.href="inserisci.html";
}

function vis_vis_ins()
{
    location.href="visualizza_singola.html";
}

function vis_vis()
{
    location.href="visualizza.html";
}

function vis_glob()
{
    location.href="visualizza_globale.html";
}

function vis_spec()
{
    location.href="visualizza_job_utente_specifico.html";
}

function vis_job_spec()
{
    location.href="visualizza_job_specifico_utente_specifico.html";
}
//fine sezione funzioni per la navigazione----------------------------

//funzionalita per normali utenti loggati
function inserisci()
{
    var titolo = document.getElementById("ins_titolo").value;
    var linguaggio = document.getElementById("ins_linguaggio").value;
    var frame = document.getElementById("ins_frame").value;
    var dataset = document.getElementById("ins_dataset").value;
    var datatype = document.getElementById("ins_datatype").value;
    var model = document.getElementById("ins_model").value;    
    if(frame=="nessuno")
    {
        var dati={model:model, dataset:dataset, dataset_datatype:datatype, language:linguaggio, title:titolo};
        $.ajax({
            type: "post",
            url:  BASEURL + "/api/job/new",
            headers: {"Authorization": localStorage.getItem('token')},
            data: dati,
            success: function(response)
            {
               alert("inserimento effettuato correttamente");
            },
            error:function(response)
            {
                alert("errore nell'inserimento del job");
                alert(response.status+response.message);
            }
        })
    }
    else
    {
        var dati={model:model, dataset:dataset, dataset_datatype:datatype, framework:frame, language:linguaggio, title:titolo};
        $.ajax({
            type: "post",
            url: BASEURL + "/api/job/new",
            headers: {"Authorization": localStorage.getItem('token')},
            data: dati,
            success: function(response)
            {
               alert("inserimento effettuato correttamente");
            },
            error:function(response)
            {
                alert("errore nell'inserimento del job");
                alert(response.status+response.message);
            }
        })
    }   
}

function visualizza()
{
    var tab = document.getElementById("visualizza_dati");
    var string_tab="";
    $.ajax({
        type: 'GET',
        url: BASEURL + "/api/jobs",       
        headers: {"Authorization": localStorage.getItem('token')},
        success:function(response)
        {
            for(var x in response)
            {
                string_tab=string_tab+"<div class='div_visualizza'><label>jobid: </label>"+
                    "<label id='value_jobid' >"+response[x].job_id+"</label><br><br>"+
                        "<label>titolo: </label>"+
                        "<label id='value_titolo'>"+ response[x].title+"</label><br><br>"+
                        "<label>linguaggio: </label>"+
                        "<label id='value_linguaggio'>"+ response[x].language+"</label><br><br>"+
                        "<label>framework: </label>"+
                        "<label id='value_frame' >"+ response[x].framework+"</label><br><br>"+
                        "<label>create_at: </label>"+
                        "<label id='value_create'>"+ response[x].created_at+"</label><br><br>"+
                        "<label>status: </label>"+
                        "<label id='value_status' >"+ response[x].status+"</label>"+
                    "</div>";
            }
            tab.innerHTML=string_tab;
        },
        error:function(response)
        {
            alert("errore nella visualizzazione dei dati");
            alert(response.status+response.message);
        }
      });
}

function visualizza_singola()
{
    var job_id=document.getElementById("ins_job_id").value;
    var tab = document.getElementById("visualizza_singola_dati");
    $.ajax({
        type: 'GET',
        url: BASEURL + "/api/job/" + job_id,    
        headers: {"Authorization": localStorage.getItem('token')},
        success:function(response)
        {
            tab.innerHTML="<div class='div_visualizza'><label>user_id: </label>"+
                "<label id='value_user_id' >"+response.user_id+"</label><br><br>"+
                    "<label>titolo: </label>"+
                    "<label id='value_titolo'>"+ response.title+"</label><br><br>"+
                    "<label>linguaggio: </label>"+
                    "<label id='value_linguaggio'>"+ response.language+"</label><br><br>"+
                    "<label>framework: </label>"+
                    "<label id='value_frame' >"+ response.framework+"</label><br><br>"+
                    "<label>dataset: </label>"+
                    "<label id='value_dataset' >"+ response.dataset+"</label><br><br>"+
                    "<label>dataset datatype: </label>"+
                    "<label id='value_type_dataset' >"+ response.dataset_datatype+"</label><br><br>"+
                    "<label>model: </label>"+
                    "<label id='value_model' >"+ response.model+"</label><br><br>"+
                    "<label>status: </label>"+
                    "<label id='value_status' >"+ response.status+"</label><br><br>"+
                    "<label>job_id: </label>"+
                    "<label id='value_job_id' >"+ response.job_id+"</label><br><br>"+
                    "<label>created_at: </label>"+
                    "<label id='value_create'>"+ response.created_at+"</label><br><br>"+
                    "<label>updated_at: </label>"+
                    "<label id='value_updated_at' >"+ response.updated_at+"</label><br><br>"+
                "</div>";
                
        },
        error:function(response)
        {
            alert("errore nella visualiizazione dei dati");
            alert(response.status+response.message);
        }
      });
}

//funzionalità per utente admin
function visualizza_globale()
{
    var tab = document.getElementById("visualizza_globale_dati");
    var string_tab="";
    $.ajax({
        type: 'GET',
        url:  BASEURL + "/api/jobs/all",       
        headers: {"Authorization": localStorage.getItem('token')},
        success:function(response)
        {
            for(var x in response)
            {
                string_tab=string_tab+"<div class='div_visualizza'><label>jobid: </label>"+
                    "<label id='value_jobid' >"+response[x].job_id+"</label><br><br>"+
                        "<label>titolo: </label>"+
                        "<label id='value_titolo'>"+ response[x].title+"</label><br><br>"+
                        "<label>linguaggio: </label>"+
                        "<label id='value_linguaggio'>"+ response[x].language+"</label><br><br>"+
                        "<label>framework: </label>"+
                        "<label id='value_frame' >"+ response[x].framework+"</label><br><br>"+
                        "<label>create_at: </label>"+
                        "<label id='value_create'>"+ response[x].created_at+"</label><br><br>"+
                        "<label>status: </label>"+
                        "<label id='value_status' >"+ response[x].status+"</label>"+
                    "</div>";
            }
            tab.innerHTML=string_tab;
        },
        error:function(response)
        {
            alert("errore nella visualizzazione dei dati");
            alert(response.status+response.message);
        }
      });
}

function visualizza_job_specifico()
{
    var user=document.getElementById("ins_user_id_specifico").value;
    var tab = document.getElementById("visualizza_job_specifico_dati");
    var string_tab="";
    $.ajax({
        type: 'GET',
        url: BASEURL + "/api/user/" + user + "/jobs",       
        headers: {"Authorization": localStorage.getItem('token')},
        success:function(response)
        {
            for(var x in response)
            {
                string_tab=string_tab+"<div class='div_visualizza'><label>jobid: </label>"+
                    "<label id='value_jobid' >"+response[x].id+"</label><br><br>"+
                        "<label>titolo: </label>"+
                        "<label id='value_titolo'>"+ response[x].title+"</label><br><br>"+
                        "<label>linguaggio: </label>"+
                        "<label id='value_linguaggio'>"+ response[x].language+"</label><br><br>"+
                        "<label>framework: </label>"+
                        "<label id='value_frame' >"+ response[x].framework+"</label><br><br>"+
                        "<label>create_at: </label>"+
                        "<label id='value_create'>"+ response[x].createdAt+"</label><br><br>"+
                        "<label>status: </label>"+
                        "<label id='value_status' >"+ response[x].status+"</label>"+
                    "</div>";
            }
            tab.innerHTML=string_tab;
        },
        error:function(response)
        {
            alert("errore nella visualizzazione dei dati");
            alert(response.status+response.message);
        }
      });
}

function visualizza_job_specifico_utente_specifico()
{
    var user=document.getElementById("ins_user_id_specifico_specifico").value;
    var job=document.getElementById("ins_user_job_id_specifico_specifico").value;
    var tab = document.getElementById("visualizza_job_specifico_utente_specifico_dati");
    var string_tab="";
    $.ajax({
        type: 'GET',
        url: BASEURL + "/api/user/" + user + "/job/" + job,       
        headers: {"Authorization": localStorage.getItem('token')},
        success:function(response)
        {
            tab.innerHTML="<div class='div_visualizza'><label>job_id: </label>"+
                "<label id='value_user_id' >"+response.id+"</label><br><br>"+
                    "<label>user_id: </label>"+
                    "<label id='value_titolo'>"+ response.user_id+"</label><br><br>"+
                    "<label>titolo: </label>"+
                    "<label id='value_titolo'>"+ response.title+"</label><br><br>"+
                    "<label>linguaggio: </label>"+
                    "<label id='value_linguaggio'>"+ response.language+"</label><br><br>"+
                    "<label>framework: </label>"+
                    "<label id='value_frame' >"+ response.framework+"</label><br><br>"+
                    "<label>dataset: </label>"+
                    "<label id='value_dataset' >"+ response.dataset+"</label><br><br>"+
                    "<label>dataset datatype: </label>"+
                    "<label id='value_type_dataset' >"+ response.dataset_datatype+"</label><br><br>"+
                    "<label>model: </label>"+
                    "<label id='value_model' >"+ response.model+"</label><br><br>"+
                    "<label>status: </label>"+
                    "<label id='value_status' >"+ response.status+"</label><br><br>"+
                    "<label>created_at: </label>"+
                    "<label id='value_create'>"+ response.createdAt+"</label><br><br>"+
                    "<label>updated_at: </label>"+
                    "<label id='value_updated_at' >"+ response.updatedAt+"</label><br><br>"+
                "</div>";
        },
        error:function(response)
        {
            alert("errore nella visualizzazione dei dati");
            alert(response.status+response.message);
        }
      });
}
