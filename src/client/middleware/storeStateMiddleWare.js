export default ({ dispatch }) => next => action => {
  const isAsync = action.apiCall
  if (!isAsync) {
    return next(action)
  }

  const { type, apiCall, globalLoading = false, thenFn, catchFn } = action

  if (typeof apiCall.then !== 'function') {
    throw new Error('Expected a promise')
  }

  if (globalLoading) dispatch({ type: 'REQUEST' })
  next({ type })


  return apiCall
    .then(payload => {
      console.log('TUTU')
      if (globalLoading) dispatch({ type: 'REQUEST', status: 'success' })
      next({ payload, type, status: 'success' })
      if (thenFn) thenFn(dispatch)
    })
    .catch(error => {
      if (globalLoading) dispatch({ type: 'REQUEST', status: 'error', error })
      next({ type, status: 'error', error })
      if (catchFn) catchFn(error)
    })
}
