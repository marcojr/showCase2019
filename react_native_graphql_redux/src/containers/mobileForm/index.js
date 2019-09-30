import React from 'react'
import { View, Text, Keyboard, TouchableWithoutFeedback ,  TouchableOpacity, TextInput } from 'react-native'
import style from './style'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faMobileAlt, faBroadcastTower } from '@fortawesome/free-solid-svg-icons'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { GQL_CREATE_PHONE_CHALLENGE } from '../../graphQL/mutation'
import { graphqlServer } from '../../config/servers'
import { request } from 'graphql-request'


export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            waitingCode: false,
            timer: 0,
            phone: '+447851160001',
            userId: undefined
        }
    }
    sendCode() {
        if (this.state.timer > 0) {
            alert('Hey ! Not so fast ! Please wait more ' + this.state.timer + ' seconds.')
            return
        }
        const vars = { phone: this.state.phone }
        request(graphqlServer, GQL_CREATE_PHONE_CHALLENGE, vars).then(res => {
            if (res.createPhoneChallenge) {
                this.setState({
                    userId: res.createPhoneChallenge.USER_id
                })
                this.setState({
                    waitingCode: true,
                    timer: 60
                })
                this.timerHandler = setInterval(() => {
                    this.setState({
                        timer: this.state.timer - 1
                    })
                    if (this.state.timer === 0) {
                        clearInterval(this.timerHandler)
                    }
                }, 1000)
            } else {
                console.log(445, 'error', res)
                //this.props.onError
            }
        }
        )
            .catch(ex => {
                /*console.log(446)
                console.log(ex)
                console.log(ex.request)
                console.log(ex.response)*/
                this.props.onError(ex.response.errors[0].message)
            })
    }
    confirmCode(code){
        this.props.onCode(this.state.userId,code)
    }
    render() {
        if (!this.state.waitingCode) {
            return (<View style={style.form}>
                <View style={style.formRow}>
                    <FontAwesomeIcon size={28} style={style.formIcon} icon={faMobileAlt} />
                    <TextInput
                        placeholder={"Mobile Number"}
                        placeholderTextColor={'rgba(255,255,255,0.5)'}
                        returnKeyType="done"
                        ref={(input) => { this.phone = input; }}
                        onSubmitEditing={() => { 
                            setTimeout(() =>{
                                this.sendCode()
                            },1000)
                        }}
                        onChangeText={(phone) => this.setState({ phone })}
                        value={this.state.phone}
                        style={style.textInput}
                        keyboardType={'phone-pad'} />
                </View>
                <TouchableWithoutFeedback onPress={() => { this.sendCode() }}>
                    <View style={[style.button, style.submitButton]}>
                        <Text style={style.buttonText}>Send Code</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>)
        }
        else {
            return (<View style={style.form}>
                <Text style={style.formLabel}>Confirm the code</Text>
                <View style={style.otpWrapper}>
                    <OTPInputView
                        style={style.otp}
                        autoFocusOnLoad
                        pinCount={4}
                        autoFocusOnLoad
                        codeInputFieldStyle={style.underlineStyleBase}
                        codeInputHighlightStyle={style.underlineStyleHighLighted}
                        onCodeFilled={(code => {
                            this.confirmCode(code)
                        })}
                    />
                </View>
                <View style={style.bellowButton}>
                    <TouchableOpacity onPress={() => { 
                        this.setState({ waitingCode: false})
                        Keyboard.dismiss()
                        this.phoneFocus()
                         }}>
                        <View style={style.bt1Wrapper}>
                            <FontAwesomeIcon size={16} style={style.bt1Icon} icon={faMobileAlt} />
                            <Text style={style.bt1PhoneTxt}>Change number</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.sendCode()}>
                        <View style={style.bt2Wrapper}>
                            <FontAwesomeIcon size={16} style={style.bt2Icon} icon={faBroadcastTower} />
                            <Text style={[style.bt2Txt, { width: this.state.timer === 0 ? null : 130 }]}>
                                {this.state.timer === 0 ? 'Send Again ?' : 'Send Again ? ' + '(' + this.state.timer + ')'}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>)
        }
    }
}