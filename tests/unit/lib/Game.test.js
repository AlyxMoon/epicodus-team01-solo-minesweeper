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
        [mine(), cell(1), cell()],
        [cell(1), cell(1), cell()],
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
        [mine(), cell(1), cell()],
        [cell(1), cell(1), mine()],
      ])
    })
  })

  describe('method getNeighboringCells()', () => {
    const game = new Game({
      colCount: 4,
      rowCount: 4,
      board: [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, 16],
      ],
    })

    it('should return all 8 adjacent cells', () => {
      expect(game.getNeighboringCells(1, 2)).toEqual([
        2, 3, 4, 6, 8, 10, 11, 12,
      ])
    })

    it('should not return out of bounds to the top or left', () => {
      expect(game.getNeighboringCells(0, 0)).toEqual([
        2, 5, 6,
      ])
    })

    it('should not return out of bounds to the bottom or right', () => {
      expect(game.getNeighboringCells(3, 3)).toEqual([
        11, 12, 15,
      ])
    })
  })

  describe('method getCountAdjacentBombs()', () => {
    const game = new Game({
      colCount: 3,
      rowCount: 3,
      board: [
        [cell(), cell(), mine(), cell()],
        [mine(), cell(), cell(), cell()],
        [mine(), cell(), cell(), cell()],
        [mine(), mine(), mine(), cell()],
      ],
    })

    it('should give a count of adjacent bombs', () => {
      expect(game.getCountOfAdjacentBombs(1, 1)).toEqual(3)
      expect(game.getCountOfAdjacentBombs(2, 2)).toEqual(2)
    })

    it('should give correct count from the corners', () => {
      expect(game.getCountOfAdjacentBombs(0, 0)).toEqual(1)
      expect(game.getCountOfAdjacentBombs(0, 3)).toEqual(1)
      expect(game.getCountOfAdjacentBombs(3, 0)).toEqual(2)
      expect(game.getCountOfAdjacentBombs(3, 3)).toEqual(1)
    })
  })
})
