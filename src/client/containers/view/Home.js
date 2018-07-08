import React from 'react'
import { Box, Card, LoadingContainer } from '../../components/block'
import HomeForm from '../form/HomeForm'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom';
import {getRooms} from "../../actions/rooms";

class Home extends React.Component {
  componentDidMount () {
    const { dispatch, roomsList } = this.props
    dispatch(getRooms())
  }
  render () {
    const { roomsList, isLoading } = this.props
    let linkList = roomsList.map((room) => {
      return(
        <li key={room.id}>
          <Box fontSize={30}>
            {room.name}
          </Box>
        </li>
      )
    })
    return (
    <Box width={'100%'} flex flexDirection='row' justifyContent='center'>
        <Box flex={1}>
          <HomeForm/>
        </Box>
        <Card flex={1} width={'40em'}>
          <LoadingContainer
            isLoading={isLoading && (!roomsList || !roomsList.length)}
            isEmpty={!roomsList || !roomsList.length}
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

export default connect(({ user, rooms }) => ({
  user: user,
  roomsList: rooms.items,
  isLoading: rooms.isLoading
}))(Home)
