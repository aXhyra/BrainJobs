const fs = require('fs');
const http = require('http');
const express = require('express');
const helmet = require('helmet');
/* version on https://www.brainjobs.tk
const https = require('https');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS
*/

const app = express();

app.use(helmet());
/* version on https://www.brainjobs.tk
app.use(redirectToHTTPS());
*/
app.use(express.static(('./src') || 'dist'));
app.get('/', function (req, res) {
    return res.end('<p>This server serves up static files.</p>');
});

/* version on https://www.brainjobs.tk
const privateKey = fs.readFileSync('/etc/letsencrypt/live/www.brainjobs.tk/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/www.brainjobs.tk/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/www.brainjobs.tk/chain.pem', 'utf8');
*/

// Starting both http & https servers
const httpServer = http.createServer(app);

/* Version on https://www.brainjobs.tk
httpServer.listen(80, () => {
    console.log('HTTP Gateway Server running on port 80');
});

httpsServer.listen(443, () => {
    console.log('HTTPS Gateway Server running on port 443');
});
*/

httpServer.listen(8080, () => {
    console.log('HTTP Frontend Server running on port 8080');
});