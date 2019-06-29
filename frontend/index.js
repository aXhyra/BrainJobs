const fs = require('fs');
const http = require('http');
const https = require('https');
const express = require('express');
const helmet = require('helmet');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS

const app = express();

app.use(helmet());
app.use(redirectToHTTPS());
app.use(express.static(('./src') || 'dist'));
app.get('/', function (req, res) {
    return res.end('<p>This server serves up static files.</p>');
});

const privateKey = fs.readFileSync('/etc/letsencrypt/live/www.brainjobs.tk/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/www.brainjobs.tk/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/www.brainjobs.tk/chain.pem', 'utf8');

const options = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(options, app);

httpServer.listen(80, () => {
    console.log('HTTP Gateway Server running on port 80');
});

httpsServer.listen(443, () => {
    console.log('HTTPS Gateway Server running on port 443');
});
