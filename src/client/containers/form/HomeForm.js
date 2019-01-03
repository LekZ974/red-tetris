import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {Input, Button} from "../../components/block";
import {maxLength15, minLength3, required} from "../../utils/formValidation"
import {connect} from "../../actions/user"
import { push } from 'connected-react-router'
import {notify} from "../../utils/notificationHandler";

const handleClick = (form, e) => {

  if (form && form.hasOwnProperty('syncErrors')) {
    if (form.syncErrors.userName) {
      e.preventDefault()
      notify('login: '+form.syncErrors.userName, 'error')
    }
    if (form.syncErrors.gameName) {
      e.preventDefault()
      notify('room: '+form.syncErrors.gameName, 'error')
    }
  }
}

const onSubmit = (data, dispatch) => {
  dispatch(push(`/#${data.gameName}/${data.userName}`))
  dispatch(connect(data))
}

const HomeForm = ({ handleSubmit, error, submitting, props }) => {

  return (
    <form id={'homeForm'} onSubmit={handleSubmit(onSubmit)}>
      <Field
        placeholder='Your name'
        name='userName'
        component={Input}
        validate={[required, minLength3, maxLength15]}
        onChange={() => props.getGames()}
      />
      <Field
        placeholder={'Your Party\'s name or select one in the list'}
        name='gameName'
        component={Input}
        validate={[required, minLength3, maxLength15]}
      />
      <Button onClick={handleClick.bind(this, props.homeForm)} type={'submit'} disabled={submitting} size={'large'} fullWidth to='/new-game'>Go</Button>
    </form>
)
}
export default reduxForm({
    form: 'HomeForm'
})(HomeForm)
