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
	let player4 = new Player(4, 4)

	for(let i = 0; i < 3; i++) {
		let player = new Player(i, i)

		onlinePlayers.push(player)
		allGames.push(gameHandler.createGame(i, onlinePlayers))
	}
	expect(gameHandler.findGameBySocketId(1, allGames)).toMatchSnapshot()
	allGames[1].challenger.push(player4)
	expect(gameHandler.findGameBySocketId(4, allGames)).toMatchSnapshot()
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

test('findChallengerIndex', () => {
	let allChallenger = []

	for (let i = 0; i < 3; i++) {
		let player = new Player(i, i);

		allChallenger.push(player)
	}
	expect(gameHandler.findChallengerIndex(0, allChallenger)).toMatchSnapshot()
	expect(gameHandler.findChallengerIndex(5, allChallenger)).toEqual(-1)
})

test('changeMaster', () => {
    const clientId = 1
    const clientId2 = 2
    let tetriminos = Array(new Piece(shapes[0]))
    let game = new Game(tetriminos)
    let player1 = new Player(clientId, clientId)
    let player2 = new Player(clientId2, clientId2)

    game.master = player1
    game.challenger.push(player2)
	expect(gameHandler.changeMaster(game)).toMatchSnapshot()
})

test('isGameFinished_solo', () => {
    const clientId = 1
	const Board1 = [
	[0, 0, 0, 0, 0],
	[1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1]
	]
	const Board2 = [
	[0, 0, 1, 0, 0],
	[0, 1, 1, 1, 0],
	[0, 1, 1, 1, 1],
	[1, 1, 1, 1, 1]
	]

    let tetriminos = Array(new Piece(shapes[0]))
    let game = new Game(tetriminos)
    let player1 = new Player(clientId, clientId)

	player1.board = Board1
    game.master = player1
	expect(gameHandler.isGameFinished(game)).toBe(false)
	game.master.board = Board2
	expect(gameHandler.isGameFinished(game)).toBe(true)
})

test('isGameFinished_multi', () => {
    const clientId = 1
    const clientId2 = 2
	const mBoard = [
	[0, 0, 0, 0, 0],
	[1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1]
	]
	const chBoard = [
	[0, 0, 1, 0, 0],
	[0, 1, 1, 1, 0],
	[0, 1, 1, 1, 1],
	[1, 1, 1, 1, 1]
	]

    let tetriminos = Array(new Piece(shapes[0]))
    let game = new Game(tetriminos)
    let player1 = new Player(clientId, clientId)
    let player2 = new Player(clientId2, clientId2)

	player1.board = mBoard
    game.master = player1
	player2.board = mBoard
    game.challenger.push(player2)
	expect(gameHandler.isGameFinished(game)).toBe(false)
	game.challenger[0].board = chBoard
	expect(gameHandler.isGameFinished(game)).toBe(true)
})

test('getGameStats', () => {
    const clientId = 1
    const clientId2 = 2
	const mBoard = [
	[0, 0, 0, 0, 0],
	[1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1]
	]
	const chBoard = [
	[0, 0, 1, 0, 0],
	[0, 1, 1, 1, 0],
	[0, 1, 1, 1, 1],
	[1, 1, 1, 1, 1]
	]

    let tetriminos = Array(new Piece(shapes[0]))
    let game = new Game(tetriminos)
    let player1 = new Player(clientId, clientId)
    let player2 = new Player(clientId2, clientId2)

	player1.board = mBoard
    game.master = player1
	player2.board = chBoard
    game.challenger.push(player2)
	gameHandler.isGameFinished(game)
	expect(gameHandler.getGameStats(game)).toMatchSnapshot()
})

test('getGameStats2', () => {
    const clientId = 1
    const clientId2 = 2
	const mBoard = [
	[0, 0, 1, 0, 0],
	[1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1]
	]
	const chBoard = [
	[0, 0, 0, 0, 0],
	[0, 1, 1, 1, 0],
	[0, 1, 1, 1, 1],
	[1, 1, 1, 1, 1]
	]

    let tetriminos = Array(new Piece(shapes[0]))
    let game = new Game(tetriminos)
    let player1 = new Player(clientId, clientId)
    let player2 = new Player(clientId2, clientId2)

	player1.board = mBoard
    game.master = player1
	player2.board = chBoard
    game.challenger.push(player2)
	gameHandler.isGameFinished(game)
	expect(gameHandler.getGameStats(game)).toMatchSnapshot()
})

test('initGame', () => {
    const clientId = 1
    const clientId2 = 2

    let tetriminos = Array(new Piece(shapes[0]))
    let game = new Game(tetriminos)
    let player1 = new Player(clientId, clientId)
    let player2 = new Player(clientId2, clientId2)

    game.master = player1
    game.numLosers = 1;
    game.master.inGameLoser = true;
    expect(gameHandler.initGame(game)).toMatchSnapshot()

    game.challenger.push(player2);
    game.challenger[0].inGameLoser = true;
    expect(gameHandler.initGame(game)).toMatchSnapshot()
})
