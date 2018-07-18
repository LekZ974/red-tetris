import React, { Component } from 'react'
import { store } from '../../index'
import { move } from '../../actions/tetriminos'
import { button } from '../../actions/playground'

import { connect } from 'react-redux';

const commandes = () => (
  <div style={{ border: '1px, solid blue' }}>
    <h5 style={{ textAlign: 'center' }}>Commandes</h5>
    <span style={{ marginRight: '60px' }}>&rarr; ou &larr;</span> Déplacement horizontal à gauche ou à droite<br/>
    <span style={{ marginRight: '110px' }}>&uarr;</span>Rotation<br/>
    <span style={{ marginRight: '110px' }}>&darr;</span>Chute en direction du tas<br/>
    <span style={{ marginRight: '55px', height: '16px', width: '100px', border: '1px solid black', textAlign: 'center', paddingLeft: '20px', paddingRight: '20px', fontSize: '10px' }}>Space</span>
      Déplacement vertical afin de positionner une pièce dans un trou du tas<br/>
  </div>
)

const pink = '#f2cbe0'

const green = '#e1f2cb'

const orange = '#f2e1cb'

const blue = '#cbe6f2'

const Square = (props) => (
  <div style={tetrisSquareBlue}>
    <div style={subBlock(blue, props.posX, props.posY)} />
    <div style={subBlock(blue, props.posX, props.posY)} />
    <div style={subBlock(blue, props.posX, props.posY)} />
    <div style={subBlock(blue, props.posX, props.posY)} />
  </div>
)

const Row = (props) => (
  <div style={tetrisRowPink}>
    <div style={subBlock(pink, props.posX, props.posY)} />
    <div style={subBlock(pink, props.posX, props.posY)} />
    <div style={subBlock(pink, props.posX, props.posY)} />
    <div style={subBlock(pink, props.posX, props.posY)} />
  </div>
)
const L = (props) => (
  <div style={tetrisLGreen}>
    <div style={subBlock(green, props.posX, props.posY, props.rot)} />
    <div style={subBlock(green, props.posX, props.posY, props.rot)} />
    <div style={subBlock(green, props.posX, props.posY, props.rot)} />
    <div style={LsubBlock(green, props.posX, props.posY, props.rot)} />
  </div>
)

const T = (props) => (
  <div style={tetrisTOrange}>
    <div style={subBlock(orange, props.posX, props.posY)} />
    <div style={subBlock(orange, props.posX, props.posY)} />
    <div style={subBlock(orange, props.posX, props.posY)} />
    <div style={subBlock(orange, props.posX, props.posY)} />
  </div>
)
const flexContenaire = {
  border: '3px solid #fff',

  /* width: 606px;*/
  width: '100%',
  display: 'flex',
  height: '50vh',
  margin: '5vh auto',
  flexFlow: 'row wrap',
  alignItems: 'flex-end',
  justifyContent: 'center',
  alignContent: 'flex-end',
  boxSizing: 'border-box',
  border: ' 1px solid red',
}

const tetrisSquareBlue = {
  width: '100px',
  height: '100px',
  display: 'flex',
  flexFlow: 'row wrap',
}

const tetrisRowPink = {
  width: '200px',
  height: '50px',
  display: 'flex',
  flexFlow: 'row no-wrap',
  transform: 'rotate(90deg)',

}

const tetrisLGreen = {
  width: '150px',
  height: '100px',

  /* transform: rotate(270deg);
  transform-origin: 33.3%;*/
  marginRight: '-50px',
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'flex-start',

}

const subBlockNone = {
  border: '1px solid #fff',
  width: '50px',
  height: '50px',
  alignSelf: 'flex-end',
  backgroundColor: 'rgba(0,0,0,0)',

}
const tetrisTOrange = {
  width: '150px',
  height: '100px',
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'center',
}
const subBlock = (color, posX, posY, rot) => {
  const position = `${posX }px ,${ posY }px`

  return ({
    border: '1px solid #fff',
    width: '48px',
    height: '48px',
    backgroundColor: color,
    transform: `translate(${ position})`,
  })

}

const LsubBlock = (color, posX, posY, rot) => {
  const position = `${posX }px ,${ posY }px`

  return ({
    border: '1px solid #fff',
    width: '50px',
    height: '50px',
    alignSelf: 'flex-end',
    backgroundColor: color,
    transform: `translate(${ position})`,

  })

}

const Tetriminos = (props) => {

  let piece = null
  switch (props.type) {
  case 'o':
    (piece = <Square
      posX={props.posX}
      posY={props.posY}
      rot={props.rot}

    />
    )
    break
  case 'i':
    (piece = <Row
      posX={props.posX}
      posY={props.posY}
    />
    )
    break
  case 'l':
    (piece = <L
      posX={props.posX}
      posY={props.posY}
      rot={props.rot}
    />
    )
    break
  case 't':
    (piece = <T
      posX={props.posX}
      posY={props.posY}
    />
    )
    break
  }

  return (
    <div>
      {piece}
    </div>

  )

}

class PlayGround extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tetriminosPosY: -480,
      tetriminosPosX: 0,
    }
  }

  handleKeyDown(e) {
    console.log('handleKeyDown', e)
    store.dispatch(move(e))
  }
  componentDidMount(e) {

    window.addEventListener('keyup', this.handleKeyDown)

    console.log('STATE', store.getState())

    this.timerID = setInterval(
      () => this.setState({ tetriminosPosY: this.state.tetriminosPosY + 48 }),
      1000
    );
  }

  componentWillMount() {
    window.removeEventListener('keyup', this.handleKeyDown);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }
  render() {

    const { tetriData } = this.props
    console.log('tetriData', tetriData)

    // console.log("state", this.state)
    return (
      <div>
        <h3 style={{ textAlign: 'center' }}>PlayGround</h3>

        <div className='tetris flex-container' style={flexContenaire}>
          <Tetriminos
            posX={tetriData.tetriminosPosX}
            posY={tetriData.tetriminosPosY <= 0 ? tetriData.tetriminosPosY : 0}
            rot={tetriData.rot}
            type={'l'}
          />
        </div>
        <button onClick={store.dispatch(this.handleKeyDown)}>Hello</button>
        {commandes()}
      </div>
    )
  }
}

export default connect(({ tetriminos }) => ({
  tetriData: tetriminos,
}))(PlayGround)
