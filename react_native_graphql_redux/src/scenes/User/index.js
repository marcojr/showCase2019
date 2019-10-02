import React from 'react'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import {
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  FlatList, Platform, Dimensions, Alert
} from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { getUser, logoff } from '../../redux/AppActions'
import style from './style'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSignOutAlt, faTrashAlt, faChevronRight } from '@fortawesome/free-solid-svg-icons'


class User extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  addData(field, value) {
    data = Object.assign(this.state.data)
    data.push({
      key: Math.random(),
      field, value
    })
    this.setState({ data })
  }
  getListViewItem = (item) => {
    Alert.alert(item.key);
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          borderColor: "#eaeaea",
          borderBottomWidth: 1,
          marginTop: 15,
          marginBottom: 15
        }}
      />
    )
  }
  renderRow(item) {
    return (
      <View style={style.itemRowWrapper}>
        <Text style={style.field}>{item.field}</Text>
        <View style={style.valueWrapper}>
          <Text style={style.value}>{item.value}</Text>
          <FontAwesomeIcon size={16} style={style.chevron} icon={faChevronRight} />
        </View>
      </View>)
  }
  terminate() {
    Alert.alert(
      'Are you sure ?',
      'This will terminate your account and all of your data will be erased from our database permanently.',
      [
        { text: 'NO' },
        {
          text: 'YES', onPress: () => {
            this.props.logoff(this.props.authToken.data.token, true).then(() => {
              Actions.welcome()
            })
          }
        },
      ]
    )
  }
  render() {
    if (!this.props.user.data) { return null }
    return (
      <ImageBackground
        blurRadius={0}
        style={style.page}
        source={require('../../assets/bkg1.png')}>
        <View style={style.secondBackground} />
        <View style={style.core}>
          <Image
            style={style.picture}
            source={{ uri: this.props.user.data.picture }}
          />
          <View style={style.actionButtons}>
            <TouchableOpacity onPress={() => {
              this.props.logoff(this.props.authToken.data.token, false)
              Actions.welcome()
            }}
            >
              <View style={[style.bt1Wrapper, { borderColor: 'black' }]}>
                <FontAwesomeIcon size={16} style={style.bt1Icon} icon={faSignOutAlt} />
                <Text style={style.bt1PhoneTxt}>Logout</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                this.terminate()
            }}>
              <View style={style.bt2Wrapper}>
                <FontAwesomeIcon size={16} style={style.bt2Icon} icon={faTrashAlt} />
                <Text style={style.bt2Txt}>
                  Delete Account
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={style.data}>
            <FlatList
              data={this.state.data}
              renderItem={({ item }) =>
                this.renderRow(item)
              }
              ItemSeparatorComponent={this.renderSeparator}
            />
          </View>
          <View style={style.names}>
            <Text style={style.name}>{this.props.user.data.firstName}</Text>
            <Text style={style.name}>{this.props.user.data.lastName}</Text>
          </View>
        </View>

      </ImageBackground>)
  }
  componentDidMount() {
    const getGender = (G) => {
      if (G === "M") { return "Male" }
      if (G === "F") { return "Female" }
      if (G === "U") { return "Prefer to not say" }
    }
    this.props.getUser(this.props.authToken.data.token).then(async r => {
      this.addData('E-Mail', r.payload.data.email)
      this.addData('Mobile', r.payload.data.phone)
      this.addData('Gender', getGender(r.payload.data.gender))
      this.addData('Birthday', r.payload.data.dob)
      this.addData('OS Name', Platform.OS)
      this.addData('OS Version', Platform.Version)
      this.addData('Screen Width', Dimensions.get('window').width)
      this.addData('Screen Height', Dimensions.get('window').height)
      this.addData('Device Brand', await DeviceInfo.getBrand())
      this.addData('Device Model', await DeviceInfo.getModel())
      this.addData('Device Type', await DeviceInfo.getDeviceType())
      this.addData('Device Memory', await DeviceInfo.getTotalMemory() / 1024 / 1024 / 1024 + ' Gb')
      this.addData('Device Storage', Math.floor(await DeviceInfo.getTotalDiskCapacity() / 1024 / 1024 / 1024) + ' Gb')
    })
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
    getUser, logoff
  })(User)
