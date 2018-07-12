import React from 'react'
import { compose } from 'recompose'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { logout } from '../../actions/user'
import { persistor } from '../../index'
import { Box, Container, Text, Clickable } from './'

const Header = ({ dispatch, history, user }) => (
  <Box borderBottom='1px solid' borderColor='borderGray' bg='white'>
    <Container flex alignItems='stretch' height={84}>
      <Box display='flex' flex={2} alignItems='center'>
        {history.location.pathname !== '/' && (
          <Clickable
            display='flex'
            alignItems='center'
            mr={4}
            color='text'
            onClick={() => {
              history.push('/')
            }}
          >
            HOME
          </Clickable>
        )}
      </Box>
      <Box flex={1} />
      <Box flex align='center' justify='flex-end'>
        <Box flex align='right' justify='flex-end'>
          <Text color='text' mr={3}>
            {user &&
              user.userName && (
              <span>
                <strong>
                  {user.userName} {user.role}
                </strong>
                <br />
              </span>
            )}
            {user.roomName}
          </Text>
        </Box>
        <Clickable
          color='red'
          onClick={() => {
            persistor.purge()
            // dispatch(logout())
            history.push('/')
          }}
        >
          Logout
        </Clickable>
      </Box>
    </Container>
  </Box>
)

export default compose(withRouter, connect(({ user }) => ({ user })))(Header)
