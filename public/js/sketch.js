// Trumplines by Edward Cheng
//
// Headlines, but Trump.
// https://github.com/edc123/Trumplines
//
// Data provided by The New York Times
// https://developer.nytimes.com/

var data;
var yearShowing = '1998';

// var years = []
// for (let i = 0; i <= 40; i++) {
// 	years[i] = yearShowing;
// }

function preload() {
	data = loadJSON('/api/' + yearShowing);
	meta = loadJSON('/api/meta/' + yearShowing);
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	noLoop();
}

function yearView() {

}

function headlineView() {
// how to responsive w p5?
}

function draw() {
	textStyle(BOLD);
	textSize(50);
	text(meta.year, windowWidth/5, 255);

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

	// can i use a generator here? pause and write new column...
}