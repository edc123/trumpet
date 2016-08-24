// Trumplines by Edward Cheng
//
// Headlines, but Trump.
// https://github.com/edc123/Trumplines
//
// Data provided by The New York Times
// https://developer.nytimes.com/

// Init data
var data;
var data2015;
var data2016;
var meta;

// Init states
var currentState = 'year';
var currentYear = '1976';

function preload() {
	meta = loadJSON('/api/meta/all');
	data2015 = loadJSON('/api/2015');
	data2016 = loadJSON('/api/2016');
}

function setup() {
	createCanvas(windowWidth, windowHeight-20);
	noLoop();
}

function yearView() {
	// // Display introductory hot tip!
	// var hotTip = createP("Select a year from the timeline above, or use arrows below to view all headlines concerning Donald Trump.");
	// hotTip.position(36, 200);
	// hotTip.id('hitsLabel');

	var positionX = 36 + ((windowWidth - 112)/40)*(currentYear - 1976);
	drawIndicator(positionX, 210);

	// The year-by-year total articles graph navigation thing
	for (var i in meta) {
		var positionX = 36 + ((windowWidth - 112)/40)*i;
		drawBar(meta[i].year, meta[i].hits, positionX);
		if (meta[i].year === currentYear) drawIndicator(positionX, meta[i].hits);
	}

	// Year navigation buttons
	var rewindYear = createA('#', '<');
	rewindYear.position(36 + 175, 335);
	rewindYear.id('yearControl');
	rewindYear.mousePressed(goBackAYear);

	var forwardYear = createA('#', '>');
	forwardYear.position(36 + 210, 335);
	forwardYear.id('yearControl');
	forwardYear.mousePressed(advanceAYear); 

	// Year headline
	var yearHeader = createP(currentYear);
	yearHeader.position(36, 305);
	yearHeader.id('yearHeader');
	
	// Print all headlines
	for (var i = 0; i <= data.length; i++){
		fill(51);
		var date = createP(data[i].pub_date);
		date.position(36, 430 + (i*170));
		date.id("date");

		var headline = createA(data[i].web_url, data[i].headline);
		headline.position(36, 470 + (i*170));
		headline.id('webUrl');

		// Colours
		var positive = color('#00E676');
		var neutral = color('#333333');
		var negative = color('#FF1744');
		if (data[i].score > 0) headline.style('color', positive);
		else if (data[i].score < 0) headline.style('color', negative);
		else headline.style('color', neutral);
	}
}

// Utils for year()
function drawBar (label, height, positionX) {
	var rect = createDiv('');
	rect.position(positionX, 210);
	rect.style('background', '#333');
	rect.style('width', '30px');
	if (height === 0) {
		rect.style('height', height + 'px');
	} else rect.style('height', (height + 5) + 'px');
	rect.style('transform', 'translate(0px, -100%)');
	var yearLabel = createDiv(label);
	yearLabel.position(positionX-3, 220);
	yearLabel.id('yearLabel');
	yearLabel.hide();
	var hitsLabel = createDiv(height + ' articles');
	hitsLabel.position(positionX-3, 250);
	hitsLabel.id('hitsLabel');
	hitsLabel.hide();
	var hoverArea = createDiv('');
	hoverArea.position(positionX-10, 235);
	hoverArea.style('width', '50px');
	hoverArea.style('height', ( height + 100) + 'px');
	hoverArea.style('transform', 'translate(0px, -100%)');
	// hoverArea.style('border', '1px solid #FF0000');
	hoverArea.mouseOver(function() {
		hoverArea.style('cursor', 'zoom-in');
		if((height > 0) && (label != currentYear)) {
			rect.style('height', (height + 10) + 'px');
			rect.style('transform', 'translate(0px, -100%) scale(1.2, 1)');
		}
		yearLabel.show();
		hitsLabel.show();
	});
	hoverArea.mouseClicked(function() {
		if (currentYear != label) {
			currentYear = label;
			redraw();
		} else return false;
	});
	hoverArea.mouseOut(function() {
		rect.style('transform', 'translate(0px, -100%)');
		rect.style('height', height + 'px');
		yearLabel.hide();
		hitsLabel.hide();
	});
}

function drawIndicator(positionX, height) {
	var indicator = createDiv('');
	indicator.position(positionX, 210);
	indicator.style('background', '#FF1744');
	indicator.style('width', '30px');
	indicator.style('height', (height + 5) + 'px');
	var area51 = 36 + ((windowWidth - 112)/40)*(2015 - 1976);
	if (positionX >= area51) indicator.style('z-index', 999);
	else if (positionX < area51) indicator.style('z-index', -1);
	indicator.style('transform', 'translate(0px, -100%)');
}

function goBackAYear() {
	if (currentYear > 1976) {
		currentYear--;
		redraw();
	} else return false;
}

function advanceAYear() {
	if (currentYear < 2016) {
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