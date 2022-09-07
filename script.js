function mouseDown(currentBox) {

    //Changes selcted selectedColor to current value of the color wheel.
    if(customColorSelected) {
        const colorPicker = document.getElementById('colorpicker');
        selectedColor = colorPicker.value;
    }

    currentBox.style.backgroundColor = selectedColor;
    colorGrid[parseInt(currentBox.id/currentGridHeight)][currentBox.id%currentGridHeight] = selectedColor;
    console.log(currentBox.id);
}

function fillGrid(currentBox) {

    if(customColorSelected) {
        const colorPicker = document.getElementById('colorpicker');
        selectedColor = colorPicker.value;
    }

    if(currentBox.style.backgroundColor == selectedColor) return;

    const directionsY = [-1, 1, 0, 0];
    const directionsX = [0, 0, 1, -1];

    let queue = [];
    queue.push([parseInt(currentBox.id/currentGridHeight), currentBox.id%currentGridHeight]);
    currentBox.style.backgroundColor = selectedColor;
    while(queue.length != 0) {
        let curr = queue.shift();
        for(let i=0; i<4; i++) {
            const newY = curr[0]+directionsY[i];
            const newX = curr[1]+directionsX[i];

            if(newY < 0 || newY >= currentGridHeight) {
                continue;
            }
            if(newX < 0 || newX >= currentGridWidth) {
                continue;
            }
            if(colorGrid[newY][newX] == selectedColor) {
                continue;
            }
            
            colorGrid[newY][newX] = selectedColor;
            const adjustBox = document.getElementById('' + (newY*currentGridHeight+newX));
            adjustBox.style.backgroundColor = selectedColor;
            queue.push([newY, newX]);

        }
    }
}

function createGrid() {
    grid.setAttribute("style", "height: " + currentPixelSize * currentGridHeight + "px; width: " + currentPixelSize * currentGridWidth + "px");
    grid.style.width = currentPixelSize*currentGridWidth;
    for(let i=0; i<currentGridHeight; i++) {
        const row = document.createElement('div');
        const colorRow = new Array(currentGridWidth);

        row.classList.add('grid-row');
        row.setAttribute("style", "height: " + currentPixelSize + "px");

        for(let j=0; j<currentGridWidth; j++) {
            const box = document.createElement('div');
            box.classList.add('grid-box');
            box.setAttribute("style", "width: " + currentPixelSize + "px");

            box.id = "" + (i*currentGridHeight+j);
            console.log(box.style.width);

            box.addEventListener('mouseover', function() {
                if(isMouseDown && !isFillClicked) {
                    mouseDown(box);
                }
            });

            box.addEventListener('mousedown', function() {
                if(isFillClicked) {
                    fillGrid(box);
                }
                else {
                    mouseDown(box);
                }
            });

            row.appendChild(box);
            colorRow[j] = 'white';
        }

        grid.appendChild(row);
        colorGrid[i] = colorRow;
    }
    
}

function clearGrid() {
    const boxes = document.querySelectorAll('.grid-box');
    boxes.forEach((box) =>  {
        box.style.backgroundColor = 'white';
    });
}

function resetGrid() {
    const boxes = document.querySelectorAll('.grid-box');
    const rows = document.querySelectorAll('.grid-row');
    boxes.forEach((box) =>  {
        box.remove();
    });
    rows.forEach((row) =>  {
        row.remove();
    });
    createGrid();
}

function resetColorBoxBorders() {
    const container = document.querySelector('.input-color-container');
    const colorBoxes = document.querySelectorAll('.color-box');

    container.style.border = "none";
    colorBoxes.forEach((box) => {
        box.style.borderColor = "rgb(41, 41, 41)";
    })
}

function createColors() {
    const colorPallete = document.querySelector('.color-pallete');
    const colors = ['black', 'brown', 'red', 'orange', 'yellow', 
        'green', 'blue', 'purple', 'pink', 'grey'];


    for(let i=0; i<5; i++) {
        const row = document.createElement('div');
        row.classList.add('color-row');
        for(let j=0; j<2; j++) {
            const box = document.createElement('div');
            box.classList.add('color-box');
            box.style.backgroundColor = colors[(i*2)+j];

            //resets other colors and sets this color as selected
            box.addEventListener('click', function() {
                selectedColor = colors[(i*2)+j];
                resetColorBoxBorders();
                customColorSelected = false;
                box.style.borderColor = "white";
            });

            row.appendChild(box);
        }
        colorPallete.appendChild(row);
    }

    //Resets other colors, customColor is selected but selectedColor isn't changed yet.
    const colorPicker = document.getElementById('colorpicker');
    colorPicker.addEventListener('click', function() {
        customColorSelected = true;
        resetColorBoxBorders();
        const container = document.querySelector('.input-color-container');
        container.style.border = "2px solid white";
    })
}

function createModes() {
    const colorPallete = document.querySelector('.color-pallete');
    // Adds drawButton. If pressed enables, disables fill feature.
    // Adds fillButton. If pressed enables fill feature on click.
    let drawButton = document.createElement('button');
    let fillButton = document.createElement('button');
    drawButton.textContent = "Draw";
    drawButton.classList.add('tool-button');
    fillButton.textContent = "Fill";
    fillButton.classList.add('tool-button');

    drawButton.addEventListener('click', function() {
        isFillClicked = false;
        fillButton.style.borderColor = "grey";
        drawButton.style.borderColor = "white";
    });
    drawButton.style.borderColor = "white";
    colorPallete.appendChild(drawButton);

    fillButton.addEventListener('click', function() {
        isFillClicked = true;
        drawButton.style.borderColor = "grey";
        fillButton.style.borderColor = "white";
    });
    colorPallete.appendChild(fillButton);
}

function setSliders() {

    const heightSlider = document.getElementById('height-slider');
    const widthSlider = document.getElementById('width-slider');
    const pixelSizeSlider = document.getElementById('pixel-size-slider');

    heightSlider.querySelector('.slider').oninput = function() {
        heightSlider.querySelector('.slide-output').innerHTML = "Height: " + this.value;
        currentGridHeight = this.value;
    }

    widthSlider.querySelector('.slider').oninput = function() {
        widthSlider.querySelector('.slide-output').innerHTML = "Width: " + this.value;
        currentGridWidth = this.value;
    }

    pixelSizeSlider.querySelector('.slider').oninput = function() {
        pixelSizeSlider.querySelector('.slide-output').innerHTML = "Pixel Size: " + this.value;
        currentPixelSize = this.value;
    }

    // const slideContainers = document.querySelectorAll('.slide-container');
    // slideContainers.forEach((slider) => {
    //     slider.lastChild().oninput = function() {
    //         slider.querySelector('.slide-output').innerHTML = this.value;
    //     }
    // })
}

const grid = document.querySelector('.grid-container');
const body = document.querySelector('body');
const clearGridButton = document.querySelector('.clear-grid');
const colorGrid = [];

let currentGridWidth = 16;
let currentGridHeight = 16;
let currentPixelSize = 35;
let customColorSelected = false;
let isMouseDown = false;
let isFillClicked = false;
let selectedColor = "white";
body.onmousedown = () => (isMouseDown = true);
body.onmouseup = () => (isMouseDown = false);

//Initializes 16x16 grid and adds necessary event listeners
createGrid();

//Initializes all the colors
createColors();

createModes();

//Sets up slider input and output display
setSliders();

//Applies new grid dimensions and clears all solors
const resetGridButton = document.querySelector('.reset-grid');
resetGridButton.addEventListener('click', function() {
    resetGrid();
})