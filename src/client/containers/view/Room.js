import React from 'react'
import { Box, Card } from '../../components/block'
import { Route } from 'react-router-dom';
import RoomInfo from '../../components/Room/RoomInfo'
import GameInfo from '../../components/Room/GameInfo'
import PlayGround from '../../components/Room/PlayGround'
import {connect} from "react-redux";

const FakeSpectre = [
  {
    name:"Helene",
    gameSpectre:"Helene Spectre",
  },
  {
    name:"Helene",
    gameSpectre:"Helene Spectre",
  },
  {
    name:"Helene",
    gameSpectre:"Helene Spectre",
  }
]

const Room = ({ user, match, props }) => {
  return(
    <Box flex flexDirection='column' align='stretch'>
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

