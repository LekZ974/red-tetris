import React from 'react'
import * as TetriService from "../../services/TetriService"
import {connect} from "react-redux";

const GridUserComponent = (state) => {
  return(
    state.gridRender.map((row, key) =>{
        return(<div key={key}>{row}</div>)
      }))
}

const mapStateToProps = state => {

  /* PLAYERGRID */

  const gridRender = [];
  const userState = state.user;
  let playerGrid = userState.grid.map(l => l.map(e => e));

  if (state.game.gameIsStarted) {
    playerGrid = TetriService.placePiecePreview(playerGrid, state.tetrimino);
    playerGrid = TetriService.placePiece(playerGrid, state.tetrimino);
  }

  playerGrid.forEach(l => {
    gridRender.push([...l]);
  });
  return {
    userState: Object.assign({}, state.user),
    gridRender: gridRender,
  }
};

const Grid = connect(
  mapStateToProps,
  undefined
)(GridUserComponent);

export {Grid};
