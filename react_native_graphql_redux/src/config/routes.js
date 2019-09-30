import React from 'react'
import { Router, Scene, Lightbox } from 'react-native-router-flux'

// Scenes
import Welcome from '../scenes/Welcome'
import User from '../scenes/User'

export default props => (
  <Router>
    <Scene key="root">
      <Scene key="welcome" component={Welcome} hideNavBar={true} />
      <Scene key="user" component={User} hideNavBar={false} left={() => null} />
    </Scene>
  </Router>)