import React from 'react'

const GridBlock = (props) => {
  const { blockId } = props

  let propsBlock;

  switch (blockId) {
    case 0 : default: {
      propsBlock = {
        borderBottomColor: '#394A56',
        borderRightColor: '#394A56',
        backgroundColor: '#504d4c',
      }
      break;
    }
    case 1: {
      propsBlock = {
        borderBottomColor: '#394A56',
        borderRightColor: '#394A56',
        backgroundColor: '#d8db10',
      }
      break;
    }
    case 2: {
      propsBlock = {
        borderBottomColor: '#394A56',
        borderRightColor: '#394A56',
        backgroundColor: '#ff541e',
      }
      break;
    }
    case 3: {
      propsBlock = {
        borderBottomColor: '#394A56',
        borderRightColor: '#394A56',
        backgroundColor: '#40ed6d',
      }
      break;
    }
    case 4: {
      propsBlock = {
        borderBottomColor: '#394A56',
        borderRightColor: '#394A56',
        backgroundColor: '#eead68',
      }
      break;
    }
    case 5: {
      propsBlock = {
        borderBottomColor: '#394A56',
        borderRightColor: '#394A56',
        backgroundColor: '#fb28f9',
      }
      break;
    }
    case 6: {
      propsBlock = {
        borderBottomColor: '#394A56',
        borderRightColor: '#394A56',
        backgroundColor: '#2128e6',
      }
      break;
    }
    case 7: {
      propsBlock = {
        borderBottomColor: '#394A56',
        borderRightColor: '#394A56',
        backgroundColor: '#f6001b',
      }
      break;
    }
    case 8: {
      propsBlock = {
        borderBottomColor: '#394A56',
        borderRightColor: '#394A56',
        backgroundColor: '#86aec7',
      }
      break;
    }
    case 9: {
      propsBlock = {
        borderBottomColor: '#394A56',
        borderRightColor: '#394A56',
        backgroundColor: '#000000',
      }
      break;
    }
  }
  return (
    <div style={{
      height:'100%',
      width:'10%',
      marginTop: props.pos +'px',
      border: '3px solid #223345',
      ...propsBlock,
    }}>

    </div>
  )
}



export default GridBlock
