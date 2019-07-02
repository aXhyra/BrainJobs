const express = require('express');
const router = express.Router();
const apiAdapter = require('./apiAdapter');
const middleware = require('../middleware');
const docs = require('../apiCallDocs');

const BASE_URL = 'http://localhost:8081'
const api = apiAdapter(BASE_URL)


//----------------------------- POST calls ----------------------------------------//

// POST /login
router.post('/login', (req, res) => {
    api.post(req.path, req.body)
        .then(resp => {
            res.send(resp.data);
        })
        .catch(err => {
            console.log("error during " + req.path + " " + err.response.data.message);
            res.status(err.response.status).send(err.response.data);
        })
})

// POST /register
router.post('/register', (req, res) => {
    api.post(req.path, req.body)
        .then(resp => {
            res.send(resp.data);
        })
        .catch(err => {
            console.log("error during " + req.path + " " + err.response.data.message);
            res.status(err.response.status).send(err.response.data);
        })
})

// POST /api/job/new
router.post('/api/job/new', middleware.checkToken, (req, res) => {
    req.body.authorization = req.headers['authorization'];
    api.post(req.path, req.body)
        .then(resp => {
            res.send(resp.data);
        })
        .catch(err => {
            console.log("error during " + req.path + " " + err.response.data.message);
            res.status(err.response.status).send(err.response.data);
        })
})

//----------------------------- GET calls ----------------------------------------//

// GET /api/jobs
router.get('/api/jobs', middleware.checkToken, (req, res) => {
    api.get(req.path, {
        headers: req.headers
    })
        .then(resp => {
            res.send(resp.data);
        })
        .catch(err => {
            console.log("error during " + req.path + " " + err.response.data.message);
            res.status(err.response.status).send(err.response.data);
        })
})

// GET /api/job/:job_id
router.get('/api/job/:job_id', middleware.checkToken, (req, res) => {
    api.get(req.path, {
        headers: req.headers
    })
        .then(resp => {
            res.send(resp.data);
        })
        .catch(err => {
            console.log("error during " + req.path + " " + err.response.data.message);
            res.status(err.response.status).send(err.response.data);
        })
})

// GET /api/jobs/all
router.get('/api/jobs/all', middleware.checkToken, (req, res) => {
    console.log(req.headers);
    api.get(req.path, {
        headers: req.headers
    })
        .then(resp => {
            res.send(resp.data);
        })
        .catch(err => {
            console.log("error during " + req.path + " " + err.response.data.message);
            res.status(err.response.status).send(err.response.data);
        })
})

// GET /api/user/:user_id/jobs
router.get('/api/user/:user_id/jobs', middleware.checkToken, (req, res) => {
    api.get(req.path, {
        headers: req.headers
    })
        .then(resp => {
            res.send(resp.data);
        })
        .catch(err => {
            console.log("error during " + req.path + " " + err.response.data.message);
            res.status(err.response.status).send(err.response.data);
        })
})

// GET /api/user/:user_id/job/:job_id
router.get('/api/user/:user_id/job/:job_id', middleware.checkToken, (req, res) => {
    api.get(req.path, {
        headers: req.headers
    })
        .then(resp => {
            res.send(resp.data);
        })
        .catch(err => {
            console.log("error during " + req.path + " " + err.response.data.message);
            res.status(err.response.status).send(err.response.data);
        })
})

// GET /api/users
router.get('/api/users', middleware.checkToken, (req, res) => {
    api.get(req.path, {
        headers: req.headers
    })
        .then(resp => {
            res.send(resp.data);
        })
        .catch(err => {
            console.log("error during " + req.path + " " + err.response.data.message);
            res.status(err.response.status).send(err.response.data)
        })
})

// GET /api/docs
router.get('/api/docs', docs);

// GET * 404
router.get('*', (req, res) => {
    res.status(404).send('Not Found');
})

module.exports = router