import React from 'react'
import { Field, reduxForm } from 'redux-form'

import {Button, SelectField, Box} from "../../components/block";

let ConfigForm = ({ createGame, handleSubmit, error, submitting, game, match }) => {

  const handleClick = () => {
    switch (game.params.gameMode) {
      case 'MULTI': default: {
        createGame(match.params.room, false)
        break;
      }
      case 'SOLO': {
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
          <option value={'MULTI'}>Multiplayer</option>
          <option value={'SOLO'}>Solo</option>
        </Field>
        {'SOLO' === game.params.gameMode &&
        <fieldset style={{border: 'solid 1px'}}>
          <Box flex flexDirection='column'>
            <label style={{marginBottom: '5px'}}>Speed:</label>
            <Field
              placeholder='Enable/Disable speed'
              name='speed'
              component={SelectField}
            >
              <option value={"EASY_MODE"}>Easy mode</option>
              <option value={"MEDIUM_MODE"}>Medium mode</option>
              <option value={"HARD_MODE"}>Hard mode</option>
              <option value={"NO_SPEED"}>Disable</option>
            </Field>
            <label>Malus Mode:</label>
            <Field
              placeholder='Enable/Disable malus'
              name='addMalus'
              component={SelectField}
            >
              <option value={'MALUS'}>Enable</option>
              <option value={'NO_MALUS'}>Disable</option>
            </Field>
          </Box>
        </fieldset>
        }
      </fieldset>
      <Button onClick={() => handleClick()} size={'large'} fullWidth>Create</Button>
    </form>
  )
}

export default reduxForm({
    form: 'ConfigForm'
})(ConfigForm)
