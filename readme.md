BrainJobs
=========

## Introduzione

Servizio completo disponibile su https://www.brainjobs.tk
Github (disponibile dal giorno successivo alla chiusura della consegna) https://github.com/aXhyra/BrainJobs

Nota: nella versione consegnata é stata disabilitata (commentata) la parte relativa ad https per problemi
riscontrati con i certificati autofirmati, per cui la questa versione é sprovvista di https a differenza di quella
su https://www.brainjobs.tk

Il nostro gruppo ha svolto la variante 2 del progetto, abbiamo quindi 3 cartelle una per ogni web server del progetto:

* backend
* gateway
* frontend

Tutti e tre i sottoprogetti utilizzano node, nello specifico gateway e backend utilizzano il framework express,
mentre il backend é stato scritto in html e css, utilizzando express come semplice server di pagine statiche.
Ulteriori dettagli nelle sottosezioni dei rispettivi servizi.

## Installazione e avvio

Tutti i servizi sono stati testati con node (v12.5.0 e V8.16.0) e npm v6.9.0
su linux (debian 9), macOS (10.14.5 e macOS 10.15beta) e wsl su windows 10.
Per l'avvio e l'installazione delle dipendenze é disponibile lo script start.sh che si occuperá di tutto
Sono richiesti nodeJs e npm.
Una volta lanciato lo script attendere che l'installazione e l'avvio terminino, poi aprire il browser su http://localhost:8080

## Backend

Come specificato nell'introduzione il backend é stato scritto utilizzando il framework express per nodeJs.
Come richiesto dalla traccia il backend espone un servizio api sulla porta 8081.
Il backend si occupa anche del servizio di autenticazione (login) degli utenti (accorpato al backend per mantenere la struttura del servizio mostrata nel pdf della traccia).
Il backend utilizza un database sqlite (sempre per mantenere la struttura del servizio) con due tabelle: Users e Jobs.
Per l'autenticazione si é utilizzato un token jwt, le password NON vengono salvate in chiaro nel db.

Utenti di prova
---------------
* username: admin, password: admin
* username: marmellata, password: marmellata
* username: JohnBrainjobs, password: password
* username: tonno, password: tonno
* username: utente, password: password

Tutti i seguenti utenti, fatta eccezione per utente, hanno dei job.

Fonti usate per la scrittura del backend
----------------------------------------
* Documentazione ufficiale di express https://expressjs.com/en/api.html
* Articolo su medium per l'autenticazione con jwt https://medium.com/swlh/a-practical-guide-for-jwt-authentication-using-nodejs-and-express-d48369e7e6d4
* Stackoverflow

## Gateway

Come il backend anche il gateway utilizza express, con router per inoltrare le chiamate al backend,
il Gateway espone un servizio api rest HTTP sulla porta 8082  (8080 HTTP e 8443 HTTPS nella versione su https://www.brainjobs.tk).

Endpoint
--------
I path del gateway sono gli stessi del backend e sono:

POST:
* /login
* /register

GET:
* /api/jobs Restituisce un json con tutti i job dell'utente loggato
* /api/job/{job_id} Restituisce tutti i dettagli di {job_id} ({job_id} debe essere dell'utente loggato)

chiamete riservate all'utente admin (sempre GET):

* /api/jobs/all Restutisce tutti i job di tutti gli utenti
* /api/users Restituisce tutti gli utenti
* /api/user/{user_id}/jobs Restituisce tutti i job dell'utente {user_id}
* /api/user/{user_id}/job/{job_id} Restituisce tutti i dettagli del job {job_id} dell'utente {user_id}

Tutte le chiamate che hanno /api nel path richiedono che l'utente sia autenticato (il campo 'Authorization' nell'header della richiesta deve contenere il token jwt),
il sistema in caso contrario ritorna un 401-Unauthorized.
Sia il gateway che il backend controllano che il token fornito sia valido e non scaduto.

Fonti usate per la scrittura del gateway
----------------------------------------
* Documentazione ufficiale di express https://expressjs.com/en/api.html
* Stackoverflow

## Frontend

Il frontend utilizza express come server di pagine statiche, le pagine sono state scritte utilizzando HTML e CSS,
con jquery come framework javascript per le chiamate API e per il caricamento dinamico delle pagine.
É stato inoltre utilizzato w3.css come "appoggio" per rendere le pagine responsive e mobile friendly.
Il servizio frontend usa la porta 8080 (80 e 443 nella versione su https://www.brainjobs.tk)

Fonti usate per la scrittura del frontend
----------------------------------------
* Stackoverflow
* W3Schools www.w3schools.com
* Slide del corso
