import React from 'react'
import { Box, Card } from '../../components/block'
import { Route } from 'react-router-dom';
import RoomInfo from '../../components/Room/RoomInfo'
import GameInfo from '../../components/Room/GameInfo'
import PlayGround from '../../components/Room/PlayGround'
import {connect} from "react-redux";
import {emitCreateGame} from "../../actions/game";
import {login} from "../../actions/user";

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

const createGame = (props) => {
  const {match, dispatch} = props

  dispatch(login({
    userName: match.params.user,
    gameName: match.params.room,
  }))

  dispatch(emitCreateGame({
    userName: match.params.user,
    gameName: match.params.room,
  }))
}

const Room = (props) => {
  const {user, game, match, dispatch} = props

  if (!game.name) {
    createGame(props)
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

