import * as gameHandler from '../../../src/server/eventHandlers/gameHandler'
import Player from '../../../src/server/controllers/player'
import Game from '../../../src/server/controllers/game'
import Piece from '../../../src/server/controllers/piece'
import shapes from '../../../src/server/constants/shapes'

test('createGame', () => {
    let onlinePlayers = []

    for(let i = 0; i < 3; i++) {
        let player = new Player(i, i)

        onlinePlayers.push(player)
    }

    expect(gameHandler.createGame(2, onlinePlayers)).toMatchSnapshot()
})

test('findGame', () => {
    let onlinePlayers = []
    let activeGame = []

    for(let i = 0; i < 3; i++) {
        let player = new Player(i, i)

        onlinePlayers.push(player)
    }
    for (let i = 0; i < 2; i++) {
        let roomNum = 10 + i
        let game = gameHandler.createGame(1, onlinePlayers)
            
        game.setRoomInfo(roomNum, 'room'+ i)
        activeGame.push(game)
    }
    
    expect(gameHandler.findGame(10, activeGame)).toMatchSnapshot()
    expect(gameHandler.findGame(20, activeGame)).toMatchSnapshot()
})

test('randNumber', () => {
    const max = 10
    const min = 0
    const value = gameHandler.randNumber(min, max)
    
    expect(value).toBeGreaterThanOrEqual(0)
    expect(value).toBeLessThanOrEqual(10)
})

test('initBoard', () => {
    expect(gameHandler.initBoard()).toMatchSnapshot()
})

test('findGameBySocketId', () => {
	let onlinePlayers = []
	let allGames = []

	for(let i = 0; i < 3; i++) {
		let player = new Player(i, i)

		onlinePlayers.push(player)
		allGames.push(gameHandler.createGame(i, onlinePlayers))
	}
	expect(gameHandler.findGameBySocketId(1, allGames)).toMatchSnapshot()
})

test('getShape', () => {
    const clientId = 1
    const clientId2 = 2
    let tetriminos = Array(new Piece(shapes[0]))
    let game = new Game(tetriminos)
    let player1 = new Player(clientId, clientId)
    let player2 = new Player(clientId2, clientId2)

    game.master = player1
    game.challenger.push(player2)
    expect(gameHandler.getShape(game, clientId)).toMatchSnapshot()
    expect(gameHandler.getShape(game, clientId)).toMatchSnapshot()
    expect(gameHandler.getShape(game, clientId2)).toMatchSnapshot()
})
