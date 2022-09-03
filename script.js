function mouseDown(currentBox) {
    currentBox.style.backgroundColor = selectedColor;
    colorGrid[parseInt(currentBox.id/currentGridHeight)][currentBox.id%currentGridHeight] = selectedColor;
    console.log(currentBox.id);
}

function fillGrid(currentBox) {

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

function createColors() {
    const colorPallete = document.querySelector('.color-pallete');
    const colors = ['white', 'black', 'red', 'orange', 'yellow', 
        'green', 'blue', 'purple', 'pink', 'grey'];


    for(let i=0; i<5; i++) {
        const row = document.createElement('div');
        row.classList.add('color-row');
        for(let j=0; j<2; j++) {
            const box = document.createElement('div');
            box.classList.add('color-box');
            box.style.backgroundColor = colors[(i*2)+j];
            box.addEventListener('click', function() {
                selectedColor = colors[(i*2)+j];
            });
            row.appendChild(box);
        }
        colorPallete.appendChild(row);
    }

    // Adds drawButton. If pressed enables, disables fill feature.
    let drawButton = document.createElement('button');
    drawButton.classList.add('tool-button');
    drawButton.textContent = "Draw";
    drawButton.addEventListener('click', function() {
        isFillClicked = false;
    });
    colorPallete.appendChild(drawButton);

    // Adds fillButton. If pressed enables fill feature on click.
    let fillButton = document.createElement('button');
    fillButton.textContent = "Fill";
    fillButton.classList.add('tool-button');
    fillButton.addEventListener('click', function() {
        isFillClicked = true;
    });
    colorPallete.appendChild(fillButton)
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
let isMouseDown = false;
let isFillClicked = false;
let selectedColor = "black";
body.onmousedown = () => (isMouseDown = true);
body.onmouseup = () => (isMouseDown = false);

//Initializes 16x16 grid and adds necessary event listeners
createGrid();

//Initializes all the colors
createColors();

//Sets up slider input and output display
setSliders();

//Applies new grid dimensions and clears all solors
const resetGridButton = document.querySelector('.reset-grid');
resetGridButton.addEventListener('click', function() {
    resetGrid();
})