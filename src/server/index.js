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
  client.emit('GET_ROOMS', [
    {
      id: 1,
      name: 'Party1',
      owner: 'Alex'
    },
    {
      id: 2,
      name: 'Party2',
      owner: 'TOTO'
    },
    {
      id: 3,
      name: 'Party3',
      owner: 'TUTU'
    },
    {
      id: 4,
      name: 'PartyA',
      owner: 'Alex'
    },
    {
      id: 5,
      name: 'PartyB',
      owner: 'TOTO'
    },
    {
      id: 6,
      name: 'PartyC',
      owner: 'TUTU'
    },
  ]);
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
