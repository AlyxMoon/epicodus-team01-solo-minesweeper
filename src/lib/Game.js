import Cell from '@/lib/Cell'
import generateRandomPositions from './generateRandomPositions'

export default class Game {
  constructor ({
    colCount = 0,
    rowCount = 0,
    mineCount = 0,
    minePositions = generateRandomPositions(mineCount, [0, rowCount - 1], [0, colCount - 1]),
  } = {}) {
    this.board = this.generateBoard(rowCount, colCount, minePositions)
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
}
