import React from 'react'
import { Box, Text } from './'

const Error = ({ error }) => (
  <React.Fragment>
    <Box mt={1}>
      <Text fontSize={1} color='red'>
        {' '}
        {error && error + ' '}
        {!error && <br />}
      </Text>
    </Box>
  </React.Fragment>
)

export default Error
