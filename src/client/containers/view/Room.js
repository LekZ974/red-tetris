import React from 'react'
import { Box, Card, Header } from '../../components/block'
import { Route } from 'react-router-dom';
import RoomInfo from '../../components/Room/RoomInfo'
import GameInfo from '../../components/Room/GameInfo'
import PlayGround from '../../components/Room/PlayGround'
import {connect} from "react-redux";

const FakeSpectre = [
  {
    name:"Jennifer",
    gameSpectre:[2,12,14,8,8,3,9,15,8,8],
  },
  {
    name:"Alenxande",
    gameSpectre:[3,16,13,6,0,3,9,17,5,8],
  },
  {
    name:"Graziella",
    gameSpectre:[2,16,14,5,3,3,9,17,8,8]
  }
]

const Room = ({ user, match, props }) => {
  return(
    <Box flex flexDirection='column' align='stretch'>
      <Header/>
      <Box width={'100%'} flex flexDirection='row' justifyContent='center'>
        <Card flex={1} width={'40em'}>
          <RoomInfo />
        </Card>
        <Card flex={1} width={'40em'}>
          <PlayGround />
        </Card>
        <Card flex={1} width={'40em'}>
          <GameInfo spectres={FakeSpectre}/>
        </Card>
        <Route path={`${match.path}/:user`} render= {({match}) =>( <div> <h3> {match.params.name} </h3></div>)}/>
      </Box>
    </Box>
  )
};

export default connect(({ user }) => ({
  user: user,
}))(Room)

