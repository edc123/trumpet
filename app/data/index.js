'use strict'

const co        = require('co')
const moment    = require('moment')
const util      = require('../util')

let initialDate = '20160101'
let year        = moment(initialDate).format('YYYY')
let headlines   = []

co(function* () {
	// Article Search for Whole Year
	console.log('Working on ' + year + '...')
	let dates = [initialDate]
	for(let i = 1; i <= 2; i++)
		dates.push(moment(initialDate).add(4*i, 'months').format('YYYYMMDD'))
	let searches = dates.map(date => { return co(search(date)) })
	yield Promise.all(searches)
	// yield util.writeToTxt(headlines, year)
	// Sentiment Analysis for Year's headlines
	let sentimentedHeadlines = yield util.sentimenter(headlines)
	yield util.writeToTxt(sentimentedHeadlines, year+'_sentiment')
}).catch((err) => console.error('Error!', err.stack))

function* search(date) {
	let initialSearch = yield util.nytSearch(date, 0)
	let meta = yield util.readMeta(initialSearch, year)
	yield util.writeToTxt(meta, year+'_meta')
	let pagesRemaining = Math.floor((meta.hits - meta.offset)/10)
	let initialResult = yield util.processHeadlines(initialSearch)
	Array.prototype.push.apply(headlines, initialResult)
	for(let i = 1; i <= pagesRemaining; i++) {
		let result = yield util.nytSearch(date, i)
		let resultProcessed = yield util.processHeadlines(result)
		Array.prototype.push.apply(headlines, resultProcessed)
		console.log('cycle: ', i)
	}
}
