import { Dimensions, StyleSheet } from 'react-native'
import { THEME_DEFAULT_BORDER_RADIUS, THEME_DEFAULT_PADDING } from '../../config/theme'
export default StyleSheet.create({
  container: {
    flex: 1
  },
  scv: {
    height: Dimensions.get('window').height
  },
  page: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: Dimensions.get('window').width
  },
  btnWrapper: {
    width: Dimensions.get('window').width,
    alignItems: 'center'
  },
  imgWrapper: {
    height: 150,
    width: Dimensions.get('window').width,
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleWrapper: {
    height: 40,
    marginTop: 30
  },
  descWrapper: {
    height: 50,
    alignItems: 'center'
  },
  title: {
    color: 'black',
    fontSize: 24
  },
  desc: {
    color: '#939AA3',
    marginBottom: 5
  },
  bullets: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    width: 100
  },
  bulletWrapper: {
    alignItems: 'center',
    width: Dimensions.get('window').width,
    marginTop: 60
  },
  buttonBorder: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: THEME_DEFAULT_BORDER_RADIUS,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 40,
    paddingRight: 40,
    marginBottom: THEME_DEFAULT_PADDING,
    marginTop: 50,
    flexDirection: 'row',
    width: 240
  },
  buttonText: {
    color: 'black',
    marginLeft: 10,
    fontSize: 16
  },
  hyperlink: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    fontWeight: 'bold'
  }
})
