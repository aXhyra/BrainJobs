const express = require('express');
const router = express.Router();
const apiAdapter = require('./apiAdapter');
const middleware = require('../middleware');
const docs = require('../apiCallDocs');

const BASE_URL = 'http://localhost:8080'
const api = apiAdapter(BASE_URL)

router.post('/login', (req, res) => {
    api.post(req.path, req.body).then(resp => {
        status = !resp.data.statusC ? 200 : resp.data.statusC;
        delete resp.data['statusC'];
        data = resp.data;
        res.status(status).send(data);
    })
     .catch(resp => {
         res.send(resp.data);
     })
})

router.post('/register', (req, res) => {
    api.post(req.path, req.body).then(resp => {
        status = !resp.data.statusC ? 200 : resp.data.statusC;
        delete resp.data['statusC'];
        data = resp.data;
        res.status(status).send(data);
    })
    .catch(resp => {
        res.sendStatus(500);
    })
})

router.post('/api/job/new', middleware.checkToken, (req, res) => {
    req.body.user_id = req.decoded.user_id
    api.post(req.path, req.body).then(resp => {
        console.log("ciao");
        status = !resp.data.statusC ? 200 : resp.data.statusC;
        delete resp.data['statusC'];
        data = resp.data;
        res.status(status).send(data);
    })
     .catch(resp => {
         console.log(resp)
         res.send(resp);
     })
})

router.get('/api/jobs', middleware.checkToken, (req, res) => {
    api.get(req.path + '?user_id=' + req.decoded.user_id)
        .then(resp => {
            status = !resp.data.statusC ? 200 : resp.data.statusC;
            delete resp.data['statusC'];
            data = resp.data;
            res.status(status).send(data);
            })
        .catch(resp => {
            res.status(500).send(resp);
        })
})

router.get('/api/job/:job_id', middleware.checkToken, (req, res) => {
    api.get(req.path + '?user_id=' + req.decoded.user_id)
        .then(resp => {
            status = !resp.data.statusC ? 200 : resp.data.statusC;
            delete resp.data['statusC'];
            data = resp.data;
            res.status(status).send(data);
        })
        .catch(resp => {
            res.status(500).send(resp);
        })
})

router.get('/api/jobs/all', middleware.checkToken, (req, res) => {
    api.get(req.path + '?isAdmin=' + req.decoded.isAdmin)
        .then(resp => {
            status = !resp.data.statusC ? 200 : resp.data.statusC;
            delete resp.data['statusC'];
            data = resp.data;
            res.status(status).send(data);
        })
        .catch(resp => {
                res.status(500).send(resp);
        })
})

router.get('/api/user/:user_id/jobs', middleware.checkToken, (req, res) => {
    api.get(req.path + '?isAdmin=' + req.decoded.isAdmin)
        .then(resp => {
            status = !resp.data.statusC ? 200 : resp.data.statusC;
            delete resp.data['statusC'];
            data = resp.data;
            res.status(status).send(data);
        })
        .catch(resp => {
            res.status(500).send(resp);
        })
})

router.get('/api/user/:user_id/job/:job_id', middleware.checkToken, (req, res) => {
    api.get(req.path + '?isAdmin=' + req.decoded.isAdmin)
        .then(resp => {
            status = !resp.data.statusC ? 200 : resp.data.statusC;
            delete resp.data['statusC'];
            data = resp.data;
            res.status(status).send(data);
        })
        .catch(resp => {
            res.status(500).send(resp);
        })
})

router.get('/api/docs', docs);

router.get('/logs', (req, res) => {
    res.sendFile('/home/alind/Sistemi_distribuiti/log.log');
})

module.exports = router