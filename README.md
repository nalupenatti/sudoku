# Sudoku

Mini Sudoku game built with React and Vite.

This project lets you play Sudoku with two board formats:

- 2x2 subgrids (4x4 board)
- 3x3 subgrids (9x9 board)

You can switch between multiple difficulty levels and validate your solution directly in the UI.

## Game Overview

Start a new puzzle, fill the empty cells, and use Sudoku rules to complete the board.

- Every row must contain each number exactly once.
- Every column must contain each number exactly once.
- Every subgrid must contain each number exactly once.

## Gameplay and Functionality

- Random puzzle generation
- Difficulty options: tutorial, baby, easy, medium, hard, extreme
- Board type selection: 2x2 or 3x3
- Reset current board
- Check solution with success/error feedback

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open the local URL shown in the terminal.

## Build

Create an optimized production build:

```bash
npm run build
```

The output is generated in the `dist/` folder. To preview it locally:

```bash
npm run preview
```

## Tech Stack

- React
- Vite
- ESLint

## Available Scripts

- `npm run dev` - Run development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
