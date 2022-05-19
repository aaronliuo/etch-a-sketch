function mouseDown(currentBox) {
    if(!isMouseDown) return;
    currentBox.target.style.backgroundColor = selectedColor;
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
            box.addEventListener('mouseover', mouseDown);
            box.addEventListener('mousedown', mouseDown);
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


const grid = document.querySelector('.grid-container');
const body = document.querySelector('body');
const clearGridButton = document.querySelector('.clear-grid');

let isMouseDown = false;
body.onmousedown = () => (isMouseDown = true);
body.onmouseup = () => (isMouseDown = false);

//Initializes 16x16 grid and adds necessary event listeners
createGrid(16);

//Clear Grid button
clearGridButton.addEventListener('click', clearGrid);

//Initializes all the colors
let selectedColor = 'black';
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