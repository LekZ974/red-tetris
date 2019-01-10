import styled from 'react-emotion'
import {
  fontSize,
  space,
  color,
  responsiveStyle,
  lineHeight,
  textAlign
} from 'styled-system'
import theme from '../../theme'

export const caps = props =>
  props.caps
    ? {
      textTransform: 'uppercase'
    }
    : null

export const regular = props =>
  props.regular ? { fontWeight: props.theme.regular } : null

export const bold = props =>
  props.bold ? { fontWeight: props.theme.bold } : null

export const italic = props => (props.italic ? { fontStyle: 'italic' } : null)

const align = responsiveStyle('text-align', 'align')

const Text = styled('div')`
  ${italic} ${fontSize} ${space} ${color} ${caps} ${regular} ${bold} ${align} ${textAlign} ${lineHeight};
`

Text.displayName = 'Text'

Text.defaultProps = {
  theme: theme,
  color: 'text'
}

Text.span = Text.withComponent('span')
Text.p = Text.withComponent('p')
Text.s = Text.withComponent('s')

export default Text
