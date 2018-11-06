import React from 'react'
import { Box, Card } from '../../components/block'
import { Route } from 'react-router-dom';
import RoomInfo from '../../components/Room/RoomInfo'
import GameInfo from '../../components/Room/GameInfo'
import PlayGround from '../../components/Room/PlayGround'
import {connect} from "react-redux";
import {createGame} from "../../actions/game";
import {login} from "../../actions/user";
import {GRID_HEIGHT, GRID_WIDTH} from "../../../common/grid";
import {PIECES_NUM} from "../../../common/pieces";

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

const createRoom = (props) => {
  const {match, user, dispatch} = props

  if (!user.name) {
    dispatch(login(match.params.user))
  }
  dispatch(createGame(match.params.room))
}

const Room = (props) => {
  const {user, game, match, dispatch} = props

  if (!game.name) {
    createRoom(props)
  }

  return (
  <Box flex flexDirection='column' align='stretch'>
    <Box width={'100%'} flex flexDirection='row' justifyContent='center'>
      <Card flex={1} width={'40em'}>
        <RoomInfo user={user} game={game} dispatch={dispatch}/>
      </Card>
      <Card flex={1} width={'40em'}>
        <PlayGround game={game} tetrimino={20}/>
      </Card>
      <Card flex={1} width={'40em'}>
        <GameInfo spectres={FakeSpectre} game={game}/>
      </Card>
      <Route path={`${match.path}/:user`} render={({match}) => (<div><h3> {match.params.userName} </h3></div>)}/>
    </Box>
  </Box>
  )
}

export default connect(({ user, game }) => ({
  user: user,
  game: game,
}))(Room)

