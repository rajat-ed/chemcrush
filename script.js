const GRID_ROWS = 9;
const GRID_COLS = 9;

// 100 Compounds with balanced equations
const COMPOUNDS = {
    'H2': { atoms: ['H', 'H'], equation: '2H → H₂', points: 50 },
    'O2': { atoms: ['O', 'O'], equation: '2O → O₂', points: 50 },
    'N2': { atoms: ['N', 'N'], equation: '2N → N₂', points: 50 },
    'F2': { atoms: ['F', 'F'], equation: '2F → F₂', points: 50 },
    'Cl2': { atoms: ['Cl', 'Cl'], equation: '2Cl → Cl₂', points: 50 },
    'HCl': { atoms: ['H', 'Cl'], equation: 'H + Cl → HCl', points: 50 },
    'NaCl': { atoms: ['Na', 'Cl'], equation: '2Na + Cl₂ → 2NaCl', points: 50 },
    'HF': { atoms: ['H', 'F'], equation: 'H + F → HF', points: 50 },
    'LiH': { atoms: ['Li', 'H'], equation: 'Li + H → LiH', points: 50 },
    'BeO': { atoms: ['Be', 'O'], equation: '2Be + O₂ → 2BeO', points: 50 },
    'CO': { atoms: ['C', 'O'], equation: '2C + O₂ → 2CO', points: 50 },
    'NO': { atoms: ['N', 'O'], equation: 'N₂ + O₂ → 2NO', points: 50 },
    'KCl': { atoms: ['K', 'Cl'], equation: '2K + Cl₂ → 2KCl', points: 50 },
    'MgO': { atoms: ['Mg', 'O'], equation: '2Mg + O₂ → 2MgO', points: 50 },
    'AlF3': { atoms: ['Al', 'F', 'F', 'F'], equation: '2Al + 3F₂ → 2AlF₃', points: 150 },
    'SiO2': { atoms: ['Si', 'O', 'O'], equation: 'Si + O₂ → SiO₂', points: 100 },
    'PCl3': { atoms: ['P', 'Cl', 'Cl', 'Cl'], equation: '2P + 3Cl₂ → 2PCl₃', points: 150 },
    'SCl2': { atoms: ['S', 'Cl', 'Cl'], equation: 'S + Cl₂ → SCl₂', points: 100 },
    'CaF2': { atoms: ['Ca', 'F', 'F'], equation: 'Ca + F₂ → CaF₂', points: 100 },
    'FeO': { atoms: ['Fe', 'O'], equation: '2Fe + O₂ → 2FeO', points: 50 },
    'CuCl': { atoms: ['Cu', 'Cl'], equation: '2Cu + Cl₂ → 2CuCl', points: 50 },
    'H2O': { atoms: ['H', 'H', 'O'], equation: '2H + O → H₂O', points: 100 },
    'NH3': { atoms: ['N', 'H', 'H', 'H'], equation: 'N + 3H → NH₃', points: 150 },
    'H2S': { atoms: ['H', 'H', 'S'], equation: '2H + S → H₂S', points: 100 },
    'CO2': { atoms: ['C', 'O', 'O'], equation: 'C + O₂ → CO₂', points: 100 },
    'SO2': { atoms: ['S', 'O', 'O'], equation: 'S + O → SO₂', points: 100 },
    'CS2': { atoms: ['C', 'S', 'S'], equation: 'C + 2S → CS₂', points: 100 },
    'BeF2': { atoms: ['Be', 'F', 'F'], equation: 'Be + F₂ → BeF₂', points: 100 },
    'Li2O': { atoms: ['Li', 'Li', 'O'], equation: '4Li + O₂ → 2Li₂O', points: 100 },
    'CH4': { atoms: ['C', 'H', 'H', 'H', 'H'], equation: 'C + 4H → CH₄', points: 150 },
    'PH3': { atoms: ['P', 'H', 'H', 'H'], equation: 'P + 3H → PH₃', points: 150 },
    'SiH4': { atoms: ['Si', 'H', 'H', 'H', 'H'], equation: 'Si + 4H → SiH₄', points: 150 },
    'BF3': { atoms: ['B', 'F', 'F', 'F'], equation: '2B + 3F₂ → 2BF₃', points: 150 },
    'PF3': { atoms: ['P', 'F', 'F', 'F'], equation: '2P + 3F₂ → 2PF₃', points: 150 },
    'SF2': { atoms: ['S', 'F', 'F'], equation: 'S + F₂ → SF₂', points: 100 },
    'CaCl2': { atoms: ['Ca', 'Cl', 'Cl'], equation: 'Ca + Cl₂ → CaCl₂', points: 100 },
    'FeCl2': { atoms: ['Fe', 'Cl', 'Cl'], equation: 'Fe + Cl₂ → FeCl₂', points: 100 },
    'CuO': { atoms: ['Cu', 'O'], equation: '2Cu + O₂ → 2CuO', points: 50 },
    'H2O2': { atoms: ['H', 'H', 'O', 'O'], equation: '2H + O₂ → H₂O₂', points: 150 },
    'C2H4': { atoms: ['C', 'C', 'H', 'H', 'H', 'H'], equation: '2C + 4H → C₂H₄', points: 200 },
    'C2H2': { atoms: ['C', 'C', 'H', 'H'], equation: '2C + 2H → C₂H₂', points: 150 },
    'SO3': { atoms: ['S', 'O', 'O', 'O'], equation: 'S + 1½O₂ → SO₃', points: 150 },
    'SiF4': { atoms: ['Si', 'F', 'F', 'F', 'F'], equation: 'Si + 2F₂ → SiF₄', points: 200 },
    'Na2O': { atoms: ['Na', 'Na', 'O'], equation: '4Na + O₂ → 2Na₂O', points: 100 },
    'K2O': { atoms: ['K', 'K', 'O'], equation: '4K + O₂ → 2K₂O', points: 100 },
    'MgCl2': { atoms: ['Mg', 'Cl', 'Cl'], equation: 'Mg + Cl₂ → MgCl₂', points: 100 },
    'Fe2O3': { atoms: ['Fe', 'Fe', 'O', 'O', 'O'], equation: '4Fe + 3O₂ → 2Fe₂O₃', points: 200 },
    'CuCl2': { atoms: ['Cu', 'Cl', 'Cl'], equation: 'Cu + Cl₂ → CuCl₂', points: 100 },
    'H2SO4': { atoms: ['H', 'H', 'S', 'O', 'O', 'O', 'O'], equation: '2H + S + 2O₂ → H₂SO₄', points: 250 },
    'HNO3': { atoms: ['H', 'N', 'O', 'O', 'O'], equation: 'H + N + 1½O₂ → HNO₃', points: 200 },
    'C3H8': { atoms: ['C', 'C', 'C', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'], equation: '3C + 8H → C₃H₈', points: 300 },
    'C2H5OH': { atoms: ['C', 'C', 'H', 'H', 'H', 'H', 'H', 'O'], equation: '2C + 6H + O → C₂H₅OH', points: 250 },
    'CH3COOH': { atoms: ['C', 'H', 'H', 'H', 'C', 'O', 'O'], equation: '2C + 4H + 2O → CH₃COOH', points: 250 },
    'H3PO4': { atoms: ['H', 'H', 'H', 'P', 'O', 'O', 'O', 'O'], equation: '3H + P + 2O₂ → H₃PO₄', points: 300 },
    'P2O5': { atoms: ['P', 'P', 'O', 'O', 'O', 'O', 'O'], equation: '4P + 5O₂ → 2P₂O₅', points: 250 },
    'Na2CO3': { atoms: ['Na', 'Na', 'C', 'O', 'O', 'O'], equation: '2Na + C + 1½O₂ → Na₂CO₃', points: 200 },
    'CaCO3': { atoms: ['Ca', 'C', 'O', 'O', 'O'], equation: 'Ca + C + 1½O₂ → CaCO₃', points: 200 },
    'C6H12O6': { atoms: ['C', 'C', 'C', 'C', 'C', 'C', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'O', 'O', 'O', 'O', 'O', 'O'], equation: '6C + 12H + 6O₂ → C₆H₁₂O₆', points: 600 },
    'LiF': { atoms: ['Li', 'F'], equation: '2Li + F₂ → 2LiF', points: 50 },
    'BeCl2': { atoms: ['Be', 'Cl', 'Cl'], equation: 'Be + Cl₂ → BeCl₂', points: 100 },
    'B2O3': { atoms: ['B', 'B', 'O', 'O', 'O'], equation: '4B + 3O₂ → 2B₂O₃', points: 200 },
    'CF4': { atoms: ['C', 'F', 'F', 'F', 'F'], equation: 'C + 2F₂ → CF₄', points: 200 },
    'N2O': { atoms: ['N', 'N', 'O'], equation: '2N + O → N₂O', points: 100 },
    'NO2': { atoms: ['N', 'O', 'O'], equation: 'N + O₂ → NO₂', points: 100 },
    'SF6': { atoms: ['S', 'F', 'F', 'F', 'F', 'F', 'F'], equation: 'S + 3F₂ → SF₆', points: 250 },
    'PCl5': { atoms: ['P', 'Cl', 'Cl', 'Cl', 'Cl', 'Cl'], equation: '2P + 5Cl₂ → 2PCl₅', points: 200 },
    'Al2S3': { atoms: ['Al', 'Al', 'S', 'S', 'S'], equation: '2Al + 3S → Al₂S₃', points: 200 },
    'SiCl4': { atoms: ['Si', 'Cl', 'Cl', 'Cl', 'Cl'], equation: 'Si + 2Cl₂ → SiCl₄', points: 200 },
    'FeS': { atoms: ['Fe', 'S'], equation: 'Fe + S → FeS', points: 50 },
    'Cu2O': { atoms: ['Cu', 'Cu', 'O'], equation: '4Cu + O₂ → 2Cu₂O', points: 100 },
    'CH3Cl': { atoms: ['C', 'H', 'H', 'H', 'Cl'], equation: 'C + 3H + Cl → CH₃Cl', points: 150 },
    'C2H6': { atoms: ['C', 'C', 'H', 'H', 'H', 'H', 'H', 'H'], equation: '2C + 6H → C₂H₆', points: 250 },
    'CH2O': { atoms: ['C', 'H', 'H', 'O'], equation: 'C + 2H + O → CH₂O', points: 150 },
    'HCOOH': { atoms: ['H', 'C', 'O', 'O', 'H'], equation: 'C + 2H + 2O → HCOOH', points: 200 },
    'NaOH': { atoms: ['Na', 'O', 'H'], equation: '2Na + 2H + O₂ → 2NaOH', points: 100 },
    'KOH': { atoms: ['K', 'O', 'H'], equation: '2K + 2H + O₂ → 2KOH', points: 100 },
    'Mg(OH)2': { atoms: ['Mg', 'O', 'H', 'O', 'H'], equation: 'Mg + 2H + O₂ → Mg(OH)₂', points: 200 },
    'Ca(OH)2': { atoms: ['Ca', 'O', 'H', 'O', 'H'], equation: 'Ca + 2H + O₂ → Ca(OH)₂', points: 200 },
    'Fe(OH)2': { atoms: ['Fe', 'O', 'H', 'O', 'H'], equation: 'Fe + 2H + O₂ → Fe(OH)₂', points: 200 },
    'CuSO4': { atoms: ['Cu', 'S', 'O', 'O', 'O', 'O'], equation: 'Cu + S + 2O₂ → CuSO₄', points: 250 },
    'Al(OH)3': { atoms: ['Al', 'O', 'H', 'O', 'H', 'O', 'H'], equation: '2Al + 6H + 3O₂ → 2Al(OH)₃', points: 250 },
    'SiO': { atoms: ['Si', 'O'], equation: '2Si + O₂ → 2SiO', points: 50 },
    'P2S5': { atoms: ['P', 'P', 'S', 'S', 'S', 'S', 'S'], equation: '2P + 5S → P₂S₅', points: 300 },
    'FeCl3': { atoms: ['Fe', 'Cl', 'Cl', 'Cl'], equation: '2Fe + 3Cl₂ → 2FeCl₃', points: 150 },
    'CuS': { atoms: ['Cu', 'S'], equation: 'Cu + S → CuS', points: 50 },
    'C4H10': { atoms: ['C', 'C', 'C', 'C', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H', 'H'], equation: '4C + 10H → C₄H₁₀', points: 350 },
    'CH3OCH3': { atoms: ['C', 'H', 'H', 'H', 'O', 'C', 'H', 'H', 'H'], equation: '2C + 6H + O → CH₃OCH₃', points: 300 },
    'C6H6': { atoms: ['C', 'C', 'C', 'C', 'C', 'C', 'H', 'H', 'H', 'H', 'H', 'H'], equation: '6C + 6H → C₆H₆', points: 350 },
    'TiO2': { atoms: ['Ti', 'O', 'O'], equation: 'Ti + O₂ → TiO₂', points: 100 },
    'LiCl': { atoms: ['Li', 'Cl'], equation: '2Li + Cl₂ → 2LiCl', points: 50 },
    'NaF': { atoms: ['Na', 'F'], equation: '2Na + F₂ → 2NaF', points: 50 },
    'KF': { atoms: ['K', 'F'], equation: '2K + F₂ → 2KF', points: 50 },
    'MgF2': { atoms: ['Mg', 'F', 'F'], equation: 'Mg + F₂ → MgF₂', points: 100 },
    'AlCl3': { atoms: ['Al', 'Cl', 'Cl', 'Cl'], equation: '2Al + 3Cl₂ → 2AlCl₃', points: 150 }
};

// Extract unique atoms from compounds
const ATOMS = Array.from(new Set(Object.values(COMPOUNDS).flatMap(c => c.atoms))).sort();
// Resulting ATOMS: ['H', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'K', 'Ca', 'Ti', 'Fe', 'Cu']

let board = [];
let score = 0;
let selectedTiles = [];
let tileElements = [];
let isDragging = false;
let playerName = '';

const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const equationDisplay = document.getElementById('equation');
const namePrompt = document.getElementById('name-prompt');
const gameContainer = document.getElementById('game-container');
const startButton = document.getElementById('start-game');
const playerInput = document.getElementById('player-name');

// Start game with name prompt
startButton.addEventListener('click', () => {
    playerName = playerInput.value.trim() || 'Player';
    namePrompt.style.display = 'none';
    gameContainer.style.display = 'flex';
    initBoard();
    updateScore();
});

// Initialize board with all atoms
function initBoard() {
    board = Array(GRID_ROWS).fill().map(() => Array(GRID_COLS).fill(null));
    tileElements = Array(GRID_ROWS).fill().map(() => Array(GRID_COLS).fill(null));
    for (let row = 0; row < GRID_ROWS; row++) {
        for (let col = 0; col < GRID_COLS; col++) {
            board[row][col] = randomAtom();
            createTile(row, col);
        }
    }
    addEventListeners();
    checkAndReshuffle();
    console.log('Board initialized:', board);
}

// Random atom from pool
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

// Handle click (with unselect by retapping)
function handleClick(event) {
    const tile = getTileFromEvent(event);
    if (!tile) return;
    const { row, col } = tile.dataset;
    const pos = { row: parseInt(row), col: parseInt(col) };

    if (selectedTiles.some(t => t.row === pos.row && t.col === pos.col)) {
        tile.classList.remove('selected');
        selectedTiles = selectedTiles.filter(t => t.row !== pos.row || t.col !== pos.col);
        console.log('Unselected:', row, col);
        return;
    }

    if (selectedTiles.length === 0 || selectedTiles.some(t => isAdjacent(t.row, t.col, pos.row, pos.col))) {
        selectedTiles.push(pos);
        tile.classList.add('selected');
        console.log('Selected:', row, col, board[row][col], 'Selected:', selectedTiles.map(t => board[t.row][t.col]));
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
            updateScore();
            return;
        }
    }
    console.log('No match found');
    clearSelection(); // Clear selection if no match
}

// Show equation popup
function showEquation(equation) {
    equationDisplay.textContent = equation;
    equationDisplay.style.opacity = '0';
    equationDisplay.style.animation = 'none';
    setTimeout(() => {
        equationDisplay.style.animation = 'equationPop 1.5s forwards';
    }, 10);
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
    for (let col = 0; col < GRID_COLS; col++) {
        let emptyRows = [];
        for (let row = GRID_ROWS - 1; row >= 0; row--) {
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
    for (let row = 0; row < GRID_ROWS; row++) {
        for (let col = 0; col < GRID_COLS; col++) {
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
                        if (nr < 0 || nr >= GRID_ROWS || nc < 0 || nc >= GRID_COLS || visited.has(`${nr},${nc}`)) continue;
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
        for (let row = 0; row < GRID_ROWS; row++) {
            for (let col = 0; col < GRID_COLS; col++) {
                board[row][col] = randomAtom();
                updateTile(row, col);
            }
        }
        if (!canFormCompound()) checkAndReshuffle();
    }
}

// Update score
function updateScore() {
    scoreDisplay.textContent = `Score: ${score} - ${playerName}`;
}
