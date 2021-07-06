import Game from '@/lib/Game'

describe('class Game', () => {
  it('should be created with default values', () => {
    const game = new Game()

    expect(game).toEqual({
      board: [[]],
    })
  })
})
