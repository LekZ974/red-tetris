import React from 'react'
import styled from 'react-emotion'
import { space, theme, propTypes } from 'styled-system'
import PropTypes from 'prop-types'

import { Box, Error, Help } from './'
import defaultTheme from '../theme'

const borders = ({ color, theme }) => {
  const borderColor = color ? theme.colors[color] : theme.colors.borderGray
  const focusColor = color ? borderColor : theme.colors.blue
  return {
    'border-color': borderColor,
    'box-shadow': `0 0 0 1px ${borderColor}`,
    ':focus': {
      outline: 0,
      'border-color': focusColor,
      'box-shadow': `0 0 0 2px ${focusColor}`
    }
  }
}

const InputText = styled('input')`
  appearance: none;
  display: block;
  font-family: inherit;
  color: inherit;
  font-size: ${theme('fontSizes.1')}px;
  background-color: transparent;
  border-radius: ${theme('radius')};
  border-width: 0px;
  border-style: solid;
  border-color: ${theme('colors.borderGray')};

  padding-top: 14px;
  padding-bottom: 14px;
  padding-left: 12px;
  padding-right: 12px;

  margin: 0;

  ::placeholder {
    color: ${theme('colors.realLightGray')};
  }

  ::-ms-clear {
    display: none;
  }

  ${borders} ${space};
`

const Input = ({input, type, error, help, ...props}) => {
  return (
  <Box mb={3} flex flexDirection='column'>
    <InputText
      { ...input }
      { ...props }
    />
    {(error || !help) && <Error error={error} />}
    {!error && help && <Help text={help} />}
  </Box>)
}

Input.displayName = 'Input'
Input.propTypes = {
  color: PropTypes.string,
  error: PropTypes.string,
  ...propTypes.borders,
  ...propTypes.space
}
Input.defaultProps = {
  theme: defaultTheme
}

export default Input
