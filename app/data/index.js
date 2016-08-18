'use strict'

const config = require('../../etc')
const moment = require('moment')
const NYT    = require('nyt')
const nyt    = new NYT(config.articleSearchKey)
const util   = require('../util')

let initialDate = '19760101'

// I envision a promise.all eventually here...for all 91 promises...

nytHalfYear(initialDate)
	.then((results) => {
		util.writeToJSON(results)
	})

// do two of the following promise to get 1 years data...eventually do a lot of these? but the api...

function nytHalfYear(date) {
	// This needs to be a promise
	return new Promise((resolve, reject) => {
		let dateAndAHalf = moment(date).add(6, 'months').format('YYYYMMDD')
		nyt.article.search({
			'fq': 'headline:\"Trump\" AND persons:\"Trump, Donald J\"',
			'fl': 'headline,pub_date,web_url',
			begin_date: date,
			end_date: dateAndAHalf,
			sort: 'oldest',
			page: '0' // needs to be incrementable with a while loop
		}, (results) => {
			if (JSON.parse(results).status === 'ERROR') reject(console.log('Error with nyt api!'))
			else {
				// while response.meta.hits > 10, recur nytHalfYear but increment page++
				// then when done -- resolve(results) // need to paginate IF available ie do another nythalfyear...maybe a while loop??, else resolve the results object
			}
		})
	})
}
// once off scrape...
//
// LOOP (stop at 20160701 (91 iter)) DO nytHalfYear, nest loop over ceil(response.meta.hits / 10)
// times to do pages......every two iter, UTIL.writeFile to "thatYear".json, if anything returns...
//
// UTIL FUNC - FILTER TRUMPLINES - on "thatYear.json", filter out to just the *main* headline and pub_date ... highland streaming map reduce magicks here
//
// UTIL FUNC - COUNTER - log to meta.json under the year counter the response meta items each half year
// to corresponding year.
//
// UTIL FUNC - ARBITRARY TRUMPLINE UPDATE (date 1, date 2) - do start date as 20160701 / 20160702 - then
// end date 20160814 (92nd final iter).
//
// UTIL FUNC - SENTIMENT ANALYSIS - sentiment analysis on everything producing new file in final folder,
// COUNTER to add count of positive and negative per year??
//
// every user visit...
//
// do new arbitrary update, if new, filter from memory, sentiment and push to 2016.json
// deal with the consequences on client side js.........progress bar while the update happens iff?