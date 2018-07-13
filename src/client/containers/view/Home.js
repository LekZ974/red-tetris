import React from 'react'
import { Box, Card, LoadingContainer } from '../../components/block'
import HomeForm from '../form/HomeForm'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import {getRooms} from "../../actions/rooms";
import {Redirect} from 'react-router'
import {store} from "../../index";

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      roomName: this.props.user.roomName,
      userName: this.props.user.userName,
    }
  }

  componentDidMount () {
    const { dispatch} = this.props
    dispatch(getRooms())
  }
  componentWillReceiveProps(nextProps) {
    console.log("STORE GET STATE", store.getState())
    this.setState({roomName: nextProps.user.roomName, userName: nextProps.user.userName})
  }

  addToRoomState(roomName, state) {
    this.setState({...state, roomName: roomName})
  }

  render () {
    const { roomsList, isLoading } = this.props
    console.log("ROOMLIST : ", roomsList)
    let linkList = roomsList.map((room) => {
      return(
        <li key={room.id} onClick={this.addToRoomState.bind(this, room.name, this.state)}>
          <Box fontSize={30}>
            {room.name}
          </Box>
        </li>
      )
    })
    if(this.props.user.connected === true){
      return (<Redirect push={true} to={'/' +this.props.user.roomName + '/' + this.props.user.userName}/>)
    }
    return (
    <Box width={'100%'} flex flexDirection='row' justifyContent='center'>
        <Box flex={1}>
          <HomeForm props={{...this.props}}/>
        </Box>
        <Card flex={1} width={'40em'} center>
          <LoadingContainer
            isLoading={isLoading && (!roomsList || !roomsList.length) }
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
