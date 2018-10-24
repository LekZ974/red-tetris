import React, { Component } from 'react'

class GameInfo extends Component {
    constructor(props){
      super(props)
    }

    render(){
      let displaySpectre = null
      if(this.props.spectres && this.props.spectres.length === 1) {
        <div>
          {this.props.spectres[0].name}
          <div style={{display:'flex', flexDirection:'row', alignItems:'flex-end', justifyContent:'flex-start', height:'100px', width:'100px', border:'1px solid red'}}>
            {spectre.gameSpectre[0].map((col, key) =>{
              const height = (col/20) * 100
              console.log('')
              return(
                <div key={key} style={{backgroundColor:'red', width:'10px', height: height +'%'}}></div>
              )
            })
            }
          </div>
        </div>
      }else{
         displaySpectre = this.props.spectres.map((spectre, key) =>{
            return(
              <div key={key} style={{ marginLeft:'40%', marginTop:'5%'}}>
                {spectre.name}<br/>
                <div style={{display:'flex', flexDirection:'row', alignItems:'flex-end', justifyContent:'flex-start', height:'100px', width:'100px', border:'1px solid red'}}>
                  {spectre.gameSpectre.map((col, key) =>{
                      const height = (col/20) * 100
                    return(
                      <div key={key} style={{backgroundColor:'red', width:'10px', height: height +'%'}}></div>
                    )
                  })
                  }
                </div>
              </div>
            )
        })
      }

      return(
        <div>
          <h3 style={{textAlign:"center"}}>Game Info</h3>
          {displaySpectre}
        </div>
      )
    }
}

export default GameInfo
