
export default class Cell {
  constructor ({
    adjacentMineCount = 0,
    hasFlag = false,
    hasQuestionMark = false,
    isMine = false,
    isVisible = false,
  } = {}) {
    this.adjacentMineCount = adjacentMineCount
    this.hasFlag = hasFlag
    this.hasQuestionMark = hasQuestionMark
    this.isMine = isMine
    this.isVisible = isVisible
  }
}
