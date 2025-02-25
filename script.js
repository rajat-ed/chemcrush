const GRID_SIZE = 9;
const grid = document.getElementById('grid');
const scoreDisplay = document.getElementById('score');
const moleculeDisplay = document.getElementById('molecule-display');
let score = 0;
let cells = [];
let selectedCells = [];
let isDragging = false;

// Atom types
const atomTypes = ['H', 'C', 'O', 'N'];

// Sample molecule database (expand to 50 as needed)
const molecules = {
    'H2': 'Hydrogen Gas',
    'H2O': 'Water',
    'CO2': 'Carbon Dioxide',
    'CH4': 'Methane',
    'NH3': 'Ammonia',
    'O2': 'Oxygen Gas',
    'CO': 'Carbon Monoxide',
    'CH3OH': 'Methanol',
    'C2H5OH': 'Ethanol',
    'N2': 'Nitrogen Gas'
    // Add more up to 50, e.g., 'H2SO4': 'Sulfuric Acid', 'C6H12O6': 'Glucose', etc.
};

// Initialize the grid
function initGrid() {
    grid.innerHTML = '';
    cells = [];
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        const atom = atomTypes[Math.floor(Math.random() * atomTypes.length)];
        cell.textContent = atom;
        cell.classList.add(atom);
        cell.dataset.index = i;
        grid.appendChild(cell);
        cells.push(cell);

        // Event listeners for dragging
        cell.addEventListener('mousedown', startDrag);
        cell.addEventListener('mouseover', dragOver);
        cell.addEventListener('mouseup', endDrag);
    }
}

// Start dragging
function startDrag(e) {
    isDragging = true;
    selectedCells = [];
    selectCell(e.target);
}

// Drag over cells
function dragOver(e) {
    if (isDragging) {
        const cell = e.target;
        if (isAdjacent(cell) && !selectedCells.includes(cell)) {
            selectCell(cell);
        }
    }
}

// End dragging
function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    checkChain();
}

// Select a cell
function selectCell(cell) {
    if (!selectedCells.includes(cell)) {
        selectedCells.push(cell);
        cell.classList.add('selected');
    }
}

// Check if a cell is adjacent to the last selected cell
function isAdjacent(cell) {
    if (selectedCells.length === 0) return true;
    const lastCell = selectedCells[selectedCells.length - 1];
    const lastIndex = parseInt(lastCell.dataset.index);
    const currentIndex = parseInt(cell.dataset.index);
    const rowDiff = Math.abs(Math.floor(lastIndex / GRID_SIZE) - Math.floor(currentIndex / GRID_SIZE));
    const colDiff = Math.abs((lastIndex % GRID_SIZE) - (currentIndex % GRID_SIZE));
    return (rowDiff <= 1 && colDiff <= 1) && (rowDiff + colDiff > 0);
}

// Check the chain for valid molecules
function checkChain() {
    const chain = selectedCells.map(cell => cell.textContent).join('');
    const moleculeName = molecules[chain];
    if (moleculeName) {
        score += selectedCells.length * 10; // Longer chains = more points
        scoreDisplay.textContent = `Score: ${score}`;
        moleculeDisplay.textContent = moleculeName;
        blastCells();
    } else {
        selectedCells.forEach(cell => cell.classList.remove('selected'));
        moleculeDisplay.textContent = '';
    }
    selectedCells = [];
}

// Blast animation and regenerate cells
function blastCells() {
    selectedCells.forEach(cell => {
        cell.classList.add('blast');
        cell.addEventListener('animationend', () => {
            const atom = atomTypes[Math.floor(Math.random() * atomTypes.length)];
            cell.textContent = atom;
            cell.className = `cell ${atom}`;
        }, { once: true });
    });
}

// Prevent default drag behavior on mobile
grid.addEventListener('dragstart', (e) => e.preventDefault());

// Initialize the game
initGrid();
