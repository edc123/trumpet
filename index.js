'use strict'

const express    = require('express')
const app        = express()
const trumplines = require('./app')

app.set('port', process.env.PORT || 3000)
app.set('view engine', 'pug')
app.use(express.static('public'))
app.use('/', trumplines.router)

if (app.get('env') === 'development') {
	app.locals.pretty = true
}

app.listen(app.get('port'), () => {
	console.log('Trump on line', app.get('port'))
})