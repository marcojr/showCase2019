import React from 'react'
import { Animated, Text } from 'react-native'
import style from './style'
class Toaster extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      height: new Animated.Value(0)
    }
  }

  componentWillReceiveProps (nextProps) {
    const { msg } = this.props
    if (nextProps.msg !== msg) {
      if (nextProps.msg !== '') {
        Animated.timing(
          this.state.height,
          { toValue: 100 }
        ).start(() => {
          Animated.timing(
            this.state.height,
            { toValue: 0, delay: 3000 }
          ).start(() => {
            this.props.onFinished()
          })
        })
      }
    }
  }

  render () {
    return (
      <Animated.View style={[style.container, { height: this.state.height }]}>
        <Text style={style.text}>{this.props.msg}</Text>
      </Animated.View>
    )
  }
}
export default Toaster
