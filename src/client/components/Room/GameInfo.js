import React from 'react'
import {Box, GridBlock} from "../block";

const GameInfo = (props) => {
  const {user, game} = props;
  let players = game.players
  return(
    <Box center>
      {players && players.length >= 2 ?
        <div style={{height: '20vh'}}>
          {players.map((player) => (
            <div style={{marginTop: '20px'}}>
              <h1>{player.login}</h1>
              {player.spectre.map((row, key) =>
              (<div key={key} style={{display: 'flex', flexDirection: 'row', height: '6%'}}>
                {row.map((block, i) => <GridBlock blockId={block} key={i} />)}
              </div>)
            )}
            </div>
          ))}
        </div> :
        <Box>waiting challenger grid</Box>
      }
    </Box>
  )
}

export default GameInfo
