const express = require('express');
const router = express.Router();
const apiAdapter = require('./apiAdapter');

const BASE_URL = 'https://localhost:4430'
const api = apiAdapter(BASE_URL)

router.post('/login', (req, res) => {
    api.post(req.path, req.body).then(resp => {
        res.send(resp.data);
    })
})

router.post('/register', (req, res) => {
    api.post(req.path, req.body).then(resp => {
        res.send(resp.data);
    })
})



module.exports = router