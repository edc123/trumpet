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
		'fq': 'headline: "Trump" AND persons: \"Trump, Donald J\"',
		'fl': 'headline,pub_date',
		begin_date: initialDate,
		end_date: halfYearDate,
		sort: 'oldest'
	}, util.log)

	getHalfYear(halfYearDate)
}

getHalfYear('19700101')
// till current date...

//should be ~90 requests the API total... at 5 calls a second ~ 18 calls per use - 1970
//should be ~50 requests the API total... at 5 calls a second ~ 10 calls per use - 1990