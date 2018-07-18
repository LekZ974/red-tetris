import Player from '../../../src/server/controllers/player'

const playerID = '1234'
const socketID = '9876'
const login = 'user'

const player = new Player(playerID, socketID)

test('getPlayerID', () => {
    expect(player.getPlayerID()).toMatchSnapshot()
})

test('getSocketID', () => {
    expect(player.getSocketID()).toMatchSnapshot()
})

test('setter/getter login', () => {
    player.setLogin(login)

    expect(player.getLogin()).toMatchSnapshot()
})

test('setter/getter master', () => {
    player.setAsMaster()

    expect(player.isMaster()).toMatchSnapshot()
})
