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
	meta = loadJSON('/api/meta/all');
	data2015 = loadJSON('/api/2015');
	data2016 = loadJSON('/api/2016');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	noLoop();
}

function yearView() {
	//width of one bar (windowWidth - 72 - 10)/40
	// The year-by-year total articles graph navigation thing
	for(var i in meta) {
		let positionX = 36 + ((windowWidth - 72 - 10)/40)*i
		drawBar(meta[i].year, meta[i].hits, positionX)
	}

	// Year navigation buttons
	var rewindYear = createA('#', '&larr;');
	rewindYear.position(windowWidth/5 - 50, 243);
	rewindYear.id('yearControl');
	rewindYear.mousePressed(goBackAYear);

	var forwardYear = createA('#', '&rarr;');
	forwardYear.position(windowWidth/5 + 137, 243);
	forwardYear.id('yearControl');
	forwardYear.mousePressed(advanceAYear); 

	// Year headline
	var yearHeader = createP(currentYear);
	yearHeader.position(windowWidth/5, 225);
	yearHeader.id('yearHeader');
	
	// Print all headlines
	for (var i = 0; i <= data.length; i++){
		fill(0);
		var date = createP(data[i].pub_date);
		date.position(windowWidth/5, 340 + (i*100));
		date.id("date");

		var headline = createA(data[i].web_url, data[i].headline);
		headline.position(windowWidth/5, 365 + (i*100));
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
function drawBar (label, height, positionX) {
	rectMode(CORNERS);
	noStroke();
	fill(0);
	rect(positionX, 170, positionX+5, -height+169);
	var yearLabel = createDiv(label);
	yearLabel.position(positionX-15, 180);
	yearLabel.id('yearLabel');
	yearLabel.hide();
	yearLabel.mouseOver(show);
}

function show() {
	yearLabel.show();
}

function goBackAYear() {
	if(currentYear > 1976) {
		currentYear--;
		redraw();
	} else return false;
}

function advanceAYear() {
	if(currentYear < 2016) {
		currentYear++;
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