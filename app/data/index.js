'use strict'

const config = require('../../etc')
const moment = require('moment')
const NYT    = require('nyt')
const nyt    = new NYT(config.articleSearchKey)
const util   = require('../util')

function getHalfYear(initialDate) {
	let halfYearDate = moment(initialDate).add(6, 'months').format('YYYYMMDD')

	nyt.article.search({
		'q': 'Trump',
		'fq': 'headline:("Trump") AND persons:(\"Trump, Donald J\")',
		'fl': 'headline,pub_date',
		begin_date: initialDate,
		end_date: halfYearDate,
		sort: 'oldest',
		page: '0'
	}, util.log) //maybe validate reponse before continuing. if "error", log
}

getHalfYear('19700101')

// once off scrape
//
// loop getHalfYear...stop at 20160701 (91 iter)...every two iter, UTIL.writeFile to "thatYear".json
// UTIL FUNC - FILTER TRUMPLINES - on "thatYear.json", filter out to just the *main* headline and pub_date
// UTIL FUNC - ARBITRARY TRUMPLINE UPDATE (date 1, date 2) - do start date as 20160701 / 20160702 - then end date 20160814 (92nd final iter)
// UTIL FUNC - SENTIMENT ANALYSIS - sentiment analysis on everything producing new file in final folder
//
// every user visit
//
// do new arbitrary search, if new, filter from memory, sentiment and push to 2016.json
// deal with the consequences on client side js.........progress bar while the update happens iff?