import React from 'react'
import { Input } from './'

const renderInput = ({ input, meta: { touched, error }, ...props }) => {
  return <Input error={touched ? error : ''} {...input} {...props} />
}

export default renderInput
