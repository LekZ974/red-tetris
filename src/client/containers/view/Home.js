import React from 'react'
import { Box, Card, LoadingContainer } from '../../components/block'
import HomeForm from '../form/HomeForm'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import {getGames} from "../../actions/games";
import {Redirect} from 'react-router'
import {store} from "../../index";

class Home extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount () {
    const { dispatch} = this.props
    dispatch(getGames())
  }

  render () {
    const { gamesList, isLoading } = this.props
    let linkList = gamesList.map((game) => {
      return(
        <li key={game.id}>
          <Box fontSize={30}>
            {game.name}
          </Box>
        </li>
      )
    })
    if(this.props.user.connected === true){
      return (<Redirect push={true} to={'/' +this.props.user.gameName + '/' + this.props.user.userName}/>)
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
