import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'recompose'
import {Input, Error, Button} from "../../components/block";

const HomeForm = ({ handleSubmit, error, submitting }) => (
<form>
  <Field
    placeholder='Your name'
    name='name'
    component={Input}
  />
  <Field
    placeholder={'Your Party\'s name or select one in the list'}
    name='room'
    component={Input}
  />
  <Error />
  <Button size={'large'} fullWidth to='/new-game'>Go</Button>
</form>
)
export default compose(
  reduxForm({
    form: 'HomeForm'
  })
)(HomeForm)
