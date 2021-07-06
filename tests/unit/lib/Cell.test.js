import Cell from '@/lib/Cell'

describe('class Cell', () => {
  it('should be created with default values set', () => {
    const cell = new Cell()

    expect(cell).toEqual({
      adjacentMineCount: 0,
      hasFlag: false,
      hasQuestionMark: false,
      isMine: false,
      isVisible: false,
    })
  })

  it('should be able to override default values on creation', () => {
    const cell = new Cell({
      adjacentMineCount: 4,
      hasFlag: true,
      hasQuestionMark: true,
      isMine: true,
      isVisible: true,
    })

    expect(cell).toEqual({
      adjacentMineCount: 4,
      hasFlag: true,
      hasQuestionMark: true,
      isMine: true,
      isVisible: true,
    })
  })
})
