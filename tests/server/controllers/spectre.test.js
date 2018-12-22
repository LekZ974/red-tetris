import Spectre from '../../../src/server/controllers/spectre'

const board = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0 ,0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
]

const playerGrid = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 1, 1, 1]
]

test('newSpectre', () => {
    let spectre = new Spectre(board)
    expect(spectre).toMatchSnapshot()
})

test('generateSpectre', () => {
    let spectre = new Spectre(board)

    expect(spectre.generateSpectre(playerGrid, 0)).toMatchSnapshot()
    expect(spectre.generateSpectre(playerGrid, 1)).toMatchSnapshot()
    expect(spectre.generateSpectre(playerGrid)).toMatchSnapshot()
    expect(spectre.generateSpectre(null, 1)).toMatchSnapshot()
})

test('fillSpectreCol', () => {
    let spectre = new Spectre(board)

    expect(spectre.fillSpectreCol(-1, 1)).toMatchSnapshot()
})
