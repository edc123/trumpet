'use strict'

const config    = require('../../etc')
const fs        = require('fs')
const moment    = require('moment')
const NYT       = require('nyt')
const nyt       = new NYT(config.articleSearchKey)
const sentiment = require('sentiment')

const trumpWords = JSON.parse(fs.readFileSync('./app/data/trumpwords.txt', 'utf8'))

function nytSearch(date, pageNumber) {
	return new Promise((resolve, reject) => {
		nyt.article.search({
			'fq':       'headline:\"Trump\" AND persons:\"Trump, Donald J\"',
			'fl':       'headline,pub_date,web_url',
			begin_date: date,
			end_date:   moment(date).add(4, 'months').format('YYYYMMDD'),
			sort:       'oldest',
			page:       pageNumber
		}, (results) => {
			if (JSON.parse(results).response.status === 'ERROR') {
				console.log('Error with nyt api!')
				reject
			}
			else resolve(results)
		})
	})
}

function writeToTxt(arg, filename) {
	return new Promise((resolve, reject) => {
		let path = './app/data/' + filename + '.txt'
		fs.writeFile(path, JSON.stringify(arg), 'utf8', (err) => {
			if(err) throw err
			reject
		})
		resolve(1)
	})
}

function readMeta(data, year) {
	return new Promise((resolve, reject) => {
		let rawJSON = JSON.parse(data).response.meta
		let meta = []
		meta[0] = {
			year,
			hits: rawJSON.hits,
			offset: rawJSON.offset
		}
		resolve(meta)
	})
}

function processMeta(data) {
	return new Promise((resolve, reject) => {
		let processed = data.reduce((sumPeriod, metaPeriod) => ({
			year: metaPeriod.year,
			hits: sumPeriod.hits + metaPeriod.hits
		}))
		resolve(processed)
	})
}

function processHeadlines(data) {
	return new Promise((resolve, reject) => {
		let headlinesJSON = JSON.parse(data).response.docs
		let processed = headlinesJSON.map(doc => ({
			headline: doc.headline.main,
			pub_date: moment(doc.pub_date).format('MMM Do'),
			web_url: doc.web_url
		}))
		resolve(processed)
	})
}

// This should take the entire headlines array and for each element add the score key with sentiment score
function sentimenter(data) {
	return new Promise((resolve, reject) => {
		let sentimentHeadlines = data.map(headline => ({
			headline: headline.headline,
			pub_date: headline.pub_date,
			web_url: headline.web_url,
			score: sentiment(headline.headline, trumpWords).score 
		}))
		resolve(sentimentHeadlines)
	})
}

module.exports = {
	nytSearch,
	writeToTxt,
	readMeta,
	processMeta,
	processHeadlines,
	sentimenter
}