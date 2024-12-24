let pg;
let sliders = {};

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.elt.getContext('2d', { willReadFrequently: true });
  canvas.parent('p5-container');
  pixelDensity(1);
  
  pg = createGraphics(300, 300);
  pg.elt.getContext('2d', { willReadFrequently: true });
  pg.pixelDensity(1);
  pg.textFont('Roboto');
  
  // Create sliders
  sliders.tilesX = createSlider(1, 80, 16, 1);
  sliders.tilesY = createSlider(1, 80, 16, 1);
  sliders.speed = createSlider(0, 1, 0.005, 0.01);
  sliders.dispX = createSlider(0, 0.1, 0.05, 0.001);
  sliders.dispY = createSlider(0, 0.2, 0, 0.01);
  sliders.offset = createSlider(0, 300, 100, 1);
  
  // Position sliders
  let y = 10;
  Object.entries(sliders).forEach(([name, slider]) => {
    slider.position(10, y);
    slider.style('width', '80px');
    y += 30;
  });
}

function draw() {
  if (width <= 0 || height <= 0) return;
  
  background(0);

  // Clear and draw to graphics buffer
  pg.background(0);
  pg.fill(255);
  pg.textSize(pg.height/2);
  pg.push();
  pg.translate(pg.width/2, pg.height/2);
  pg.textAlign(CENTER, CENTER);
  pg.text("a", 0, 0);
  pg.pop();

  let tilesX = sliders.tilesX.value();
  let tilesY = sliders.tilesY.value();

  // Calculate tile sizes based on actual canvas size
  let tileW = Math.floor(width/tilesX);
  let tileH = Math.floor(height/tilesY);

  // Pre-calculate wave values
  let speed = sliders.speed.value();
  let dispX = sliders.dispX.value();
  let dispY = sliders.dispY.value();
  let offset = sliders.offset.value();
  let time = frameCount * speed;

  for (let y = 0; y < tilesY; y++) {
    for (let x = 0; x < tilesX; x++) {
      let waveX = 0;
      let waveY = 0;
      
      let factor = (x * y);
      if (dispX !== 0) {
        waveX = int(sin(time + factor * dispX) * offset);
      }
      if (dispY !== 0) {
        waveY = int(sin(time + factor * dispY) * offset);
      }
      
      copy(pg, 
        x*tileW + waveX, y*tileH + waveY, tileW, tileH,
        x*tileW, y*tileH, tileW, tileH
      );
    }
  }
  
  // Draw labels
  fill(255);
  textAlign(LEFT, CENTER);
  let y = 25;
  Object.keys(sliders).forEach(name => {
    text(name + ': ' + sliders[name].value(), 100, y);
    y += 30;
  });
}