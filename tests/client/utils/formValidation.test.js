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
  it('function minLength3 is empty', () => {
    expect(minLength3()).to.equal('Ce champ est requis')
    expect(minLength3(undefined)).to.equal('Ce champ est requis')
    expect(minLength3('')).to.equal('Ce champ est requis')
    expect(minLength3(null)).to.equal('Ce champ est requis')
  })
  it('function minLength3 is not empty', () => {
    expect(minLength3(5)).to.equal(undefined)
    expect(minLength3('a string')).to.equal(undefined)
    expect(minLength3(['something', 'an other thing'])).to.equal(undefined)
    expect(minLength3({1:'something', 2:'an other thing'})).to.equal(undefined)
  })
  it('function maxLegnth15 is empty', () => {
    expect(maxLength15()).to.equal('Ce champ est requis')
    expect(maxLength15(undefined)).to.equal('Ce champ est requis')
    expect(maxLength15('')).to.equal('Ce champ est requis')
    expect(maxLength15(null)).to.equal('Ce champ est requis')
  })
  it('function maxLegnth15 is not empty', () => {
    expect(maxLength15(5)).to.equal(undefined)
    expect(maxLength15('a string')).to.equal(undefined)
    expect(maxLength15(['something', 'an other thing'])).to.equal(undefined)
    expect(maxLength15({1:'something', 2:'an other thing'})).to.equal(undefined)
  })
})
