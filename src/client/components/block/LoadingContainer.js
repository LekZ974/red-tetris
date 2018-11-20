import React from 'react'
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
      <Box center flex>
        {spinner}
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
