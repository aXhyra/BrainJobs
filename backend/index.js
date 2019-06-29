const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const morgan = require('morgan');
const app = express();
const controllers = require('./controllers');
const middleware = require('./middleware');

app.use(bodyParser.urlencoded({
    extended: false
}))

app.disable('x-powered-by');

app.use(cors());

app.use(bodyParser.json())

app.use(morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :req[header] :status :response-time ms :res[content-length] :res[header] ":referrer" ":user-agent"'
    ));

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({
    extended: false
})
const jsonParser = bodyParser.json()

//----------------------------- POST calls ----------------------------------------//

// POST /login
app.post('/login', urlencodedParser,controllers.user.search);

// POST /register
app.post('/register', urlencodedParser, controllers.user.create);

// POST /api/job/new
app.post('/api/job/new', urlencodedParser, middleware.checkToken, controllers.job.create);


//----------------------------- GET calls ----------------------------------------//

// GET /api/job/:job_id
app.get('/api/job/:job_id', urlencodedParser, middleware.checkToken, controllers.job.search);

// GET /api/jobs
app.get('/api/jobs', urlencodedParser, middleware.checkToken, controllers.job.userJobs);

// GET /api/jobs/all
app.get('/api/jobs/all', urlencodedParser, middleware.checkToken, controllers.job.allJobs);

// GET /api/user/:user_id/jobs
app.get('/api/user/:user_id/jobs', urlencodedParser, middleware.checkToken, controllers.job.searchUserJobs);

// GET /api/user/:user_id/job/:job_id
app.get('/api/user/:user_id/job/:job_id', urlencodedParser, middleware.checkToken, controllers.job.searchUserJob);

// GET /api/users
app.get('/api/users', urlencodedParser, middleware.checkToken, controllers.user.getUsers);

// Starting both http & https servers
const httpServer = http.createServer(app);

httpServer.listen(8081, () => {
    console.log('HTTP Server running on port 8081');
});