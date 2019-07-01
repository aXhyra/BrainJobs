const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const https = require('https');
const fs = require('fs');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS
const app = express();
var router = require('./routers/router');
const helmet = require('helmet');

const privateKey = fs.readFileSync('/etc/letsencrypt/live/www.brainjobs.tk/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/www.brainjobs.tk/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/www.brainjobs.tk/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

app.use(helmet());

app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(cors());

app.use(bodyParser.json())

app.use(redirectToHTTPS());

app.use(router);

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({
    extended: false
})

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(8080, () => {
    console.log('HTTP Gateway Server running on port 8080');
});

httpsServer.listen(8443, () => {
    console.log('HTTPS Gateway Server running on port 8443');
});