import 'purecss/build/pure-min.css'
import '@/styles/main.scss'
import 'regenerator-runtime'

import Game from '@/lib/Game'

const drawGameBoard = (game) => {
  const elBoard = document.querySelector('#game-board')
  let content = ''
  let index = 0

  for (const row of game.board) {
    for (const cell of row) {
      let cellContent = ''
      let cellClasses = 'cell'

      if (cell.hasFlag) {
        cellContent = '!'
        cellClasses += ' flag'
      } else if (cell.hasQuestionMark) {
        cellContent = '?'
        cellClasses += ' question'
      } else if (cell.isVisible) {
        cellContent = cell.isMine ? '+' : cell.adjacentMineCount
      }

      content += `
        <div 
          class="${cellClasses}" 
          data-index="${index++}"
        >
          ${cellContent}
        </div>
      `
    }
  }

  elBoard.style.gridTemplateColumns = `repeat(${game.colCount}, var(--cell-size))`
  elBoard.innerHTML = content

  document.querySelector('#output-cells-remaining').innerText = game.cellsRemaining
  document.querySelector('#output-mines-remaining').innerText = game.minesRemaining
  document.querySelector('#output-wins').innerText = game.timesWon
  document.querySelector('#output-losses').innerText = game.timesLost

  addEventListeners(game)
}

const addEventListeners = (game) => {
  const handleClick = (event) => {
    const index = event.currentTarget.dataset.index
    const [row, col] = game.getRowAndColFromIndex(index)

    console.log('you clicked on this:', [row, col])
    game.selectCell(row, col)
    drawGameBoard(game)
  }

  const handleRightClick = (event) => {
    event.preventDefault()

    const index = event.currentTarget.dataset.index
    const [row, col] = game.getRowAndColFromIndex(index)

    console.log('you clicked on this:', [row, col])
    game.selectCell(row, col, 'mark')
    drawGameBoard(game)
  }

  const elCells = document.querySelectorAll('#game-board .cell')
  for (const cell of elCells) {
    cell.addEventListener('click', handleClick)
    cell.addEventListener('contextmenu', handleRightClick)
  }
}

const main = async () => {
  const game = new Game({ colCount: 10, rowCount: 10, mineCount: 15 })

  drawGameBoard(game)
}

main()
