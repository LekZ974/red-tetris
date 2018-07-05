import React from 'react'
import AbstractView from './base/AbstractView'
import { Box, Input, Card, Error } from '../../components/block'
import HomeForm from '../form/HomeForm'
import { Link, Route } from 'react-router-dom';

const Home = () => {

  const roomsData = [  //mock des room
    {
      id: 1,
      name: 'Party1',
    },
    {
      id: 2,
      name: 'Party2',
    },
    {
      id: 3,
      name: 'Party3',
    },
  ]

  const userData = {
    id: 1,
    name: 'Alex'
  }

  let linkList = roomsData.map( (room) => {
    return(
      <li key={room.id}>
        <Box fontSize={30}>
          <Link to={`${room.name}/${userData.name}`}>
            {room.name}
          </Link>
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
        <Box fontSize={30}>
          <ul>{linkList}</ul>
        </Box>
      </Card>
    </Box>
  )
}

export default Home
