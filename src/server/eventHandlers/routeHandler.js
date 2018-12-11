import routes from '../constants/routes'

import Player from '../controllers/player'
import Spectre from '../controllers/spectre'
import * as idHandler from './idHandler'
import * as gameHandler from './gameHandler'

const login = function(userInfo, client, onlineUsers) {
	let ret = {
		login: null
	}
    let player = new Player(userInfo.id, client.id)

    onlineUsers.push(player)
	ret.login = userInfo.name
    return ret
}

const getGames = function(activeGames) {
    let gameList = []

    for(let i = 0; i < activeGames.length; i++) {
        let entry = {
            gameName: '',
            started: ''
        }

        entry.gameName = activeGames[i].roomName
        entry.started = activeGames[i].gameStarted
        gameList.push(entry)
    }
    return gameList
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

    if (game === undefined || challenger === undefined || game.master.socketID === client.id) {
        res = 'KO'
    } else {
         game.setChallenger(challenger)
         res = 'OK'
    }
    return res
}

const leaveGame = function(client, activeGames) {
    let game = gameHandler.findGameBySocketId(client.id, activeGames)
    let ret = {
        masterStat: null,
        gameDestroy: false,
        challengerStat: null
    }
	let index = -1

    if (!game)
        return null
	index = gameHandler.findChallengerIndex(client.id, game.challenger)
    if (game.master.socketID === client.id) {
        if (game.challenger.length > 0) {
            ret.masterStat = gameHandler.changeMaster(game)
        } else {
            ret.gameDestroy = gameHandler.destroyGame(game, activeGames)
        }
        return ret
    } else if (index > -1) {
        let stat = {
            gameName : null,
            player : null
        }

        stat.gameName = game.roomName
        stat.player = game.challenger[index]
        game.challenger.splice(index, 1)
        ret.challengerStat = stat
    }
    return ret
}

const startGame = function(client, activeGames) {
    let ret = null
    let game = gameHandler.findGameBySocketId(client.id, activeGames)

    if (game !== undefined) {
        if (game.master && game.master.socketID === client.id) {
            game.master.board = gameHandler.initBoard()
            game.setGameStarted()
        } else {
            return ret
        }
        if (game.challenger.length > 0) {
			game.master.spectre = new Spectre(gameHandler.initBoard())
			for (let i = 0; i < game.challenger.length; i++) {
				game.challenger[i].board = gameHandler.initBoard()
				game.challenger[i].spectre = new Spectre(gameHandler.initBoard())
			}
        }
        ret = game;
    }
    return ret
}

const restartGame = function(io, client, activeGames) {
    let game = startGame(client, activeGames)

    if (game) {
        gameHandler.initGame(game)
        io.to(game.roomName).emit(routes.GAME_STARTED, game.master.board)

        if (game.challenger.length > 0) {
            let players = allPlayers(game, game.master.socketID)
            io.to(game.master.socketID).emit(routes.ALL_PLAYERS, players)

            for (let i = 0; i < game.challenger.length; i++) {
                let players = allPlayers(game, game.challenger[i].socketID)
                io.to(game.challenger[i].socketID).emit(routes.ALL_PLAYERS, players)
            }
        }
    }
}

const requestShape = function(client, activeGames) {
    let game = gameHandler.findGameBySocketId(client.id, activeGames)
    let shape = null

    if (game !== undefined) {
        shape = gameHandler.getShape(game, client.id)
    }
    return shape
}

const updateBoard = function(client, activeGames, newBoard) {
    let game = gameHandler.findGameBySocketId(client.id, activeGames)
    let ret = {
        stat: 'KO',
        game: null
    }

    if (game !== undefined) {
        ret.game = game
        if (client.id == game.master.socketID) {
            game.master.board = newBoard
            ret.stat = 'OK'
        } else {
            let index = gameHandler.findChallengerIndex(client.id, game.challenger)
            if (index > -1) {
                game.challenger[index].board = newBoard
                ret.stat = 'OK'
            }
        }
    }
    return ret
}

const generateSpectre = function(game, clientId) {
    let allSpectres = []
    let mcontents = {
        role: null,
        login: null,
        spectre: null
    }

    if (clientId !== undefined && game.challenger.length > 0) {
        if (game.master.socketID !== clientId) {
            mcontents.role = 'Master'
            mcontents.login = game.master.playerID
            mcontents.spectre = game.master.spectre.generateSpectre(game.master.board);
            allSpectres.push(mcontents)
        }

        for (let i = 0; i < game.challenger.length; i++) {
            let contents = {
                role: null,
                login: null,
                spectre: null
            }

            if (game.challenger[i].socketID !== clientId) {
                contents.role = 'Challenger'
                contents.login = game.challenger[i].playerID
                contents.spectre = game.challenger[i].spectre.generateSpectre(game.challenger[i].board)
                allSpectres.push(contents)
            }
        }
    }
    return allSpectres
}

const allPlayers = function(game, clientId) {
    if (!game || !clientId)
        return null
    if (game.challenger.length > 0) {
        let allPlayers = []
        if (game.master.socketID !== clientId) {
            let master = {
                role : 'Master',
                login : game.master.playerID
            }
            allPlayers.push(master)
        }
        for (let i = 0; i < game.challenger.length; i++) {
            if (game.challenger[i].socketID !== clientId) {
                let challenger = {
                    role : 'challenger',
                    login : game.challenger[i].playerID
                }
                allPlayers.push(challenger)
            }
        }
        return allPlayers
    }
    return null
}

const disconnect = function(client, onlineUsers, activeGames) {
    let player = gameHandler.findPlayer(client.id, onlineUsers)
    let index

    if (player !== undefined) {
        leaveGame(client, activeGames)

        index = onlineUsers.indexOf(player)
        if (index > -1) {
            onlineUsers.slice(index, 1)
            console.log('user disconnected properly')
        }
    }
}

export {
    login,
    getGames,
    createGame,
    joinGame,
    leaveGame,
    startGame,
    restartGame,
    requestShape,
    updateBoard,
    generateSpectre,
    allPlayers,
    disconnect
}
