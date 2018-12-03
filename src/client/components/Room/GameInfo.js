import React from 'react'
import {Box, GridBlock} from "../block";
import {createChallengerGrid} from "../../utils/gridHandler";

const GameInfo = (props) => {
  const {game} = props;
  let players = game.players
  let challengerGrid;
  if (players && players.length >= 1) {
    challengerGrid = createChallengerGrid(players)
  }
  console.log("CHALLENGER GRID", challengerGrid)
  return(
    <Box center>
      {players && players.length >= 1 && challengerGrid ?
        <div style={{height: '20vh'}}>
          <h1>Challengers</h1>
          {challengerGrid.map((row, key) =>
            <div key={key} style={{display: 'flex', flexDirection: 'row', height: '6%'}}>
              {row.map((block, i) => <GridBlock blockId={block} key={i} />)}
            </div>
          )}
        </div> :
        <Box>waiting challenger grid</Box>
      }
    </Box>
  )
}

export default GameInfo
