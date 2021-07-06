import Cell from '@/lib/Cell'
import generateRandomPositions from './generateRandomPositions'

export default class Game {
  constructor ({
    colCount = 0,
    rowCount = 0,
    mineCount = 0,
    minePositions = generateRandomPositions(mineCount, [0, rowCount - 1], [0, colCount - 1]),
    board = this.generateBoard(rowCount, colCount, minePositions),
  } = {}) {
    this.board = board
    this.colCount = colCount
    this.rowCount = rowCount
    this.mineCount = mineCount
  }

  generateBoard (row = 0, col = 0, minePositions = []) {
    return [...Array(row)].map((_, r) => {
      return [...Array(col)].map((_, c) => {
        const isMine = minePositions.some(position => {
          return position[0] === r && position[1] === c
        })

        return new Cell({ isMine })
      })
    })
  }

  getNeighboringCells (row, col) {
    const neighbors = []

    for (let x = row - 1; x <= row + 1; x++) {
      for (let y = col - 1; y <= col + 1; y++) {
        if (
          x < 0 || y < 0 ||
          x >= this.board.length ||
          y >= this.board.length ||
          (x === row && y === col)
        ) continue

        neighbors.push(this.board[x][y])
      }
    }

    return neighbors
  }
}
