import React from 'react'
import { connect } from 'react-redux'
import {Box} from '../components/block'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './view/Home'

const App = () => (
  <Box>
    <Router>
      <Route path="/" component={Home}/>
    </Router>
  </Box>
)

const mapStateToProps = (state) => {
  return {
    message: state.message
  }
}
export default connect(mapStateToProps, null)(App)


