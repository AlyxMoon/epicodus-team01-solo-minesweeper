import Cell from '@/lib/Cell'
import Game from '@/lib/Game'

describe('class Game', () => {
  const cell = (count = 0) => new Cell({ adjacentMineCount: count })
  const mine = (count = 0) => new Cell({ isMine: true, adjacentMineCount: count })

  it('should be created with default values', () => {
    const game = new Game()

    expect(game).toEqual({
      board: [],
      mineCount: 0,
      colCount: 0,
      rowCount: 0,
    })
  })

  it('should be created with default values overridden', () => {
    const game = new Game({
      rowCount: 2,
      colCount: 3,
      mineCount: 1,
      minePositions: [[0, 0]],
    })

    expect(game).toEqual({
      board: [
        [mine(), cell(), cell()],
        [cell(), cell(), cell()],
      ],
      rowCount: 2,
      colCount: 3,
      mineCount: 1,
    })
  })

  describe('method generateBoard()', () => {
    it('should create a board with the correct row/col count with square grid', () => {
      const game = new Game()

      const board10x10 = game.generateBoard(10, 10)
      expect(board10x10.length).toEqual(10)
      for (const row of board10x10) {
        expect(row.length).toEqual(10)
      }
    })

    it('should create a board with the correct row/col count with rectangular grid', () => {
      const game = new Game()

      const board5x7 = game.generateBoard(5, 7)
      expect(board5x7.length).toEqual(5)
      for (const row of board5x7) {
        expect(row.length).toEqual(7)
      }
    })

    it('should set the correct cells to contain a bomb', () => {
      const game = new Game()

      const board = game.generateBoard(2, 3, [[0, 0], [1, 2]])
      expect(board).toEqual([
        [mine(), cell(), cell()],
        [cell(), cell(), mine()],
      ])
    })
  })
})
