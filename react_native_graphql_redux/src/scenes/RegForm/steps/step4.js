import React from 'react'
import { View, Animated, TextInput } from 'react-native'
import style from '../style'
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      password1: '',
      password2: ''
    }
  }
  componentDidMount() {
    this.password1.focus()
  }
  done() {
    if (this.state.password1.length < 3 || this.state.password1.length > 12) {
      this.props.onError('Password must have 3 to 12 length')
      return
    }
    if (this.state.password1 !== this.state.password2) {
      this.props.onError('Passwords does not matches.')
      return
    }
    this.props.onDone(this.state.password1, this.state.password2)
  }
  render() {
    return (
      <View style={style.fields}>
        <Animated.View style={[style.fieldWrapper, { left: this.state.field1Left }]}>
          <TextInput
            secureTextEntry
            onChangeText={password1 => this.setState({ password1 })}
            value={this.state.password1}
            placeholderTextColor='rgba(255,255,255,0.5)'
            ref={(input) => { this.password1 = input }}
            returnKeyType='next'
            onSubmitEditing={() => { this.password2.focus() }}
            style={style.input} placeholder='Create'
          />
        </Animated.View>
        <Animated.View style={[style.fieldWrapper, { left: this.state.field2Left }]}>
          <TextInput
            secureTextEntry
            onChangeText={password2 => this.setState({ password2 })}
            value={this.state.password2}
            placeholderTextColor='rgba(255,255,255,0.5)'
            ref={(input) => { this.password2 = input }}
            returnKeyType='go'
            onSubmitEditing={() => { this.done() }}
            style={style.input} placeholder='Confirm'
          />
        </Animated.View>
      </View>)
  }
}
