const GRID_SIZE = 9;
let grid = document.getElementById('grid');
let scoreDisplay = document.getElementById('score');
let moleculeDisplay = document.getElementById('molecule-display');
let startScreen = document.getElementById('start-screen');
let gameContainer = document.getElementById('game-container');
let startButton = document.getElementById('start-button');
let shareButton = document.getElementById('share-score');
let score = 0;
let compoundsCreated = 0;
let cells = [];
let selectedCells = [];
let isDragging = false;
let playerName = '';

const atomTypes = ['H', 'O', 'N', 'F', 'Cl', 'Br', 'I', 'C', 'S', 'P', 'Na', 'K', 'Ca', 'Mg', 'Al', 'Si'];

const molecules = {
    'H2': 'Hydrogen Gas', 'O2': 'Oxygen Gas', 'N2': 'Nitrogen Gas', 'F2': 'Fluorine Gas', 'Cl2': 'Chlorine Gas',
    'Br2': 'Bromine Gas', 'I2': 'Iodine Gas', 'CO': 'Carbon Monoxide', 'CO2': 'Carbon Dioxide', 'NO': 'Nitric Oxide',
    'H2O': 'Water', 'HCl': 'Hydrochloric Acid', 'H2SO4': 'Sulfuric Acid', 'HNO3': 'Nitric Acid', 'H3PO4': 'Phosphoric Acid',
    'H2CO3': 'Carbonic Acid', 'HF': 'Hydrofluoric Acid', 'HBr': 'Hydrobromic Acid', 'HI': 'Hydroiodic Acid', 'HClO4': 'Perchloric Acid',
    'CH4': 'Methane', 'C2H6': 'Ethane', 'C2H4': 'Ethene', 'C2H2': 'Ethyne', 'C3H8': 'Propane',
    'C3H6': 'Propene', 'C3H4': 'Propyne', 'C4H10': 'Butane', 'C4H8': 'Butene', 'C4H6': 'Butyne',
    'NaOH': 'Sodium Hydroxide', 'NaCl': 'Sodium Chloride', 'KCl': 'Potassium Chloride', 'CaCO3': 'Calcium Carbonate',
    'NaHCO3': 'Sodium Bicarbonate', 'CaSO4': 'Calcium Sulfate', 'MgSO4': 'Magnesium Sulfate', 'NaNO3': 'Sodium Nitrate',
    'KNO3': 'Potassium Nitrate', 'NH4Cl': 'Ammonium Chloride', 'AlCl3': 'Aluminum Chloride', 'SO2': 'Sulfur Dioxide',
    'SO3': 'Sulfur Trioxide', 'OCS': 'Carbonyl Sulfide', 'N2O3': 'Dinitrogen Trioxide', 'NCl3': 'Nitrogen Trichloride',
    'PCl3': 'Phosphorus Trichloride', 'PCl5': 'Phosphorus Pentachloride', 'CaO': 'Calcium Oxide', 'SiCl4': 'Silicon Tetrachloride',
    'H2S': 'Hydrogen Sulfide', 'NO2': 'Nitrogen Dioxide', 'N2O': 'Nitrous Oxide', 'CS2': 'Carbon Disulfide',
    'CH3OH': 'Methanol', 'C2H5OH': 'Ethanol', 'CH3Cl': 'Chloromethane', 'C2H5Cl': 'Chloroethane', 'CH3Br': 'Bromomethane',
    'CH3I': 'Iodomethane', 'C5H12': 'Pentane', 'C5H10': 'Pentene', 'C5H8': 'Pentyne', 'HCOOH': 'Formic Acid',
    'CH3COOH': 'Acetic Acid', 'H2SiO3': 'Silicic Acid', 'HNO2': 'Nitrous Acid', 'H2SO3': 'Sulfurous Acid',
    'NaF': 'Sodium Fluoride', 'NaBr': 'Sodium Bromide', 'NaI': 'Sodium Iodide', 'KF': 'Potassium Fluoride',
    'KBr': 'Potassium Bromide', 'KI': 'Potassium Iodide', 'CaCl2': 'Calcium Chloride', 'CaF2': 'Calcium Fluoride',
    'MgO': 'Magnesium Oxide', 'MgCl2': 'Magnesium Chloride', 'Al2O3': 'Aluminum Oxide', 'AlF3': 'Aluminum Fluoride',
    'SiO2': 'Silicon Dioxide', 'SiF4': 'Silicon Tetrafluoride', 'PF3': 'Phosphorus Trifluoride', 'PF5': 'Phosphorus Pentafluoride',
    'SF2': 'Sulfur Difluoride', 'SF4': 'Sulfur Tetrafluoride', 'SF6': 'Sulfur Hexafluoride', 'Na2O': 'Sodium Oxide',
    'Na2CO3': 'Sodium Carbonate', 'Na2SO4': 'Sodium Sulfate', 'K2O': 'Potassium Oxide', 'K2CO3': 'Potassium Carbonate',
    'K2SO4': 'Potassium Sulfate', 'CaOH2': 'Calcium Hydroxide', 'MgOH2': 'Magnesium Hydroxide', 'AlOH3': 'Aluminum Hydroxide',
    'NH3': 'Ammonia', 'CH3NH2': 'Methylamine', 'CH2Cl2': 'Dichloromethane', 'CHCl3': 'Chloroform'
};

function startGame() {
    console.log('Start button clicked');
    playerName = document.getElementById('player-name').value.trim() || 'Player';
    console.log('Player name set to:', playerName);
    startScreen.classList.add('hidden');
    gameContainer.classList.add('active');
    setTimeout(() => {
        startScreen.style.display = 'none';
        console.log('Starting game...');
        initGrid();
    }, 500);
}

function initGrid() {
    if (!grid) {
        console.error('Grid element not found!');
        grid = document.getElementById('grid');
        if (!grid) return;
    }
    console.log('Initializing grid...');
    grid.innerHTML = '';
    cells = [];
    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        const atom = atomTypes[Math.floor(Math.random() * atomTypes.length)];
        cell.textContent = atom;
        cell.classList.add(atom);
        cell.dataset.index = i.toString();
        grid.appendChild(cell);
        cells.push(cell);
    }
    console.log('Grid initialized with', cells.length, 'cells');
    attachEventListeners();
    checkForMoves();
}

function attachEventListeners() {
    if (!cells.length) {
        console.error('No cells to attach listeners to!');
        return;
    }
    cells.forEach(cell => {
        cell.removeEventListener('mousedown', startDrag);
        cell.removeEventListener('mouseover', dragOver);
        cell.removeEventListener('mouseup', endDrag);
        cell.addEventListener('mousedown', startDrag);
        cell.addEventListener('mouseover', dragOver);
        cell.addEventListener('mouseup', endDrag);
        cell.removeEventListener('touchstart', startDragTouch);
        cell.removeEventListener('touchmove', dragOverTouch);
        cell.removeEventListener('touchend', endDragTouch);
        cell.addEventListener('touchstart', startDragTouch, { passive: false });
        cell.addEventListener('touchmove', dragOverTouch, { passive: false });
        cell.addEventListener('touchend', endDragTouch);
    });
    console.log('Event listeners attached to', cells.length, 'cells');
}

function startDrag(e) {
    e.preventDefault();
    if (!e.target.classList.contains('cell')) return;
    isDragging = true;
    selectedCells = [];
    selectCell(e.target);
    console.log('Drag started on', e.target.textContent);
}

function dragOver(e) {
    e.preventDefault();
    if (!isDragging || !e.target.classList.contains('cell')) return;
    const cell = e.target;
    if (isAdjacent(cell) && !selectedCells.includes(cell)) {
        selectCell(cell);
        console.log('Dragged over', cell.textContent, 'Current chain:', selectedCells.map(c => c.textContent).join(''));
    }
}

function endDrag(e) {
    if (!isDragging) return;
    isDragging = false;
    console.log('Drag ended, checking chain...');
    checkChain();
}

function startDragTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const cell = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!cell || !cell.classList.contains('cell')) return;
    isDragging = true;
    selectedCells = [];
    selectCell(cell);
    console.log('Touch drag started on', cell.textContent);
}

function dragOverTouch(e) {
    e.preventDefault();
    if (!isDragging) return;
    const touch = e.touches[0];
    const cell = document.elementFromPoint(touch.clientX, touch.clientY);
    if (!cell || !cell.classList.contains('cell')) return;
    if (isAdjacent(cell) && !selectedCells.includes(cell)) {
        selectCell(cell);
        console.log('Touch dragged over', cell.textContent, 'Current chain:', selectedCells.map(c => c.textContent).join(''));
    }
}

function endDragTouch(e) {
    if (!isDragging) return;
    isDragging = false;
    console.log('Touch drag ended, checking chain...');
    checkChain();
}

function selectCell(cell) {
    if (!selectedCells.includes(cell)) {
        selectedCells.push(cell);
        cell.classList.add('selected');
        console.log('Selected', cell.textContent);
    }
}

function isAdjacent(cell) {
    if (selectedCells.length === 0) return true;
    const lastCell = selectedCells[selectedCells.length - 1];
    const lastIndex = parseInt(lastCell.dataset.index);
    const currentIndex = parseInt(cell.dataset.index);
    const rowDiff = Math.abs(Math.floor(lastIndex / GRID_SIZE) - Math.floor(currentIndex / GRID_SIZE));
    const colDiff = Math.abs((lastIndex % GRID_SIZE) - (currentIndex % GRID_SIZE));
    return (rowDiff <= 1 && colDiff <= 1) && (rowDiff + colDiff > 0);
}

function checkChain() {
    const chain = selectedCells.map(cell => cell.textContent).join('');
    console.log('Raw chain formed:', chain);

    const atomCount = {};
    for (let atom of chain) {
        atomCount[atom] = (atomCount[atom] || 0) + 1;
    }
    let normalizedChain = '';
    for (let atom in atomCount) {
        normalizedChain += atom + (atomCount[atom] > 1 ? atomCount[atom] : '');
    }
    console.log('Normalized chain:', normalizedChain);

    let formattedChain = '';
    for (let i = 0; i < normalizedChain.length; i++) {
        if (/\d/.test(normalizedChain[i])) {
            formattedChain += `<sub>${normalizedChain[i]}</sub>`;
        } else {
            formattedChain += normalizedChain[i];
        }
    }

    const moleculeName = molecules[chain] || molecules[normalizedChain];
    if (moleculeName) {
        console.log('Valid molecule:', moleculeName, 'from', chain);
        score += selectedCells.length * 10;
        compoundsCreated += 1;
        scoreDisplay.textContent = `Score: ${score}`;
        moleculeDisplay.innerHTML = `${formattedChain} - ${moleculeName}<div class="glitter"></div>`;
        blastCells();
        if (score >= 200 && score % 200 === 0) {
            console.log('Score hit', score, 'refreshing board...');
            setTimeout(initGrid, 1000);
        }
    } else {
        console.log('Invalid molecule:', chain, 'Normalized:', normalizedChain, 'Resetting...');
        selectedCells.forEach(cell => cell.classList.remove('selected'));
        moleculeDisplay.textContent = '';
    }
    selectedCells = [];
    checkForMoves();
}

function blastCells() {
    console.log('Blasting', selectedCells.length, 'cells');
    selectedCells.forEach(cell => {
        cell.classList.add('blast');
        cell.addEventListener('animationend', () => {
            const atom = atomTypes[Math.floor(Math.random() * atomTypes.length)];
            cell.textContent = atom;
            cell.className = `cell ${atom}`;
            console.log('Replaced with', atom);
        }, { once: true });
    });
}

function checkForMoves() {
    let hasMoves = false;
    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        const row = Math.floor(i / GRID_SIZE);
        const col = i % GRID_SIZE;
        const neighbors = getNeighbors(row, col);
        for (let neighbor of neighbors) {
            const testChain = [cell.textContent, neighbor.textContent].join('');
            if (molecules[testChain]) {
                hasMoves = true;
                break;
            }
        }
        if (hasMoves) break;
    }
    if (!hasMoves) {
        console.log('No moves left, reshuffling...');
        setTimeout(initGrid, 500);
    }
}

function getNeighbors(row, col) {
    const neighbors = [];
    const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    for (let [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;
        if (newRow >= 0 && newRow < GRID_SIZE && newCol >= 0 && newCol < GRID_SIZE) {
            neighbors.push(cells[newRow * GRID_SIZE + newCol]);
        }
    }
    return neighbors;
}

function shareScore() {
    const url = "https://chemcrushbyrajat.example.com"; // Placeholder URL
    const text = `${playerName} created ${compoundsCreated} compounds, score: ${score}. Play at: ${url}`;
    if (navigator.share) {
        navigator.share({ text }).catch(err => console.error('Share failed:', err));
    } else {
        navigator.clipboard.writeText(text).then(() => alert('Score copied to clipboard!'));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, setting up start button...');
    if (!startButton) {
        console.error('Start button not found!');
        return;
    }
    startButton.addEventListener('click', startGame);
    if (!shareButton) {
        console.error('Share button not found!');
    } else {
        shareButton.addEventListener('click', shareScore);
    }
});

setTimeout(() => {
    if (!cells.length && gameContainer.classList.contains('active')) {
        console.log('Failsafe: Grid not loaded, forcing init...');
        initGrid();
    }
}, 2000);
