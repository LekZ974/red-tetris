import React from 'react'

const GridBlock = (props) => {
  const { blockId } = props

  switch (blockId) {
    case 0 : default: {
      return (
        <div style={{
          height:'20px',
          width:'20px',
          marginTop: props.pos +'px',
          border: '3px solid #223345',
          borderBottomColor: '#394A56',
          borderRightColor: '#394A56',
          backgroundColor: '#504d4c',
        }}> </div>
      )
    }
    case 1: {
      return (
        <div style={{
          height:'20px',
          width:'20px',
          marginTop: props.pos +'px',
          border: '3px solid #223345',
          borderBottomColor: '#394A56',
          borderRightColor: '#394A56',
          backgroundColor: '#d8db10',
        }}> </div>
      )
    }
    case 2: {
      return (
        <div style={{
          height:'20px',
          width:'20px',
          marginTop: props.pos +'px',
          border: '3px solid #223345',
          borderBottomColor: '#394A56',
          borderRightColor: '#394A56',
          backgroundColor: '#ff541e',
        }}> </div>
      )
    }
    case 3: {
      return (
        <div style={{
          height:'20px',
          width:'20px',
          marginTop: props.pos +'px',
          border: '3px solid #223345',
          borderBottomColor: '#394A56',
          borderRightColor: '#394A56',
          backgroundColor: '#40ed6d',
        }}> </div>
      )
    }
    case 4: {
      return (
        <div style={{
          height:'20px',
          width:'20px',
          marginTop: props.pos +'px',
          border: '3px solid #223345',
          borderBottomColor: '#394A56',
          borderRightColor: '#394A56',
          backgroundColor: '#eead68',
        }}> </div>
      )
    }
    case 5: {
      return (
        <div style={{
          height:'20px',
          width:'20px',
          marginTop: props.pos +'px',
          border: '3px solid #223345',
          borderBottomColor: '#394A56',
          borderRightColor: '#394A56',
          backgroundColor: '#fb28f9',
        }}> </div>
      )
    }
    case 6: {
      return (
        <div style={{
          height:'20px',
          width:'20px',
          marginTop: props.pos +'px',
          border: '3px solid #223345',
          borderBottomColor: '#394A56',
          borderRightColor: '#394A56',
          backgroundColor: '#2128e6',
        }}> </div>
      )
    }
    case 7: {
      return (
        <div style={{
          height:'20px',
          width:'20px',
          marginTop: props.pos +'px',
          border: '3px solid #223345',
          borderBottomColor: '#394A56',
          borderRightColor: '#394A56',
          backgroundColor: '#f6001b',
        }}> </div>
      )
    }
  }
}



export default GridBlock
