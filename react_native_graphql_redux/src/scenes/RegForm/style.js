import { StyleSheet } from 'react-native'
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  THEME_DEFAULT_PADDING,
  THEME_DEFAULT_BORDER_RADIUS,
  THEME_DEFAULT_BUTTON,
  THEME_BUTTON1,
  THEME_BUTTON2,
  THEME_BUTTON1_TXT,
  THEME_BUTTON2_TXT,
  THEME_BUTTON5,
  THEME_BUTTON5_TXT,
  THEME_BUTTON5_ICON
} from '../../config/theme'
const designMode = false
const inputHeight = 30
export default StyleSheet.create({
  page: {
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
  },
  bkg: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    resizeMode: 'stretch',
    flex: 1,
    position: 'absolute'
  },
  title: {

  },
  titleText: {
    marginTop: 100,
    marginLeft: THEME_DEFAULT_PADDING,
    marginBottom: THEME_DEFAULT_PADDING,
    color: 'white',
    fontSize: 42,
    fontWeight: '100'

  },
  fieldsWrapper: {
    backgroundColor: designMode ? 'red' : null,
    position: 'relative',
    width: SCREEN_WIDTH,
    //height: inputHeight * 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  fields: {
    backgroundColor: designMode ? 'blue' : null
  },
  input: {
    backgroundColor: designMode ? 'yellow' : null,
    height: 45,
    fontSize: 25,
    color: 'white',
    borderWidth: 1,
    padding: 10,
    borderColor: 'white',
    borderRadius: THEME_DEFAULT_BORDER_RADIUS,
    width: SCREEN_WIDTH - (THEME_DEFAULT_PADDING * 2)

  },
  fieldWrapper: {
    backgroundColor: designMode ? 'pink' : null,
    paddingLeft: THEME_DEFAULT_PADDING,
    paddingRight: THEME_DEFAULT_PADDING,
    paddingTop: 10,
    paddingBottom: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: SCREEN_WIDTH
  },
  button: THEME_DEFAULT_BUTTON,
  buttonNext: THEME_BUTTON1,
  buttonFinish: THEME_BUTTON2,
  buttonNextTxt: THEME_BUTTON1_TXT,
  buttonFinishTxt: THEME_BUTTON2_TXT,
  buttonSpacing: {
    marginLeft: THEME_DEFAULT_PADDING,
    marginRight: THEME_DEFAULT_PADDING,
    marginTop: THEME_DEFAULT_PADDING / 2
  },
  getStarting: {
    fontSize: 20,
    marginLeft: THEME_DEFAULT_PADDING,
    marginRight: THEME_DEFAULT_PADDING
  },
  stepDescWrapper: {
    height: 64,
    backgroundColor: designMode ? 'cyan' : null,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  stepDesc: {
    marginTop: THEME_DEFAULT_PADDING / 2,
    marginBottom: THEME_DEFAULT_PADDING / 2,
    marginLeft: THEME_DEFAULT_PADDING,
    marginRight: THEME_DEFAULT_PADDING,
    textAlign: 'center'
  },
  btnPicSource: THEME_BUTTON5,
  btnPicSourceIcon: THEME_BUTTON5_ICON,
  btnPicSourceTxt: THEME_BUTTON5_TXT,
  picSelectButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  selection: {
    backgroundColor: designMode ? 'green' : null,
    height: 170
  },
  picture: {
    width: 170,
    height: 170,
    borderRadius: 170 / 2,
    borderWidth: 5,
    borderColor: 'lime',
    marginLeft: (SCREEN_WIDTH / 2) - (170 / 2)
  },
  btnReset: {
    position: 'absolute',
    top: THEME_DEFAULT_PADDING * 1.5,
    right: THEME_DEFAULT_PADDING / 2,
    padding: 10,
    zIndex: 9999
  },
  btnResetIcon: {
    color: 'white'
  }
})
