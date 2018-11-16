import React, { Component } from 'react'
import { Link } from 'react-router-dom';

class RoomInfo extends Component {
    constructor(props){
      super(props)
    }

    render(){
      const {game, user, updateGameStatus, leaveGame} = this.props

      console.log(this.props)
      function changeGameFlow(e) {
        const status = e.target.innerHTML
        updateGameStatus(status, game)
      }

      function leaveRoom(e) {
        leaveGame()
      }

      const buttonValue = game.start ? 'Pause' : 'Start'

      return(
        <div>
          <div>RoomInfo</div>
          <h1>PLAYER:{user.name}</h1>
          <h1>ROOM:{game.name}</h1>
          {user.role === 'master' && <button onClick={changeGameFlow}>{buttonValue}</button>}
          {user.role === 'master' && <button onClick={changeGameFlow}>Stop</button>}
          <button onClick={leaveRoom}><Link to={'/'}>Leave Game</Link></button>
        </div>
      )
    }
}

export default RoomInfo
