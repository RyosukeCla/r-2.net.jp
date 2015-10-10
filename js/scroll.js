var t;
function setup() {
	var canvas = createCanvas(windowWidth*5.0/100.0, windowHeight-80);
	canvas.parent("bgCanvas");
	textAlign(CENTER,CENTER);
	t = 0;
}

function draw() {
	background(28,28,28,100);
	stroke(244);
	graph();
	fill(200,200,160,100);
	text(getScrollBottom(),width/2.0,30);
	text(getBottom(),width/2.0,50);
}

function windowResized() {
	resizeCanvas(windowWidth*5.0/100.0, displayHeight);
	textAlign(CENTER,CENTER);
}

function graph() {
	t++;
	if (t > 360) t = 0;
	var x, y;
	stroke(28);
	fill(200,200,180,30);
	/*
	for (var i = getScrollBottom() - 80; i < getScrollBottom(); i+=10) {
		y = float(i * height / getBottom());
		x = float(+ width/2.0 + width/4.0 * sin(radians(y*2.0)));
	    rect(0,y,x,10 * height / getBottom());
    }
    */

    for (var i = getScrollBottom() - 70; i < getScrollBottom(); i+=10) {
		y = float(i * height / getBottom());
		x = float(+ width/2.0 + width/6.0 * sin(radians(t*2.0 + i*2.0)));
	    rect(0,y,x,10 * height / getBottom());
    }
}

function getBottom() {
	return int($("#clear").offset().top + 200 - $(window).height());
}

function getScrollBottom() {
	return int($(window).scrollTop() + $(window).height() - $(window).height());
	$(window).on("load scroll resize", getScrollTop);
}
$(window).on("load scroll resize", getScrollTop);

