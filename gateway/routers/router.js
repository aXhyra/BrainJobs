var express = require('express');
var router = express.Router()
var service = require('./service')
var frontend = require('./frontend')

router.use((req, res, next) => {
    console.log("Called: ", req.path)
    next()
})

router.use(service);
//router.use(frontend);

module.exports = router