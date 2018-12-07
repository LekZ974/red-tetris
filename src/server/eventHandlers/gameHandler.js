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

const findChallengerIndex = function(socketId, allChallengers) {
	for (let i = 0; i < allChallengers.length; i++) {
		if (socketId == allChallengers[i].socketID)
			return (i)
	}
	return (-1)
}

const findGame = function(gameId, allGames) {
	const game = allGames.find((id) => {
		if (id.roomID === gameId)
			return id
	})
	return game
}

const findGameBySocketId = function(clientId, allGames) {
	const game = allGames.find((id) => {
		if (id.master != null) {
			if (id.master.socketID == clientId)
				return id
		}
		if (id.challenger.length > 0) {
			const enemy = id.challenger.find((enemyId) => {
				if (enemyId.socketID == clientId)
					return enemyId
			})
			return enemy
		}
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
	let player

	if (game.master.socketID === clientId) {
		player = game.master
	} else {
		let i = findChallengerIndex(clientId, game.challenger)

		if (i > -1)
			player = game.challenger[i]
	}
	if (game.shapeOrder.shapes.length === 0) {
		let shape = game.shapes[index].getShapeToEmit()

		game.shapeOrder.shapes.push(shape)
		player.piece += 1
		return shape
	} else {
		let shape

		player.piece += 1
		if (player.piece < game.shapeOrder.shapes.length) {
			shape = game.shapeOrder.shapes[player.piece]
		} else {
			shape = game.shapes[index].getShapeToEmit()
			game.shapeOrder.shapes.push(shape)
		}
		return shape
	}
}

const changeMaster = function(game) {
	let ret = null

	game.master.master = false;
	if (game.challenger.length > 0) {
        let stat = {
            gameName: null,
            newMaster: null,
            prevMaster: null
        }

        stat.gameName = game.roomName
        stat.prevMaster = game.master
        stat.newMaster = game.challenger[0]
        game.master = game.challenger[0]
        game.master.master = true;
        game.challenger.shift()
        ret = stat
    }
    return ret
}

const destroyGame = function(game, activeGames) {
	let index = activeGames.indexOf(game)
	let ret = false

	if (index > -1) {
		activeGames.splice(index, 1)
		ret = true
	}
	return ret
}

const isBoardFilled = function(board) {
	for (let i = 0; i < board[3].length; i++) {
		if (board[3][i] > 0)
			return true
	}
	return false
}

const isGameFinished = function(game) {
	if (game.master.inGameLoser === false) {
		if (isBoardFilled(game.master.board) === true) {
			game.numLosers++
			game.master.inGameLoser = true
		}
	}

	if (game.challenger.length === 0) {
		if (game.numLosers > 0) {
			return true
		} else {
			return false
		}
	} else {
		game.challenger.forEach((challenger) => {
			if (challenger.inGameLoser === false) {
				if (isBoardFilled(challenger.board) === true) {
					game.numLosers++
					challenger.inGameLoser = true
				}
			}
		})
		if (game.numLosers === game.challenger.length)
			return true
		return false
	}
}

const getGameStats = function(game) {
	let stat = {
		winner: null,
		losers: []
	}

	if (game.master.inGameLoser === false) {
		stat.winner = game.master.socketID
	} else {
		stat.losers.push(game.master.socketID)
	}
	game.challenger.forEach((challenger) => {
		if (challenger.inGameLoser === false) {
			stat.winner = challenger.socketID
		} else {
			stat.losers.push(challenger.socketID)
		}
	})
	return stat
}

export {
	findPlayer,
	findChallengerIndex,
	findGame,
	findGameBySocketId,
	createGame,
	randNumber,
	initBoard,
	getShape,
	changeMaster,
	destroyGame,
	isGameFinished,
	getGameStats
}
