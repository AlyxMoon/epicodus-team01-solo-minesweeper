import 'purecss/build/pure-min.css'
import '@/styles/main.scss'
import 'regenerator-runtime'

import Game from '@/lib/Game'

const drawGameBoard = (game) => {
  const elBoard = document.querySelector('#game-board')
  let content = ''

  for (const row of game.board) {
    for (const col of row) {
      const cellContent = col.isMine ? '.' : col.adjacentMineCount
      content += `<div class="cell">${cellContent}</div>`
    }
  }

  elBoard.style.gridTemplateColumns = `repeat(${game.colCount}, var(--cell-size))`
  elBoard.innerHTML = content
}

const main = async () => {
  const game = new Game({ colCount: 10, rowCount: 10, mineCount: 20 })

  drawGameBoard(game)
}

main()
