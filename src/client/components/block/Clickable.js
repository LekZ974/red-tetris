import styled from 'react-emotion'
import { color } from 'styled-system'
import theme from '../../theme'

import { Box } from './'

const Clickable = styled(Box)`
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }

  ${color};
`

Clickable.defaultProps = {
  theme: theme
}

Clickable.displayName = 'Clickable'

export default Clickable
