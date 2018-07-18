import Game from '../../../src/server/controllers/game'
import Player from '../../../src/server/controllers/player'
import shapes from '../../../src/server/constants/shapes'

const masterId = '1234'
const masterSocketId = '0987'
const challengerId = '2345'
const challengerSocketId = '9876'
const roomId = '00001'
const roomName = 'some_room'

const master = new Player(masterId, masterSocketId)
const challenger = new Player(challengerId, challengerSocketId)
const game = new Game(shapes)

test('setRoomInfo', () => {
    game.setRoomInfo(roomId, roomName)

    expect(game.roomID).toBe(roomId)
    expect(game.roomName).toBe(roomName)
})

test('setMaster', () => {
    game.setMaster(master)

    expect(game.master).toBe(master)
})

test('setChallenger', () => {
    game.setChallenger(challenger)
        
    expect(game.challenger).toBe(challenger)
})

test('setGameStarted', () => {
    game.setGameStarted()

    expect(game.gameStarted).toMatchSnapshot()
})

test('constructor variables', () => {
    const game0 = new Game(shapes)

    expect(game0.shapes).toMatchSnapshot()
    expect(game0.master).toMatchSnapshot()
    expect(game0.challenger).toMatchSnapshot()
    expect(game0.gameStarted).toMatchSnapshot()
})

test('waitingForPlayers', () => {
    const game1 = new Game(shapes)
    const master1 = new Player('2468', '00002')
    const challenger1 = new Player('1357', '00003')

    game1.setMaster(master1)
    expect(game1.waitingForPlayers()).toMatchSnapshot()
    game1.setChallenger(challenger1)
    expect(game1.waitingForPlayers()).toMatchSnapshot()
})
