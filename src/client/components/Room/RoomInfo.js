import React, { Component } from 'react'
import {emitGameStatus} from '../../actions/game'


class RoomInfo extends Component {
    constructor(props){
      super(props)
    }

    render(){
      const {game, user, dispatch} = this.props

      function changeGameFlow(e) {
        const status = e.target.innerHTML
        dispatch(emitGameStatus(status, game))
      }

      const buttonValue = game.start ? 'Pause' : 'Start'

      return(
        <div>
          <div>RoomInfo</div>
          <h1>PLAYER:{user.userName}</h1>
          <h1>ROOM:{user.gameName}</h1>
          <button onClick={changeGameFlow}>{buttonValue}</button>
          <button onClick={changeGameFlow}>Stop</button>
        </div>
      )
    }
}

export default RoomInfo
