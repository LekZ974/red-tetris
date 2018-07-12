import React from 'react'
import Box from './Box'
import { PulseLoader } from 'react-spinners'

const LoadingContainer = ({
  isLoading,
  isEmpty,
  emptyLabel = "Pas d'éléments",
  children
}) => {
  if (isLoading) {
    return (
      <Box center flex>
        <PulseLoader />
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
