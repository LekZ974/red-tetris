import React from 'react'
import {Box, GridBlock} from "../block";
import Fade from 'react-reveal/Fade';

const GameInfo = (props) => {
  const {game, user} = props;
  let players = game.players
  return(
    <Box center flex flexDirection='column'>
      {"SOLO" === game.params.gameMode &&
      <Fade right big>
        <Box style={{height: '20vh', marginTop: '2em'}}>
          Level: {user.level}
        </Box>
      </Fade>
      }
      {"SOLO" === game.params.gameMode &&
      <Fade right big>
        <Box style={{height: '20vh', marginTop: '2em'}}>
          Score: {user.score}
        </Box>
      </Fade>
      }
      {players && players.length >= 1 &&
        <Fade right big>
          <Box style={{height: '20vh', marginTop: '2em'}}>
            <h1>Challengers</h1>
            {players.map((player, index) =>
              <Box key={index}>
                <Box center>
                  <h3>{player.login}</h3>
                </Box>
                  {player.spectre.map((row, key) =>
                    key > 2 && (<div key={key} style={{display: 'flex', flexDirection: 'row', height: '6%'}}>
                      {row.map((block, i) => <GridBlock blockId={block} key={i} />)}
                    </div>)
                  )}
              </Box>)}
          </Box>
        </Fade>
      }
    </Box>
  )
}

export default GameInfo
