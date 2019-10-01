import { SET_AUTH_TOKEN, SET_USER } from './types'
import { initialMode } from 'react-native-dark-mode'
const INITIAL_STATE = {
  appVersion: 1,
  toasterMsg: '',
  authToken: {},
  user: undefined,
  useDarkMode: initialMode
}
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_AUTH_TOKEN:
      return {
        ...state,
        authToken: action.payload
      }
    case SET_USER:
      return {
        ...state,
        user: action.payload
      }
  }
  return state
}
