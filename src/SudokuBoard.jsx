import React from 'react';

const SudokuBoard = ({ grid, onCellChange, initialGrid, boardType }) => {
  const subgridSize = boardType === '3x3' ? 3 : 2;
  const gridSize = subgridSize * subgridSize;

  const handleInputChange = (row, col, value) => {
    // Only allow valid numbers for the selected board or empty string
    const numValue = value === '' ? 0 : parseInt(value);
    if (value === '' || (numValue >= 1 && numValue <= gridSize)) {
      onCellChange(row, col, numValue);
    }
  };

  return (
    <div
      className="sudoku-board"
      style={{
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
      }}
    >
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="sudoku-row">
          {row.map((cell, colIndex) => {
            const isInitial = initialGrid[rowIndex][colIndex] !== 0;
            const hasBottomSubgridBorder = (rowIndex + 1) % subgridSize === 0 && rowIndex + 1 < gridSize;
            const hasRightSubgridBorder = (colIndex + 1) % subgridSize === 0 && colIndex + 1 < gridSize;

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`sudoku-cell ${
                  hasBottomSubgridBorder ? 'border-bottom' : ''
                } ${hasRightSubgridBorder ? 'border-right' : ''}`}
              >
                <input
                  type="text"
                  maxLength="1"
                  value={cell === 0 ? '' : cell}
                  onChange={(e) => handleInputChange(rowIndex, colIndex, e.target.value)}
                  disabled={isInitial}
                  className={isInitial ? 'initial-cell' : ''}
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SudokuBoard;
