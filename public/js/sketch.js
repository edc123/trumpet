// Trumplines by Edward Cheng
//
// Headlines, but Trump.
// https://github.com/edc123/Trumplines
//
// Data provided by The New York Times
// https://developer.nytimes.com/

var data;

function preload() {
	data = loadJSON('/api/test');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	noLoop();
}

function draw() {
	textSize(15);
	textFont("Georgia");
	textStyle(BOLD);
	text(data.headline.main, 35, 120);
 }