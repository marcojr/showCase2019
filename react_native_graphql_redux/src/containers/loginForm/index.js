import React from 'react'
import { View, Text, TouchableWithoutFeedback, TextInput } from 'react-native'
import style from './style'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faUser, faMobileAlt, faUnlockAlt, faQuestionCircle } from '@fortawesome/free-solid-svg-icons'
class LoginForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: 'me@marcojr.com.br',
      password: '1111'
    }
  }

  render () {
    return (
      <View style={style.form}>
        <View style={style.formRow}>
          <FontAwesomeIcon size={28} style={style.formIcon} icon={faUser} />
          <TextInput
            returnKeyType='next'
            ref={(input) => { this.email = input }}
            onSubmitEditing={() => {
              this.password.focus()
            }}
            placeholder='E-Mail'
            placeholderTextColor='rgba(255,255,255,0.5)'
            onChangeText={(email) => this.setState({ email })}
            value={this.state.email}
            keyboardType='email-address'
            style={style.textInput}
          />
        </View>
        <View style={style.formRow}>
          <FontAwesomeIcon size={28} style={style.formIcon} icon={faUnlockAlt} />
          <TextInput
            placeholder='Password'
            placeholderTextColor='rgba(255,255,255,0.5)'
            returnKeyType='go'
            ref={(input) => { this.password = input }}
            onSubmitEditing={() => {
              this.props.onLogin(this.state.email, this.state.password)
            }}
            onChangeText={(password) => this.setState({ password })}
            value={this.state.password}
            secureTextEntry
            style={style.textInput}
          />
        </View>
        <TouchableWithoutFeedback onPress={() => {
          this.props.onLogin(this.state.email, this.state.password)
        }}
        >
          <View style={[style.button, style.doLoginButton]}>
            <Text style={style.buttonText}>Login</Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={style.bellowButton}>
          <TouchableWithoutFeedback onPress={() => this.props.onLoginWithPhone()}>
            <View style={style.bt1Wrapper}>
              <FontAwesomeIcon size={16} style={style.bt1Icon} icon={faMobileAlt} />
              <Text style={style.bt1PhoneTxt}>Login with phone instead</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.props.onForgot()}>
            <View style={style.bt2Wrapper}>
              <FontAwesomeIcon size={16} style={style.bt2Icon} icon={faQuestionCircle} />
              <Text style={style.bt2Txt}>Forgot</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }
}
export default LoginForm
