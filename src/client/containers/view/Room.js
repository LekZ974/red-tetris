import React from 'react'
import { Box, Card } from '../../components/block'
import { Route } from 'react-router-dom';
import RoomInfo from '../../components/Room/RoomInfo'
import GameInfo from '../../components/Room/GameInfo'
import PlayGround from '../../components/Room/PlayGround'
import {connect} from "react-redux";
import {gameStatus} from "../../actions/game";
import {login} from "../../actions/user";
import {tetriAction, tetriStep} from "../../actions/tetrimino";

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

class Room extends React.Component {
  constructor(props) {
    super(props)
    const {match, dispatch} = this.props
    dispatch(login({
      userName: match.params.user,
      gameName: match.params.room
    }))
    this.intervalStepId = null
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(e) {
    const {dispatch} = this.props
    e.preventDefault()
    dispatch(tetriAction(e.code))
  }

  intervalStep() {
    const {game, dispatch} = this.props
    if (game.start) {
      this.intervalStepId = setInterval(() => dispatch(tetriStep(game)), 1000)
    } else {
      clearInterval(this.intervalStepId)
      dispatch(tetriStep(game))
    }
  }

  render() {
    const {user, game, match} = this.props
    this.intervalStep()

    return (
      <Box flex flexDirection='column' align='stretch'>
        <Box width={'100%'} flex flexDirection='row' justifyContent='center'>
          <Card flex={1} width={'40em'}>
            <RoomInfo user={user} game={game}/>
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
}

export default connect(({ user, game }) => ({
  user: user,
  game: game,
}))(Room)

