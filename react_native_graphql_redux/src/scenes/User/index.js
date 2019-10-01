import React from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import { getUser } from '../../redux/AppActions'
import style from './style'

class User extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    if (!this.props.user) { return null }
    return (
      <View>
        <Text>{this.props.authToken.data.token}</Text>
        <Text>{this.props.user.data.id}</Text>
      </View>)
  }

  componentDidMount () {
    this.props.getUser(this.props.authToken.data.token)
  }
}
const mapStateToProps = state => (
  {
    authToken: state.AppReducer.authToken,
    user: state.AppReducer.user
  }
)
export default connect(mapStateToProps,
  {
    getUser
  })(User)
