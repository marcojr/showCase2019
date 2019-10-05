import React from 'react'
import {
  View, Text,TouchableWithoutFeedback,
  ScrollView, Dimensions, AsyncStorage
} from 'react-native'
import style from './style'
import { faCircle, faDotCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Actions } from 'react-native-router-flux'
import { Page0, Page1, Page2 } from './pages'
class Tour extends React.Component {
  // Important: This is not just a tour thing. It's decides also what is
  // the initial page.
  constructor(props) {
    super(props)
    this.state = {
      page: 0,
      display: false
    }
    this.decideRoute()
  }
  decideRoute() {
    AsyncStorage.getItem('firstTime').then(data => {
      if (data) {
        AsyncStorage.getItem('loggedUser').then(user => {
          if (!user) {
            Actions.welcome()
          } else {
            const credentials = JSON.parse(user)
            Actions.user({ credentials })
          }
        })
      } else {
        AsyncStorage.setItem('firstTime', 'no')
        this.setState({
          display: true
        })
      }
    })
  }
  handleScroll(event) {
    const a = Math.round(event.nativeEvent.contentOffset.x / Dimensions.get('window').width)
    if (a === 0 || a === 1 || a === 2 || a === 3) {
      this.setState({ page: a })
    }
  }
  exit() {
    Actions.welcome()
  }
  renderBullets() {
    const active = faCircle
    const inactive = faDotCircle
    const activeColor = 'white'
    const inactiveColor = 'rgba(255,255,255,0.5)'
    return (
      <View style={style.bulletWrapper}>
        <View style={style.bullets}>
          <FontAwesomeIcon
            icon={this.state.page === 0 ? active : inactive}
            color={this.state.page === 0 ? activeColor : inactiveColor}
          />
          <FontAwesomeIcon
            icon={this.state.page === 1 ? active : inactive}
            color={this.state.page === 1 ? activeColor : inactiveColor}
          />
          <FontAwesomeIcon
            icon={this.state.page === 2 ? active : inactive}
            color={this.state.page === 2 ? activeColor : inactiveColor}
          />
        </View>
      </View>
    )
  }
  renderLeave() {
    return (
      <View>
        {this.renderBullets()}
        <View style={style.btnWrapper}>
          <TouchableWithoutFeedback onPress={() => {
            this.exit()
          }}
          >
            <View style={style.buttonBorder}>
              <Text style={style.buttonText}>Get Start</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    )
  }

  render() {
    if (!this.state.display) { return null }
    return (
      <View style={style.container}>
        <View style={style.linearGradient}>
          <View style={style.scvWrapper}>
            <ScrollView
              style={style.scv} horizontal
              decelerationRate={0}
              snapToInterval={Dimensions.get('window').width}
              snapToAlignment='center'
              onScroll={this.handleScroll.bind(this)}
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={200}
            >
              <Page0 renderLeave={this.renderLeave()} />
              <Page1 renderLeave={this.renderLeave()} />
              <Page2 renderLeave={this.renderLeave()} />
            </ScrollView>
          </View>
        </View>
      </View>
    )
  }
}
export default Tour
