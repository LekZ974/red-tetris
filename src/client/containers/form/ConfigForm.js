import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Input, Button, SelectField} from "../../components/block";
import { connect } from 'react-redux';

let ConfigForm = (props) => {

  return (
    <form id={'configForm'}>
      <fieldset style={{border: 0}} disabled={props.game.gameIsStarted}>
        <h1>Config :</h1>
        <label>Malus :</label>
        <Field
          placeholder='Malus'
          name='addMalus'
          component={SelectField}
        >
          <option value={true}>Enable</option>
          <option value={false}>Disable</option>
        </Field>
      </fieldset>
    </form>
  )
}

const mapStateToProps = (state) => {
  if (state.form.ConfigForm && state.form.ConfigForm.hasOwnProperty('values')) {
    return {
      configValues: state.form.ConfigForm.values
    }
  }
  return {
    configValues: null,
  }
};

ConfigForm = connect(
  mapStateToProps,
  null
)(ConfigForm);

export default reduxForm({
    form: 'ConfigForm'
})(ConfigForm)
