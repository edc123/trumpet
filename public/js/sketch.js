// Trumplines by Edward Cheng
//
// Headlines, but Trump.
// https://github.com/edc123/Trumplines
//
// Data provided by The New York Times
// https://developer.nytimes.com/

var data;
var yearShowing = 'total';

function preload() {
	data = loadJSON('/api/' + yearShowing);
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	noLoop();
}

function draw() {
	textSize(18);
	text(data.headline.pub_date, 35, 120);
	textStyle(BOLD);
	textSize(25);
	text(data.headline.main, 35, 150);
 }