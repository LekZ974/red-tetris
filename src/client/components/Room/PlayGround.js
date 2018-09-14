import React, { Component } from 'react'

import {GridBlock} from '../block'
import {connect} from "react-redux";
import {tetriStep} from "../../actions/tetrimino";

class PlayGround extends Component {
    constructor(props){
      super(props)
      this.state = {
        tetriminosPos:10,
      };
      this.intervalStep = null
    }

    render(){
      const {game, dispatch} = this.props

      if (game.start) {
        this.intervalStep = setInterval(() => dispatch(tetriStep()), 1000)
      } else {
        clearInterval(this.intervalStep)
      }

      return(
        <div>PlayGround
            <div>
              <GridBlock
                pos={this.state.tetriminosPos}
              />
            </div>
        </div>
      )
    }
}

export default connect(({game}) => ({
  game: game,
}))(PlayGround)
