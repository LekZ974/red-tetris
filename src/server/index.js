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
        routeHandler.login(userInfo, client, onlineUsers)
	})

    client.on(routes.CREATE_GAME, (gameName) => {
        routeHandler.createGame(io, client, activeGames, onlineUsers, gameName)
    })
    client.on(routes.JOIN_GAME, (gameName) => {
        routeHandler.joinGame(client, onlineUsers, gameName, activeGames)
    })

    client.on(routes.START_GAME, () => {
        routeHandler.startGame(io, client, activeGames)
    })

    client.on(routes.REQUEST_SHAPE, () => {
        routeHandler.requestShape(io, client, activeGames)
    })

    client.on('disconnect', () => {
        routeHandler.disconnect()
    })
})

server.listen(port, (err) => {
    if (err) throw err
    console.log('listening on port ', port)
})
