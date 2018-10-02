import React from 'react'
import { Box, Card, LoadingContainer } from '../../components/block'
import HomeForm from '../form/HomeForm'
import { connect } from 'react-redux'
import {getGames} from "../../actions/games";
import {init} from "../../actions/user";

class Home extends React.Component {
  constructor(props) {
    super(props)
    const { dispatch} = this.props
    dispatch(init())
  }

  componentDidMount () {
    const { dispatch} = this.props
    dispatch(getGames())
  }

  render () {
    const { user, gamesList, isLoading } = this.props

    let linkList = gamesList ? gamesList.map((game) => {
      return(
        <li key={game.id}>
          <Box fontSize={30}>
            {game.name}
          </Box>
        </li>
      )
    }) : null
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
            <ul>{linkList}</ul>
          </Box>
          </LoadingContainer>
        </Card>
      </Box>
    )
  }
}
export default connect(({ user, games }) => ({
  user: user,
  gamesList: games.items,
  isLoading: games.isLoading
}))(Home)
