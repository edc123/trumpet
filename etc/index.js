'use strict'

if(process.env.NODE_ENV === 'production') {
	module.exports = {
		host: process.env.host || '',
		articleSearchKey: process.env.articleSearchKey
	}

} else {
	module.exports = require('./development.json')
}