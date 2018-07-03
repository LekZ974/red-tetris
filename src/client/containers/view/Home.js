import React from 'react'
import AbstractView from './base/AbstractView'
import { Box, Input, Card, Error } from '../../components/block'
import HomeForm from '../form/HomeForm'

export default class Home extends AbstractView {
  render() {
    return (
      <Box width={'100%'} flex flexDirection='row' justifyContent='center'>
        <Box flex={1}>
          <HomeForm/>
        </Box>
        <Card flex={1} width={'40em'}>
          <Box fontSize={30}>
            Liste des parties en cours
          </Box>
          <Box>
            toto's party
          </Box>
          <Box>
            tata's party
          </Box>
          <Box>
            tutu's party
          </Box>
          <Box>
            titi's party
          </Box>
        </Card>
      </Box>
    )
  }
}
