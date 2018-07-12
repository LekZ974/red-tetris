import React, { Component } from 'react'

class RoomInfo extends Component {
    constructor(props){
      super(props)
    }

    render(){
      return(
        <div>
          <h3 style={{textAlign:"center"}}>Room Info</h3>
          <p>Parties en cours</p>
          <p>Parties terminées</p>
        </div>
      )
    }
}

export default RoomInfo
