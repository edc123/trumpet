'use strict'

const co        = require('co')
const moment    = require('moment')
const Promise   = require('bluebird')
const util      = require('../util')

let initialDate = '20150101'
let nextDate    = moment(initialDate).add(4, 'months').format('YYYYMMDD')
let lastDate    = moment(initialDate).add(8, 'months').format('YYYYMMDD')
let year        = moment(initialDate).format('YYYY')

let headlines   = []

co(function* () {
	console.log('Working on ' + year)
	let dates    = [initialDate, nextDate, lastDate]
	let searches = dates.map((date) => { return co(search(date)) })
	yield Promise.all(searches)
	yield util.writeToTxt(headlines, year)
})

function* search(date) {
	let initialSearch  = yield util.nytSearch(date, 0)
	let meta           = yield util.readMeta(initialSearch, year)
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