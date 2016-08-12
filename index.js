'use strict'

const express = require('express')
	, app     = express()
	, trumplines = require('./app')

app.set('port', process.env.PORT || 3000)
app.set('view engine', 'pug')
app.use(express.static('public'))
app.use('/', trumplines.router)

app.listen(3000, () => {
	console.log('Trump on line', app.get('port'))
})