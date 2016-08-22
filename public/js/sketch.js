// Trumplines by Edward Cheng
//
// Headlines, but Trump.
// https://github.com/edc123/Trumplines
//
// Data provided by The New York Times
// https://developer.nytimes.com/

var data;
var yearShowing = '2014';

function preload() {
	data = loadJSON('/api/' + yearShowing);
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	noLoop();
}

function draw() {
	for (var i = 0; i <= data.length; i++){
		textSize(18);
		text(data[i].pub_date, 35, 120*i);
		textStyle(BOLD);
		textSize(25);
		text(data[i].headline, 35, 150*i);
	}
 }