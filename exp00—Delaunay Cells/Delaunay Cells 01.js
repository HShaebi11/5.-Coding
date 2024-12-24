let points = [];
let delaunay;

function setup() {
  createCanvas(800, 800);
  
  // Generate random points
  for (let i = 0; i < 3; i++) {
    points.push([random(width), random(height)]);
  }
  
  // Create Delaunay triangulation
  delaunay = d3.Delaunay.from(points);

  // Draw cells
  noLoop();  // Draw once and stop
}

function draw() {
  background(255);
  
  stroke(2);
  noFill();
  
  // Draw Delaunay cells
  let voronoi = delaunay.voronoi([30, 30, width, height]);
  for (let i = 0; i < points.length; i++) {
    let cell = voronoi.cellPolygon(i+2);
    if (cell) {
      beginShape();
      for (let [x, y] of cell) {
        vertex(x, y);
      }
      endShape(CLOSE);
    }
  }

  // Draw points
  fill(0);
  for (let [x, y] of points) {
    ellipse(x, y, 20, 20);
  }
}