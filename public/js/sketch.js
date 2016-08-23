// Trumplines by Edward Cheng
//
// Headlines, but Trump.
// https://github.com/edc123/Trumplines
//
// Data provided by The New York Times
// https://developer.nytimes.com/

var data;
var yearShowing = '2010';

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
	var text = createDiv(year);
    text.position(width-100,40);
    text.id("top");

    var prev = createDiv("<");
    prev.position(width-118,40);
    prev.id("arrow");
    prev.mousePressed(prevYear); 

    var next = createDiv(">");
    next.position(width-60,40);
    next.id("arrow");
    next.mousePressed(nextYear);

    var text = createDiv("");
    text.position(width-132,24);
    text.id("rect");
}

function headlineView() {
// how to responsive w p5?

}

function draw() {
	// Colours
	var positive = color('#00E676');
	var neutral = color('#000000');
	var negative = color('#FF1744');

	fill(0);
	textStyle(BOLD);
	textSize(30);
	text(meta.year, 35, 155);
	for (var i = 0; i <= data.length; i++){
		fill(0);
		textStyle(NORMAL);
		textSize(14);
		text(data[i].pub_date, 35, 200 + (i*90));
		textStyle(BOLD);
		textSize(20);

		if (data[i].score > 0) fill(positive);
		else if (data[i].score < 0) fill(negative);
		else fill(neutral);
		text(data[i].headline, 35, 230 + (i*90));
	}
	// can i use a generator here? pause and write new column...
}