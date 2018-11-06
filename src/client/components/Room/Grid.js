import React from 'react'
import * as TetriService from "../../services/TetriService"
import {connect} from "react-redux";

const GridUserComponent = (state) => {
  const { gridRender } = state

  return(
    gridRender.map((row, key) =>{
      return(<div key={key}>{row}</div>)
    }))
}

const mapStateToProps = state => {

  /* PLAYERGRID */

  const gridRender = [];
  const userState = state.user;
  let playerGrid = userState.grid.map(l => l.map(e => e));
  const tetrimino = TetriService.cloneTetri(state.tetrimino)

  if (state.game.gameIsStarted && tetrimino.pieceInfo) {
    playerGrid = TetriService.placePiecePreview(playerGrid, tetrimino);
    playerGrid = TetriService.placePiece(playerGrid, state.tetrimino);
    // if (!playerGrid.map(row => row.find(elem => elem === 8)).find(p => p === 8)) {
    // }
  }

  playerGrid.forEach(l => {
    gridRender.push([...l]);
  });

  return {
    userState: Object.assign({}, state.user),
    gridRender: gridRender,
    tetriminoState: state.tetrimino,
    gameState: state.game,
  }
};

const Grid = connect(
  mapStateToProps,
)(GridUserComponent);

export {Grid};
