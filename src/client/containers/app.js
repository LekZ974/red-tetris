import React from 'react'
import { connect } from 'react-redux'
import { HashRouter as Router, Route } from 'react-router-dom'
import Home from './view/Home'
import Room from './view/Room'


const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message)
  callback(allowTransition)
}

const App = () => (
  <Router getUserConfirmation={getConfirmation} hashType={'noslash'} basename={'/'}>
    <div>
      <Route exact path="/" component={Home}/>
      <Route path="/:room/:user" component={Room}/>
    </div>
  </Router>
)

export default connect()(App)


