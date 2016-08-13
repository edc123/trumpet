'use strict'

const prettyjson = require('prettyjson')

function prettyPrint(arg) {
	prettyjson.render(arg)
}

module.exports = {
	prettyPrint
}