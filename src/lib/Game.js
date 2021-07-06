import Cell from '@/lib/Cell'

export default class Game {
  constructor ({
    colCount = 0,
    rowCount = 0,
  } = {}) {
    this.board = this.generateBoard(rowCount, colCount)
    this.colCount = 0
    this.rowCount = 0
  }

  generateBoard (row = 0, col = 0) {
    return [...Array(row)].map(() => {
      return [...Array(col)].map(() => new Cell())
    })
  }
}
