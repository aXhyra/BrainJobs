const express = require('express');
const router = express.Router()
const service = require('./service')

router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

router.use(service);

module.exports = router