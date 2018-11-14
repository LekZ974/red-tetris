import React, { Component } from 'react'
import {updateGameStatus} from '../../actions/game'
import * as SocketService from '../../services/SocketService';
import { Link } from 'react-router-dom';

class RoomInfo extends Component {
    constructor(props){
      super(props)
    }

    render(){
      const {game, user, dispatch} = this.props

      function changeGameFlow(e) {
        const status = e.target.innerHTML
        SocketService.emitGameStatus(status, game)
      }

      function leaveGame(e) {
        SocketService.emitLeaveGame()
      }

      const buttonValue = game.start ? 'Pause' : 'Start'

      return(
        <div>
          <div>RoomInfo</div>
          <h1>PLAYER:{user.name}</h1>
          <h1>ROOM:{user.gameName}</h1>
          <button onClick={changeGameFlow}>{buttonValue}</button>
          <button onClick={changeGameFlow}>Stop</button>
          <button onClick={leaveGame}><Link to={'/'}>Leave Game</Link></button>
        </div>
      )
    }
}

export default RoomInfo
