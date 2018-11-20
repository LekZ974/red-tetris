import React from 'react'
import styled from 'react-emotion'
import theme from '../theme'
import PropTypes from 'prop-types'
import Color from 'color'
import { propTypes, space } from 'styled-system'
import { Link } from 'react-router-dom'

const size = props => {
  switch (props.size) {
    case 'small':
      return {
        fontSize: `${props.theme.fontSizes[0]}px`,
        padding: '7px 12px'
      }
    case 'medium':
      return {
        fontSize: `${props.theme.fontSizes[1]}px`,
        padding: '9.5px 18px'
      }
    case 'large':
      return {
        fontSize: `${props.theme.fontSizes[2]}px`,
        padding: '12px 22px'
      }
    case 'xlarge':
      return {
        fontSize: `${props.theme.fontSizes[3]}px`,
        padding: '12px 22px'
      }
    default:
      return {
        fontSize: `${props.theme.fontSizes[1]}px`,
        padding: '9.5px 18px'
      }
  }
}

const fullwidth = props => (props.fullwidth ? { width: '100%' } : null)

const StyledButton = styled('button')`
-webkit-font-smoothing: antialiased;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  text-decoration: none;
  font-family: inherit;
  font-weight: 600;
  line-height: 1.5;
  cursor: pointer;
  text-decoration: none
  border-radius: ${props => props.theme.radius};
  background-color: ${props => props.theme.colors.blue};
  color: ${props => props.theme.colors.white};
  box-shadow: ${props =>
  `0 6px 20px 0 ${Color(props.theme.colors.blue).alpha(0.25)}`};
  transition: all 0.5s ease;
  border-width: 0;
  border-style: solid;

  &:disabled {
    opacity: 0.85;
    pointer-events: none;
  }

  &:hover {
    background-color: ${props =>
  props.disabled
    ? null
    : Color(props.theme.colors.blue)
      .darken(0.15)
      .string()};
  }

  ${fullwidth} ${size} ${space};
`

StyledButton.propTypes = {
  boxShadowSize: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  borderColor: PropTypes.string,
  ...propTypes.borderRadius,
  borderWidth: PropTypes.oneOf([1, 2])
}

StyledButton.defaultProps = {
  theme: theme
}

const Button = ({children, size, fullwidth, outline, ...props}) => {
  const CustomButton = (() => {
    return StyledButton
  })()
  return <CustomButton {...props}>{children}</CustomButton>
}

Button.displayName = 'Button'

export default Button
