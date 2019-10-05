import React from 'react'
import { View, Animated, TextInput } from 'react-native'
import { graphqlServer } from '../../../config/servers'
import { GQL_COUNT_USER } from '../../../graphQL/query'
import { request } from 'graphql-request'
import style from '../style'
export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      phone: ''
    }
  }
  componentDidMount() {
    this.email.focus()
  }
  async done() {
    const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const phone = /^\+(?:[0-9] ?){6,14}[0-9]$/
    if (!email.test(String(this.state.email)) || this.state.email === '') {
      this.props.onError('Invalid E-Mail Address')
      return
    }
    if (!phone.test(this.state.phone)) {
      this.props.onError('Phone format must be international.Starts with +, then country code. ex: +447900000000')
      return
    }
    const vars = { email: this.state.email, phone: this.state.phone }
    let count
    try {
      count = await request(graphqlServer, GQL_COUNT_USER, vars)
    } catch {
      this.props.onError('NETWORK_ERROR')
      return null
    }
    if (count.countUsers.emailFound > 0 && count.countUsers.phoneFound > 0) {
      this.props.onError('E-Mail and Phone already exists.')
      return null
    }
    if (count.countUsers.emailFound === 0 && count.countUsers.phoneFound > 0) {
      this.props.onError('Phone already exists.')
      return null
    }
    if (count.countUsers.emailFound > 0 && count.countUsers.phoneFound === 0) {
      this.props.onError('E-Mail already exists.')
      return null
    }
    this.props.onDone(this.state.email, this.state.phone)
  }
  render() {
    return (
      <View style={style.fields}>
        <Animated.View style={[style.fieldWrapper, { left: this.state.field1Left }]}>
          <TextInput
            keyboardType='email-address'
            onChangeText={email => this.setState({ email: email.toLowerCase() })}
            value={this.state.email}
            placeholderTextColor='rgba(255,255,255,0.5)'
            ref={(input) => { this.email = input }}
            returnKeyType='next'
            onSubmitEditing={() => { this.mobile.focus() }}
            style={style.input} placeholder='E-Mail'
          />
        </Animated.View>
        <Animated.View style={[style.fieldWrapper, { left: this.state.field2Left }]}>
          <TextInput
            keyboardType='phone-pad'
            onChangeText={phone => this.setState({ phone })}
            value={this.state.phone}
            placeholderTextColor='rgba(255,255,255,0.5)'
            ref={(input) => { this.mobile = input }}
            onSubmitEditing={() => { this.done() }}
            returnKeyType='done'
            style={style.input} placeholder='Mobile'
          />
        </Animated.View>
      </View>)
  }
}
