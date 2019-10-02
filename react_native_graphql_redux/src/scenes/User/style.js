import { StyleSheet } from 'react-native'
import {
  THEME_BUTTON3,
  THEME_BUTTON3_TXT,
  THEME_BUTTON3_ICON,
  THEME_BUTTON6,
  THEME_BUTTON6_TXT,
  THEME_BUTTON6_ICON,
  THEME_DEFAULT_PADDING,
  THEME_DEFAULT_BORDER_RADIUS,
  SCREEN_WIDTH,
  SCREEN_HEIGHT
} from '../../config/theme'
const secondBkgConstant = SCREEN_WIDTH * 3.5
const coreWidth = SCREEN_WIDTH - (THEME_DEFAULT_PADDING * 3)
export default StyleSheet.create({
  page: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  },
  core: {
    backgroundColor: 'white',
    height: SCREEN_HEIGHT - 200,
    marginTop: 150,
    width: SCREEN_WIDTH - (THEME_DEFAULT_PADDING * 3),
    marginLeft: THEME_DEFAULT_PADDING * 1.5,
    borderRadius: THEME_DEFAULT_BORDER_RADIUS * 4,
    paddingBottom: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 7,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  picture: {
    width: coreWidth / 2,
    height: coreWidth / 2,
    borderRadius: 170 / 2,
    backgroundColor: 'blue',
    marginTop: -30,
    marginLeft: -25,
    borderWidth: 3,
    borderColor: 'white'
  },
  secondBackground: {
    position: 'absolute',
    bottom: ((secondBkgConstant / 2) * -1) - 80,
    left: SCREEN_WIDTH / 2 - (secondBkgConstant / 2),
    width: secondBkgConstant,
    backgroundColor: '#eaeaea',
    //backgroundColor: 'rgba(255,255,255,0.6)',
    height: secondBkgConstant,
    borderRadius: secondBkgConstant / 2

  },
  names: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: 120,
    width: coreWidth / 1.75,
    padding: 5,
    display: 'flex',
    justifyContent: 'center'
  },
  name: {
    fontSize: 30,
    fontWeight: "100"
  },
  dob: {
    fontSize: 17,
    color: '#2196f3',
    marginTop: 10,
    textAlign: 'right',
    marginRight: 15
  },
  actionButtons: {
    //backgroundColor: 'red',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 15
  },
  list: {
    //backgroundColor: 'blue'
  },
  data: {
    flex: 1,
    paddingLeft: THEME_DEFAULT_PADDING / 2,
    paddingTop: 15
    //backgroundColor: 'green'
  },
  bt1Wrapper: THEME_BUTTON3,
  bt1Txt: THEME_BUTTON3_TXT,
  bt1Icon: THEME_BUTTON3_ICON,
  bt2Wrapper: THEME_BUTTON6,
  bt2Txt: THEME_BUTTON6_TXT,
  bt2Icon: THEME_BUTTON6_ICON
})


