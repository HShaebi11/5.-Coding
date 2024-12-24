let textInput = "Hello World";
let grid = [];
let cellSize = 20;
let cols, rows;
let variableFont;
let fontLoaded = false;

// Values for the controls
let values = {
    cellSize: 20,
    weight: 500,
    style: 500,
    animSpeed: 0.1
};

function setup() {
    const canvas = createCanvas(800, 600);
    canvas.parent('canvasContainer');
    
    // Initialize cols and rows before creating the grid
    cols = floor(width / cellSize);
    rows = floor(height / cellSize);
    
    // Initialize the grid with characters
    for (let i = 0; i < cols; i++) {
        grid[i] = [];
        for (let j = 0; j < rows; j++) {
            grid[i][j] = {
                char: random(textInput.split('')),
                weight: values.weight,
                style: values.style,
                targetWeight: values.weight,
                targetStyle: values.style
            };
        }
    }
    
    setupFontUpload();
    setupControls();
}

function setupFontUpload() {
    const uploadButton = document.getElementById('uploadButton');
    const fileInput = document.getElementById('fontUpload');
    const fontStatus = document.getElementById('fontStatus');
    
    uploadButton.onclick = () => fileInput.click();
    
    fileInput.onchange = async (event) => {
        const file = event.target.files[0];
        if (!file) return;
        
        fontStatus.textContent = 'Loading font...';
        
        try {
            loadFont(URL.createObjectURL(file), 
                font => {
                    console.log('Font loaded successfully');
                    variableFont = font;
                    fontLoaded = true;
                    
                    // Show sliders
                    document.querySelectorAll('.slider-container').forEach(slider => {
                        slider.style.display = 'block';
                    });
                    
                    fontStatus.textContent = `Loaded: ${file.name}`;
                    fontStatus.style.color = '#4CAF50';
                    updateGrid();
                },
                error => {
                    console.error('Error loading font:', error);
                    fontStatus.textContent = 'Error loading font';
                    fontStatus.style.color = '#f44336';
                }
            );
        } catch (error) {
            console.error('Error:', error);
            fontStatus.textContent = 'Error loading font';
            fontStatus.style.color = '#f44336';
        }
    };
}

function setupControls() {
    const textInputField = document.getElementById('textInput');
    if (textInputField) {
        textInputField.oninput = function() {
            textInput = this.value || "Hello World";
            updateGrid();
        };
    }
    
    const sliders = {
        cellSize: document.getElementById('cellSize'),
        weight: document.getElementById('weight'),
        style: document.getElementById('style'),
        animSpeed: document.getElementById('animSpeed')
    };
    
    if (sliders.cellSize) {
        sliders.cellSize.oninput = function() {
            values.cellSize = parseFloat(this.value);
            document.getElementById('cellSizeValue').textContent = this.value;
            updateGrid();
        };
    }
    
    if (sliders.weight) {
        sliders.weight.oninput = function() {
            values.weight = parseFloat(this.value);
            document.getElementById('weightValue').textContent = this.value;
            updateWeights();
        };
    }
    
    if (sliders.style) {
        sliders.style.oninput = function() {
            values.style = parseFloat(this.value);
            document.getElementById('styleValue').textContent = this.value;
        };
    }
    
    if (sliders.animSpeed) {
        sliders.animSpeed.oninput = function() {
            values.animSpeed = parseFloat(this.value);
            document.getElementById('animSpeedValue').textContent = this.value;
        };
    }
}

function updateWeights() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j].weight = values.weight;
        }
    }
}

function updateGrid() {
    cellSize = values.cellSize;
    cols = floor(width / cellSize);
    rows = floor(height / cellSize);
    
    // Recreate grid only if dimensions changed
    if (grid.length !== cols || (grid[0] && grid[0].length !== rows)) {
        for (let i = 0; i < cols; i++) {
            grid[i] = [];
            for (let j = 0; j < rows; j++) {
                grid[i][j] = {
                    char: random(textInput.split('')),
                    weight: values.weight,
                    style: values.style,
                    targetWeight: values.weight,
                    targetStyle: values.style
                };
            }
        }
    }
}

function draw() {
    background(220);
    
    if (!fontLoaded || !variableFont) {
        fill(0);
        textSize(32);
        textAlign(CENTER, CENTER);
        text('Upload a variable font...', width/2, height/2);
        return;
    }
    
    // Draw grid
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * cellSize + cellSize/2;
            let y = j * cellSize + cellSize/2;
            
            push();
            fill(0);
            textFont(variableFont);
            textSize(cellSize);
            textAlign(CENTER, CENTER);
            
            textFont(variableFont, {
                'wght': grid[i][j].weight
            });
            
            text(grid[i][j].char, x, y);
            pop();
        }
    }
    
    // Debug info
    fill(0);
    textSize(12);
    textAlign(LEFT, BOTTOM);
    text(`Font loaded: ${fontLoaded}`, 10, height - 10);
    text(`Weight: ${values.weight}`, 10, height - 25);
    text(`Style: ${values.style}`, 10, height - 40);
}

function updateText(newText) {
    textInput = newText || "Hello World";
    updateGrid();
}
