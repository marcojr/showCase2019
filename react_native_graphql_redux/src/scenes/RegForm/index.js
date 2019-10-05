import React from 'react'
import { Animated, View, Image, Text, TouchableWithoutFeedback } from 'react-native'
import style from './style'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { SCREEN_WIDTH } from '../../config/theme'
import Toaster from '../../components/toaster'
import { REG_STEPS } from '../../config/constants'
import { Step0, Step1, Step2, Step3, Step4, Step5 } from './steps'
const steps = REG_STEPS
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
  async goToStep (step) {
      Animated.timing(
        this.state.field1Left,
        { toValue: SCREEN_WIDTH * -1, duration: 500 }
      ).start()
      Animated.timing(
        this.state.field2Left,
        { toValue: SCREEN_WIDTH * -1, duration: 500, delay: 250 }
      ).start(() => {
        this.fadeOutFields()
        this.resetFieldsPos()
        this.setState({
          step: this.state.step + 1,
          stepName: steps[step].name,
          stepDesc: steps[step].desc
        })
        this.fadeInFields(step)
      })
    }
  resetFieldsPos () {
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
    ).start()
  }
  fadeOutFields () {
    Animated.timing(
      this.state.fieldWrapperOpacity,
      { toValue: 0, duration: 0 }
    ).start()
  }
  renderForm () {
    const desc = steps[this.state.step].desc
    let stepRender
    switch(this.state.step) {
      case 0:
        stepRender=<Step0 
          desc={desc} 
          onDone={() =>{
            this.goToStep(this.state.step + 1)
          }}
          field1Left={this.state.field1Left} />
          break
      case 1:
        stepRender=<Step1 
          field1Left={this.state.field1Left} 
          field2Left={this.state.field2Left}
          onError={toasterMsg =>{this.setState({ toasterMsg})}}
          onDone={(firstName, lastName) => {
            this.setState({firstName, lastName})
            this.goToStep(this.state.step + 1)
          }} />
        break
        case 2:
        stepRender=<Step2 
          field1Left={this.state.field1Left} 
          field2Left={this.state.field2Left}
          onError={toasterMsg =>{this.setState({ toasterMsg})}}
          onDone={(email, phone) => {
            this.setState({email, phone})
            this.goToStep(this.state.step + 1)
          }} />
        break
        case 3:
        stepRender=<Step3 
          field1Left={this.state.field1Left} 
          field2Left={this.state.field2Left}
          onError={toasterMsg =>{this.setState({ toasterMsg})}}
          onDone={(gender, dob) => {
            this.setState({gender, dob})
            this.goToStep(this.state.step + 1)
          }} />
        break
        case 4:
        stepRender=<Step4 
          field1Left={this.state.field1Left} 
          field2Left={this.state.field2Left} 
          onError={toasterMsg =>{this.setState({ toasterMsg})}}
          onDone={(password1, password2) => {
            this.setState({password1, password2})
            this.goToStep(this.state.step + 1)
          }} />
        break
        case 5:
        stepRender=<Step5
          desc={desc} 
          onDone={(imageSelected) => {
            this.setState({imageSelected})
            setTimeout(() =>{
              this.createUser()
            },100)
          }} />
        break
    }
    return (
      <View>
        <Animated.View style={[style.fieldsWrapper, { opacity: this.state.fieldWrapperOpacity }]}>
          {stepRender}
        </Animated.View>
        { this.state.step > 0 ?
        <View style={style.stepDescWrapper}>
          <Text style={style.stepDesc}>{desc}</Text>
        </View>
        : null
        }
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
        {this.renderForm()}
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
