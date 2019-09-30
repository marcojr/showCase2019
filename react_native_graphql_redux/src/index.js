import React from 'react'
import { Provider } from 'react-redux'
import { View } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import Reducers from './redux'
import Routes from './config/routes'

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Routes />
            </Provider>
        )
    }
}
const store = createStore(Reducers, {}, applyMiddleware(ReduxThunk))
export default App
