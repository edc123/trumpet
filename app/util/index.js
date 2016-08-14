'use strict'

const sentiment = require('sentiment')

function log(arg) {
	console.log(arg)
}

function writeToFile(arg) {
	console.log(arg)
}

// clean up json data
// apply sentiment 

module.exports = {
	log,
	writeToFile
}