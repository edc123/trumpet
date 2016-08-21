'use strict'

const fs = require('fs')

let data = {
	'name': 'Joseph Yeo',
	'age': 1
}

let path = './app/data/' + data.age + '.json'

fs.writeFile(path, data, (err) => {
		if(err) throw err
		console.log('Done! ', path)
	})