'use strict'

const config    = require('../../etc')
const fs        = require('fs')
const moment    = require('moment')
const NYT       = require('nyt')
const nyt       = new NYT(config.articleSearchKey)
const sentiment = require('sentiment')

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
			console.log('Done writing all the Trump to ' + path + '!')
			reject
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
		let metaArr = [meta]
		resolve(metaArr)
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

function sentimenter(data) {
	return new Promise((resolve, reject) => {
		let sentimentHeadlines = data.foreach((headline) => {
			console.log(headline.headline)
			sentiment(headline.headline)
		})
		resolve(sentimentHeadlines)
	})
}

module.exports = {
	nytSearch,
	writeToTxt,
	readMeta,
	processHeadlines,
	sentimenter
}