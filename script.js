function mouseDown(currentBox, colorChoice) {
    currentBox.style.backgroundColor = colorChoice;
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
                mouseDown(box, 'red');
            });
            box.addEventListener('mouseover', function() {
                if(isMouseDown) {
                    mouseDown(box, 'red');
                }
            });
            row.appendChild(box);
        }
        grid.appendChild(row);
    }
    
}

const grid = document.querySelector('.grid-container');
let isMouseDown = 0;
createGrid(16);
grid.addEventListener('mouseup', mouseUp);
