import React, { Component } from 'react'


const commandes = ()=>{
  return(
    <div>
      <h4>Commandes</h4>
       Rotation<br/>
      Fleches deplacement<br/>
    </div>
  )
}
class Tetriminos extends Component{
  constructor(props){
    super(props)
  }
  render(){
    var s = {
      left: (this.props.col-1) * 25 + 'px',
      top: (this.props.row-1) * 25 + 'px',
      backgroundColor:'red'
    };
    return (<div style={s}> </div>)
  }
}

class PlayGround extends Component {
    constructor(props){
      super(props)
    }

    render(){

      return(
        <div>PlayGround

            <div>

            </div>
          {commandes()}
        </div>
      )
    }
}

export default PlayGround
