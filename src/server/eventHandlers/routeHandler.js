import routes from '../constants/routes'

import Player from '../controllers/player'
import * as idHandler from './idHandler'
import * as gameHandler from './gameHandler'

const login = function(userInfo, client, onlineUsers) {
    let player = new Player(userInfo.id, client.id)

    onlineUsers.push(player)
    return 'OK'
}

const createGame = function(client, activeGames, onlineUsers, gameName) {
    const gameId = idHandler.getGameId(gameName)
    const game = gameHandler.findGame(gameId, activeGames)
    let res

    if (game !== undefined) {
        res = 'KO'
    } else {
        let newGame = gameHandler.createGame(client.id, onlineUsers)

        newGame.setRoomInfo(gameId, gameName)
        activeGames.push(newGame)
        res = 'OK'
    }
    return res
}

const joinGame = function(client, onlineUsers, gameName, activeGames) {
    const challenger = gameHandler.findPlayer(client.id, onlineUsers)
    const gameId = idHandler.getGameId(gameName)
    let game = gameHandler.findGame(gameId, activeGames)
    let res

    if (game === undefined || challenger === undefined) {
        res = 'KO'
    } else {
         game.setChallenger(challenger)
         res = 'OK'
    }
    return res
}

const leaveGame = function(client, activeGames) {
    let game = gameHandler.findGameBySocketId(client.id, activeGames)
    let ret = false

    if (game.master.socketID === client.id) {
        ret = gameHandler.changeMaster(game)

        if (!ret) {
            let del = gameHandler.destroyGame(game, activeGames)
            return del
        }
        return ret
    } else if (game.challenger.socketID === client.id) {
        game.challenger = null
        ret = true
    }
    return ret
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

const requestShape = function(client, activeGames) {
    let game = gameHandler.findGameBySocketId(client.id, activeGames)
    let shape = null

    if (game !== undefined) {
        shape = gameHandler.getShape(game, client.id)
    }
    return shape
}

const disconnect = function() {
    console.log('user is disconnecting')
}

export {
    login,
    createGame,
    joinGame,
    leaveGame,
    startGame,
    requestShape,
    disconnect
}
