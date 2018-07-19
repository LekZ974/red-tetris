import shapes from '../constants/shapes'

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

export {
	findGame,
	createGame,
	randNumber
}