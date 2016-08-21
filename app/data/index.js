'use strict'

const co        = require('co')
const moment    = require('moment')
// const Promise   = require('bluebird')
// const sentiment = require('sentiment')
// Promise.promisifyAll(sentiment)
const util      = require('../util')

let initialDate = '19760101'
let year        = moment(initialDate).format('YYYY')

let headlines   = []

co(function* () {
	console.log('Working on ' + year)
	let dates    = [initialDate]
	for(let i = 1; i <= 2; i++)
		dates.push(moment(initialDate).add(4*i, 'months').format('YYYYMMDD'))
	let searches = dates.map((date) => { return co(search(date)) })
	yield Promise.all(searches)
	//sentiment analysis each item
	// let sentimentHeadlines = yield Promise.map(headlines, (headline) => {
	// 	sentimentAsync(headline[0].headline)
	// })
	// console.log(sentimentHeadlines)
	// yield util.writeToTxt(sentimentHeadlines, year+'_sentiment')
	yield util.writeToTxt(headlines, year)
})

function* search(date) {
	let initialSearch  = yield util.nytSearch(date, 0)
	let meta           = yield util.readMeta(initialSearch, year)
	yield util.writeToTxt(meta, year+'_meta')
	let pagesRemaining = Math.floor((meta.hits - meta.offset)/10)
	let initialResult  = yield util.processHeadlines(initialSearch)
	Array.prototype.push.apply(headlines, initialResult)

	for(let i = 1; i <= pagesRemaining; i++) {
		let result          = yield util.nytSearch(date, i)
		let resultProcessed = yield util.processHeadlines(result)
		Array.prototype.push.apply(headlines, resultProcessed)
		// console.log('cycle:', i)
	}
}