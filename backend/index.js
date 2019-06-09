const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const app = express();
const controllers = require('./controllers');

app.use(bodyParser.urlencoded({
    extended: false
}))

app.disable('x-powered-by');

var allowedOrigins = ['http://localhost:8080'];
const corsOptions = {
    origin: (origin, callback) => {
        // allow requests with no origin 
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}

app.use(cors(corsOptions));

app.use(bodyParser.json())

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
app.post('/api/job/new', urlencodedParser, controllers.job.create);


//----------------------------- GET calls ----------------------------------------//

// GET /api/job/:job_id
app.get('/api/job/:job_id', urlencodedParser, controllers.job.search);

// GET /api/jobs
app.get('/api/jobs', urlencodedParser, controllers.job.userJobs);

// GET /api/jobs/all
app.get('/api/jobs/all', urlencodedParser, controllers.job.allJobs);

// GET /api/user/:user_id/jobs
app.get('/api/user/:user_id/jobs', urlencodedParser, controllers.job.searchUserJobs);

// GET /api/user/:user_id/job/:job_id
app.get('/api/user/:user_id/job/:job_id', urlencodedParser, controllers.job.searchUserJob);

// Starting both http & https servers
const httpServer = http.createServer(app);

httpServer.listen(8080, () => {
    console.log('HTTP Server running on port 8080');
});