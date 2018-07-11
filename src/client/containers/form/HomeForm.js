import React , {Component}from 'react'
import { Field, reduxForm } from 'redux-form'
import {Input, Error, Button} from "../../components/block";
import {login} from "../../actions/user";
import {required, minLength, maxLength} from "../../utils/formValidation"

const onSubmit = (data, dispatch) => dispatch(login(data))

const HomeForm = ({ handleSubmit }) => (
<form onSubmit={handleSubmit(onSubmit)}>
  <Field
    placeholder='Your name'
    name='name'
    component={Input}
    validate={[required]}
  />
  <Field
    placeholder={'Your Party\'s name or select one in the list'}
    name='room'
    component={Input}
    validate={[required]}
  />
  <Error />
  <Button type={'submit'} size={'large'} fullWidth to='/new-game'>Go</Button>
</form>
)
export default reduxForm({
    form: 'LogForm'
})(HomeForm)
