'use strict'

const co        = require('co')
const fs        = require('fs')
const moment    = require('moment')
const util      = require('../util')

let initialDate = '19760101'
let year        = moment(initialDate).format('YYYY')
let headlines   = []
let metaResult = []

// co(function* () {
// 	// Article Search for Whole Year
// 	// console.log('Working on ' + year + '...')
// 	let dates = [initialDate]
// 	for(let i = 1; i <= 2; i++)
// 		dates.push(moment(initialDate).add(4*i, 'months').format('YYYYMMDD'))
// 	let searches = dates.map(date => { return co(search(date)) })
// 	yield Promise.all(searches)
// 	// Sentiment Analysis for Year's headlines
// 	let sentimentedHeadlines = yield util.sentimenter(headlines)
// 	yield util.writeToTxt(sentimentedHeadlines, year+'_sentiment')
// 	let metaProcessed = yield util.processMeta(metaResult)
// 	yield util.writeToTxt(metaProcessed, year+'_meta')
// 	yield co(processResults())
// 	console.log('Done writing all the Trump for ' + year + '!')
// })
// .catch(err => console.error('Error!', err.stack))

function* search(date) {
	let initialSearch = yield util.nytSearch(date, 0)
	let meta = yield util.readMeta(initialSearch, year)
	Array.prototype.push.apply(metaResult, meta)
	let pagesRemaining = Math.floor((meta[0].hits - meta[0].offset)/10)
	let initialResult = yield util.processHeadlines(initialSearch)
	Array.prototype.push.apply(headlines, initialResult)
	for(let i = 1; i <= pagesRemaining; i++) {
		let result = yield util.nytSearch(date, i)
		let resultProcessed = yield util.processHeadlines(result)
		Array.prototype.push.apply(headlines, resultProcessed)
		console.log('cycle: ', i)
	}
}

function* processResults() {
	let metaCompiled = []
	for(let i = 0; i <= 40; i++) {
		let headlineCompiled = []
		let currentYear = moment(initialDate).add(i, 'Y').format('YYYY')
		let currentPath = './app/data/' + currentYear + '_meta.txt'
		let yearPath = './app/data/' + currentYear + '_sentiment.txt'
		console.log('Reading', currentPath)
		let metaPart = JSON.parse(fs.readFileSync(currentPath, 'utf8'))
		metaCompiled.push(metaPart)
		let headlinePart = JSON.parse(fs.readFileSync(yearPath, 'utf8'))
		let headlinePartSorted = headlinePart.sort((left, right) => {
			return (moment(left.pub_date, 'MMM Do')).diff(moment(right.pub_date, 'MMM Do'))
		})
		headlineCompiled.push(headlinePartSorted)
		yield util.writeToTxt(headlineCompiled, currentYear)
	}
	yield util.writeToTxt(metaCompiled, 'allMeta')
	console.log('Done final processing!')
}