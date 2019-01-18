import React from 'react'
import { withRouter } from 'react-router-dom';

import Fade from 'react-reveal/Fade';
import * as TetriService from "../../services/TetriService"
import {connect} from "react-redux";
import {GridBlock, Box} from '../block';

export const GridUserComponent = (state) => {
  const { gridRender } = state

  return(
    <Fade>
      <Box style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {gridRender.map((row, key) =>
        key > 2 && (<Box key={key} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
          {row.map((block, i) => <GridBlock blockId={block} key={i} width={'3vh'} height={'3vh'}/>)}
          </Box>)
        )}
      </Box>
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

const Grid = withRouter(connect(
  mapStateToProps,
)(GridUserComponent));

export {Grid};
