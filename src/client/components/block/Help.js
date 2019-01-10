import React from 'react'
import { Box, Text } from './'

const Help = ({ text }) => (
  <React.Fragment>
    <Box mt={1}>
      <Text fontSize={1} color='gray'>
        {' '}
        {text && text + ' '}
        {!text && <br />}
      </Text>
    </Box>
  </React.Fragment>
)

export default Help
