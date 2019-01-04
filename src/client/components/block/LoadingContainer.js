import React from 'react'
import { Link } from 'react-router-dom'

import Box from './Box'

const LoadingContainer = ({
  isLoading,
  isEmpty,
  emptyLabel = "Pas d'éléments",
  spinner,
  children
}) => {
  if (isLoading) {
    return (
      <Box center flex flexDirection='column'>
        <Box>
          {spinner}
        </Box>
        <Box>If it's too long click <Link to='/'>HERE</Link></Box>
      </Box>
    )
  }
  if (isEmpty) {
    return (
      <Box center flex>
        {emptyLabel}
      </Box>
    )
  }

  return children
}

export default LoadingContainer
