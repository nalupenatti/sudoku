import React, { useState, useEffect } from 'react';
import SudokuBoard from './SudokuBoard';
import { generatePuzzle, isGridComplete, isValidSudoku } from './sudokuUtils';
import './App.css';

function App() {
  const [difficulty, setDifficulty] = useState('medium');
  const [boardType, setBoardType] = useState('2x2');
  const [puzzle, setPuzzle] = useState([]);
  const [grid, setGrid] = useState([]);
  const [initialGrid, setInitialGrid] = useState([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  // Initialize game
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const newPuzzle = generatePuzzle(difficulty, boardType);
    setPuzzle(newPuzzle);
    setGrid(newPuzzle.map(row => [...row]));
    setInitialGrid(newPuzzle.map(row => [...row]));
    
    setMessage('');
    setGameStarted(true);
  };

  const handleCellChange = (row, col, value) => {
    const newGrid = grid.map(r => [...r]);
    newGrid[row][col] = value;
    setGrid(newGrid);
  };

  const checkSolution = () => {
    if (!isGridComplete(grid)) {
      setMessage('Please fill all cells!');
      setMessageType('error');
      return;
    }

    // Create a copy to validate without modifying the grid
    const gridCopy = grid.map(row => [...row]);
    if (isValidSudoku(gridCopy, boardType)) {
      setMessage('🎉 Congratulations! You solved it!');
      setMessageType('success');
    } else {
      setMessage('❌ Not quite right. Try again!');
      setMessageType('error');
    }
  };

  const resetGame = () => {
    setGrid(puzzle.map(row => [...row]));
    setMessage('');
    setMessageType('');
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Mini Sudoku ({boardType})</h1>
        
        <div className="controls">
          <div className="settings-row">
            <div className="difficulty-section">
              <label htmlFor="difficulty">Difficulty:</label>
              <select
                id="difficulty"
                value={difficulty}
                onChange={(e) => {
                  setDifficulty(e.target.value);
                }}
              >
                <option value="tutorial">Tutorial</option>
                <option value="baby">Baby</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="extreme">Extreme</option>
              </select>
            </div>

            <div className="difficulty-section">
              <label htmlFor="boardType">Board:</label>
              <select
                id="boardType"
                value={boardType}
                onChange={(e) => {
                  setBoardType(e.target.value);
                }}
              >
                <option value="2x2">2x2</option>
                <option value="3x3">3x3</option>
              </select>
            </div>
          </div>

          <div className="button-group">
            <button onClick={startNewGame} className="btn btn-primary">
              New Game
            </button>
            <button onClick={resetGame} className="btn btn-secondary">
              Reset
            </button>
            <button onClick={checkSolution} className="btn btn-success">
              Check Solution
            </button>
          </div>
        </div>

        {gameStarted && (
          <SudokuBoard
            grid={grid}
            onCellChange={handleCellChange}
            initialGrid={initialGrid}
            boardType={boardType}
          />
        )}

        {message && <div className={`message ${messageType}`}>{message}</div>}

        <div className="trademark">developed by Nalu Penatti</div>
      </div>
    </div>
  );
}

export default App;
