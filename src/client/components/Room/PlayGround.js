import React, { Component } from 'react'


const commandes = ()=>{
  return(
    <div style={{border:'1px, solid blue', backgroundColor:'skyblue'}}>
      <h4 style={{textAlign:'center'}}>Commandes</h4>
       Rotation<br/> Barre d'espace <br/>
      Fleches deplacement<br/>
    </div>
  )
}
class Tetriminos extends Component{
  constructor(props){
    super(props)
  }
  render(){
    // var s = {
    //   left: (this.props.col-1) * 25 + 'px',
    //   top: (this.props.row-1) * 25 + 'px',
    //   backgroundColor:'red'
    // };
    return (<div style={{height:'20px', width:'20px', backgroundColor:'red', marginTop: this.props.pos +'px'}}> </div>)
  }
}

class PlayGround extends Component {
    constructor(props){
      super(props)
      this.state = {
        tetriminosPos:10
      }
    }

    render(){

      return(
        <div>PlayGround

            <div>
              <Tetriminos
                pos={this.state.tetriminosPos}
              />
            </div>
          {commandes()}
        </div>
      )
    }
}

export default PlayGround
