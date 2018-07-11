import React, { Component } from 'react'



class GameInfo extends Component {
    constructor(props){
      super(props)
    }

    render(){
      let displaySpectre = null
      if(this.props.spectres && this.props.spectres.length === 1) {

      }else{
         displaySpectre = this.props.spectres.map((spectre, key) =>{
            return(
              <div key={key}>
                {spectre.name}<br/>
                {spectre.gameSpectre}
              </div>
            )
        })
      }
      return(
        <div>
          <h3>Game Info</h3>
          {displaySpectre}
        </div>
      )
    }
}

export default GameInfo
