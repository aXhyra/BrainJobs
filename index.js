const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const https = require('https');
const fs = require('fs');
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS
const middleware = require('./middleware');
const morgan = require('morgan');
const path = require('path');
const app = express();
const controllers = require('./controllers');

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/www.brainjobs.tk/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/www.brainjobs.tk/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/www.brainjobs.tk/chain.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
};

app.use(bodyParser.urlencoded({
    extended: false
}))

app.disable('x-powered-by');

app.use(cors());

app.use(bodyParser.json())

app.use(redirectToHTTPS());

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :req[header] :status :response-time ms :res[content-length] :res[header] ":referrer" ":user-agent"', {
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {
            flags: 'a'
        })}));

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({
    extended: false
})
const jsonParser = bodyParser.json()

//----------------------------- POST calls ----------------------------------------//
// POST /login
app.post('/login', urlencodedParser, controllers.user.search);

// POST /register
app.post('/register', urlencodedParser, controllers.user.create);

// POST /api/job/new
app.post('/api/job/new', urlencodedParser, middleware.checkToken, controllers.job.create);

//----------------------------- GET calls ----------------------------------------//
// GET /api/jobs
app.get('/api/jobs', urlencodedParser, middleware.checkToken, controllers.job.userJobs);

// GET /api/jobs/all
app.get('/api/jobs/all', urlencodedParser, middleware.checkToken, controllers.job.allJobs);

// GET /api/jobs/user
app.get('/api/jobs/user', urlencodedParser, middleware.checkToken, controllers.job.searchUserJob);

// GET /api/job
app.get('/api/job', urlencodedParser, middleware.checkToken, controllers.job.search);


// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80, () => {
    console.log('HTTP Server running on port 80');
});

httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});