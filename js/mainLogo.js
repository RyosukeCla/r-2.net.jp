var time;

var gr;
var grlen;

var spe = new Array();

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("mainPageCanvas");
  time = 0;
  if (width > height) {
    grlen = width;
  } else {
    grlen = height;
  }
  gr = new XYGraph(width/10.0, height*8.0/10.0, 2*grlen, 2*grlen, grlen/15.0);
  initializer();
  textAlign(CENTER,CENTER);
  textFont("Georgia");
}

function draw() {
  background(28);
  timetable();
  gr.update();
}

function windowResized() {
  resizeCanvas(windowWidth, displayHeight);
    if (width > height) {
    grlen = windowWidth;
  } else {
    grlen = windowHeight;
  }
  spe[0] = timeToSp(100,dist(gr.xleng, gr.yleng, grlen/4.0, grlen/4.0));
  spe[2] = timeToSp(100,dist(gr.xpos,gr.ypos,width/2.0,height/2.0));
  textAlign(CENTER,CENTER);
}

function gotoURL(url) {
  location.href = url;
}

function isTime(t0, t1) {
  if (time < t1 && time > t0) {
    return true;
  }
  return false;
}

function initializer() {
  spe[0] = timeToSp(100,dist(gr.xleng, gr.yleng, grlen/4.0, grlen/4.0));
  spe[1] = timeToSp(100,abs(gr.strokeW, 1));
  spe[2] = timeToSp(100,dist(gr.xpos,gr.ypos,width/2.0,height/2.0));
}

function timetable() {
  if (time < 500) {
    time++;
  }
  if (isTime(50,150)) {
    gr.transitionSWeight(1, spe[1]);
    gr.moveToPoint(width/2.0, height/2.0, spe[2]);
  }
  if (isTime(100,200)) {
    gr.transitionLength(grlen/4.0,grlen/4.0, spe[0]);
  }
  if (isTime(200,300)) {
    gr.transitionAlpha(230,5);
    gr.transitionRAlpha(255,3);
  }
  if (time > 300) {
    gr.moveToPoint(windowWidth/2.0, windowHeight/2.0, spe[2]);
    gr.transitionLength(grlen/4.0,grlen/4.0, spe[0]);
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
  if (al - this.alpha > sp) {
    this.alpha += sp;
  }
}

XYGraph.prototype.transitionRAlpha = function(al, sp) {
  if (al - this.rAlpha > sp) {
    this.rAlpha += sp;
  }
}

XYGraph.prototype.update = function() {
  stroke(210,210,190,230);
  strokeWeight(this.strokeW);
  strokeCap(SQUARE);
  resetMatrix();
  translate(this.xpos, this.ypos);
  line(-this.xleng/2.0, 0, this.xleng/2.0 ,0);
  line(0, -this.yleng/2.0, 0, this.yleng/2.0);
  noFill();
  stroke(210,210,190,this.alpha);
  ellipse(0,0, this.xleng, this.yleng);
  fill(240,240,170, this.rAlpha);
  textSize(this.xleng/1.3);
  text("R",0,0);
  textSize(this.xleng/3.8);
  text("2",this.xleng/3.8,-this.xleng/3.0);
}




