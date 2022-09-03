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
    for(let i=0; i<currentGridHeight; i++) {
        const row = document.createElement('div');
        const colorRow = new Array(currentGridWidth);

        row.classList.add('grid-row');
        row.style.cssText = 'height: ' + 100/currentGridHeight + '%;';

        for(let j=0; j<currentGridWidth; j++) {
            const box = document.createElement('div');
            box.classList.add('grid-box');
            box.style.cssText = 'width: ' + 100/currentGridWidth + '%;';

            box.id = "" + (i*currentGridHeight+j);
            console.log(box.id);

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
    drawButton.textContent = "Draw";
    drawButton.addEventListener('click', function() {
        isFillClicked = false;
    });
    colorPallete.appendChild(drawButton);

    // Adds fillButton. If pressed enables fill feature on click.
    let fillButton = document.createElement('button');
    fillButton.textContent = "Fill";
    fillButton.addEventListener('click', function() {
        isFillClicked = true;
    });
    colorPallete.appendChild(fillButton)
}


const grid = document.querySelector('.grid-container');
const body = document.querySelector('body');
const currentGridWidth = 16;
const currentGridHeight = 16;
const clearGridButton = document.querySelector('.clear-grid');
const colorGrid = [];

let isMouseDown = false;
let isFillClicked = false;
let selectedColor = "black";
body.onmousedown = () => (isMouseDown = true);
body.onmouseup = () => (isMouseDown = false);

//Initializes 16x16 grid and adds necessary event listeners
createGrid(16);

//Clear Grid button
clearGridButton.addEventListener('click', clearGrid);

//Initializes all the colors
createColors();

//Sets up slider input and output display
const slider = document.querySelector('.slider');
const sliderOutput = document.querySelector('.slide-output');
slider.oninput = function() {
    sliderOutput.innerHTML = (this.value + ' x ' + this.value);
}

//Applies new grid dimensions and clears all solors
const resetGridButton = document.querySelector('.reset-grid');
resetGridButton.addEventListener('click', function() {
    resetGrid(slider.value);
})