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
    const board = [...Array(row)].map((_, r) => {
      return [...Array(col)].map((_, c) => {
        const isMine = minePositions.some(position => {
          return position[0] === r && position[1] === c
        })

        return new Cell({ isMine })
      })
    })

    for (let r = 0; r < row; r++) {
      for (let c = 0; c < col; c++) {
        board[r][c].adjacentMineCount = this.getCountOfAdjacentBombs(r, c, board)
      }
    }

    this.board = board
    return board
  }

  getNeighboringCells (row, col, board = this.board) {
    const neighbors = []

    for (let x = row - 1; x <= row + 1; x++) {
      for (let y = col - 1; y <= col + 1; y++) {
        if (
          x < 0 || y < 0 ||
          x >= board.length ||
          y >= board.length ||
          (x === row && y === col)
        ) continue

        neighbors.push(board[x][y])
      }
    }

    return neighbors
  }

  getCountOfAdjacentBombs (row, col, board = this.board) {
    const neighbors = this.getNeighboringCells(row, col, board)

    return neighbors.filter(cell => cell.isMine).length
  }

  getRowAndColFromIndex (index = 0) {
    const row = Math.floor(index / this.colCount)
    const col = index - (row * this.colCount)

    return [row, col]
  }

  selectCell (row, col, type = 'select') {
    const cell = this.board[row][col]

    if (type === 'select') {
      if (cell.isVisible || cell.hasFlag) return
      cell.isVisible = true
      cell.hasQuestionMark = false

      if (cell.isMine) return this.gameLost()
    }

    if (type === 'mark') {
      if (cell.isVisible) return

      if (cell.hasFlag) {
        cell.hasFlag = false
        cell.hasQuestionMark = true
      } else if (cell.hasQuestionMark) {
        cell.hasFlag = false
        cell.hasQuestionMark = false
      } else {
        cell.hasFlag = true
      }
    }
  }

  gameWon () {
    console.log('YOU HAVE WON')
  }

  gameLost () {
    console.log('YOU HAVE LOST')
  }
}
