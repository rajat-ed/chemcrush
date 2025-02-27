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
    'NH3': 'Ammonia', 'CH3NH2': 'Methylamine', 'CH2Cl2': 'Dichloromethane', 'CHCl3': 'Chloroform', 'HCN': 'Hydrogen cyanide'
};

// Convert molecules to array for randomization
const moleculeList = Object.entries(molecules).map(([formula, name]) => ({ formula, name }));

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

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

    // Full randomization across all molecules
    const shuffledMolecules = shuffleArray([...moleculeList]);
    const atomPool = [];
    shuffledMolecules.forEach(m => {
        for (let char of m.formula) {
            if (atomTypes.includes(char)) {
                // Add each atom multiple times to increase variety
                atomPool.push(char);
                atomPool.push(char);
                atomPool.push(char);
            }
        }
    });
    shuffleArray(atomPool); // Extra shuffle for randomness

    for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        const atom = atomPool[i % atomPool.length]; // Cycle through pool for variety
        cell.textContent = atom;
        cell.classList.add(atom);
        cell.dataset.index = i.toString();
        cell.classList.add('fall');
        grid.appendChild(cell);
        cells.push(cell);
    }

    console.log('Grid initialized with', cells.length, 'cells');
    attachEventListeners();
    checkForMoves();
}

function getColumn(col) {
    return cells.filter((_, index) => index % GRID_SIZE === col);
}

function refillGrid() {
    console.log('Refilling grid...');
    const blastedCols = new Set();
    cells.forEach(cell => {
        if (cell.classList.contains('blast')) {
            const col = parseInt(cell.dataset.index) % GRID_SIZE;
            blastedCols.add(col);
        }
    });

    blastedCols.forEach(col => {
        const column = getColumn(col);
        const newColumn = Array(GRID_SIZE).fill(null);
        let writeIdx = GRID_SIZE - 1;

        // Move non-blasted cells down
        for (let i = GRID_SIZE - 1; i >= 0; i--) {
            if (!column[i].classList.contains('blast') && column[i].textContent) {
                newColumn[writeIdx] = column[i].textContent;
                writeIdx--;
            }
        }

        // Fill empty slots with maximum variety
        const shuffledMolecules = shuffleArray([...moleculeList]);
        let atomIdx = Math.floor(Math.random() * shuffledMolecules.length); // Random starting point
        for (let i = 0; i <= writeIdx; i++) {
            const molecule = shuffledMolecules[atomIdx % shuffledMolecules.length];
            const atom = molecule.formula[Math.floor(Math.random() * molecule.formula.length)]; // Random atom from molecule
            newColumn[i] = atomTypes.includes(atom) ? atom : atomTypes[Math.floor(Math.random() * atomTypes.length)];
            atomIdx++;
        }

        // Apply new column with fall animation
        for (let i = 0; i < GRID_SIZE; i++) {
            if (newColumn[i]) {
                column[i].textContent = newColumn[i];
                column[i].className = `cell ${newColumn[i]} fall`;
            } else {
                column[i].textContent = '';
                column[i].className = 'cell';
            }
        }
    });
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

    const moleculeName = molecules[chain] || molecules[normalizedChain];
    if (moleculeName) {
        console.log('Valid molecule:', moleculeName, 'from', chain);
        score += selectedCells.length * 10;
        compoundsCreated += 1;
        scoreDisplay.textContent = `Score: ${score}`;

        // Create formatted molecule display with proper subscripts
        const formattedSpan = document.createElement('span');
        for (let i = 0; i < normalizedChain.length; i++) {
            if (/\d/.test(normalizedChain[i])) {
                const sub = document.createElement('sub');
                sub.textContent = normalizedChain[i];
                formattedSpan.appendChild(sub);
            } else {
                formattedSpan.appendChild(document.createTextNode(normalizedChain[i]));
            }
        }
        moleculeDisplay.innerHTML = '';
        moleculeDisplay.appendChild(formattedSpan);
        moleculeDisplay.appendChild(document.createTextNode(' - ' + moleculeName));
        const glitter = document.createElement('div');
        glitter.className = 'glitter';
        moleculeDisplay.appendChild(glitter);

        blastCells();
        if (score >= 200 && score % 200 === 0) {
            console.log('Score hit', score, 'refreshing board...');
            setTimeout(() => {
                grid.innerHTML = '';
                cells = [];
                initGrid();
            }, 1000);
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
            cell.textContent = '';
            setTimeout(() => {
                refillGrid();
            }, 100);
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
        setTimeout(() => {
            grid.innerHTML = '';
            cells = [];
            initGrid();
        }, 500);
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
    const url = "https://rajat-ed.github.io/chemcrush/";
    const text = `⚛️${playerName} created ${compoundsCreated} compounds🧪, 🏆score: ${score}. 🎮Play at: ${url}`;
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
