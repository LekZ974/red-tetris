import Player from '../../../src/server/controllers/player'

const playerID = '1234'
const socketID = '9876'
const login = 'user'

let player = new Player(playerID, socketID)

test('getPlayerID', () => {
    expect(player.getPlayerID()).toMatchSnapshot()
})

test('getSocketID', () => {
    expect(player.getSocketID()).toMatchSnapshot()
})
