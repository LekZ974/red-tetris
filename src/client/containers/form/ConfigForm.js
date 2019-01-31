import React from 'react'
import { Field, reduxForm } from 'redux-form'

import {SPEED_MODE} from '../../../common/const';

import {Button, SelectField, Box} from "../../components/block";

import {GAME_MODE, MALUS_MODE} from '../../../common/const';

let ConfigForm = ({ createGame, handleSubmit, error, submitting, game, match }) => {

  const handleClick = () => {
    switch (game.params.gameMode) {
      case GAME_MODE.multi: default: {
        createGame(match.params.room, false)
        break;
      }
      case GAME_MODE.solo: {
        createGame(match.params.room, true)
        break;
      }
    }
  }

  return (
    <form id={'configForm'}>
      <fieldset style={{border: 0}}>
        <h1>Config :</h1>
        <label>Game Mode:</label>
        <Field
          placeholder='Game Mode'
          name='gameMode'
          component={SelectField}
        >
          <option value={GAME_MODE.multi}>Multiplayer</option>
          <option value={GAME_MODE.solo}>Solo</option>
        </Field>
        {GAME_MODE.solo === game.params.gameMode &&
        <fieldset style={{border: 'solid 1px'}}>
          <Box flex flexDirection='column'>
            <label style={{marginBottom: '5px'}}>Speed:</label>
            <Field
              placeholder='Enable/Disable speed'
              name='speed'
              component={SelectField}
            >
              <option value={SPEED_MODE.easy}>Easy mode</option>
              <option value={SPEED_MODE.medium}>Medium mode</option>
              <option value={SPEED_MODE.hard}>Hard mode</option>
              <option value={SPEED_MODE.noSpeed}>Disable</option>
            </Field>
            <label>Malus Mode:</label>
            <Field
              placeholder='Enable/Disable malus'
              name='addMalus'
              component={SelectField}
            >
              <option value={MALUS_MODE.malus}>Enable</option>
              <option value={MALUS_MODE.noMalus}>Disable</option>
            </Field>
          </Box>
        </fieldset>
        }
      </fieldset>
      <Button type='button' onClick={() => handleClick()} size={'large'} fullWidth>Create</Button>
    </form>
  )
}

export default reduxForm({
    form: 'ConfigForm'
})(ConfigForm)
