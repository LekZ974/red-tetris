const ioClient = require('socket.io-client');

import params from '../../params'
import routes from '../../src/server/constants/routes'

describe('unit testing server', () => {
  let socketClient 

  beforeEach((done) => {
    socketClient = ioClient.connect(params.server.url, {
      'reconnection delay': 0,
      'reopen delay': 0,
      'force new connection' : true,
      transports: ['websocket']
    })
    done()
  })

  afterEach((done) => {
    if (socketClient.connected)
      socketClient.close()
    done()
  })

  test('login', (done) => {
    socketClient.emit(routes.LOGIN, { id : 0 })
    
    socketClient.once(routes.LOGGED, (ret) => {
      expect(ret).toMatch('OK')
    })
    done()
  })

  test('createGame', (done) => {
    socketClient.emit(routes.LOGIN, { id : 0 })
    socketClient.emit(routes.CREATE_GAME, 'GAME1')

    socketClient.on(routes.GAME_EXISTS, (ret) => {
      expect(ret).toMatch('OK')
    })
    done()
  })
})