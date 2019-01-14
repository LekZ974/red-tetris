import * as gameHandler from '../../../src/server/eventHandlers/gameHandler'
import Player from '../../../src/server/controllers/player'
import Game from '../../../src/server/controllers/game'
import Piece from '../../../src/server/controllers/piece'
import shapes from '../../../src/server/constants/shapes'
import board from '../../../src/server/constants/board'
import gameplay from '../../../src/server/constants/gameplay'

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

describe('testsBoards', () => {
    let Board1
    let Board2
    let tetriminos
    let game
    let player1
    let player2
    
    const clientId = 1
    const clientId2 = 2
    
    const init = function() {
        let grid = Array(board.LENGTH)
        for (let i = 0; i < grid.length; i++) {
            grid[i] = Array(board.WIDTH)
            for (let j = 0; j < grid[i].length; j++)
                grid[i][j] = 0
        }
        return grid
    }
    
    const fillBoard = function(grid, start) {
        for (let i = start; i < grid.length; i++) {
            for (let j = 0; i < grid[i].length; i++) {
                grid[i][j] = 1
            }
        }
    }

    beforeEach(() => {
        Board1 = init()
        Board2 = init()
        tetriminos = Array(new Piece(shapes[0]))
        game = new Game(tetriminos)
        player1 = new Player(clientId, clientId)
        player2 = new Player(clientId2, clientId2)
    })

    test('isGameFinished_solo', () => {
        fillBoard(Board1, 4)
        fillBoard(Board2, 3)

        player1.board = Board1
        game.master = player1
        expect(gameHandler.isGameFinished(game)).toBe(false)
        game.master.board = Board2
        expect(gameHandler.isGameFinished(game)).toBe(true)
    })

    test('isGameFinished_multi', () => {
        fillBoard(Board1, 4)
        fillBoard(Board2, 3)

        player1.board = Board1
        game.master = player1
        player2.board = Board1
        game.challenger.push(player2)
        expect(gameHandler.isGameFinished(game)).toBe(false)
        game.challenger[0].board = Board2
        expect(gameHandler.isGameFinished(game)).toBe(true)
    })

    test('getGameStats', () => {
        fillBoard(Board1, 4)
        fillBoard(Board2, 3)

        player1.board = Board1
        game.master = player1
        player2.board = Board2
        game.challenger.push(player2)
        gameHandler.isGameFinished(game)
        expect(gameHandler.getGameStats(game)).toMatchSnapshot()
    })

    test('getGameStats2', () => {
        fillBoard(Board1, 3)
        fillBoard(Board2, 4)

        player1.board = Board1
        game.master = player1
        player2.board = Board2
        game.challenger.push(player2)
        gameHandler.isGameFinished(game)
        expect(gameHandler.getGameStats(game)).toMatchSnapshot()
    })

    test('updateMalus', () => {
        let falseGame
        let client
        let grid
        let player3 = new Player(3, 3)

        expect(gameHandler.updateMalus(falseGame, clientId, Board1)).toBe(false)
        expect(gameHandler.updateMalus(game, client, Board1)).toBe(false)
        expect(gameHandler.updateMalus(game, clientId, grid)).toBe(false)

        player1.board = Board1
        game.master = player1
        player2.board = Board2
        game.challenger.push(player2)
        
        for(let i = Board1.length - 2; i < Board1.length; i++) {
            for (let j = 0; j < Board1[i].length; j++) {
                Board1[i][j] = 1
            }
        }
        
        expect(gameHandler.updateMalus(game, clientId, Board1)).toBe(true)
        game.challenger.push(player3)
        expect(gameHandler.updateMalus(game, clientId, Board1)).toBe(true)
        
        for(let i = Board2.length - 5; i < Board1.length; i++) {
            for (let j = 0; j < Board2[i].length; j++) {
                Board2[i][j] = 1
            }
        }

        expect(gameHandler.updateMalus(game, clientId2, Board2)).toBe(true)

        game.challenger = []
        expect(gameHandler.updateMalus(game, clientId2, Board2)).toBe(false)
    })
})

test('initGame', () => {
    const clientId = 1
    const clientId2 = 2

    let tetriminos = Array(new Piece(shapes[0]))
    let game = new Game(tetriminos)
    let player1 = new Player(clientId, clientId)
    let player2 = new Player(clientId2, clientId2)

    game.master = player1
    game.numLosers = 1
    game.master.inGameLoser = true;
    expect(gameHandler.initGame(game)).toMatchSnapshot()

    game.challenger.push(player2)
    game.challenger[0].inGameLoser = true
    expect(gameHandler.initGame(game)).toMatchSnapshot()
})

test('initGameSolo', () => {
    const clientId = 1

	let tetriminos = Array(new Piece(shapes[0]))
    let game = new Game(tetriminos)
    let player1 = new Player(clientId, clientId)

	game.master = player1
    game.numLosers = 1
    game.master.inGameLoser = true
	game.solo.solo_mode = true
    expect(gameHandler.initGame(game)).toMatchSnapshot()

})

test('incrementLevel', () => {
    let tetriminos = Array(new Piece(shapes[0]))
    let game = new Game(tetriminos)

	game.solo.solo_mode = true
	expect(gameHandler.incrementLevel(game)).toMatchSnapshot()
	game.solo.count = gameplay.MAX_COUNT
	expect(gameHandler.incrementLevel(game)).toMatchSnapshot()
	game.solo.count = gameplay.MAX_COUNT
	game.solo.speed = gameplay.MAX_SPEED
	expect(gameHandler.incrementLevel(game)).toMatchSnapshot()
	game.solo.count = gameplay.MAX_COUNT
	game.solo.level = gameplay.MAX_LVL
	expect(gameHandler.incrementLevel(game)).toMatchSnapshot()
})
