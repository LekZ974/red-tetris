import React , {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import {Input, Error, Button} from "../../components/block";
import {login} from "../../actions/user";
import {required} from "../../utils/formValidation"

const onSubmit = (data, dispatch) => dispatch(login(data))

const HomeForm = ({ handleSubmit, error }) => (
<form onSubmit={handleSubmit(onSubmit)}>
  <Field
    placeholder='Your name'
    name='name'
    component={Input}
    validate={[required]}
  />
  <Error error={error} />
  <Field
    placeholder={'Your Party\'s name or select one in the list'}
    name='game'
    component={Input}
    validate={[required]}
  />
  <Error error={error} />
  <Button type={'submit'} size={'large'} fullWidth to='/new-game'>Go</Button>
</form>
)
export default reduxForm({
    form: 'HomeForm'
})(HomeForm)
