import React , {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import {Input, Error, Button} from "../../components/block";
import {maxLength15, minLength3, required} from "../../utils/formValidation"
import {connect} from "../../actions/user"
import { push } from 'connected-react-router'

const onSubmit = (data, dispatch) => {
  dispatch(push(`/#${data.gameName}/${data.userName}`))
  dispatch(connect(data))
}

const HomeForm = ({ handleSubmit, error, submitting }) => (
<form id={'homeForm'} onSubmit={handleSubmit(onSubmit)}>
  <Field
    placeholder='Your name'
    name='userName'
    component={Input}
    validate={[required, minLength3, maxLength15]}
  />
  <Field
    placeholder={'Your Party\'s name or select one in the list'}
    name='gameName'
    component={Input}
    validate={[required, minLength3, maxLength15]}
  />
  <Button type={'submit'} disabled={submitting} size={'large'} fullWidth to='/new-game'>Go</Button>
</form>
)
export default reduxForm({
    form: 'HomeForm'
})(HomeForm)
