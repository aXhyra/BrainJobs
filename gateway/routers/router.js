var express = require('express');
var router = express.Router()
var service = require('./service')

router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

router.use(service);

module.exports = router