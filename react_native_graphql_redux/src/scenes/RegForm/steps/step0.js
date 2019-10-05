import React from 'react'
import { View, Text, Animated, TouchableOpacity } from 'react-native'
import style from '../style'
export default class extends React.Component {
    render() {
        return (
            <View style={style.fields}>
                <Animated.View style={[style.fieldWrapper,
                { left: this.props.field1Left }]}
                >
                    <Text style={style.getStarting}>
                        {this.props.desc}
                    </Text>
                </Animated.View>
                <TouchableOpacity onPress={() => {
                    this.props.onDone()
                }}
                >
                    <View style={[style.buttonSpacing, style.button, style.buttonNext]}>
                        <Text style={style.buttonNextTxt}>
                            Let's Go !
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
