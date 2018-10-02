import React, { Component } from 'react'

import {GridBlock} from '../block'
import {connect} from "react-redux";

class PlayGround extends Component {
    constructor(props){
      super(props)
    }

    render(){
      const {game, dispatch} = this.props

      return(
        <div>PlayGround
            <div>
              <GridBlock
              />
            </div>
        </div>
      )
    }
}

export default PlayGround
