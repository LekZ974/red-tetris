import express from 'express'
import bodyParser from 'body-parser'

import params from '../../params'
import routes from './constants/routes'
import getShape from './eventHandlers/tetriminos'
import Player from './controllers/player'

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = params.server.port

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    console.log('http')
    res.send('Hello World')
})

io.on('connection', (client) => {
    console.log('client has connected ')
	let player = new Player('123', client.id)
	console.log('socket id = ', player.getSocketID())
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
