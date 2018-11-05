import React from 'react'
import * as TetriService from "../../services/TetriService"
import {connect} from "react-redux";
import { emitGamePieces } from "../../actions/game";
import { tetriNew } from "../../actions/tetrimino";
import { shapeHandler } from "../../utils/shapeHandler";

const GridUserComponent = (state) => {
  const { tetriminoState, tetriNew, gameState, gridRender, emitGamePieces } = state

  if (gameState.gamePieces && gameState.gamePieces.length === 0) {
    emitGamePieces(gameState)
  }
  if (gameState.gamePieces && gameState.gamePieces.length > 0 && !tetriminoState.pieceInfo) {
    tetriNew(gameState, shapeHandler(gameState.gamePieces))
  }

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

  console.log(tetrimino)
  if (state.game.gameIsStarted && tetrimino.pieceInfo) {
    playerGrid = TetriService.placePiecePreview(playerGrid, tetrimino);
    playerGrid = TetriService.placePiece(playerGrid, state.tetrimino);
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

const mapDispatchToProps = dispatch => ({
  emitGamePieces: (gameState, userState) => dispatch(emitGamePieces(gameState, userState)),
  tetriNew: (gameState, shapeInfo) => dispatch(tetriNew(gameState, shapeInfo))
})

const Grid = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GridUserComponent);

export {Grid};
