import React from 'react'
import { View, Animated, TextInput } from 'react-native'
import style from '../style'
export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: ''
        }
    }
    componentDidMount() {
        this.firstName.focus()
    }
    done() {
        if (
            this.state.firstName.length < 3 ||
            this.state.firstName.length > 49 ||
            this.state.lastName.length < 3 ||
            this.state.lastName.length > 49
        ) {
            this.props.onError('Invalid First and/or Last Name')
            return
        }
        this.props.onDone(this.state.firstName, this.state.lastName)
    }
    render() {
        return (
            <View style={style.fields}>
                <Animated.View style={[style.fieldWrapper, { left: this.props.field1Left }]}>
                    <TextInput
                        onChangeText={firstName => this.setState({ firstName })}
                        value={this.state.firstName}
                        placeholderTextColor='rgba(255,255,255,0.5)'
                        ref={(input) => { this.firstName = input }}
                        style={style.input}
                        placeholder='First'
                        returnKeyType='next'
                        onSubmitEditing={() => { this.lastName.focus() }}
                        blurOnSubmit={false}
                    />
                </Animated.View>
                <Animated.View style={[style.fieldWrapper, { left: this.props.field2Left }]}>
                    <TextInput
                        onChangeText={lastName => this.setState({ lastName })}
                        value={this.state.lastName}
                        placeholderTextColor='rgba(255,255,255,0.5)'
                        ref={(input) => { this.lastName = input }}
                        onSubmitEditing={() => { this.done() }}
                        returnKeyType='go'
                        style={style.input}
                        placeholder='Last'
                    />
                </Animated.View>
            </View>)
    }
}
