
let controlsContainer = document.querySelector('.controls-container');

// Create default grid on page load
createSquareGrid();

function createSquareGrid(numberOfSquares) {

    let defaultNumberOfSquares = JSON.parse(localStorage.getItem('numberOfSquares'));

    if (!defaultNumberOfSquares) {
        defaultNumberOfSquares = 16;
    }

    // Set default to 16
    if (!numberOfSquares) {
        numberOfSquares = defaultNumberOfSquares;
    } else {
        numberOfSquares = numberOfSquares;
    }

    const gridContainer = document.querySelector('.grid-container');
    gridContainer.innerHTML = '';

    // in-memory DOM
    const fragment = document.createDocumentFragment();

    for (let i = 1; i <= numberOfSquares * numberOfSquares; i++) {
        const div = document.createElement('div');
        div.classList.add('box');
        // div.style.setProperty('--row-col', numberOfSquares);

        // in-memory DOMFragment append
        fragment.appendChild(div);
    }

    gridContainer.style.setProperty('--row-col', numberOfSquares);
    gridContainer.appendChild(fragment);

    localStorage.setItem('numberOfSquares', JSON.stringify(numberOfSquares));
}

// Click listener
controlsContainer.addEventListener('click', handleClickEvent);
// Input Listener
controlsContainer.addEventListener('input', handleInputEvent);

// Click handler
function handleClickEvent(event) {
    event.stopPropagation();

    if (event.target.closest('button') && event.target.id === 'number-of-squares-btn') {
        const numberOfSquares = getEnteredNumberOfSquares();
        createSquareGrid(numberOfSquares);
    }

    if (event.target.closest('button') && event.target.id === 'reset-to-default-squares') {
        localStorage.removeItem('numberOfSquares');
        createSquareGrid();
    }
}

function handleInputEvent(event) {
    event.stopPropagation();

    if (event.target.id === 'sketch-pad-bg-color') {
        // Change sketchpad bgcolor
        changeSketchPadBGColor(event.target.value);
    }
}

// Return number of squares entered
function getEnteredNumberOfSquares() {
    let numberOfSquares = prompt('Enter number of squares per side below. Range 1-100')?.trim() || 16;

    if (numberOfSquares === '') {
        numberOfSquares = 16;
    }

    if (parseInt(numberOfSquares) > 100) {
        alert(`You have entered ${numberOfSquares} which exceeds 100 limit! 100 squares will be applied!`);
        numberOfSquares = 100;
    }

    return parseInt(numberOfSquares);
}

function draw() {

}

// To be continued
function changeSketchPadBGColor(bgColor) {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
        box.style.backgroundColor = bgColor;
    });
}