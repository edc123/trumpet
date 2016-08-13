'use strict'

const fs = require('fs')
const path = require('path')
const router = require('express').Router()

// API
const test = require('../data/test.json')

router.get('/', (req, res, next) => {
	res.render('index')
})

// API GOES HERE

router.get('/api/test', (req, res, next) => {
	res.send(test)
})

router.get('/api/', (req, res, next) => {
	res.send(test)
})


module.exports = router