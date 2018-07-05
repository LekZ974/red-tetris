import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'recompose'
import {Input, Error, Button} from "../../components/block";
import {login} from "../../actions/user";

const onSubmit = values => console.log(values)

const HomeForm = ({ handleSubmit, error, submitting }) => (
<form onSubmit={handleSubmit(onSubmit)}>
  <Field
    placeholder='Your name'
    name='name'
    component={Input}
    type={'text'}
  />
  <Field
    placeholder={'Your Party\'s name or select one in the list'}
    name='room'
    component={Input}
    type={'text'}
  />
  <Error />
  <Button type={'submit'} size={'large'} fullWidth to='/new-game'>Go</Button>
</form>
)
export default compose(
  reduxForm({
    form: 'HomeForm'
  })
)(HomeForm)
