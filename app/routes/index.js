'use strict'

const router = require('express').Router()

router.get('/', (req, res, next) => {
	res.render('index')
})

// API GOES HERE




module.exports = router