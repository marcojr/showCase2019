import { StyleSheet } from 'react-native'
import {
  THEME_DEFAULT_PADDING,
  THEME_DEFAULT_BUTTON,
  THEME_DEFAULT_BORDER_RADIUS,
  THEME_BUTTON1,
  THEME_BUTTON1_TXT,
  THEME_BUTTON3,
  THEME_BUTTON3_TXT,
  THEME_BUTTON3_ICON,
  THEME_BUTTON4,
  THEME_BUTTON4_TXT,
  THEME_BUTTON4_ICON,
  SCREEN_WIDTH
} from '../../config/theme'
const designMode = false
export default StyleSheet.create({
  form: {

    display: 'flex',
    alignItems: 'center',
    paddingRight: THEME_DEFAULT_PADDING,
    paddingLeft: THEME_DEFAULT_PADDING,
    backgroundColor: designMode ? 'red' : null
  },
  formRow: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: 5,
    borderBottomColor: 'white',
    borderBottomWidth: 2,
    marginBottom: THEME_DEFAULT_PADDING,
    marginTop: THEME_DEFAULT_PADDING
  },
  otpWrapper: {
    marginTop: 0,
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: 10,
    backgroundColor: designMode ? 'yellow' : null
  },
  otp: {
    height: 100,
    width: '80%'
  },
  textInput: {
    height: 30,
    flex: 1,
    fontSize: 25,
    color: 'white'
  },
  underlineStyleBase: {
    width: 45,
    height: 45,
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: THEME_DEFAULT_BORDER_RADIUS,
    fontSize: 25,
    color: 'white'
  },
  underlineStyleHighLighted: {
    borderColor: '#FF0000'
  },
  formIcon: {
    marginRight: THEME_DEFAULT_PADDING / 2,
    color: 'white'
  },
  formLabel: {
    color: 'white',
    fontSize: 15,
    textTransform: 'lowercase'
  },
  button: THEME_DEFAULT_BUTTON,
  buttonText: THEME_BUTTON1_TXT,
  submitButton: THEME_BUTTON1,
  bellowButton: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: SCREEN_WIDTH - (THEME_DEFAULT_PADDING * 2)
  },
  bt1Wrapper: THEME_BUTTON3,
  bt1Txt: THEME_BUTTON3_TXT,
  bt1Icon: THEME_BUTTON3_ICON,
  bt2Wrapper: THEME_BUTTON4,
  bt2Txt: THEME_BUTTON4_TXT,
  bt2Icon: THEME_BUTTON4_ICON
})
