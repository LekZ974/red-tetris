import styled from 'react-emotion'
import theme from '../../theme'
import PropTypes from 'prop-types'

import { Box } from './'

const maxWidth = props =>
  props.maxWidth
    ? { maxWidth: `${props.maxWidth}px` }
    : { maxWidth: props.theme.maxContainerWidth }

const Container = styled(Box)`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  ${maxWidth};
`

Container.propTypes = {
  maxWidth: PropTypes.number
}

Container.defaultProps = {
  theme: theme
}

Container.displayName = 'Container'

export default Container
