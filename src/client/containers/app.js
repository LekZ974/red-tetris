import React from 'react'
import { connect } from 'react-redux'
import {Box} from '../components/block'
import { HashRouter as Router, Route } from 'react-router-dom'
import Home from './view/Home'
import Room from './view/Room'


const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message)
  callback(allowTransition)
}

const App = () => (
  <Box>
    <Router getUserConfirmation={getConfirmation} hashType={'noslash'} basename={'/'}>
      <Box>
        <Route exact path="/" component={Home}/>
        <Route path="/:room" component={Room}/>
      </Box>
    </Router>
  </Box>
)

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}
export default connect(mapStateToProps, null)(App)


