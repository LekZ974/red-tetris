import React from 'react'

const SelectField = props => {
  const { input, children } = props;

  return (
    <select name={input.name} value={input.value} {...input}>
      {children}
    </select>
  );
};

export default SelectField
