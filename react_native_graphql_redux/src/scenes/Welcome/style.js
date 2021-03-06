import { StyleSheet } from 'react-native'
import {
  THEME_DEFAULT_BUTTON,
  THEME_BUTTON1,
  THEME_BUTTON2,
  THEME_BUTTON1_TXT,
  THEME_BUTTON2_TXT,
  THEME_DEFAULT_PADDING,
  SCREEN_WIDTH,
  SCREEN_HEIGHT
} from '../../config/theme'
const designMode = false
export default StyleSheet.create({
  background: {
    display: 'flex',
    flex: 1
  },
  page: {
    display: 'flex',
    flex: 1
  },
  bkg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  },
  bkg1: {
    zIndex: 100
  },
  bkg2: {
    zIndex: 200
  },
  frameTop: {
    zIndex: 300,
    position: 'absolute',
    left: 0,
    top: 0
  },
  frameBottom: {
    transform: [{ rotate: '180deg' }],
    zIndex: 300,
    position: 'absolute',
    left: 0,
    bottom: 0
  },
  divisions: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    zIndex: 1000,
    display: 'flex',
    backgroundColor: designMode ? 'yellow' : null
  },
  titleWrapper: {
    height: 120,
    marginTop: '35%'
    //marginBottom: 300 //deleta isso
  },
  coreWrapper: {
    backgroundColor: designMode ? 'yellow' : null,
    height: 300,
    flex: 6,
    marginBottom: 170,
    marginTop: 50
  },
  title: {
    color: 'white',
    textAlign: 'center',
    fontSize: 42,
    fontWeight: '300'
  },
  button: THEME_DEFAULT_BUTTON,
  loginButton: THEME_BUTTON1,
  registerButton: THEME_BUTTON2,
  loginButtonTxt: THEME_BUTTON1_TXT,
  regButtonTxt: THEME_BUTTON2_TXT,
  logRegButtons: {
    display: 'flex',
    padding: THEME_DEFAULT_PADDING,
    backgroundColor: designMode ? 'black' : null,
    height: 220,
    justifyContent: 'space-between'
  },
  spinnerWrapper: {
    width: '100%',
    alignItems: 'center'
  },
  spinner: {
    width: 30,
    height: 30,
    borderRadius: 5,
    backgroundColor: designMode ? 'blue' : 'rgba(0,0,0,0.6)',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 50
  },
  spinnerText: {
    fontSize: 5,
    color: 'white'
  },
  btnReset: {
    position: 'absolute',
    top: THEME_DEFAULT_PADDING * 2,
    right: THEME_DEFAULT_PADDING / 2,
    padding: 10,
    zIndex: 5000
  },
  btnResetIcon: {
    color: 'white'
  }
})
