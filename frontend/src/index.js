const BASEURL = 'https://www.brainjobs.tk:8443'

function login()
{
    var user = document.getElementById("user").value;
    var password = document.getElementById("password").value;
    var dati = {username: user, password: password};
    $.ajax({
        type: "post",
        url: BASEURL + '/login',
        data: dati,
        success: function(response)
        {
            localStorage.setItem('token', response["token"]);
            localStorage.setItem('admin', response["isAdmin"]);
            location.href="visualizza.html";
        },
        error:function(response)
        {
            alert("errore nel login");
            alert(response.status+response.message);
        }
    })
}

function registrazione()
{
    var email = document.getElementById("reg_email").value;
    var iduser = document.getElementById("reg_iduser").value;
    var password = document.getElementById("reg_password").value;
    var dati = {username: iduser, password:password, email:email};
    $.ajax({
        type: "post",
        url: BASEURL + "/register",
        data: dati,
        success: function(response)
        {
            alert("registrazione effettuato con successo");
            location.href="login.html";
        },
        error:function(response)
        {
            alert("errore nella registrazione");
            alert(response.status+response.message);
        }
    })
}

function vis_login()
{
    location.href="login.html";
}

function vis_home()
{
    location.href="index.html";
}

function vis_registrazione()
{
    location.href="registrazione.html";
}