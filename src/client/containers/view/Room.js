import React from 'react'
import {Box, Card, LoadingContainer, Toaster} from '../../components/block'
import Fade from 'react-reveal/Fade';
import GridLoader from 'react-spinners/GridLoader';
import Sound from 'react-sound';

import musicFile from '../../assets/sounds/tetris-gameboy-02.mp3';

import RoomInfo from '../../components/Room/RoomInfo'
import GameInfo from '../../components/Room/GameInfo'
import PlayGround from '../../components/Room/PlayGround'
import {connect} from "react-redux";
import {emitCreateGame, emitGameStatus, gameSound} from "../../actions/game";
import {emitLogin, emitLeaveGame} from "../../actions/user";
import {displayCommand, displayConfigForm, displayResult} from "../../actions/alert";
import Modal from "../../components/block/Modal";
import ConfigForm from "../form/ConfigForm";
import { emitGetGames } from '../../actions/games';
import * as Services from "../../services/TetriService";

const Room = (props) => {
  const {user, game, gamesList, match, login, showConfigForm, displayConfigForm, getGames, createGame, history} = props

  if (!gamesList && !user.name && !user.isLoading) {
    getGames()
  }

  if (!user.name && !user.isLoading) {
    login(match.params.user)
  }

  if (!Services.gameExist(match.params.room, gamesList)) {
    if (!game.name && !game.isLoading) {
      if (!showConfigForm) {
        history.push('/')
      }
      return (
        <Modal open={showConfigForm} onClose={displayConfigForm} closeOnOverlayClick={false}>
          <ConfigForm {...props} />
        </Modal>
      )
    }
  } else if (!game.name && !game.isLoading) {
    createGame(match.params.room, false)
  }

  return (
  <Box height={'100vh'} flex flexDirection='column' align='stretch' container>
    <Toaster/>
    <LoadingContainer
      isLoading={!user.gameName || user.isLoading}
      isEmpty={!user.gameName || !user.name}
      spinner={
        <Fade big>
          <GridLoader
            color={'#ff8b23'}
            size={75}
          />
        </Fade>
      }
      emptyLabel='Something is wrong'
    >
      <Fade big>
        <Box width={'100%'} flex flexDirection='row' justifyContent='center'>
          <Card flex={1} width={'40em'}>
            <RoomInfo {...props} />
          </Card>
          <Card flex={1} width={'40em'}>
            <PlayGround {...props} />
          </Card>
          <Card flex={1} width={'40em'}>
            <GameInfo game={game} user={user}/>
          </Card>
        </Box>
      </Fade>
    </LoadingContainer>
    <Sound
      url={musicFile}
      playStatus={game.start && game.params.sound ? 'PLAYING' : 'STOPPED'}
      loop={true}
    />
  </Box>
  )
}

const mapDispatchToProps = dispatch => ({
  login: userName => dispatch(emitLogin(userName)),
  createGame: (gameName, isSolo) => dispatch(emitCreateGame(gameName, isSolo)),
  updateGameStatus: (status, game) => dispatch(emitGameStatus(status, game)),
  updateGame: data => dispatch(updateGame(data)),
  leaveGame: () => dispatch(emitLeaveGame()),
  displayCommand: () => dispatch(displayCommand()),
  displayConfigForm: () => dispatch(displayConfigForm()),
  displayResult: () => dispatch(displayResult()),
  getGames: () => dispatch(emitGetGames()),
  gameSound: (status) => dispatch(gameSound(status)),
})

const mapStateToProps = state => {

  if (state.user.grid.length < 1 && state.user.lost && state.game.start) {
    state.game.start = false
  }

  return {
    user: state.user,
    gamesList: state.games.items,
    game: Object.assign({}, state.game),
    showCommand: state.alert.showCommand,
    showConfigForm: state.alert.showConfigForm,
    showResult: state.alert.showResult
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Room);

