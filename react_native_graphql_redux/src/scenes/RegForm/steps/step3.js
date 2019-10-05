import React from 'react'
import { View, Animated } from 'react-native'
import DatePicker from 'react-native-datepicker'
import RNPickerSelect from 'react-native-picker-select'
import style from '../style'
export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gender: '',
            dob: ''
        }
    }
    done() {
        if (this.state.gender === '' || this.state.dob === '') {
            this.props.onError('Gender and Birthday are both mandatory')
            return
        }
        this.props.onDone(this.state.gender, this.state.dob)
    }
    render() {
        return (
            <View style={style.fields}>
                <Animated.View style={[style.fieldWrapper, { left: this.state.field1Left }]}>
                    <View style={style.input}>
                        <RNPickerSelect
                            onDonePress={() => {
                                if (this.state.dob && this.state.gender) {
                                    setTimeout(() => {
                                        this.done()
                                    }, 500)
                                }
                            }}
                            onValueChange={gender => {
                                this.setState({ gender })
                            }}
                            value={this.state.gender}
                            placeholder={{
                                label: 'Gender'
                            }}
                            style={{
                                placeholderColor: 'red',
                                inputIOS: {
                                    fontSize: 25,
                                    height: 18,
                                    color: 'white'
                                }
                            }}
                            items={[
                                { label: 'Male', value: 'M' },
                                { label: 'Female', value: 'F' },
                                { label: 'Prefer not to say', value: 'U' }
                            ]}
                        />
                    </View>
                </Animated.View>
                <Animated.View style={[style.fieldWrapper, { left: this.state.field2Left }]}>
                    <View style={style.input}>
                        <DatePicker
                            style={{ height: 5 }}
                            date={this.state.dob}
                            mode='date'
                            placeholder='Birthday'
                            format='YYYY-MM-DD'
                            minDate='1940-01-01'
                            maxDate='2005-12-31'
                            confirmBtnText='Confirm'
                            cancelBtnText='Cancel'
                            customStyles={{
                                dateIcon: {
                                    display: 'none'
                                },
                                dateInput: {
                                    borderWidth: 0,
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    justifyContent: 'flex-start',
                                    marginTop: -11
                                },
                                dateText: {
                                    color: 'white',
                                    fontSize: 25
                                },
                                placeholderText: {
                                    fontSize: 25
                                },
                                datePicker: {
                                    backgroundColor: this.props.useDarkMode ? '#222' : 'white'
                                },
                                datePickerCon: {
                                    backgroundColor: this.props.useDarkMode ? '#333' : 'white'
                                }
                            }}
                            onDateChange={
                                dob => {
                                    this.setState({ dob })
                                    if (this.state.gender) {
                                        setTimeout(() => {
                                            this.done()
                                        }, 500)
                                    }
                                }
                            }
                        />
                    </View>
                </Animated.View>
            </View>)
    }
}
