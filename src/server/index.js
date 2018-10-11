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

    client.on(routes.CREATE_GAME, (gameName) => {
        let res = routeHandler.createGame(client, activeGames, onlineUsers, gameName)
        io.to(client.id).emit(routes.GAME_EXISTS, res)
    })
    client.on(routes.JOIN_GAME, (gameName) => {
        let res = routeHandler.joinGame(client, onlineUsers, gameName, activeGames)
        io.to(client.id).emit(routes.GAME_JOINED, res)
    })

    client.on(routes.START_GAME, () => {
        routeHandler.startGame(io, client, activeGames)
    })

    client.on(routes.REQUEST_SHAPE, () => {
        let shape = routeHandler.requestShape(client, activeGames)
        io.to(client.id).emit(routes.EMITTED_SHAPE, shape)
    })

    client.on('disconnect', () => {
        routeHandler.disconnect()
    })
})

server.listen(port, (err) => {
    if (err) throw err
    console.log('listening on port ', port)
})
