import React from 'react'
import { Link } from 'react-router-dom';

import { Box, Card, LoadingContainer } from '../../components/block'
import HomeForm from '../form/HomeForm'
import { connect } from 'react-redux'
import {init} from "../../actions/user";
import * as SocketService from '../../services/SocketService';

class Home extends React.Component {
  constructor(props) {
    super(props)
    const { dispatch} = this.props
    dispatch(init())
  }

  componentDidMount () {
    const { dispatch} = this.props
    SocketService.emitGetGames()
  }

  render () {
    const { user, gamesList, isLoading, formValues } = this.props

    let userName;
    if (formValues && formValues.hasOwnProperty('values')) {
      if (formValues.values.userName && !formValues.syncErrors.userName) {
        userName = formValues.values.userName;
      }
    }

    let linkList = gamesList && gamesList.map((game, i) => {
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
    if(user.connected === true){
      window.location.reload()
    }
    return (
      <Box width={'100%'} flex flexDirection='row' justifyContent='center'>
        <Box flex={1}>
          <HomeForm props={{...this.props}}/>
        </Box>
        <Card flex={1} width={'40em'} center>
          <LoadingContainer
            isLoading={isLoading && (!gamesList || !gamesList.length) }
            isEmpty={!gamesList || !gamesList.length}
            emptyLabel='Pas de parties en cours'
          >
          <Box fontSize={30}>
            {userName ? <ul>{linkList}</ul> : <div>Choose a login first</div>}
          </Box>
          </LoadingContainer>
        </Card>
      </Box>
    )
  }
}
export default connect(({ form, user, games }) => ({
  user: user,
  gamesList: games.items,
  isLoading: games.isLoading,
  formValues: form.HomeForm,
}))(Home)
