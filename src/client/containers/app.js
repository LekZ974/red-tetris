import React from 'react'
import { connect } from 'react-redux'
import { HashRouter as Router, Route } from 'react-router-dom'
import Home from './view/Home'
import Room from './view/Room'
import './app.css'

const App = () => (
  <Router hashType={'noslash'} basename={'/'}>
    <div>
      <Route exact path="/" component={Home}/>
      <Route exact path="/:room/:user" component={Room}/>
    </div>
  </Router>
)

export default connect(null)(App)


