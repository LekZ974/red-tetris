import shapes from '../constants/shapes'
import board from '../constants/board'

import Piece from '../controllers/piece'
import Game from '../controllers/game'

const findPlayer = function(socketId, users) {
	const player = users.find((id) => {
		if (id.socketID === socketId) {
			return id
		}
	})
	return player
}

const findGame = function(gameId, allGames) {
	const game = allGames.find((id) => {
		if (id.roomID === gameId)
			return id
	})
	return game
}

const initShapes = function() {
	let shapeArray = []

	shapes.forEach((elem) => {
		shapeArray.push(new Piece(elem))
	})
	return shapeArray
}

const createGame = function(socketId, users) {
	const master = findPlayer(socketId, users)
	const tetriminos = initShapes()
	let game = new Game(tetriminos)

	game.setMaster(master)
	return game
}

const randNumber = function(min, max) {
	return Math.floor(Math.random() * (max -min + 1))
}

const initBoard = function() {
	let grid = new Array(board.LENGTH)

	for (let i = 0; i < grid.length; i++) {
		grid[i] = new Array(board.WIDTH)
	}
	for (let i = 0; i < grid.length; i++) {
		for(let j = 0; j < grid[i].length; j++) {
			grid[i][j] = 0
		}
	}
	return grid
}

const getShape = function(game, clientId) {
	let index = randNumber(0, game.shapes.length - 1)

	if (game.shapeOrder.shapes.length === 0) {
		let shape = game.shapes[index].getShapeToEmit()

		game.shapeOrder.shapes.push(shape)
		game.shapeOrder.requestId = clientId
		return shape
	} else {
		let shape

		if (game.shapeOrder.requestId != clientId) {
			shape = game.shapeOrder.shapes[0]
			
			game.shapeOrder.shapes.shift()
			game.shapeOrder.requestId = null
		} else {
			shape = game.shapes[index].getShapeToEmit()

			game.shapeOrder.shapes.push(shape)
			game.shapeOrder.requsteId = clientId
		}
		return shape
	}
}

export {
	findPlayer,
	findGame,
	createGame,
	randNumber,
	initBoard,
	getShape
}