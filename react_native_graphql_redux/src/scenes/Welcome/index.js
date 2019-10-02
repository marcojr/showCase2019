import React from 'react'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import RNFetchBlob from 'rn-fetch-blob'
import {
  View, Image, ActivityIndicator, Text,
  Animated, TouchableWithoutFeedback, TouchableOpacity,
  Dimensions, Modal
} from 'react-native'
import AutoHeightImage from 'react-native-auto-height-image'
import LoginForm from '../../containers/loginForm'
import MobileForm from '../../containers/mobileForm'
import Toaster from '../../containers/toaster'
import style from './style'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { login, getUser, completeLogin, createUser } from '../../redux/AppActions'
import RegForm from '../RegForm'
import SvcPictureUpload from '../../services/SvcGetPicUploadUri'
const scrWidth = Dimensions.get('window').width
class Welcome extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      coreOpacity: new Animated.Value(1),
      blurOpacity: new Animated.Value(0),
      titleLine1: 'Welcome to',
      titleLine2: 'Manta Ray',
      displayOnCore: 'logRegButtons',
      showRegForm: false,
      toasterMsg: ''
    }
    setTimeout(() => {
      this.doLogin('me@marcojr.com.br','1111')
    }, 2000)
  }

  showError (toasterMsg) {
    this.setState({ toasterMsg })
  }

  setBlurOpacity (toOpaque) {
    Animated.timing(
      this.state.blurOpacity,
      { toValue: toOpaque ? 0 : 1, duration: 1000 }
    ).start()
  }

  fadeCore (toValue, callback) {
    Animated.timing(
      this.state.coreOpacity,
      { toValue, duration: 500 }
    ).start(callback ? () => callback() : null)
  }

  renderSpinner () {
    return (
      <View style={style.spinnerWrapper}>
        <View style={style.spinner}>
          <ActivityIndicator size='large' color='#FFFFFF' />
          <Text style={style.spinnerText}>
            {this.state.spinnerText}
          </Text>
        </View>
      </View>
    )
  }

  renderBackground () {
    return (
      <View style={style.background}>
        <Image style={[style.bkg, style.bkg1]} source={require('../../assets/bkg1.png')} />
        <Animated.Image blurRadius={90} style={[style.bkg, style.bkg2, { opacity: this.state.blurOpacity }]} source={require('../../assets/bkg1.png')} />
        <AutoHeightImage width={scrWidth} style={style.frameTop} source={require('../../assets/bkg1_frame_top.png')} />
        <AutoHeightImage width={scrWidth} style={style.frameBottom} source={require('../../assets/bkg1_frame_top.png')} />
      </View>)
  }

  renderLogRegButtons () {
    return (
      <View style={style.logRegButtons}>
        <TouchableWithoutFeedback onPress={async () => {
          this.setBlurOpacity(false)
          this.fadeCore(0, () => {
            this.fadeCore(1)
            this.setState({
              displayOnCore: 'loginForm',
              showReset: true
            })
          })
        }}
        >
          <View style={[style.button, style.loginButton]}>
            <Text style={style.loginButtonTxt}>Login</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={async () => {
          this.setState({ showRegForm: true, showReset: true })
        }}
        >
          <View style={[style.button, style.registerButton]}>
            <Text style={style.regButtonTxt}>Sign Up</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }

  createUser (vars) {
    const doCreate = () => {
      this.props.createUser(vars).then(result => {
        if (result.payload.data) {
          Actions.user()
        }
        if (result.error) {
          this.setState({
            spinnerText: '',
            displayOnCore: 'logRegButtons'
          })
        }
      }).catch(error => {
        let msg
        if (error.response) {
          msg = error.response.errors[0].message
        } else {
          msg = 'NETWORK_ERROR'
        }

        this.showError(msg)
      })
    }
    this.setState({
      showRegForm: false,
      displayOnCore: null,
      showReset: false
    })
    setTimeout(async () => {
      this.setState({
        spinnerText: 'Registering...',
        displayOnCore: 'spinner'
      })
      if (vars.picture) {
        const uriFromBlob = await SvcPictureUpload('png')
        const uri = uriFromBlob.data.uri
        RNFetchBlob.fetch('PUT', uri, {
          'Content-Type': 'application/octet-stream',
          'x-ms-blob-type': 'BlockBlob'
        }, RNFetchBlob.wrap(vars.picture.replace('file://', '')))
          .then(r => {
            vars.picture = uri.substring(0, uri.indexOf('?'))
            console.log(vars.picture)
            doCreate()
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        doCreate()
      }
    }, 1000)
  }

  doLogin (email, password) {
    const emailTst = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!emailTst.test(String(email)) || this.state.email === '') {
      this.showError('Invalid E-Mail Address')
      return
    }
    if (password.length === 0) {
      this.showError('Please type your password')
      return
    }
    this.setState({
      spinnerText: 'Logging in...',
      displayOnCore: 'spinner',
      showReset: false
    })
    this.props.login(email, password).then(result => {
      console.log(643, result)
      const payload = result.payload
      if (payload.data) {
        Actions.user()
      }
      if (payload.error) {
        let msg
        if (payload.error.response) {
          msg = payload.error.response.errors[0].message
        } else {
          msg = 'NETWORK_ERROR'
        }
        this.setState({
          spinnerText: '',
          displayOnCore: 'loginForm'
        })
        this.showError(msg)
      }
    })
  }

  doMobileLogin (userid, code) {
    this.setState({
      spinnerText: 'Logging in...',
      displayOnCore: 'spinner',
      showReset: false
    })
    this.props.completeLogin(userid, code).then(result => {
      if (result.payload.data) {
        Actions.user()
      }
      if (result.error) {
        this.setState({
          spinnerText: '',
          displayOnCore: 'logRegButtons'
        })
      }
    })
  }

  renderCore () {
    switch (this.state.displayOnCore) {
      case 'logRegButtons':
        return this.renderLogRegButtons()
      case 'loginForm':
        return (
          <LoginForm
            onLogin={(email, password) => this.doLogin(email, password)}
            onLoginWithPhone={() => {
              this.fadeCore(0, () => {
                this.fadeCore(1)
                this.setState({
                  displayOnCore: 'mobileForm'
                })
              })
            }}
          />)
      case 'mobileForm':
        return (
          <MobileForm
            onCode={(userid, code) => this.doMobileLogin(userid, code)}
            onError={(error) => this.showError(error)}
          />)
      case 'spinner':
        return this.renderSpinner()
    }
  }

  renderDivisions () {
    return (
      <View style={style.divisions}>
        <View style={style.titleWrapper}>
          <Text style={style.title}>
            {this.state.titleLine1}
          </Text>
          <Text style={style.title}>
            {this.state.titleLine2}
          </Text>
        </View>
        <Animated.View style={[style.coreWrapper, { opacity: this.state.coreOpacity }]}>
          {this.renderCore()}
        </Animated.View>
      </View>)
  }

  reset () {
    this.fadeCore(0, () => {
      this.fadeCore(1)
      this.setState({
        showReset: false,
        displayOnCore: 'logRegButtons'
      })
    })
  }

  renderReset () {
    if (!this.state.showReset) { return null }
    return (
      <TouchableOpacity
        style={style.btnReset} onPress={() => {
          this.reset()
        }}
      >
        <FontAwesomeIcon size={35} style={style.btnResetIcon} icon={faTimesCircle} />
      </TouchableOpacity>
    )
  }

  render () {
    if (this.state.showRegForm) {
      return (
        <Modal
          animationType='slide'
          transparent
          visible
        >
          <RegForm
            useDarkMode={this.props.useDarkMode}
            onCreate={vars =>
              this.createUser(vars)}
            onCancel={() => { this.setState({ showRegForm: false }) }}
          />
        </Modal>
      )
    }
    return (
      <View style={{ flex: 1 }}>
        <Toaster
          msg={this.state.toasterMsg}
          onFinished={() => {
            this.setState({ toasterMsg: '' })
          }}
        />
        {this.renderBackground()}
        {this.renderDivisions()}
        {this.renderReset()}
      </View>
    )
  }
}
const mapStateToProps = state => (
  {
    useDarkMode: state.AppReducer.useDarkMode === 'dark'
  }
)

export default connect(mapStateToProps,
  {
    login,
    getUser,
    completeLogin,
    createUser
  })(Welcome)
