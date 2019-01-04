import React from 'react'
import { connect } from 'react-redux'
import { HashRouter as Router, Route, withRouter } from 'react-router-dom'
import Home from './view/Home'
import Room from './view/Room'
import './app.css'

const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message)
  callback(allowTransition)
}

const App = () => (
  <Router hashType={'noslash'} basename={'/'}>
    <div>
      <Route exact path="/" component={Home}/>
      <Route exact path="/:room/:user" component={Room}/>
    </div>
  </Router>
)

export default withRouter(connect(null)(App))


