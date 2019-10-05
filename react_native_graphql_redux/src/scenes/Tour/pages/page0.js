import React from 'react'
import { View, Text, Image } from 'react-native'
import style from '../style'
export default class extends React.Component {
  render() {
    return (
      <View style={[style.page, { backgroundColor: '#2196f3' }]}>
        <View style={style.imgWrapper}>
          <Image
            source={require('../../../assets/mr_icon.png')}
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
        {this.props.renderLeave}
      </View>
    )
  }
}
