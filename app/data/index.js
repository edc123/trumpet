'use strict'

const config = require('../../etc')
const moment = require('moment')
const NYT = require('nyt')
const nyt = new NYT(config.articleSearchKey)
const util = require('../util')

// It's really get-half-a-year...

function getYear(initialDate) {
	let addHalfYear   = moment(initialDate).add(6, 'months').format('YYYYMMDD')
	
	nyt.article.search({
		'q': 'Trump',
		'fq': 'headline: "Trump" AND persons: \"Trump, Donald J\"',
		'fl': 'headline,pub_date',
		begin_date: initialDate,
		end_date: addHalfYear,
		sort: 'oldest'
	}, util.log)

	getYear(addHalfYear)
}

//for every year...getYear! initDate needs to be string!
getYear('20160101')

//clean up json files