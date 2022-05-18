

function createGrid(size) {
    const grid = document.querySelector('.grid-container');
    for(let i=0; i<size; i++) {
        const row = document.createElement('div');
        row.classList.add('grid-row');
        // row.style.cssText('')
        for(let j=0; j<size; j++) {
            const box = document.createElement('div');
            box.classList.add('grid-box');
            row.appendChild(box);
        }
        grid.appendChild(row);
    }
    
}

createGrid(16);