import express from 'express'
import bodyParser from 'body-parser'

import params from '../../params'
import routes from './constants/routes'
import getShape from './eventHandlers/tetriminos'
import Player from './controllers/player'
import Games from './controllers/games'
import {GAME_STATUS} from "../client/actions/game";

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = params.server.port

var onlineUsers = []

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    console.log('http')
    res.send('Hello World')
})


io.on('connection', (client) => {
    console.log('client has connected ')
	client.on(routes.LOGIN, (userInfo) => {
		let player = new Player(userInfo.id, client.id)

		onlineUsers.push(player)
	})
    client.on(routes.REQUEST_SHAPE, (userID) => {
        console.log('getting shape ')
        client.emit(routes.EMITTED_SHAPE, getShape(userID))
    })
    client.on('disconnect', () => {
        console.log('user is disconnecting')
    })
})

server.listen(port, (err) => {
    if (err) throw err
    console.log('listening on port ', port)
})
