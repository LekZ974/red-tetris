import React from 'react'
import {Box} from './'
import theme from '../../theme'

const Footer = () => (
  <Box style={{width: '100%', height: '2em', backgroundColor: theme.colors.red, color: theme.colors.white, fontSize: '10px', position: 'fixed', bottom:0, left:0, textAlign:'center', paddingTop: '10px'}}>
    Red tetris for 42 by jwong & ahoareau - 2019
  </Box>
)
export default Footer
