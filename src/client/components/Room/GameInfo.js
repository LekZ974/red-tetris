import React from 'react'
import {Box, GridBlock} from "../block";
import Fade from 'react-reveal/Fade';
import theme from '../../theme';

const GameInfo = (props) => {
  const {game, user} = props;
  let players = game.players
  return(
    <Box center flex flexDirection='column'>
      <Fade right big>
        <Box style={{fontWeight: 800, color: theme.colors.white, backgroundColor: theme.colors.red, padding: '1em 3em', border: 'solid 5px', borderColor: `${theme.colors.gray} ${theme.colors.darkGray} ${theme.colors.darkGray} ${theme.colors.gray}`}}>
          <Box style={{fontSize: '1.5em'}}>Game mode : {game.params.gameMode}</Box>
          {"SOLO" === game.params.gameMode &&
          <Box>
            <Box>
              Level: {user.level}
            </Box>
            <Box style={{marginTop: '1.5em'}}>
              Score: {user.score}
            </Box>
            <Box style={{marginTop: '1.5em'}}>
              Speed : {game.params.speed}
            </Box>
            <Box style={{marginTop: '1.5em'}}>
              Malus : {'MALUS' === game.params.addMalus ? 'Enable' : 'Disable'}
            </Box>
          </Box>
          }
        </Box>
      </Fade>
      {players && players.length >= 1 &&
        <Fade right big>
          <Box flex flexDirection='column'>
            <h1>Challengers</h1>
            {players.map((player, index) =>
              <Box key={index} style={{marginBottom: '1em'}}>
                <Box center>
                  <h3>{player.login}</h3>
                </Box>
                <Box>
                  {player.spectre.map((row, key) =>
                    key > 2 && (<Box key={key} style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                      {row.map((block, i) => <GridBlock blockId={block} key={i} width={'0.1em'} height={'0.1em'} />)}
                    </Box>)
                  )}
                </Box>
              </Box>)}
          </Box>
        </Fade>
      }
    </Box>
  )
}

export default GameInfo
