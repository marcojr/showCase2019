import React from 'react'
import { connect } from 'react-redux'
import { View, 
  ImageBackground, 
  Image, 
  Text, 
  TouchableOpacity, 
  FlatList, Platform, Dimensions } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { getUser } from '../../redux/AppActions'
import style from './style'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSignOutAlt, faTrashAlt, faChevronRight } from '@fortawesome/free-solid-svg-icons'



class User extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      data: []
    }
  }
  addData(field, value){
    data = Object.assign(this.state.data)
    data.push({
      key: Math.random(),
      field, value
    })
    this.setState({data})
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
  render() {
    console.log(this.props.user)
    if (!this.props.user) { return null }
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

            }}
            >
              <View style={[style.bt1Wrapper, { borderColor: 'black' }]}>
                <FontAwesomeIcon size={16} style={style.bt1Icon} icon={faSignOutAlt} />
                <Text style={style.bt1PhoneTxt}>Logout</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { }}>
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
                <View style={{paddingRight: 15, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                  <Text style={{fontSize: 15}}>{item.field}</Text>
                  <View style={{display: 'flex', flexDirection: 'row'}}>
                    <Text style={{marginRight: 5, fontWeight: 'bold', color: '#c0c0c0'}}>{item.value}</Text>
                    <FontAwesomeIcon size={16} style={{color: '#eaeaea'}} icon={faChevronRight} />
                  </View>
                </View>}
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
    console.log(56,DeviceInfo.getBrand())
    const getGender = (G) => {
      if(G === "M") { return "Male"}
      if(G === "F") { return "Female"}
      if(G === "U") { return "Prefer to not say"}
    }
    this.props.getUser(this.props.authToken.data.token).then(async r =>{
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
    getUser
  })(User)
