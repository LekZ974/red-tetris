import React from 'react'
import { connect } from 'react-redux'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './view/Home'
import Room from './view/Room'


const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message)
  callback(allowTransition)
}

const App = () => (
  <Router getUserConfirmation={getConfirmation} hashType={'noslash'} basename={'/'}>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/:room/:user" component={Room}/>
    </Switch>
  </Router>
)

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}

export default connect(mapStateToProps, null)(App)


