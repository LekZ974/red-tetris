import Player from '../../../src/server/controllers/player'
import Piece from '../../../src/server/controllers/piece'
import * as routeHandler from '../../../src/server/eventHandlers/routeHandler'

var onlineUsers
var activeGames
var client = { id : 0 }
var userInfo = { id : 0, name: 'name' }

beforeEach(() => {
	onlineUsers = []
	activeGames = []
})

test('login', () => {
	let player = new Player(userInfo.id, client.id)
	let result = routeHandler.login(userInfo, client, onlineUsers)

	expect(onlineUsers[0]).toMatchObject(player)
	expect(result).toMatchSnapshot()
})

test('getGames', () => {
	routeHandler.login(userInfo, client, onlineUsers)
	routeHandler.createGame(client, activeGames, onlineUsers, 'GAME1')
	routeHandler.createGame(client, activeGames, onlineUsers, 'GAME2')

	expect(routeHandler.getGames(activeGames)).toMatchSnapshot()
})

test('createGame', () => {
	let player1 = { id : 0 }
	let player2 = { id : 1 }

	let logged1 = routeHandler.login(player1, player1, onlineUsers)
	let logged2 = routeHandler.login(player2, player2, onlineUsers)

	if (logged1 === 'OK') {
		let result = routeHandler.createGame(player1, activeGames, onlineUsers, 'GAME1')

		expect(activeGames).toMatchSnapshot()
		expect(result).toMatch('OK')
	}
	if (logged2 === 'OK') {
		let result = routeHandler.createGame(player2, activeGames, onlineUsers, 'GAME1')

		expect(result).toMatch('KO')
	}
})

test('joinGame', () => {
	let player1 = { id : 0 }
	let player2 = { id : 1 }
	let player3 = { id : 2 }

	let logged1 = routeHandler.login(player1, player1, onlineUsers)
	let logged2 = routeHandler.login(player2, player2, onlineUsers)
	let logged3 = routeHandler.login(player3, player3, onlineUsers)

	if (logged1 === 'OK' && logged2 === 'OK' && logged3 === 'OK') {
		let game = routeHandler.createGame(player1, activeGames, onlineUsers, 'GAME1')

		if (game === 'OK') {
			expect(routeHandler.joinGame(player2, onlineUsers, 'GAME1', activeGames)).toMatch('OK')
		}
		expect(routeHandler.joinGame(player3, onlineUsers, 'GAME2', activeGames)).toMatch('KO')
	}
})

test('startGame', () => {
	let player1 = { id : 0 }
	let player2 = { id : 1 }
	let player3 = { id : 2 }
	let player4 = { id : 3 }

	let logged1 = routeHandler.login(player1, player1, onlineUsers)
	let logged2 = routeHandler.login(player2, player2, onlineUsers)
	let logged3 = routeHandler.login(player3, player3, onlineUsers)
	let logged4 = routeHandler.login(player4, player4, onlineUsers)

	if (logged1 === 'OK' && logged2 === 'OK') {
		let game = routeHandler.createGame(player1, activeGames, onlineUsers, 'GAME1')

		if (game === 'OK') {
			expect(routeHandler.joinGame(player2, onlineUsers, 'GAME1', activeGames)).toMatch('OK')
			expect(routeHandler.startGame(player1, activeGames)).toMatchSnapshot()
		}
	}
	if (logged3 === 'OK' && logged4 === 'OK') {
		let game = routeHandler.createGame(player3, activeGames, onlineUsers, 'GAME2')

		if(game === 'OK') {
			routeHandler.joinGame(player4, onlineUsers, 'GAME2', activeGames)
			expect(routeHandler.startGame(player4, activeGames)).toMatchSnapshot()
		}
	}
})

test('leaveGame', () => {
	let player1 = { id : 0 }
	let player2 = { id : 1 }
	let player3 = { id : 2 }
	let player4 = { id : 3 }
	let player5 = { id : 4 }

	let logged1 = routeHandler.login(player1, player1, onlineUsers)
	let logged2 = routeHandler.login(player2, player2, onlineUsers)
	let logged3 = routeHandler.login(player3, player3, onlineUsers)
	let logged4 = routeHandler.login(player4, player4, onlineUsers)

	if (logged1 === 'OK' && logged2 === 'OK') {
		let game = routeHandler.createGame(player1, activeGames, onlineUsers, 'GAME1')

		if (game === 'OK') {
			routeHandler.joinGame(player2, onlineUsers, 'GAME1', activeGames)
			expect(routeHandler.leaveGame(player1, activeGames)).toMatchSnapshot()
		}
	}
	if (logged3 === 'OK' && logged4 === 'OK') {
		let game = routeHandler.createGame(player3, activeGames, onlineUsers, 'GAME2')

		if(game === 'OK') {
			routeHandler.joinGame(player4, onlineUsers, 'GAME2', activeGames)
			expect(routeHandler.leaveGame(player4, activeGames)).toMatchSnapshot()
		}
	}

	expect(routeHandler.leaveGame(player5, activeGames)).toMatchSnapshot()
})

test('requestShape', () => {
	let logged = routeHandler.login(userInfo, client, onlineUsers)
	let result = routeHandler.createGame(client, activeGames, onlineUsers, 'GAME1')

	if (logged === 'OK' && result === 'OK') {
		let shape = routeHandler.requestShape(client, activeGames)
		let piece = new Piece(shape)
		let rotatedShapes = []

		for (let i = 0; i <= 270; i += 90) {
			rotatedShapes.push(piece.rotate(i))
		}

		expect(rotatedShapes).toContainEqual(shape)
	}
})

test('disconnect', () => {
	routeHandler.login(userInfo, client, onlineUsers)
	routeHandler.createGame(client, activeGames, onlineUsers, 'GAME1')

	expect(routeHandler.disconnect(client, onlineUsers, activeGames)).toMatchSnapshot()
})
