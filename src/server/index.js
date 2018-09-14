import express from 'express'
import bodyParser from 'body-parser'

import params from '../../params'
import routes from './constants/routes'
import * as gameHandler from './eventHandlers/gameHandler'
import * as idHandler from './eventHandlers/idHandler'
import Player from './controllers/player'

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
		let player = new Player(userInfo.id, client.id)

		onlineUsers.push(player)
	})
    client.on(routes.CREATE_GAME, (gameName) => {
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
    })
    client.on(routes.JOIN_GAME, (gameId) => {
        const challenger = gameHandler.findPlayer(client.id, onlineUsers)
        let game = gameHandler.findGame(gameId, activeGames)

        game.setChallenger(challenger)
    })
    client.on(routes.START_GAME, (gameName) => {
        const gameId = idHandler.getGameId(gameName)
        let game = gameHandler.findGame(gameId, activeGames)

        /*if (game.waitingForPlayers()) {
            io.to(client.id).emit('gameStarted', 'KO')
            return
        }*/
        game.boardMaster = gameHandler.initBoard()
        game.boardChallenger = gameHandler.initBoard()
        io.to(game.master.socketID).emit('gameStarted', game.boardMaster)
        //io.to(game.challenger.socketID).emit('gameStarted', game.boardChallenger)
    })
    client.on(routes.REQUEST_SHAPE, (gameId) => {
        console.log('getting shape ')
        const game = gameHandler.findGame(gameId, activeGames)
        let index = gameHandler.randNumber(0, game.shapes.length - 1)

        client.emit(routes.EMITTED_SHAPE, game.shapes[index].getShapeToEmit())
    })
    client.on('disconnect', () => {
        console.log('user is disconnecting')
    })
})

server.listen(port, (err) => {
    if (err) throw err
    console.log('listening on port ', port)
})
