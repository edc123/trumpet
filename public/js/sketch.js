// Trumplines by Edward Cheng
//
// Headlines, but Trump.
// https://github.com/edc123/Trumplines
//
// Data provided by The New York Times
// https://developer.nytimes.com/

var data;
var yearShowing = '2010';

function preload() {
	data = loadJSON('/api/' + yearShowing);
	meta = loadJSON('/api/meta/' + yearShowing);
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	noLoop();
}

function draw() {
	// Colours
	var positive = color('#00E676');
	var neutral = color('#000000');
	var negative = color('#FF1744');
	fill(0);
	textSize(18);
	text(meta.year, 35, 120);
	for (var i = 0; i <= data.length; i++){
		fill(0);
		textStyle(NORMAL);
		textSize(18);
		text(data[i].pub_date, 35, 160 + (i*120));
		textStyle(BOLD);
		textSize(25);

		if (data[i].score > 0) fill(positive);
		else if (data[i].score < 0) fill(negative);
		else fill(neutral);
		text(data[i].headline, 35, 200 + (i*120));
	}
 }