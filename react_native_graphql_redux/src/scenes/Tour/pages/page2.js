import React from 'react'
import { View, Text, Image, Linking } from 'react-native'
import style from '../style'
export default class extends React.Component {
    render() {
        return (
            <View style={[style.page, { backgroundColor: '#ff5722' }]}>
                <View style={style.imgWrapper}>
                    <Image
                        source={require('../../../assets/github.png')}
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
                {this.props.renderLeave}
            </View>
        )
    }
}
