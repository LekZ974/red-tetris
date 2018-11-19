import React from 'react'
import { Link } from 'react-router-dom';

import { Box, Card, LoadingContainer } from '../../components/block'
import HomeForm from '../form/HomeForm'
import { connect } from 'react-redux'
import {init} from "../../actions/user";
import {emitGetGames} from "../../actions/games";

class Home extends React.Component {

  componentWillMount() {
    const {init} = this.props

    init()
  }

  componentDidMount() {
    const {getGames} = this.props

    getGames()
  }

  render () {
    const { userName, gamesList, isLoading } = this.props

    return (
      <Box width={'100%'} flex flexDirection='row' justifyContent='center'>
        <Box flex={1}>
          <HomeForm props={{...this.props}}/>
        </Box>
        <Card flex={1} width={'40em'} center>
          <LoadingContainer
            isLoading={isLoading && (!gamesList) }
            isEmpty={!gamesList}
            emptyLabel='Pas de parties en cours'
          >
          <Box fontSize={30}>
            {userName && userName.length > 0 ? <ul>{gamesList}</ul> : <div>Choose a login first</div>}
          </Box>
          </LoadingContainer>
        </Card>
      </Box>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  init: () => dispatch(init()),
  getGames: () => dispatch(emitGetGames()),
})

const mapStateToProps = state => {

  const homeForm = state.form.HomeForm
  const gamesList = state.games.items
  const userName = [];

  if (homeForm && homeForm.hasOwnProperty('values') && homeForm.hasOwnProperty('syncErrors')) {
    if (homeForm.values.userName && !homeForm.syncErrors.userName) {
      userName.push(homeForm.values.userName);
    }
  }

  const renderList = gamesList && gamesList.map((game, i) => {
    const {gameName} = game
    return(
      <li key={i}>
        <Box fontSize={30}>
          <Link to={`/#${gameName}/${userName}`}>
            {gameName}
          </Link>
        </Box>
      </li>)
  })

  return {
    userName: userName,
    gamesList: renderList,
    isLoading: state.games.isLoading,
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
