const express = require('express');
const router = express.Router();
const apiAdapter = require('./apiAdapter');

const BASE_URL = 'http://localhost:8080/'
const api = apiAdapter(BASE_URL)

router.get('*', (req, res) => {
    api.get(req.path)
        .then(resp => {
            res.status(200).send(resp.data);
        })
        .catch(resp => {
            res.status(500).send(resp);
        })
})

module.exports = router