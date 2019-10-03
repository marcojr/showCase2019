import React from 'react'
import {
  View, Text,
  TouchableWithoutFeedback, Image,
  ScrollView, Dimensions, Linking, AsyncStorage
} from 'react-native'
import style from './style'
import { faCircle, faDotCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Actions } from 'react-native-router-flux'

class Tour extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      page: 0,
      display: false
    }
    this.decideRoute()
  }

  decideRoute () {
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

  handleScroll (event) {
    const a = Math.round(event.nativeEvent.contentOffset.x / Dimensions.get('window').width)
    if (a === 0 || a === 1 || a === 2 || a === 3 || a === 4) {
      this.setState({ page: a })
    }
  }

  exit () {
    Actions.welcome()
  }

  renderBullets () {
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

  renderDiscover () {
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

  render () {
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
              <View style={[style.page, { backgroundColor: '#2196f3' }]}>
                <View style={style.imgWrapper}>
                  <Image
                    source={require('../../assets/mr_icon.png')}
                    style={[style.img, { width: 175, height: 175 }]}
                  />
                </View>
                <View style={style.titleWrapper}>
                  <Text style={style.title}>Hello</Text>
                </View>
                <View style={style.descWrapper}>
                  <Text style={[style.desc, { color: 'white' }]}>This is a short tour through</Text>
                  <Text style={[style.desc, { color: 'white' }]}>the app. Swipe right to paginate.</Text>
                </View>
                {this.renderDiscover()}
              </View>
              <View style={[style.page, { backgroundColor: '#e91e63' }]}>
                <View style={style.imgWrapper}>
                  <Image
                    source={require('../../assets/info.png')}
                    style={[style.img, { width: 175, height: 175 }]}
                  />
                </View>
                <View style={style.titleWrapper}>
                  <Text style={style.title}>Fake it :-)</Text>
                </View>
                <View style={style.descWrapper}>
                  <Text style={[style.desc, { color: 'white' }]}>It's just a demo app. You don't</Text>
                  <Text style={[style.desc, { color: 'white' }]}>need to enter your real data.</Text>
                  <Text style={[style.desc, { color: 'white' }]}>However the mobile number is</Text>
                  <Text style={[style.desc, { color: 'white' }]}>necessary to test 2-factor auth login.</Text>
                </View>
                {this.renderDiscover()}
              </View>
              <View style={[style.page, { backgroundColor: '#ff5722' }]}>
                <View style={style.imgWrapper}>
                  <Image
                    source={require('../../assets/github.png')}
                    style={[style.img, { width: 175, height: 175 }]}
                  />
                </View>
                <View style={style.titleWrapper}>
                  <Text style={style.title}>Clone it !</Text>
                </View>
                <View style={style.descWrapper}>
                  <Text style={[style.desc, { color: 'white' }]}>The source code is actually available </Text>
                  <Text style={[style.desc, { color: 'white' }]}>at
                    <Text
                      onPress={() => {
                        Linking.openURL('https://www.github.com/marcojr/showCase2019')
                      }} style={style.hyperlink}
                    > https://github.com/marcojr/showCase2019
                    </Text>
                  </Text>
                </View>
                {this.renderDiscover()}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    )
  }
}
export default Tour
