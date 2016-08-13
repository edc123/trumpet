'use strict'

const config = require('../../etc')
const NYT = require('nyt')
const nyt = new NYT(config.articleSearchKey)
const util = require('../util')

function getYear(year) {
	let startDate = year + '0101'
	let endDate   = year + '1231'

	nyt.article.search({ 
		'fq': 'persons: \"Trump, Donald J\"',
		'fl': 'headline,pub_date',
		begin_date: startDate,
		end_date: endDate,
		sort: 'oldest'
	}, util.log)
}

getYear(2016)