function mouseDown(currentBox) {
    currentBox.style.backgroundColor = selectedColor;
    isMouseDown = 1;
}

function mouseUp() {
    isMouseDown = 0;
}

function createGrid(size) {
    for(let i=0; i<size; i++) {
        const row = document.createElement('div');
        row.classList.add('grid-row');
        row.style.cssText = 'height: ' + 100/size + '%;';
        for(let j=0; j<size; j++) {
            const box = document.createElement('div');
            box.classList.add('grid-box');
            box.style.cssText = 'width: ' + 100/size + '%;';
            box.addEventListener('mousedown', function() {
                mouseDown(box);
            });
            box.addEventListener('mouseover', function() {
                if(isMouseDown) {
                    mouseDown(box);
                }
            });
            row.appendChild(box);
        }
        grid.appendChild(row);
    }
    
}

function clearGrid() {
    const boxes = document.querySelectorAll('.grid-box');
    boxes.forEach((box) =>  {
        box.style.backgroundColor = 'white';
    });
}

function resetGrid(size) {
    const boxes = document.querySelectorAll('.grid-box');
    const rows = document.querySelectorAll('.grid-row');
    boxes.forEach((box) =>  {
        box.remove();
    });
    rows.forEach((row) =>  {
        row.remove();
    });
    createGrid(size);
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
}

//Initializes 16x16 grid and adds necessary event listeners
const grid = document.querySelector('.grid-container');
const body = document.querySelector('body');
const clearGridButton = document.querySelector('.clear-grid');
let isMouseDown = 0;
createGrid(16);
body.addEventListener('mouseup', mouseUp);
clearGridButton.addEventListener('click', clearGrid);

//Initializes all the colors
let selectedColor = 'white';
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