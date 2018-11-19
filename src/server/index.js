import express from 'express'
import bodyParser from 'body-parser'

import params from '../../params'
import routes from './constants/routes'
import * as routeHandler from './eventHandlers/routeHandler'

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

    client.on(routes.CREATE_GAME, (gameName) => {
        let res = routeHandler.createGame(client, activeGames, onlineUsers, gameName)

		if (res === 'OK')
			client.join(gameName)
        io.to(client.id).emit(routes.GAME_EXISTS, res)
    })

    client.on(routes.JOIN_GAME, (gameName) => {
        let res = routeHandler.joinGame(client, onlineUsers, gameName, activeGames)

		if (res === 'OK')
			client.join(gameName)
        io.to(client.id).emit(routes.GAME_JOINED, res)
    })

    client.on(routes.LEAVE_GAME, () => {
        let res = routeHandler.leaveGame(client, activeGames)
        io.to(client.id).emit(routes.LEFT_GAME, res)
    })

    client.on(routes.START_GAME, () => {
        let game = routeHandler.startGame(client, activeGames)
        if (game !== null) {
            io.to(game.roomName).emit(routes.GAME_STARTED, game.master.board)
        }
    })

    client.on(routes.REQUEST_SHAPE, () => {
        let shape = routeHandler.requestShape(client, activeGames)
        io.to(client.id).emit(routes.EMITTED_SHAPE, shape)
    })

    client.on(routes.UPDATE_BOARD, (newBoard) => {
        let ret = routeHandler.updateBoard(client, activeGames, newBoard)
    })

    client.on('disconnect', () => {
        routeHandler.disconnect(client, onlineUsers, activeGames)
    })
})

server.listen(port, (err) => {
    if (err) throw err
    console.log('listening on port ', port)
})
