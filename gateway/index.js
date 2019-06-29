const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const https = require('https');
const fs = require('fs');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS
const morgan = require('morgan');
const app = express();
var router = require('./routers/router');
const log = require('simple-node-logger').createSimpleLogger('../log.log');
const helmet = require('helmet');

log.setLevel('debug');

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

app.use(morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :req[header] :status :response-time ms :res[content-length] :res[header] ":referrer" ":user-agent"'
));

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({
    extended: false
})
const jsonParser = bodyParser.json()

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(8080, () => {
    console.log('HTTP Gateway Server running on port 8080');
});

httpsServer.listen(8443, () => {
    console.log('HTTPS Gateway Server running on port 8443');
});
