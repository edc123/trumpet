'use strict'

const config      = require('../../etc')
const fs        = require('fs')
const moment       = require('moment')
const NYT          = require('nyt')
const nyt          = new NYT(config.articleSearchKey)
const sentiment = require('sentiment')

function nytSearch(date, pageNumber) {
	return new Promise((resolve, reject) => {
		nyt.article.search({
			'fq':       'headline:\"Trump\" AND persons:\"Trump, Donald J\"',
			'fl':       'headline,pub_date,web_url',
			begin_date: date,
			end_date:   moment(date).add(12, 'months').format('YYYYMMDD'),
			sort:       'oldest',
			page:       pageNumber
		}, (results) => {
			let metaJSON = JSON.parse(results).response
			if (metaJSON.status === 'ERROR') console.log('Error with nyt api!')
			else resolve(results)
		})
	})
}

function writeToTxt(arg, filename) {
	return new Promise((resolve, reject) => {
		let path = './app/data/' + filename + '.txt'
		console.log('no errors so writing now to ', path)
		fs.appendFile(path, JSON.stringify(arg), 'utf8', (err) => {
			if(err) throw err
			console.log('Done! ', path)
		})
		resolve(1)
	})
}

function readMeta(data, year) {
	return new Promise((resolve, reject) => {
		let rawJSON = JSON.parse(data).response.meta
		let meta = {
			year,
			hits: rawJSON.hits,
			offset: rawJSON.offset
		}
		resolve(meta)
	})
}

function processHeadlines(data) {
	return new Promise((resolve, reject) => {
		let headlinesJSON = JSON.parse(data).response.docs
		let processed = headlinesJSON.map(doc => ({
			headline: doc.headline.main,
			pub_date: moment(doc.pub_date).format('YYYYMMDD'),
			web_url: doc.web_url
		}))
		resolve(processed)
	})
}

// need a function to seperate meta from docs array
// then call write to JSON on each...

	//write meta to totals.json
	//write docs to year.json e.g. '1974.json'

		// let meta = rawJSON.meta
		// let docs = rawJSON.docs
		// console.log(meta)
		// console.log(docs)

		// return 

		// while response.meta.hits > 10, recur nytHalfYear but increment pageNumber++ ... so here we check if we need to continue in this date space
		// then when done -- resolve(results) // need to paginate IF available ie do another nythalfyear...maybe a while loop??, else resolve the results object

//ARBITRARY TRUMPLINE UPDATE

// SENTIMENT ANALYSIS

module.exports = {
	nytSearch,
	writeToTxt,
	readMeta,
	processHeadlines
}