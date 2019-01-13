import React from 'react'
import { connect } from 'react-redux'
import { HashRouter as Router, Route } from 'react-router-dom'
import Home from './view/Home'
import Room from './view/Room'
import Footer from '../components/block/Footer'
import './app.css'

const App = () => (
  <Router hashType={'noslash'} basename={'/'}>
    <div>
      <Route exact path="/" component={Home}/>
      <Route exact path="/:room/:user" component={Room}/>
      <Footer/>
    </div>
  </Router>
)

export default connect(null)(App)


