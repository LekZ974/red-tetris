import React from 'react'
import theme from '../../theme'
import Colors from 'color'

const GridBlock = (props) => {
  const { blockId, width, height } = props

  let propsBlock;

  switch (blockId) {
    case 0 : default: {
      propsBlock = {
        backgroundColor: theme.colors.realLightGray,
        border: 'solid',
        borderColor: `${theme.colors.lightGray} ${theme.colors.darkGray} ${theme.colors.darkGray} ${theme.colors.lightGray}`,
      }
      break;
    }
    case 1: {
      propsBlock = {
        backgroundColor: Colors(theme.colors.green).lighten(0.1),
        border: 'solid',
        borderColor: `${theme.colors.lightGreen} ${theme.colors.darkGreen} ${theme.colors.darkGreen} ${theme.colors.lightGreen}`,

      }
      break;
    }
    case 2: {
      propsBlock = {
        backgroundColor: Colors(theme.colors.blue).lighten(0.1),
        border: 'solid',
        borderColor: `${theme.colors.lightBlue} ${theme.colors.darkBlue} ${theme.colors.darkBlue} ${theme.colors.lightBlue}`,
      }
      break;
    }
    case 3: {
      propsBlock = {
        backgroundColor: Colors(theme.colors.purple).lighten(0.1),
        border: 'solid',
        borderColor: `${theme.colors.lightPurple} ${theme.colors.darkPurple} ${theme.colors.darkPurple} ${theme.colors.lightPurple}`,
      }
      break;
    }
    case 4: {
      propsBlock = {
        backgroundColor: Colors(theme.colors.orange).lighten(0.1),
        border: 'solid',
        borderColor: `${theme.colors.lightOrange} ${theme.colors.darkOrange} ${theme.colors.darkOrange} ${theme.colors.lightOrange}`,
      }
      break;
    }
    case 5: {
      propsBlock = {
        backgroundColor: Colors(theme.colors.red).lighten(0.1),
        border: 'solid',
        borderColor: `${theme.colors.lightRed} ${theme.colors.darkRed} ${theme.colors.darkRed} ${theme.colors.lightRed}`,
      }
      break;
    }
    case 6: {
      propsBlock = {
        backgroundColor: Colors(theme.colors.cyan).lighten(0.1),
        border: 'solid',
        borderColor: `${theme.colors.lightCyan} ${theme.colors.darkCyan} ${theme.colors.darkCyan} ${theme.colors.lightCyan}`,
      }
      break;
    }
    case 7: {
      propsBlock = {
        backgroundColor: Colors(theme.colors.yellow).lighten(0.1),
        border: 'solid',
        borderColor: `${theme.colors.lightYellow} ${theme.colors.darkYellow} ${theme.colors.darkYellow} ${theme.colors.lightYellow}`,
      }
      break;
    }
    case 8: {
      propsBlock = {
        backgroundColor: Colors(theme.colors.lightGray).darken(0.1),
        border: 'solid',
        borderColor: `${theme.colors.white} ${theme.colors.gray} ${theme.colors.gray} ${theme.colors.white}`,
      }
      break;
    }
    case -1: {
      propsBlock = {
        backgroundColor: Colors(theme.colors.gray).darken(0.2),
        border: 'solid',
        borderColor: `${Colors(theme.colors.gray).lighten(0.2)} ${theme.colors.darkGray} ${theme.colors.darkGray} ${Colors(theme.colors.gray).lighten(0.2)}`,
      }
      break;
    }
  }
  return (
    <div style={{
      minWidth: width,
      minHeight: height,
      marginTop: props.pos +'px',
      ...propsBlock,
    }} />
  )
}



export default GridBlock
