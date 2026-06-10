# Chomp

Interactive two-player implementation of the classic Chomp game.

## Overview

Players take turns selecting a square on a chocolate bar grid. Selecting a square "chomps" that square and every square to its right and below. The final square (the poison square) loses the game for the player who is forced to take it.

This project focuses on clean game-state transitions and immediate visual feedback in a lightweight React app.

## Highlights

- Turn-based game state managed with React hooks
- Hover preview for the upcoming blast zone before a move is committed
- Replay mode for same board dimensions
- New game mode with randomized board size
- Clear player-turn and game-over messaging

## Tech Stack

- React 18
- Create React App / react-scripts
- Plain CSS

## Project Structure

```text
src/
  App.js                 # Top-level composition
  constants.js           # Square state enums
  components/
    Game.js              # Core game logic and turn flow
    ChocolateBar.js      # Board rendering and interactions
    NextTurnIndicator.js # Status banner
    Rules.js             # Rules panel
```

## Getting Started

```bash
npm install
npm start
```

App runs at http://localhost:3000.

## Available Scripts

```bash
npm start      # Run locally in dev mode
npm test       # Run test runner
npm run build  # Build production assets
```

## Gameplay Notes

- Default board starts at 4x5
- New games randomize board dimensions (within configured limits)
- The game is complete when all squares are marked as chomped

## Why This Project

Chomp is a compact example of practical frontend engineering: deterministic state transitions, predictable UI updates, and user-friendly interaction design in a small codebase.
