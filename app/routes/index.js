'use strict'

const fs = require('fs')
const ms = require('mediaserver')
const router = require('express').Router()

router.get('/', (req, res) => {
	res.render('index')
})

router.get('/trump.mp3', (req, res) => {
	ms.pipe(req, res, './public/trump.mp3')
})

router.get('/trumpface.png', (req, res) => {
	ms.pipe(req, res, './public/img/trumpfb.png')
})

router.get('/api/:year', (req, res) => {
	let reqJSON = JSON.parse(fs.readFileSync('./app/data/' + req.params.year + '.txt', 'utf8'))[0]
	res.json(reqJSON)
})

router.get('/api/meta/all', (req, res) => {
	let reqJSON = JSON.parse(fs.readFileSync('./app/data/allMeta.txt', 'utf8'))
	res.json(reqJSON)
})

router.get('/api/meta/:year', (req, res) => {
	let reqJSON = JSON.parse(fs.readFileSync('./app/data/' + req.params.year + '_meta.txt', 'utf8'))
	res.json(reqJSON)
})

module.exports = router