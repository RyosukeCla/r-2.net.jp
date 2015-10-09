var logo;
function setup() {
  var can = createCanvas(200,80);
  can.parent("main-logo");
  textAlign(CENTER,CENTER);
  textFont("Georgia");
  logo = new XYGraph(width/2.0,height/2.0, 70,70,1);
}

function draw() {
	logo.update();
	if (mouseX > 60 && mouseX < 120 && mouseY > 10 && mouseY < 70) {
		logo.transitionAlpha(50,5);
		logo.transitionRAlpha(255,3);
	} else {
		logo.transitionAlpha(50, 5);
		logo.transitionRAlpha(0, 3);
	}
}

function vecToPoint(x0,y0,x1,y1) {
  var vec = createVector(x1-x0,y1-y0);
  vec.normalize();
  return vec;
}

function timeToSp(t, dis) {
  return dis / t;
}

// XYGraph class
function XYGraph(x,y,xl,yl,stW) {
  this.xpos = x;
  this.ypos = y;
  this.xleng = xl;
  this.yleng = yl;
  this.strokeW = stW;
  this.alpha = 0;
  this.rAlpha = 0;
}

XYGraph.prototype.setPosition = function(x, y) {
  this.xpos = x;
  this.ypos = y;
}

XYGraph.prototype.setLength = function(xl, yl) {
  this.xleng = xl;
  this.yleng = yl;
}

XYGraph.prototype.setStrokeWeight = function(sw) {
  this.strokeW = sw;
}

XYGraph.prototype.moveToPoint = function(x, y, sp) {
  var vel = createVector(x,y);
  vel.x -= this.xpos;
  vel.y -= this.ypos;
  vel.normalize();
  vel.mult(sp);
  if (abs(this.xpos - x) > sp) {
    this.xpos += vel.x;
    this.ypos += vel.y;
  }
}

XYGraph.prototype.transitionLength = function(xl, yl, sp) {
  var vel = createVector(xl, yl);
  vel.x -= this.xleng;
  vel.y -= this.yleng;
  vel.normalize();
  vel.mult(sp);
  if (abs(this.xleng - xl) > sp) {
    this.xleng += vel.x;
    this.yleng += vel.y;
  }
}

XYGraph.prototype.transitionSWeight = function(sw, sp) {
  var vel = sw;
  vel -= this.strokeW;
  vel /= abs(this.strokeW - sw);
  vel *= sp;
  if (abs(this.strokeW - sw) > sp) {
    this.strokeW += vel;
  }
  if (abs(this.strokeW - sw) <= sp) {
    this.strokeW = sw;
  }

}

XYGraph.prototype.transitionAlpha = function(al, sp) {
	var vel = al;
	vel -= this.al;
	vel /= abs(al - this.alpha);
	vel *= sp;
  if (abs(al - this.alpha) > sp) {
    this.alpha += vel;
  }
}

XYGraph.prototype.transitionRAlpha = function(al, sp) {
	var vel = al;
	vel -= this.rAlpha;
	vel /= abs(al - this.rAlpha);
	vel *= sp;
  if (abs(al - this.rAlpha) > sp) {
    this.rAlpha += vel;
  }
}

XYGraph.prototype.update = function() {
  stroke(210,210,190,50);
  strokeWeight(this.strokeW);
  strokeCap(SQUARE);
  resetMatrix();
  translate(this.xpos, this.ypos);
  line(-this.xleng/2.0, 0, this.xleng/2.0 ,0);
  line(0, -this.yleng/2.0, 0, this.yleng/2.0);
  noFill();
  stroke(210,210,190,this.alpha);
  ellipse(0,0, this.xleng, this.yleng);
  fill(220,220,160, this.rAlpha);
  textSize(this.xleng/1.3);
  text("R",0,0);
  textSize(this.xleng/4.0);
  text("2",this.xleng/3.8,-this.xleng/3.0);
}

