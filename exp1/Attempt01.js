// Function for first canvas
function sketch1(p) {
  let parentDiv;
  p.setup = function () {
    parentDiv = document.getElementById('p5');
    p.createCanvas(parentDiv.offsetWidth, parentDiv.offsetHeight * 0.5);
    p.background(0);
  };
  p.draw = function () {
    p.circle(p.mouseX, p.mouseY, 50);
  };
  p.windowResized = function() {
    p.resizeCanvas(parentDiv.offsetWidth, parentDiv.offsetHeight * 0.5);
    p.background(0);
  };
}

// Run first p5 instance
new p5(sketch1);

// Function for second canvas
function sketch2(p) {
  let parentDiv;
  p.setup = function () {
    parentDiv = document.getElementById('p5');
    p.createCanvas(parentDiv.offsetWidth, parentDiv.offsetHeight * 0.5);
    p.background(255);
    p.fill(0);
    p.stroke(255);
  };
  p.draw = function () {
    p.square(p.mouseX, p.mouseY, 50);
  };
  p.windowResized = function() {
    p.resizeCanvas(parentDiv.offsetWidth, parentDiv.offsetHeight * 0.5);
    p.background(255);
  };
}

// Run second p5 instance
new p5(sketch2);