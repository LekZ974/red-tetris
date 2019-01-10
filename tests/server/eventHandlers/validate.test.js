import * as validate from '../../../src/server/validators/validate'
import board from '../../../src/server/constants/board'

let validGrid
let falseGrid

const init = function(length, width) {
    let grid = Array(length)
    for (let i = 0; i < grid.length; i++) {
        grid[i] = Array(width)
    }

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = 0
        }
    }
    return grid
}

beforeEach(() => {
    validGrid = init(board.LENGTH, board.WIDTH)
    falseGrid = init(board.LENGTH, 2)
})

test('checkBoardSize', () => {
    let grid

    expect(validate.checkBoardSize(grid)).toMatchSnapshot()
    expect(validate.checkBoardSize(falseGrid)).toMatchSnapshot()
    expect(validate.checkBoardSize(validGrid)).toMatchSnapshot()
})

test('checkMalus', () => {
    let grid

    for (let i = validGrid.length - 3; i < validGrid.length; i++) {
        for (let j = 0; j < validGrid[i].length; j++) {
            validGrid[i][j] = 1
        }
    }

    expect(validate.checkMalus(grid)).toMatchSnapshot()
    expect(validate.checkMalus(validGrid)).toMatchSnapshot()
})
