// Trumplines by Edward Cheng
//
// Headlines, but Trump.
// https://github.com/edc123/Trumplines
//
// Data provided by The New York Times
// https://developer.nytimes.com/

// Init data
var data;
var meta;

// Init states
var currentState = 'year';
var currentYear = '1976';

function preload() {
	meta = loadJSON('/api/meta/all');
}

function setup() {
	createCanvas(windowWidth, windowHeight - 10);
	noLoop();
}

function yearView() {
	var positionX = 36 + ((windowWidth - 65)/40)*(currentYear - 1976);
	drawIndicator(positionX, 300);

	// The year-by-year total articles graph navigation thing
	for (var i in meta) {
		var positionX = 36 + ((windowWidth - 65)/40)*i;
		drawBar(meta[i].year, meta[i].hits, positionX);
		if (meta[i].year === currentYear) drawIndicator(positionX, meta[i].hits);
	}

	if(windowWidth < 1536) {
		// Year navigation buttons
		var rewindYear = createA('#', '&#9664;');
		rewindYear.position(36 + 215, 425);
		rewindYear.id('yearControl');
		rewindYear.attribute('title', 'Go back a year');
		rewindYear.attribute('alt', 'Go back a year');
		rewindYear.mousePressed(goBackAYear);

		var forwardYear = createA('#', '&#9654;');
		forwardYear.position(36 + 250, 425);
		forwardYear.id('yearControl');
		forwardYear.attribute('title', 'Go forward a year');
		forwardYear.attribute('alt', 'Go forward a year');
		forwardYear.mousePressed(advanceAYear); 
	}

	// Year headline
	var yearHeader = createP(currentYear);
	yearHeader.position(36, 380);
	yearHeader.id('yearHeader');
	
	spinner('show');
	
	// Print all headlines
	for (var i = 0; i <= data.length; i++){
		console.log(i)
		fill(51);
		var date = createP(data[i].pub_date);
		date.position(36, 520 + (i * windowHeight/7));
		date.id("date");

		var headline = createA(data[i].web_url, data[i].headline);
		headline.position(36, 550 + (i * windowHeight/7));
		headline.id('webUrl');
		headline.attribute('target', '_blank');
		
		// Colours
		var positive = color('#00E676');
		var neutral = color('#333333');
		var negative = color('#FF1744');
		if (data[i].score > 0) headline.style('color', positive);
		else if (data[i].score < 0) headline.style('color', negative);
		else headline.style('color', neutral);
		spinner('hide');
	}
}

// Utils for year()
function spinner(option) {
	if (option === 'show') document.getElementById("spinner").style.display = "block";
	else if (option === 'hide') document.getElementById("spinner").style.display = "none";
}

function drawBar (label, height, positionX) {
	var rect = createDiv('');
	rect.position(positionX, 300);
	rect.style('background', '#333');
	rect.style('width', '1.5%');
	rect.class('lines');
	if (height === 0) rect.style('height', height + 'px');
	else rect.style('height', (height + 5) + 'px');
	rect.style('transform', 'translate(0px, -100%)');
	var yearLabel = createDiv(label);
	yearLabel.position(positionX - 3, 310);
	yearLabel.id('yearLabel');
	yearLabel.hide();
	var hitsLabel = createDiv(height + ' articles');
	hitsLabel.position(positionX - 3, 340);
	hitsLabel.id('hitsLabel');
	hitsLabel.hide();
	var hoverArea = createDiv('');
	hoverArea.position(positionX - 10, 325);
	hoverArea.style('width', '2.5%');
	hoverArea.style('height', (height + 200) + 'px');
	hoverArea.style('transform', 'translate(0px, -100%)');
	hoverArea.mouseOver(function() {
		hoverArea.style('cursor', 'zoom-in');
		if ((height > 0) && (label != currentYear)) {
			rect.style('height', (height + 10) + 'px');
			rect.style('background', '#555');
			rect.style('transform', 'translate(0px, -100%) scale(1, 1)');
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
		if ((height > 0) && (label != currentYear)) {
			rect.style('transform', 'translate(0px, -100%)');
			rect.style('height', (height + 5) + 'px');
			rect.style('background', '#333');
		}
		yearLabel.hide();
		hitsLabel.hide();
	});
}

function drawIndicator(positionX, height) {
	var indicator = createDiv('');
	indicator.position(positionX, 300);
	indicator.style('background', '#FF1744');
	indicator.style('width', '1.5%');
	indicator.style('height', (height + 5) + 'px');
	indicator.style('z-index', -1);
	indicator.style('transform', 'translate(0px, -100%)');
	indicator.id('indicator')
}

function goBackAYear() {
	if (currentYear > 1976) {
		currentYear--;
		redraw();
	}
}

function advanceAYear() {
	if (currentYear < 2015) {
		currentYear++;
		redraw();
	}
}

function gridView() {
	background(255);
}

function draw() {
	removeElements();
	if (currentState === 'year') {
		var dataPath = '/api/' + currentYear;
		data = loadJSON(dataPath, yearView);
		yearView();
	} else gridView();
}