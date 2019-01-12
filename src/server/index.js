import express from 'express'
import bodyParser from 'body-parser'

import params from '../../params'
import routes from './constants/routes'
import * as routeHandler from './eventHandlers/routeHandler'
import { isGameFinished, getGameStats } from './eventHandlers/gameHandler'

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = params.server.port

var onlineUsers = []
var activeGames = []
var nsp = io.of('/game')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    console.log('http')
    res.send('Hello World')
})

io.on('connection', (client) => {

    client.on(routes.LOGIN, (userInfo) => {
        let res = routeHandler.login(userInfo, client, onlineUsers)
        io.to(client.id).emit(routes.LOGGED, res)
    })

    client.on(routes.GET_GAMES, () => {
        let gameList = routeHandler.getGames(activeGames)
        io.to(client.id).emit(routes.GAMES_SENT, gameList)
    })

    client.on(routes.CREATE_GAME, (gameName, solo) => {
        let res = routeHandler.createGame(client, activeGames, onlineUsers, gameName, solo)

      console.log('GAME IS SOLO', solo)
		if (res === 'OK')
			client.join(gameName)
        io.to(client.id).emit(routes.GAME_EXISTS, res)
        io.to(client.id).emit(routes.CAN_START, res)
    })

    client.on(routes.JOIN_GAME, (gameName) => {
        let res = routeHandler.joinGame(client, onlineUsers, gameName, activeGames)

      console.log('GAME CAN JOIN', res)
		if (res === 'OK') {
			client.join(gameName)
      io.to(gameName).emit(routes.SOMEONE_JOINED, true)
		}
        io.to(client.id).emit(routes.GAME_JOINED, res)
    })

    client.on(routes.LEAVE_GAME, () => {
        let res = routeHandler.leaveGame(client, activeGames)

        if (res !== null) {
            if (res.masterStat) {
                let stat = {
                    isMaster : true
                }

                client.leave(res.masterStat.gameName);
                io.to(res.masterStat.gameName).emit(routes.SOMEONE_LEFT, true)
                io.to(res.masterStat.newMaster.socketID).emit(routes.UPDATE_STATUS, stat)
                io.to(client.id).emit(routes.LEFT_GAME, 'OK')
            } else if (res.challengerStat) {
                client.leave(res.challengerStat.gameName)
                io.to(res.challengerStat.gameName).emit(routes.SOMEONE_LEFT, true)
                io.to(client.id).emit(routes.LEFT_GAME, 'OK')
            }
        } else {
            io.to(client.id).emit(routes.LEFT_GAME, 'KO')
        }
    })

    client.on(routes.START_GAME, () => {
        let game = routeHandler.startGame(client, activeGames)
        if (game !== null) {
            io.to(game.roomName).emit(routes.GAME_STARTED, game.master.board)

            if (game.challenger.length > 0) {
                let allPlayers = routeHandler.allPlayers(game, game.master.socketID)
                io.to(game.master.socketID).emit(routes.ALL_PLAYERS, allPlayers)

                for (let i = 0; i < game.challenger.length; i++) {
                    let allPlayers = routeHandler.allPlayers(game, game.challenger[i].socketID)
                    io.to(game.challenger[i].socketID).emit(routes.ALL_PLAYERS, allPlayers)
                }
            }
        }
    })

    client.on(routes.RESTART_GAME, () => {
        routeHandler.restartGame(io, client, activeGames)
    })


    client.on(routes.REQUEST_SHAPE, () => {
        let shape = routeHandler.requestShape(client, activeGames)
        io.to(client.id).emit(routes.EMITTED_SHAPE, shape)
    })

    client.on(routes.UPDATE_BOARD, (newBoard) => {
        let res = routeHandler.updateBoard(client, activeGames, newBoard)
        io.to(client.id).emit(routes.BOARD_UPDATED, res.stat)
        if (res.game) {
            if (res.game.challenger.length > 0) {
                let spectre = routeHandler.generateSpectre(res.game, res.game.master.socketID)
                io.to(res.game.master.socketID).emit(routes.SPECTRES_UPDATED, spectre)
                io.to(res.game.master.socketID).emit(routes.MALUS_UPDATED, res.game.master.malus)

                for (let i = 0; i < res.game.challenger.length; i++) {
                    let spectre = routeHandler.generateSpectre(res.game, res.game.challenger[i].socketID)
                    io.to(res.game.challenger[i].socketID).emit(routes.SPECTRES_UPDATED, spectre)
                    io.to(res.game.challenger[i].socketID).emit(routes.MALUS_UPDATED, res.game.challenger[i].malus)
                }

                if (isGameFinished(res.game)) {
                    res.game.gameStarted = false
                    let winner = getGameStats(res.game)
                    io.to(winner.winner).emit(routes.GAME_FINISHED, 'winner')
                    winner.losers.forEach((id) => {
                        io.to(id).emit(routes.GAME_FINISHED, 'loser')
                    })
                    io.to(res.game.master.socketID).emit(routes.CAN_RESTART, true)
                }
            } else {
                if (isGameFinished(res.game)) {
                    res.game.gameStarted = false
                    io.to(client.id).emit(routes.GAME_FINISHED, 'loser')
                    io.to(client.id).emit(routes.CAN_RESTART, true)
                }
            }
        }
    })

    client.on('disconnect', () => {
        routeHandler.disconnect(client, onlineUsers, activeGames)
    })
})

server.listen(port, (err) => {
    if (err) throw err
    console.log('listening on port ', port)
})
