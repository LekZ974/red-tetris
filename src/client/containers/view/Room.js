import React from 'react'
import { Box, Card } from '../../components/block'
import { Route } from 'react-router-dom';
import RoomInfo from '../../components/Room/RoomInfo'
import GameInfo from '../../components/Room/GameInfo'
import PlayGround from '../../components/Room/PlayGround'
import {connect} from "react-redux";
import {emitCreateGame, emitGameStatus} from "../../actions/game";
import {emitLogin, emitLeaveGame} from "../../actions/user";

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

const Room = (props) => {
  const {user, game, match, createGame, login} = props

  if (!user.name && !user.isLoading) {
    login(match.params.user)
  }

  if (!game.name && !game.isLoading) {
    createGame(match.params.room)
  }

  if (!user.gameName || user.isLoading) {
    return (
      <div>IS LOADING</div>
    )
  }

  return (
  <Box flex flexDirection='column' align='stretch'>
    <Box width={'100%'} flex flexDirection='row' justifyContent='center'>
      <Card flex={1} width={'40em'}>
        <RoomInfo {...props} />
      </Card>
      <Card flex={1} width={'40em'}>
        <PlayGround game={game} tetrimino={20}/>
      </Card>
      <Card flex={1} width={'40em'}>
        <GameInfo spectres={FakeSpectre} game={game} user={user}/>
      </Card>
      <Route path={`${match.path}/:user`} render={({match}) => (<div><h3> {match.params.userName} </h3></div>)}/>
    </Box>
  </Box>
  )
}

const mapDispatchToProps = dispatch => ({
  login: userName => dispatch(emitLogin(userName)),
  createGame: gameName => dispatch(emitCreateGame(gameName)),
  updateGameStatus: (status, game) => dispatch(emitGameStatus(status, game)),
  leaveGame: () => dispatch(emitLeaveGame()),
})

const mapStateToProps = state => {

  return {
    user: state.user,
    game: state.game,
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room);

