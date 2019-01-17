import React from 'react'

const GridBlock = (props) => {
  const { blockId, width, height } = props

  let propsBlock;

  switch (blockId) {
    case 0 : default: {
      propsBlock = {
        backgroundColor: '#c9c4ce',
        border: 'solid',
        borderColor: '#FAF1FF #918C96 #918C96 #FAF1FF'
      }
      break;
    }
    case 1: {
      propsBlock = {
        backgroundColor: '#66b847',
        border: 'solid',
        borderColor: '#79D652 #396A2C #396A2C #79D652'

      }
      break;
    }
    case 2: {
      propsBlock = {
        backgroundColor: '#4951be',
        border: 'solid',
        borderColor: '#515ADE #2E336A #2E336A #515ADE'
      }
      break;
    }
    case 3: {
      propsBlock = {
        backgroundColor: '#a445bd',
        border: 'solid',
        borderColor: '#C44FE0 #933FAC #933FAC #C44FE0'
      }
      break;
    }
    case 4: {
      propsBlock = {
        backgroundColor: '#cb6d1e',
        border: 'solid',
        borderColor: '#EE8221 #8C7518 #8C7518 #EE8221'
      }
      break;
    }
    case 5: {
      propsBlock = {
        backgroundColor: '#ba2f1c',
        border: 'solid',
        borderColor: '#E83722 #7C3B20 #7C3B20 #E83722'
      }
      break;
    }
    case 6: {
      propsBlock = {
        backgroundColor: '#4ebdb2',
        border: 'solid',
        borderColor: '#59DFD4 #337A70 #337A70 #59DFD4'
      }
      break;
    }
    case 7: {
      propsBlock = {
        backgroundColor: '#d4d519',
        border: 'solid',
        borderColor: '#FEFF1E #9C9D14 #9C9D14 #FEFF1E'
      }
      break;
    }
    case 8: {
      propsBlock = {
        backgroundColor: '#86aec7',
        border: 'solid',
        borderColor: '#A3D7F5 #546f85 #546f85 #A3D7F5'
      }
      break;
    }
    case -1: {
      propsBlock = {
        backgroundColor: '#777777',
        border: 'solid',
        borderColor: '#ababab #666666 #666666 #ababab'
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
