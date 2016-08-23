// Trumplines by Edward Cheng
//
// Headlines, but Trump.
// https://github.com/edc123/Trumplines
//
// Data provided by The New York Times
// https://developer.nytimes.com/

var data;
var data2015;
var data2016;
var meta;
var currentState = 'year';
var currentYear = '1999';

function preload() {
	meta = loadJSON('/api/meta/' + currentYear);
	data2015 = loadJSON('/api/2015');
	data2016 = loadJSON('/api/2016');
	console.log('done with data');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	noLoop();
}

function yearView() {
	// Year navigation buttons
	var rewindYear = createA('#', '&larr;');
	rewindYear.position(windowWidth/5 - 85, 210);
	rewindYear.id('yearControl');
	rewindYear.mousePressed(goBackAYear);

	var forwardYear = createA('#', '&rarr;');
	forwardYear.position(windowWidth/5 + 155, 210);
	forwardYear.id('yearControl');
	forwardYear.mousePressed(advanceAYear); 

	// Year headline
	var yearHeader = createP(currentYear);
	yearHeader.position(windowWidth/5, 195);
	yearHeader.id('yearHeader');

	// Print all headlines
	for (var i = 0; i <= data.length; i++){
		fill(0);
		var date = createP(data[i].pub_date);
		date.position(windowWidth/5, 310 + (i*100));
		date.id("date");

		var headline = createA(data[i].web_url, data[i].headline);
		headline.position(windowWidth/5, 335 + (i*100));
		headline.id('webUrl');

		// Colours
		var positive = color('#00E676');
		var neutral = color('#000000');
		var negative = color('#FF1744');
		if (data[i].score > 0) headline.style('color', positive);
		else if (data[i].score < 0) headline.style('color', negative);
		else headline.style('color', neutral);
	}
}

// Utils for year()
function goBackAYear() {
	if(currentYear > 1976) {
		currentYear--;
		console.log(currentYear)
		redraw();
	} else return false;
}

function advanceAYear() {
	if(currentYear < 2016) {
		currentYear++;
		console.log(currentYear)
		redraw();
	} else return false;
}

function allYearsView() {
	background(255);
}

function draw() {
	removeElements();
	if (currentState === 'year') {
		yearLoader();
	} else {
		allYearsView();
	}
}

function yearLoader() {
	if (currentYear === 2016) {
		data = data2016;
		yearView();
	} else if (currentYear === 2015) {
		data = data2015;
		yearView();
	} else {
		var dataPath = '/api/' + currentYear;
		data = loadJSON(dataPath, yearView);
		yearView();
	}
}