import React, { Component } from 'react'
import { connect } from 'react-redux';
import {Button} from '../block'
import {gameStatus} from '../../actions/game'
import {tetriStep} from '../../actions/tetrimino'


class RoomInfo extends Component {
    constructor(props){
      super(props)
    }

    render(){
      const {game, dispatch} = this.props

      function changeGameFlow(e) {
        const status = e.target.innerHTML
        dispatch(gameStatus(status))
      }

      const buttonValue = game.start ? 'Pause' : 'Start'

      return(
        <div>
          <div>RoomInfo</div>
          <button onClick={changeGameFlow}>{buttonValue}</button>
          <button onClick={changeGameFlow}>Stop</button>
        </div>
      )
    }
}

export default connect(({game}) => ({
  game: game,
}))(RoomInfo)
