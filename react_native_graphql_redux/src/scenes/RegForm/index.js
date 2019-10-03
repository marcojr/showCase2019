import React from 'react'
import {
  Animated, TouchableOpacity, TouchableWithoutFeedback,
  View, Text, Image, TextInput
} from 'react-native'
import DatePicker from 'react-native-datepicker'
import RNPickerSelect from 'react-native-picker-select'
import { GQL_COUNT_USER } from '../../graphQL/query'
import style from './style'
import ImagePicker from 'react-native-image-crop-picker'
import { faCamera, faImages, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { SCREEN_WIDTH } from '../../config/theme'
import Toaster from '../../containers/toaster'
import { graphqlServer } from '../../config/servers'
import { request } from 'graphql-request'
const steps = [
  {
    name: 'Sign Up',
    desc: 'We will help you to create an account in a few easy steps.'
  },
  {
    name: 'Your Name ?',
    desc: 'Tell us'
  },
  {
    name: 'Contacts',
    desc: 'We will not ring or mail you. I am serious !'
  },
  {
    name: "A bit more 'bout you",
    desc: 'Select your gender and your date of birth.'
  },
  {
    name: 'Password',
    desc: 'No need to be a strong password, ok ? 123 is fine.'
  },
  {
    name: 'Your picture',
    desc: "It's not mandatory, but if you wish: SAY CHEEEESE !"
  }
]
class RegForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      imageSelected: undefined,
      step: 0,
      stepName: steps[0].name,
      stepDesc: steps[0].desc,
      fieldWrapperOpacity: new Animated.Value(1),
      field1Left: new Animated.Value(0),
      field2Left: new Animated.Value(0),
      email: '',
      firstName: '',
      lastName: '',
      password1: '',
      password2: '',
      gender: '',
      phone: '',
      dob: '',
      toasterMsg: '',
      hideGetStart: false,
      isDarkMode: false
    }
  }

  selectFromGallery () {
    ImagePicker.openPicker({
      width: 2048,
      height: 2048,
      cropping: true,
      multiple: false,
      mediaType: 'photo'
    }).then(imageSelected => {
      this.setState({ imageSelected: imageSelected.path })
    })
  }

  selectFromCamera () {
    ImagePicker.openCamera({
      width: 2048,
      height: 2048,
      cropping: true,
      mediaType: 'photo'
    }).then(imageSelected => {
      this.setState({ imageSelected: imageSelected.path })
    })
  }

  createUser () {
    const vars = {
      email: this.state.email,
      password: this.state.password1,
      phone: this.state.phone,
      gender: this.state.gender,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      dob: this.state.dob
    }
    if (this.state.imageSelected) {
      vars.picture = this.state.imageSelected
    }
    this.props.onCreate(vars)
  }

  checkConstraits (step) {
    const stepBefore = step - 1
    if (stepBefore === 1) {
      if (
        this.state.firstName.length < 3 ||
        this.state.firstName.length > 49 ||
        this.state.lastName.length < 3 ||
        this.state.lastName.length > 49
      ) {
        return 'Invalid First and/or Last Name'
      }
    }
    if (stepBefore === 2) {
      const email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      const phone = /^\+(?:[0-9] ?){6,14}[0-9]$/
      if (!email.test(String(this.state.email)) || this.state.email === '') {
        return 'Invalid E-Mail Address'
      }
      if (!phone.test(this.state.phone)) {
        return 'Phone format must be international.Starts with +, then country code. ex: +447900000000'
      }
    }
    if (stepBefore === 3) {
      if (this.state.gender === '' || this.state.dob === '') {
        return 'Gender and Birthday are both mandatory'
      }
    }
    if (stepBefore === 4) {
      if (this.state.password1.length < 4 || this.state.password1.length > 12) {
        return 'Password must have 4 to 12 length'
      }
      if (this.state.password1 !== this.state.password2) {
        return 'Passwords does not matches.'
      }
    }
    return ''
  }

  async goToStep (step) {
    const error = this.checkConstraits(step)

    if (error !== '') {
      this.setState({ toasterMsg: error })
      return null
    }
    if (step === 3) {
      const vars = { email: this.state.email, phone: this.state.phone }
      let count
      try {
        count = await request(graphqlServer, GQL_COUNT_USER, vars)
      } catch {
        this.setState({ toasterMsg: 'NETWORK_ERROR' })
        return null
      }
      if (count.countUsers.emailFound > 0 && count.countUsers.phoneFound > 0) {
        this.setState({ toasterMsg: 'E-Mail and Phone already exists.' })
        return null
      }
      if (count.countUsers.emailFound === 0 && count.countUsers.phoneFound > 0) {
        this.setState({ toasterMsg: 'Phone already exists.' })
        return null
      }
      if (count.countUsers.emailFound > 0 && count.countUsers.phoneFound === 0) {
        this.setState({ toasterMsg: 'E-Mail already exists.' })
        return null
      }
    }
    const setStep = (step) => {
      this.fadeOutFields()
      this.resetFieldsPos()
      this.setState({
        step,
        stepName: steps[step].name,
        stepDesc: steps[step].desc
      })
    }
    Animated.timing(
      this.state.field1Left,
      { toValue: SCREEN_WIDTH * -1, duration: 500 }
    ).start()
    Animated.timing(
      this.state.field2Left,
      { toValue: SCREEN_WIDTH * -1, duration: 500, delay: 250 }
    ).start(() => {
      setStep(this.state.step + 1)
      this.fadeInFields(step)
    })
  }

  resetFieldsPos (toValue) {
    Animated.timing(
      this.state.field1Left,
      { toValue: 0, duration: 0 }
    ).start()
    Animated.timing(
      this.state.field2Left,
      { toValue: 0, duration: 0 }
    ).start()
  }

  fadeInFields (step) {
    Animated.timing(
      this.state.fieldWrapperOpacity,
      { toValue: 1, duration: 250, delay: 100 }
    ).start(() => {
      switch (step) {
        case 1:
          this.firstName.focus()
          break
        case 2:
          this.email.focus()
          break
        case 4:
          this.password1.focus()
          break
      }
    })
  }

  fadeOutFields () {
    Animated.timing(
      this.state.fieldWrapperOpacity,
      { toValue: 0, duration: 0 }
    ).start()
  }

  renderStep0 () {
    return (
      <View style={style.fields}>
        <Animated.View style={[style.fieldWrapper, { left: this.state.field1Left }]}>
          <Text style={style.getStarting}>
            {steps[0].desc}
          </Text>
        </Animated.View>
      </View>)
  }

  renderStep1 () {
    return (
      <View style={style.fields}>
        <Animated.View style={[style.fieldWrapper, { left: this.state.field1Left }]}>
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
        <Animated.View style={[style.fieldWrapper, { left: this.state.field2Left }]}>
          <TextInput
            onChangeText={lastName => this.setState({ lastName })}
            value={this.state.lastName}
            placeholderTextColor='rgba(255,255,255,0.5)'
            ref={(input) => { this.lastName = input }}
            onSubmitEditing={() => { this.goToStep(this.state.step + 1) }}
            returnKeyType='go'
            style={style.input}
            placeholder='Last'
          />
        </Animated.View>
      </View>)
  }

  renderStep2 () {
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
            onSubmitEditing={() => { this.goToStep(this.state.step + 1) }}
            returnKeyType='done'
            style={style.input} placeholder='Mobile'
          />
        </Animated.View>
      </View>)
  }

  renderStep3 () {
    return (
      <View style={style.fields}>
        <Animated.View style={[style.fieldWrapper, { left: this.state.field1Left }]}>
          <View style={style.input}>
            <RNPickerSelect
              onDonePress={() => {
                if (this.state.dob && this.state.gender) {
                  setTimeout(() => {
                    this.goToStep(this.state.step + 1)
                  }, 500)
                }
              }}
              onValueChange={gender => {
                this.setState({ gender })
              }}
              value={this.state.gender}
              placeholder={{
                label: 'Gender'
              }}
              style={{
                placeholderColor: 'red',
                inputIOS: {
                  fontSize: 25,
                  height: 18,
                  color: 'white'
                }
              }}
              items={[
                { label: 'Male', value: 'M' },
                { label: 'Female', value: 'F' },
                { label: 'Prefer not to say', value: 'U' }
              ]}
            />
          </View>
        </Animated.View>
        <Animated.View style={[style.fieldWrapper, { left: this.state.field2Left }]}>
          <View style={style.input}>
            <DatePicker
              style={{ height: 5 }}
              date={this.state.dob}
              mode='date'
              placeholder='Birthday'
              format='YYYY-MM-DD'
              minDate='1940-01-01'
              maxDate='2005-12-31'
              confirmBtnText='Confirm'
              cancelBtnText='Cancel'
              customStyles={{
                dateIcon: {
                  display: 'none'
                },
                dateInput: {
                  borderWidth: 0,
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: -11
                },
                dateText: {
                  color: 'white',
                  fontSize: 25
                },
                placeholderText: {
                  // color: THEME_REG_FORM_MAIN_COLOR,
                  fontSize: 25
                },
                datePicker: {
                  backgroundColor: this.props.useDarkMode ? '#222' : 'white'
                },
                datePickerCon: {
                  backgroundColor: this.props.useDarkMode ? '#333' : 'white'
                }
              }}
              onDateChange={
                dob => {
                  this.setState({ dob })
                  if (this.state.gender) {
                    setTimeout(() => {
                      this.goToStep(this.state.step + 1)
                    }, 500)
                  }
                }
              }
            />
          </View>
        </Animated.View>
      </View>)
  }

  renderStep4 () {
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
            onSubmitEditing={() => { this.goToStep(this.state.step + 1) }}
            style={style.input} placeholder='Confirm'
          />
        </Animated.View>
      </View>)
  }

  renderSelectSource () {
    return (
      <View style={style.selection}>
        <View style={style.picSelectButtons}>
          <TouchableWithoutFeedback onPress={() => {
            this.selectFromCamera()
          }}
          >

            <View style={style.btnPicSource}>
              <FontAwesomeIcon size={32} style={style.btnPicSourceIcon} icon={faCamera} />
              <Text style={style.btnPicSourceTxt}>
                Select from
              </Text>
              <Text style={style.btnPicSourceTxt}>
                Camera
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => {
            this.selectFromGallery()
          }}
          >
            <View style={style.btnPicSource}>
              <FontAwesomeIcon size={32} style={style.btnPicSourceIcon} icon={faImages} />
              <Text style={style.btnPicSourceTxt}>
                Select from
              </Text>
              <Text style={style.btnPicSourceTxt}>
                Album
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={style.stepDescWrapper}>
          <Text style={style.stepDesc}>{steps[5].desc}</Text>
        </View>
      </View>)
  }

  renderSelectedPicture () {
    return (
      <View style={style.selection}>
        <Image style={style.picture} source={{ uri: this.state.imageSelected }} />
      </View>)
  }

  renderPictureAndFinish () {
    return (
      <View style={style.pictureForm}>
        {!this.state.imageSelected
          ? this.renderSelectSource()
          : this.renderSelectedPicture()}
        <TouchableOpacity onPress={() => {
          this.createUser()
        }}
        >
          <Text style={style.buttonNextTxt} />
          <View style={[style.buttonSpacing, style.button, style.buttonFinish]}>
            <Text style={style.buttonFinishTxt}>Finish</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  renderForm () {
    return (
      <View>
        <Animated.View style={[style.fieldsWrapper, { opacity: this.state.fieldWrapperOpacity }]}>
          {this.state.step === 0 ? this.renderStep0() : null}
          {this.state.step === 1 ? this.renderStep1() : null}
          {this.state.step === 2 ? this.renderStep2() : null}
          {this.state.step === 3 ? this.renderStep3() : null}
          {this.state.step === 4 ? this.renderStep4() : null}
          {this.state.step === 5 ? this.renderStep5() : null}
        </Animated.View>
        <View style={style.stepDescWrapper}>
          <Text style={style.stepDesc}>{this.state.stepDesc}</Text>
        </View>
        <TouchableOpacity onPress={() => {
          this.setState({ hideGetStart: true })
          this.goToStep(this.state.step + 1)
        }}
        >
          {this.state.step === 0 && !this.state.hideGetStart
            ? <View style={[style.buttonSpacing, style.button, style.buttonNext]}>
              <Text style={style.buttonNextTxt}>
                {this.state.step === 0 ? "Let's Go !" : 'Next'}
              </Text>
              </View>
            : null}
        </TouchableOpacity>
      </View>
    )
  }

  render () {
    return (
      <View style={style.page}>
        <Toaster
          msg={this.state.toasterMsg}
          onFinished={() => {
            this.setState({ toasterMsg: '' })
          }}
        />
        <Image
          style={style.bkg}
          blurRadius={50}
          source={require('../../assets/regform_bkg.png')}
        />
        <Text style={style.titleText}>{this.state.stepName}</Text>
        {this.state.step < 5 ? this.renderForm() : this.renderPictureAndFinish()}
        <TouchableWithoutFeedback onPress={() => {
          this.props.onCancel()
        }}
        >
          <View style={style.btnReset}>
            <FontAwesomeIcon size={35} style={style.btnResetIcon} icon={faTimesCircle} />
          </View>
        </TouchableWithoutFeedback>
      </View>

    )
  }
}
export default RegForm
