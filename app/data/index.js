'use strict'

const moment     = require('moment')
const Promise    = require('bluebird')
const util       = require('../util')

let initialDate  = '20160502'
let year         = moment(initialDate).format('YYYY')

Promise.coroutine(function* () {
	
	let headlines    = []
	let initialSearch = yield util.nytSearch(initialDate, 0)
	let meta = yield util.readMeta(initialSearch, year)
	console.log(meta.hits)
	let pagesRemaining = Math.floor((meta.hits - meta.offset)/10)
	let initialResult = yield util.processHeadlines(initialSearch)
	Array.prototype.push.apply(headlines, initialResult)

	for(let i = 1; i <= pagesRemaining; i++) {
		let result = yield util.nytSearch(initialDate, i)
		let resultProcessed = yield util.processHeadlines(result)
		Array.prototype.push.apply(headlines, resultProcessed)
		console.log('cycle:', i)
	}

	yield util.writeToTxt(headlines, year)
	
})()
