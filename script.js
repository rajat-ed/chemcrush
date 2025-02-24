const GRID_SIZE = 8;

// Single atoms only
const ATOMS = [
    'H', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Na', 'Mg',
    'Al', 'Si', 'P', 'S', 'Cl', 'K', 'Ca'
];

// 50 Compounds with balanced equations
const COMPOUNDS = {
    'H2': { atoms: ['H', 'H'], equation: '2H → H₂', points: 50 },
    'O2': { atoms: ['O', 'O'], equation: '2O → O₂', points: 50 },
    'HCl': { atoms: ['H', 'Cl'], equation: 'H + Cl → HCl', points: 50 },
    'NaCl': { atoms: ['Na', 'Cl'], equation: '2Na + Cl₂ → 2NaCl', points: 50 },
    'HF': { atoms: ['H', 'F'], equation: 'H + F → HF', points: 50 },
    'LiH': { atoms: ['Li', 'H'], equation: 'Li + H → LiH', points: 50 },
    'BeO': { atoms: ['Be', 'O'], equation: '2Be + O₂ → 2BeO', points: 50 },
    'CO': { atoms: ['C', 'O'], equation: '2C + O₂ → 2CO', points: 50 },
    'NO': { atoms: ['N', 'O'], equation: 'N₂ + O₂ → 2NO', points: 50 },
    'KCl': { atoms: ['K', 'Cl'], equation: '2K + Cl₂ → 2KCl', points: 50 },
    'H2O': { atoms: ['H', 'H', 'O'], equation: '2H + O → H₂O', points: 100 },
    'NH3': { atoms: ['N', 'H', 'H', 'H'], equation: 'N + 3H → NH₃', points: 150 },
    'H2S': { atoms: ['H', 'H', 'S'], equation: '2H + S → H₂S', points: 100 },
    'CO2': { atoms: ['C', 'O', 'O'], equation: 'C + O₂ → CO₂', points: 100 },
    'SO2': { atoms: ['S', 'O', 'O'], equation: 'S + O → SO₂', points: 100 },
    'SiO2': { atoms: ['Si', 'O', 'O'], equation: 'Si + O₂ → SiO₂', points: 100 },
    'CS2': { atoms: ['C', 'S', 'S'], equation: 'C + 2S → CS₂', points: 100 },
    'CaF2': { atoms: ['Ca', 'F', 'F'], equation: 'Ca + F₂ → CaF₂', points: 100 },
    'BeF2': { atoms: ['Be', 'F', 'F'], equation: 'Be + F₂ → BeF₂', points: 100 },
    'Li2O': { atoms: ['Li', 'Li', 'O'], equation: '4Li + O₂ → 2Li₂O', points: 100 },
    'MgO': { atoms: ['Mg', 'O'], equation: '2Mg + O₂ → 2MgO', points: 50 },
    'CH4': { atoms: ['C', 'H', 'H', 'H', 'H'], equation: 'C + 4H → CH₄', points: 150 },
    'PH3': { atoms: ['P', 'H', 'H', 'H'], equation: 'P + 3H → PH₃', points: 150 },
    'SiH4': { atoms: ['Si', 'H', 'H', 'H', 'H'], equation: 'Si + 4H → SiH₄', points: 150 },
    'AlCl3': { atoms: ['Al', 'Cl', 'Cl', 'Cl'], equation: '2Al + 3Cl₂ → 2AlCl₃', points: 150 },
    'BF3': { atoms: ['B', 'F', 'F', 'F'], equation: '2B + 3F₂ → 2BF₃', points: 150 },
    'PF3': { atoms: ['P', 'F', 'F', 'F'], equation: '2P + 3F₂ → 2PF₃', points: 150 },
    'SF2': { atoms: ['S', 'F', 'F'], equation: 'S + F₂ → SF₂', points: 100 },
    'CaCl2': { atoms: ['Ca', 'Cl', 'Cl'], equation: 'Ca + Cl₂ → CaCl₂', points: 100 },
    'H2O2': { atoms: ['H', 'H', 'O', 'O'], equation: '2H + O₂ → H₂O₂', points: 150 },
    'C2H4': { atoms: ['C', 'C', 'H', 'H', 'H', 'H'], equation: '2C + 4H → C₂H₄', points: 200 },
    'C2H2': { atoms: ['C', 'C', 'H', 'H'], equation: '2C + 2H → C₂H₂', points: 150 },
    'SO3': { atoms: ['S', 'O', 'O', 'O'], equation: 'S + 1½O₂ → SO₃', points: 150 },
    'SiF4': { atoms: ['Si', 'F', 'F', 'F', 'F'], equation: 'Si + 2F₂ → SiF₄', points: 200 },
    'PCl3': { atoms: ['P', 'Cl', 'Cl', 'Cl'], equation: '2P + 3Cl₂ → 2PCl₃', points: 150 },
    'SCl2': { atoms: ['S', 'Cl', 'Cl'], equation: 'S + Cl₂ → SCl₂', points: 100 },
    'Na2O': { atoms: ['Na', 'Na', 'O'], equation: '4Na + O₂ → 2Na₂O', points: 100 },
    'K2O': { atoms: ['K', 'K', 'O'], equation: '4K + O₂ → 2K₂O', points: 100 },
    'MgCl2': { atoms: ['Mg', 'Cl', 'Cl'], equation: 'Mg + Cl₂ → MgCl₂', points: 100 },
    'H2SO4': { atoms: ['H', 'H', 'S', 'O', 'O', 'O', 'O'], equation: '2H + S + 2O₂ → H₂SO₄', points: 250 },
    'HNO3': { atoms: ['H', 'N', 'O', 'O', 'O'], equation: 'H + N + 1½O₂ → HNO₃', points: 200 },
    'C3H8': { atoms: ['C', 'C', 'C', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'], equation: '3C + 8H → C₃H₈', points: 300 },
    'C2H5OH': { atoms: ['C', 'C', 'H', 'H', 'H', 'H', 'H', 'O'], equation: '2C + 6H + O → C₂H₅OH', points: 250 },
    'CH3COOH': { atoms: ['C', 'H', 'H', 'H', 'C', 'O', 'O'], equation: '2C + 4H + 2O → CH₃COOH', points: 250 },
    'H3PO4': { atoms: ['H', 'H', 'H', 'P', 'O', 'O', 'O', 'O'], equation: '3H + P + 2O₂ → H₃PO₄', points: 300 },
    'P2O5': { atoms: ['P', 'P', 'O', 'O', 'O', 'O', 'O'], equation: '4P + 5O₂ → 2P₂O₅', points: 250 },
    'Al2O3': { atoms: ['Al', 'Al', 'O', 'O', 'O'], equation: '4Al + 3O₂ → 2Al₂O₃', points: 200 },
    'Na2CO3': { atoms: ['Na', 'Na', 'C', 'O', 'O', 'O'], equation: '2Na + C + 1½O₂ → Na₂CO₃', points: 200 },
    'CaCO3': { atoms: ['Ca', 'C', 'O', 'O', 'O'], equation: 'Ca + C + 1½O₂ → CaCO₃', points: 200 },
    'C6H12O6': { atoms: ['C', 'C', 'C', 'C', 'C', 'C', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'O', 'O', 'O', 'O', 'O', 'O'], equation: '6C + 12H + 6O₂ → C₆H₁₂O₆', points: 600 }
};

let board = [];
let score = 0;
let selectedTiles = [];
let tileElements = [];
let isDragging = false;

const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const equationDisplay = document.getElementById('equation');

// Initialize board
function initBoard() {
    board = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(null));
    tileElements = Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(null));
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            board[row][col] = randomAtom();
            createTile(row, col);
        }
    }
    addEventListeners();
    checkAndReshuffle();
    console.log('Board initialized:', board);
}

// Random atom
function randomAtom() {
    return ATOMS[Math.floor(Math.random() * ATOMS.length)];
}

// Create tile
function createTile(row, col) {
    const tile = document.createElement('div');
    tile.className = 'tile ' + board[row][col];
    tile.textContent = board[row][col];
    tile.dataset.row = row;
    tile.dataset.col = col;
    tileElements[row][col] = tile;
    gameBoard.appendChild(tile);
}

// Update tile
function updateTile(row, col) {
    const tile = tileElements[row][col];
    if (!board[row][col]) {
        tile.className = 'tile';
        tile.textContent = '';
    } else {
        tile.className = 'tile ' + board[row][col];
        tile.textContent = board[row][col];
    }
}

// Add event listeners
function addEventListeners() {
    gameBoard.addEventListener('mousedown', startDrag);
    gameBoard.addEventListener('mousemove', drag);
    gameBoard.addEventListener('mouseup', endDrag);
    gameBoard.addEventListener('touchstart', startDrag, { passive: false });
    gameBoard.addEventListener('touchmove', drag, { passive: false });
    gameBoard.addEventListener('touchend', endDrag, { passive: false });
    gameBoard.addEventListener('click', handleClick);
}

// Start drag
function startDrag(event) {
    event.preventDefault();
    const tile = getTileFromEvent(event);
    if (!tile) return;
    const { row, col } = tile.dataset;
    isDragging = true;
    selectedTiles = [{ row: parseInt(row), col: parseInt(col) }];
    tile.classList.add('selected');
    console.log('Drag started at:', row, col, board[row][col]);
}

// Drag over tiles
function drag(event) {
    if (!isDragging) return;
    event.preventDefault();
    const tile = getTileFromEvent(event);
    if (!tile) return;
    const { row, col } = tile.dataset;
    const pos = { row: parseInt(row), col: parseInt(col) };
    const lastTile = selectedTiles[selectedTiles.length - 1];

    if (!selectedTiles.some(t => t.row === pos.row && t.col === pos.col) && 
        isAdjacent(lastTile.row, lastTile.col, pos.row, pos.col)) {
        selectedTiles.push(pos);
        tile.classList.add('selected');
        console.log('Dragged to:', row, col, board[row][col], 'Selected:', selectedTiles.map(t => board[t.row][t.col]));
        checkCombination();
    }
}

// End drag
function endDrag(event) {
    if (isDragging) {
        isDragging = false;
        console.log('Drag ended, checking combination');
        checkCombination();
    }
}

// Handle click
function handleClick(event) {
    const tile = getTileFromEvent(event);
    if (!tile) return;
    const { row, col } = tile.dataset;
    const pos = { row: parseInt(row), col: parseInt(col) };

    if (selectedTiles.some(t => t.row === pos.row && t.col === pos.col)) {
        tile.classList.remove('selected');
        selectedTiles = selectedTiles.filter(t => t.row !== pos.row || t.col !== pos.col);
        console.log('Deselected:', row, col);
        return;
    }

    if (selectedTiles.length === 0 || selectedTiles.some(t => isAdjacent(t.row, t.col, pos.row, pos.col))) {
        selectedTiles.push(pos);
        tile.classList.add('selected');
        console.log('Clicked:', row, col, board[row][col], 'Selected:', selectedTiles.map(t => board[t.row][t.col]));
        checkCombination();
    } else {
        clearSelection();
        selectedTiles = [pos];
        tile.classList.add('selected');
        console.log('Reset and selected:', row, col);
    }
}

// Get tile from event
function getTileFromEvent(event) {
    const touch = event.touches ? event.touches[0] : event;
    const target = document.elementFromPoint(touch.clientX, touch.clientY);
    return target && target.classList.contains('tile') ? target : null;
}

// Check adjacency
function isAdjacent(row1, col1, row2, col2) {
    const dr = Math.abs(row1 - row2);
    const dc = Math.abs(col1 - col2);
    return (dr <= 1 && dc <= 1) && !(dr === 0 && dc === 0);
}

// Check for compound
function checkCombination() {
    const selectedAtoms = selectedTiles.map(({ row, col }) => board[row][col]);
    if (selectedAtoms.length < 2) return;

    console.log('Checking combination:', selectedAtoms);

    for (const [compound, { atoms, equation, points }] of Object.entries(COMPOUNDS)) {
        if (selectedAtoms.length === atoms.length && arraysMatch(selectedAtoms, atoms)) {
            console.log(`Match found: ${compound}, Points: ${points}`);
            score += points;
            showEquation(equation);
            clearMatchedTiles();
            dropTiles();
            checkAndReshuffle();
            return;
        }
    }
    console.log('No match found');
}

// Show equation popup
function showEquation(equation) {
    equationDisplay.textContent = equation;
    equationDisplay.style.opacity = '0'; // Reset for animation
    equationDisplay.style.animation = 'none';
    setTimeout(() => {
        equationDisplay.style.animation = 'equationPop 1.5s forwards';
    }, 10); // Small delay to restart animation
}

// Compare arrays (exact match, ignoring order)
function arraysMatch(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    const count1 = {};
    const count2 = {};
    for (const item of arr1) count1[item] = (count1[item] || 0) + 1;
    for (const item of arr2) count2[item] = (count2[item] || 0) + 1;
    for (const key in count1) {
        if (count1[key] !== (count2[key] || 0)) {
            console.log(`Mismatch: ${key} - Selected: ${count1[key]}, Required: ${count2[key] || 0}`);
            return false;
        }
    }
    return true;
}

// Clear matched tiles
function clearMatchedTiles() {
    selectedTiles.forEach(({ row, col }) => {
        const tile = tileElements[row][col];
        tile.classList.remove('selected');
        tile.classList.add('matched');
        board[row][col] = null;
        setTimeout(() => updateTile(row, col), 500);
    });
    selectedTiles = [];
    updateScore();
    console.log('Tiles cleared');
}

// Clear selection
function clearSelection() {
    selectedTiles.forEach(({ row, col }) => tileElements[row][col].classList.remove('selected'));
    selectedTiles = [];
    console.log('Selection cleared');
}

// Drop and refill
function dropTiles() {
    for (let col = 0; col < GRID_SIZE; col++) {
        let emptyRows = [];
        for (let row = GRID_SIZE - 1; row >= 0; row--) {
            if (!board[row][col]) {
                emptyRows.push(row);
            } else if (emptyRows.length > 0) {
                const newRow = emptyRows.shift();
                board[newRow][col] = board[row][col];
                board[row][col] = null;
                emptyRows.push(row);
                updateTile(newRow, col);
                updateTile(row, col);
            }
        }
        emptyRows.forEach(row => {
            board[row][col] = randomAtom();
            updateTile(row, col);
        });
    }
    console.log('Tiles dropped');
}

// Check if any compounds are possible
function canFormCompound() {
    for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
            if (!board[row][col]) continue;
            const visited = new Set();
            const queue = [{ row, col, path: [board[row][col]] }];
            while (queue.length > 0) {
                const { row: r, col: c, path } = queue.shift();
                const key = `${r},${c}`;
                if (visited.has(key)) continue;
                visited.add(key);

                for (const [compound, { atoms }] of Object.entries(COMPOUNDS)) {
                    if (arraysMatch(path, atoms)) {
                        console.log('Possible compound found:', compound);
                        return true;
                    }
                }

                for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        if (dr === 0 && dc === 0) continue;
                        const nr = r + dr;
                        const nc = c + dc;
                        if (nr < 0 || nr >= GRID_SIZE || nc < 0 || nc >= GRID_SIZE || visited.has(`${nr},${nc}`)) continue;
                        if (!board[nr][nc]) continue;
                        queue.push({ row: nr, col: nc, path: [...path, board[nr][nc]] });
                    }
                }
            }
        }
    }
    console.log('No compounds possible');
    return false;
}

// Reshuffle if no compounds possible
function checkAndReshuffle() {
    if (!canFormCompound()) {
        console.log('Reshuffling board');
        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                board[row][col] = randomAtom();
                updateTile(row, col);
            }
        }
        if (!canFormCompound()) checkAndReshuffle();
    }
}

// Update score
function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

// Start game
initBoard();
