import styled from 'react-emotion'
import {
  space,
  width,
  fontSize,
  textColor,
  bgColor,
  color,
  // typography
  fontFamily,
  textAlign,
  lineHeight,
  fontWeight,
  letterSpacing,
  // layout
  display,
  maxWidth,
  minWidth,
  height,
  maxHeight,
  minHeight,
  size,
  ratio,
  // flexbox
  alignItems,
  alignContent,
  justifyContent,
  flexWrap,
  flexDirection,
  flex,
  flexBasis,
  justifySelf,
  alignSelf,
  order,
  // grid
  gridGap,
  gridColumnGap,
  gridRowGap,
  gridColumn,
  gridRow,
  gridAutoFlow,
  gridAutoColumns,
  gridAutoRows,
  gridTemplateColumns,
  gridTemplateRows,
  // borders
  border,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  borders,
  borderColor,
  borderRadius,
  // misc
  boxShadow,
  background,
  backgroundImage,
  backgroundSize,
  backgroundPosition,
  backgroundRepeat,
  // position
  position,
  zIndex,
  top,
  right,
  bottom,
  left,
  // psuedoclasses
  hover,
  focus,
  active,
  disabled,
  // complex
  textStyle,
  colorStyle,
  buttonStyle
} from 'styled-system'

const Box = styled('div')(
  props => ({
    ...(props.flex === true
      ? {
        flex: 1,
        display: 'flex'
      }
      : {}),
    ...(props.center
      ? {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }
      : {}),
    ...(props.container
      ? {
        display: 'flex',
        backgroundColor: '#F6F7FB',
        flex: 1
      }
      : {})
  }),
  space,
  width,
  fontSize,
  textColor,
  bgColor,
  color,
  // typography
  fontFamily,
  textAlign,
  lineHeight,
  fontWeight,
  letterSpacing,
  // layout
  display,
  maxWidth,
  minWidth,
  height,
  maxHeight,
  minHeight,
  size,
  ratio,
  // flexbox
  alignItems,
  alignContent,
  justifyContent,
  flexWrap,
  flexDirection,
  flex,
  flexBasis,
  justifySelf,
  alignSelf,
  order,
  // grid
  gridGap,
  gridColumnGap,
  gridRowGap,
  gridColumn,
  gridRow,
  gridAutoFlow,
  gridAutoColumns,
  gridAutoRows,
  gridTemplateColumns,
  gridTemplateRows,
  // borders
  border,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  borders,
  borderColor,
  borderRadius,
  // misc
  boxShadow,
  background,
  backgroundImage,
  backgroundSize,
  backgroundPosition,
  backgroundRepeat,
  // position
  position,
  zIndex,
  top,
  right,
  bottom,
  left,
  // psuedoclasses
  hover,
  focus,
  active,
  disabled,
  // complex
  textStyle,
  colorStyle,
  buttonStyle
)

Box.displayName = 'Box'

export default Box
