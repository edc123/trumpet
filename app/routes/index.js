'use strict'

const fs = require('fs')
const router = require('express').Router()

router.get('/', (req, res) => {
	res.render('index')
})

router.get('/api/total', (req, res) => {
	res.json(test)
})

router.get('/api/:year', (req, res) => {
	let reqJSON = JSON.parse(fs.readFileSync('./app/data/' + req.params.year + '_sentiment.txt', 'utf8'))
	res.json(reqJSON)
})

module.exports = router