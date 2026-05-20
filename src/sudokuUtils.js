// Sudoku game logic with support for 2x2 and 3x3 subgrids.

const BOARD_CONFIG = {
  '2x2': {
    gridSize: 4,
    subgridSize: 2,
    cellsToRemove: {
      tutorial: 4,
      baby: 2,
      easy: 4,
      medium: 8,
      hard: 12,
      extreme: 14,
    },
  },
  '3x3': {
    gridSize: 9,
    subgridSize: 3,
    cellsToRemove: {
      tutorial: 9,
      baby: 20,
      easy: 30,
      medium: 40,
      hard: 50,
      extreme: 58,
    },
  },
};

const getConfig = (boardType = '2x2') => BOARD_CONFIG[boardType] || BOARD_CONFIG['2x2'];

// Check if a number is valid at a given position
export const isValidPlacement = (grid, row, col, num, boardType = '2x2') => {
  const { gridSize, subgridSize } = getConfig(boardType);

  // Check row
  for (let i = 0; i < gridSize; i++) {
    if (grid[row][i] === num) return false;
  }

  // Check column
  for (let i = 0; i < gridSize; i++) {
    if (grid[i][col] === num) return false;
  }

  // Check subgrid
  const subgridRow = Math.floor(row / subgridSize) * subgridSize;
  const subgridCol = Math.floor(col / subgridSize) * subgridSize;
  for (let i = subgridRow; i < subgridRow + subgridSize; i++) {
    for (let j = subgridCol; j < subgridCol + subgridSize; j++) {
      if (grid[i][j] === num) return false;
    }
  }

  return true;
};

// Solve sudoku using backtracking
export const solveSudoku = (grid, boardType = '2x2') => {
  const { gridSize } = getConfig(boardType);
  const newGrid = grid.map(row => [...row]);

  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (newGrid[row][col] === 0) {
        for (let num = 1; num <= gridSize; num++) {
          if (isValidPlacement(newGrid, row, col, num, boardType)) {
            newGrid[row][col] = num;
            if (solveSudoku(newGrid, boardType)) {
              return newGrid;
            }
            newGrid[row][col] = 0;
          }
        }
        return null;
      }
    }
  }
  return newGrid;
};

// Generate a valid complete sudoku grid
export const generateCompleteSudoku = (boardType = '2x2') => {
  const { gridSize } = getConfig(boardType);
  const grid = Array(gridSize)
    .fill()
    .map(() => Array(gridSize).fill(0));

  const fillGrid = () => {
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        if (grid[row][col] === 0) {
          const numbers = Array.from({ length: gridSize }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
          for (let num of numbers) {
            if (isValidPlacement(grid, row, col, num, boardType)) {
              grid[row][col] = num;
              if (fillGrid()) {
                return true;
              }
              grid[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  fillGrid();
  return grid;
};

// Remove numbers based on difficulty level
export const generatePuzzle = (difficulty = 'medium', boardType = '2x2') => {
  const { gridSize, subgridSize, cellsToRemove } = getConfig(boardType);
  const completeSudoku = generateCompleteSudoku(boardType);
  const puzzle = completeSudoku.map(row => [...row]);

  const targetRemoval = cellsToRemove[difficulty] || 8;

  // Tutorial mode: remove exactly 1 cell per subgrid
  if (difficulty === 'tutorial') {
    const numSubgrids = (gridSize / subgridSize) * (gridSize / subgridSize);
    const removed = new Set();
    
    for (let subgridIndex = 0; subgridIndex < numSubgrids; subgridIndex++) {
      const subgridRow = Math.floor(subgridIndex / (gridSize / subgridSize)) * subgridSize;
      const subgridCol = (subgridIndex % (gridSize / subgridSize)) * subgridSize;
      
      let found = false;
      const attempts = new Set();
      while (!found && attempts.size < subgridSize * subgridSize) {
        const row = subgridRow + Math.floor(Math.random() * subgridSize);
        const col = subgridCol + Math.floor(Math.random() * subgridSize);
        const key = `${row}-${col}`;
        
        if (!removed.has(key) && puzzle[row][col] !== 0) {
          puzzle[row][col] = 0;
          removed.add(key);
          found = true;
        }
        attempts.add(key);
      }
    }
    return puzzle;
  }

  // Standard random removal for other difficulties
  let removed = 0;
  while (removed < targetRemoval) {
    const row = Math.floor(Math.random() * gridSize);
    const col = Math.floor(Math.random() * gridSize);

    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      removed++;
    }
  }

  return puzzle;
};

// Check if the current grid is solved correctly
export const isGridComplete = (grid) => {
  const gridSize = grid.length;
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (grid[row][col] === 0) {
        return false;
      }
    }
  }
  return true;
};

// Check if the grid is a valid completed sudoku
export const isValidSudoku = (grid, boardType = '2x2') => {
  const { gridSize } = getConfig(boardType);
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      const num = grid[row][col];
      if (num === 0) return false; // Not complete

      // Temporarily remove the number to check validity
      grid[row][col] = 0;
      const isValid = isValidPlacement(grid, row, col, num, boardType);
      grid[row][col] = num;

      if (!isValid) return false;
    }
  }
  return true;
};

// Check if the grid is solved correctly
export const isSudokuValid = (grid, solution) => {
  const gridSize = grid.length;
  for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
      if (grid[row][col] !== solution[row][col]) {
        return false;
      }
    }
  }
  return true;
};
