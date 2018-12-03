import React from 'react'
import {Box, GridBlock} from "../block";
import {createChallengerGrid} from "../../utils/gridHandler";
import Fade from 'react-reveal/Fade';

const GameInfo = (props) => {
  const {game} = props;
  let players = game.players
  let challengerGrid;
  if (players && players.length >= 1) {
    challengerGrid = createChallengerGrid(players)
  }
  return(
    <Box center>
      {players && players.length >= 1 &&
        <Fade right big>
          <Box style={{height: '20vh'}}>
            <h1>Challengers</h1>
            {players.map((player, index) => <Box key={index} center><h3>{player.login}</h3></Box>)}
            {challengerGrid ? challengerGrid.map((row, key) =>
              <div key={key} style={{display: 'flex', flexDirection: 'row', height: '6%'}}>
                {row.map((block, i) => <GridBlock blockId={block} key={i} />)}
              </div>
            ) : <Box>No challengers</Box>}
          </Box>
        </Fade>
      }
    </Box>
  )
}

export default GameInfo
