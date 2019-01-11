import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { withRouter } from 'react-router-dom';

import {Input, Button, SelectField} from "../../components/block";
import { connect } from 'react-redux';

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
          <option value={'SOLO'}>Solo</option>
          <option value={'MULTI'}>Multiplayer</option>
        </Field>
      </fieldset>
      <Button onClick={() => handleClick()} disabled={submitting} size={'large'} fullWidth>Create</Button>
    </form>
  )
}

export default reduxForm({
    form: 'ConfigForm'
})(ConfigForm)
