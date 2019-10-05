import React from 'react'
import { View, Text, Image } from 'react-native'
import style from '../style'
export default class extends React.Component {
  render() {
    return (
      <View style={[style.page, { backgroundColor: '#e91e63' }]}>
        <View style={style.imgWrapper}>
          <Image
            source={require('../../../assets/info.png')}
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
        {this.props.renderLeave}
      </View>
    )
  }
}
