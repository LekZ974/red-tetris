import React from 'react';
import { expect } from 'chai'
import {required, minLength3, maxLength, minLength, maxLength15, doNotMatch} from '../../../src/client/utils/formValidation';

describe('>>>>>formValidation', () => {
  it('function required is empty', () => {
    expect(required()).to.equal('Ce champ est requis')
    expect(required(undefined)).to.equal('Ce champ est requis')
    expect(required('')).to.equal('Ce champ est requis')
    expect(required(null)).to.equal('Ce champ est requis')
  })
  it('function required is not empty', () => {
    expect(required(5)).to.equal(undefined)
    expect(required('a string')).to.equal(undefined)
    expect(required(['something', 'an other thing'])).to.equal(undefined)
    expect(required({1:'something', 2:'an other thing'})).to.equal(undefined)
  })
})
