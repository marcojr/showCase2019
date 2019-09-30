import { StyleSheet } from 'react-native'
import {
    THEME_DEFAULT_PADDING, 
    THEME_DEFAULT_BUTTON, 
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
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: THEME_DEFAULT_PADDING ,
        paddingRight: THEME_DEFAULT_PADDING,
        backgroundColor: designMode? 'green' : null
    },
    formRow: {
        display: 'flex',
        flexDirection: 'row',
        paddingBottom: 5,
        borderBottomColor: 'white',
        borderBottomWidth: 2,
        marginBottom: THEME_DEFAULT_PADDING
    },
    textInput: {
        height: 30,
        flex: 1,
        fontSize: 25,
        color: 'white'
    },
    formIcon: {
        marginRight: THEME_DEFAULT_PADDING /2,
        color: 'white'
    },
    formLabel: {
        color: 'white',
        fontSize: 15,
        textTransform: 'lowercase'
    },
    forgot: {
        color: 'white',
        fontSize: 15,
        textTransform: 'lowercase'
    },
    cancel: {
        color: 'black',
        fontSize: 20,
        textTransform: 'lowercase'
    },
    button: THEME_DEFAULT_BUTTON,
    buttonText: THEME_BUTTON1_TXT,
    doLoginButton: THEME_BUTTON1,
    bellowButton: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: SCREEN_WIDTH - (THEME_DEFAULT_PADDING * 2),
        marginTop: THEME_DEFAULT_PADDING
    },
    bt1Wrapper: THEME_BUTTON3,
    bt1Txt: THEME_BUTTON3_TXT,
    bt1Icon : THEME_BUTTON3_ICON,
    bt2Wrapper: THEME_BUTTON4,
    bt2Txt: THEME_BUTTON4_TXT,
    bt2Icon: THEME_BUTTON4_ICON
})