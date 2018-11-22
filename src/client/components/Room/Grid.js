import React from 'react'
import Fade from 'react-reveal/Fade';
import * as TetriService from "../../services/TetriService"
import {connect} from "react-redux";
import GridBlock from '../block/GridBlock';

const GridUserComponent = (state) => {
  const { gridRender } = state

  return(
    <Fade>
    <div style={{height: '60vh'}}>
      {gridRender.map((row, key) =>
      key > 2 && (<div key={key} style={{display: 'flex', flexDirection: 'row', height: '6%'}}>
        {row.map((block, i) => <GridBlock blockId={block} key={i} />)}
        </div>)
      )}
    </div>
    </Fade>
  )
}

const mapStateToProps = state => {

  /* PLAYERGRID */

  const gridRender = [];
  const userState = state.user;
  let playerGrid = userState.grid.map(l => l.map(e => e));
  const CpTetrimino = TetriService.cloneTetri(state.tetrimino)

  if (state.game.gameIsStarted && state.tetrimino.pieceInfo) {
    let CpPlayerGrid = TetriService.placePiecePreview(playerGrid, CpTetrimino);
    playerGrid = TetriService.placePiece(CpPlayerGrid, state.tetrimino);
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
