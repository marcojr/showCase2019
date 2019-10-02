import React from 'react'
import { Router, Scene } from 'react-native-router-flux'

// Scenes
import Welcome from '../scenes/Welcome'
import User from '../scenes/User'

export default props => (
  <Router>
    <Scene key='root'>
      <Scene key='welcome' component={Welcome} hideNavBar />
      <Scene key='user' titleStyle={{color: 'white'}} title={'Profile'} component={User} hideNavBar={false} navTransparent left={() => null} />
    </Scene>
  </Router>)
