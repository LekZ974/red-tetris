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
    this.movement = this.movement.bind(this)
    this.state = {
      lateralPos: 0
    }
  }


  movement(e){
    console.log('he,ljfklds', e)

      // if(e.key === 'ArrowLeft'){
      //   console.log('ArrowLeft')
      //   this.setState({lateralPos: this.state.lateralPos - 10})
      // }else if(e.key === 'ArrowRight'){
      //   console.log('ArrowRight')
      //   this.setState({lateralPos: this.state.lateralPos + 10})
      // }
  }

  render(){
    // var s = {
    //   left: (this.props.col-1) * 25 + 'px',
    //   top: (this.props.row-1) * 25 + 'px',
    //   backgroundColor:'red'
    // };
    const pos = this.props.pos < 100 ? this.props.pos : 100
    return (<div style={{height:'20px', width:'20px', backgroundColor:'red', marginTop: pos +'px'}}
                 onKeyDown={ (e) =>this.movement(e)}>
            </div>)
  }
}

class PlayGround extends Component {
    constructor(props){
      super(props)
      this.handleKeyDown = this.handleKeyDown.bind(this)
      this.state = {
        tetriminosPos:10
      }
    }

    handleKeyDown(){
      console.log('fdsjfk',e)
    }
    // componentDidMount() {
    //   this.timerID = setInterval(
    //     () => this.setState({tetriminosPos: this.state.tetriminosPos + 10}),
    //     1000
    //   );
    // }
    //
    // componentWillUnmount() {
    //   clearInterval(this.timerID);
    // }

    render(){

      return(
        <div>PlayGround

            <div onKeyDown={(e) =>this.handleKeyDown(e)}>
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
