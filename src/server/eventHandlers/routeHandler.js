import routes from '../constants/routes'

import Player from '../controllers/player'
import * as idHandler from './idHandler'
import * as gameHandler from './gameHandler'

const login = function(userInfo, client, onlineUsers) {
	let player = new Player(userInfo.id, client.id)

	onlineUsers.push(player)
}

const createGame = function(io, client, activeGames, onlineUsers, gameName) {
	const gameId = idHandler.getGameId(gameName)
    const id = gameHandler.findGame(gameId, activeGames)

    if (id !== undefined) {
    	io.to(client.id).emit(routes.GAME_EXISTS, 'KO')
    } else {
    	let game = gameHandler.createGame(client.id, onlineUsers)

        game.setRoomInfo(gameId, gameName)
        activeGames.push(game)
        io.to(client.id).emit(routes.GAME_EXISTS, 'OK')
    }
}

const joinGame = function(client, onlineUsers, gameName, activeGames) {
	const challenger = gameHandler.findPlayer(client.id, onlineUsers)
    const gameId = idHandler.getGameId(gameName)
    let game = gameHandler.findGame(gameId, activeGames)

    game.setChallenger(challenger)
}

const startGame = function(io, client, activeGames) {
	let game = gameHandler.findGameBySocketId(client.id, activeGames)

    /*if (game.waitingForPlayers()) {
        io.to(client.id).emit('gameStarted', 'KO')
        return
    }*/
    game.boardMaster = gameHandler.initBoard()
    game.boardChallenger = gameHandler.initBoard()
    io.to(game.master.socketID).emit(routes.GAME_STARTED, game.boardMaster)
    //io.to(game.challenger.socketID).emit('gameStarted', game.boardChallenger)
}

const requestShape = function(io, client, activeGames) {
	let game = gameHandler.findGameBySocketId(client.id, activeGames)
    let shape = gameHandler.getShape(game, client.id)

    io.to(client.id).emit(routes.EMITTED_SHAPE, shape)
}

const disconnect = function() {
	console.log('user is disconnecting')
}

export {
	login,
	createGame,
	joinGame,
	startGame,
	requestShape,
	disconnect
}