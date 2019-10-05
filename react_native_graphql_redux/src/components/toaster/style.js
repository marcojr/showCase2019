import { StyleSheet } from 'react-native'
import {
  SCREEN_WIDTH, THEME_DEFAULT_PADDING
} from '../../config/theme'
export default StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    width: SCREEN_WIDTH,
    backgroundColor: 'red',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    paddingRight: THEME_DEFAULT_PADDING,
    paddingLeft: THEME_DEFAULT_PADDING
  },
  text: {
    color: 'white',
    marginTop: 12
  }
})
