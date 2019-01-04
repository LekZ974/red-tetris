import React from 'react'
import { Link, withRouter } from 'react-router-dom';

import { Box, Card, LoadingContainer, Toaster } from '../../components/block'
import HomeForm from '../form/HomeForm'
import { connect } from 'react-redux'
import {userInitState} from "../../actions/user";
import {emitGetGames} from "../../actions/games";
import {notify} from "../../utils/notificationHandler";
import {tetriInitState} from "../../actions/tetrimino";
import {gameInitState} from "../../actions/game";

class Home extends React.Component {

  componentWillMount() {
    const {initUser, initTetri, initGame} = this.props

    initUser()
    initGame()
    initTetri()
  }

  componentDidMount() {
    const {getGames} = this.props

    getGames()
  }

  handleClick(form, e) {

    if (form && form.hasOwnProperty('syncErrors')) {
      if (form.syncErrors.userName) {
        e.preventDefault()
        notify('login: '+form.syncErrors.userName, 'error')
      }
    }
  }

  render () {
    const { userName, gamesList, isLoading, homeForm, getGames } = this.props

    const renderList = gamesList && gamesList.map((game, i) => {
      const {gameName} = game
      return(
        <li key={i}>
          <Box fontSize={30}>
            <Link to={`/#${gameName}/${userName}`} onClick={this.handleClick.bind(this, homeForm)}>
              {gameName}
            </Link>
          </Box>
        </li>)
    })

    return (
      <Box width={'100%'} flex flexDirection='row' justifyContent='center'>
        <Toaster/>
        <Box flex={1}>
          <HomeForm props={{...this.props}}/>
        </Box>
        <Card flex={1} width={'40em'} center>
          <LoadingContainer
            isLoading={isLoading && !gamesList}
            isEmpty={!gamesList}
            emptyLabel='Pas de parties en cours'
          >
          <Box fontSize={30}>
            {userName && userName.length > 0 ? <ul>{renderList}</ul> : <div>Choose a login first</div>}
          </Box>
          </LoadingContainer>
        </Card>
      </Box>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  initUser: () => dispatch(userInitState()),
  initTetri: () => dispatch(tetriInitState()),
  initGame: () => dispatch(gameInitState()),
  getGames: () => dispatch(emitGetGames()),
})

const mapStateToProps = state => {

  const homeForm = state.form.HomeForm
  const gamesList = state.games.items
  const userName = [];

  if (homeForm && homeForm.hasOwnProperty('values')) {
    if (homeForm.values.userName) {
      userName.push(homeForm.values.userName);
    }
  }

  return {
    userName: userName,
    gamesList: gamesList,
    homeForm: homeForm,
    isLoading: state.games.isLoading,
  }
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Home));
