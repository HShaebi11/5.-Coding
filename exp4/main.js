let pg;
let controls = {};
let values = {}; // Cache for parsed values

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.elt.getContext('2d', { willReadFrequently: true });
  canvas.parent('p5-container');
  pixelDensity(1);
  
  pg = createGraphics(300, 300);
  pg.elt.getContext('2d', { willReadFrequently: true });
  pg.pixelDensity(1);
  pg.textFont('Roboto');
  
  // Get references to all HTML inputs
  controls = {
    tilesX: document.getElementById('tilesX'),
    tilesY: document.getElementById('tilesY'),
    speed: document.getElementById('speed'),
    dispX: document.getElementById('dispX'),
    dispY: document.getElementById('dispY'),
    offset: document.getElementById('offset')
  };
  
  // Add input event listeners to update cached values
  Object.keys(controls).forEach(key => {
    controls[key].addEventListener('input', () => {
      values[key] = parseFloat(controls[key].value);
    });
    // Initialize values
    values[key] = parseFloat(controls[key].value);
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

  let tilesX = values.tilesX;
  let tilesY = values.tilesY;

  // Calculate tile sizes based on actual canvas size
  let tileW = Math.floor(width/tilesX);
  let tileH = Math.floor(height/tilesY);

  // Pre-calculate wave values
  let speed = values.speed;
  let dispX = values.dispX;
  let dispY = values.dispY;
  let offset = values.offset;
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
}