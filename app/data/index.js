'use strict'

const config = require('../../etc')
const util = require('../util')
const NYT = require('nyt')
const nyt = new NYT(config.articleSearchKey)

nyt.article.search({'q':'trump'}, util.prettyPrint)