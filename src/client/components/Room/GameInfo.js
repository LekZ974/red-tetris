import React from 'react'
import {Box, GridBlock} from "../block";
import Fade from 'react-reveal/Fade';
import theme from '../../theme';

const GameInfo = (props) => {
  const {game, user} = props;
  let players = game.players
  return(
    <Box center flex flexDirection='column'>
      {"SOLO" === game.params.gameMode &&
      <Fade right big>
        <Box style={{padding: '3em', border: `2px solid ${theme.colors.red}`}}>
          <Box>
            Level: {user.level}
          </Box>
          <Box style={{marginTop: '2em'}}>
            Score: {user.score}
          </Box>
          <Box style={{marginTop: '2em'}}>
            Speed : {game.params.speed}
          </Box>
          <Box style={{marginTop: '2em'}}>
            Malus : {'MALUS' === game.params.addMalus ? 'Enable' : 'Disable'}
          </Box>
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
