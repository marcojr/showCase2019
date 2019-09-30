import {Dimensions} from 'react-native'
export const SCREEN_WIDTH = Dimensions.get('window').width
export const SCREEN_HEIGHT = Dimensions.get('window').height
export const THEME_DEFAULT_BORDER_RADIUS = 5
export const THEME_DEFAULT_PADDING = 30
export const THEME_DEFAULT_BUTTON = {
    height: 65,
    width: SCREEN_WIDTH - (THEME_DEFAULT_PADDING * 2),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: THEME_DEFAULT_BORDER_RADIUS
}
export const THEME_BUTTON1 = {
    backgroundColor: 'rgba(156, 39, 176, 0.8)'
}
export const THEME_BUTTON2 = {
    backgroundColor: 'rgba(0, 128, 0, 0.8);'
}
export const THEME_BUTTON1_TXT = {
    color: 'white',
    fontSize: 20
}
export const THEME_BUTTON2_TXT = {
    color: 'white',
    fontSize: 20
}
export const THEME_BUTTON3 = {
    display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'white',
        padding: 7
}
export const THEME_BUTTON3_TXT = {
    fontSize: 16,
    color: 'black'
}
export const THEME_BUTTON3_ICON = {
    color: 'black',
    marginRight: 5
}
export const THEME_BUTTON4 = {
    display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 7,
        borderWidth: 1,
        borderColor: 'white',
}
export const THEME_BUTTON4_TXT = {
    fontSize: 16,
    color: 'white'
}
export const THEME_BUTTON4_ICON = {
    color: 'white',
    marginRight: 5
}
export const THEME_BUTTON5 = {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 7,
        borderWidth: 1,
        borderColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        width: 120,
        height: 140
}
export const THEME_BUTTON5_TXT = {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    width:140
}
export const THEME_BUTTON5_ICON = {
    color: 'white', 
    marginBottom: 10, 
}