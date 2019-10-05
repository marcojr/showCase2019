import React from 'react'
import { View, Image, TouchableWithoutFeedback, TouchableOpacity, Text } from 'react-native'
import style from '../style'
import { faCamera, faImages } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import ImagePicker from 'react-native-image-crop-picker'
export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            imageSelected: undefined
        }
    }
    selectFromGallery() {
        ImagePicker.openPicker({
            width: 2048,
            height: 2048,
            cropping: true,
            multiple: false,
            mediaType: 'photo'
        }).then(imageSelected => {
            this.setState({ imageSelected: imageSelected.path })
        })
    }

    selectFromCamera() {
        ImagePicker.openCamera({
            width: 2048,
            height: 2048,
            cropping: true,
            mediaType: 'photo'
        }).then(imageSelected => {
            this.setState({ imageSelected: imageSelected.path })
        })
    }
    done() {
        this.props.onDone(this.state.imageSelected)
    }
    renderSelectedPicture() {
        return (
            <View style={style.selection}>
                <Image style={style.picture} source={{ uri: this.state.imageSelected }} />
            </View>)
    }
    renderSelectSource() {
        return (
            <View style={style.selection}>
                <View style={style.picSelectButtons}>
                    <TouchableWithoutFeedback onPress={() => {
                        this.selectFromCamera()
                    }}
                    >
                        <View style={style.btnPicSource}>
                            <FontAwesomeIcon size={32} style={style.btnPicSourceIcon} icon={faCamera} />
                            <Text style={style.btnPicSourceTxt}>
                                Select from
                  </Text>
                            <Text style={style.btnPicSourceTxt}>
                                Camera
                  </Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {
                        this.selectFromGallery()
                    }}
                    >
                        <View style={style.btnPicSource}>
                            <FontAwesomeIcon size={32} style={style.btnPicSourceIcon} icon={faImages} />
                            <Text style={style.btnPicSourceTxt}>
                                Select from
                  </Text>
                            <Text style={style.btnPicSourceTxt}>
                                Album
                  </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

            </View>)
    }
    render() {
        return (
            <View style={style.pictureForm}>
                {!this.state.imageSelected
                    ? this.renderSelectSource()
                    : this.renderSelectedPicture()}
                <TouchableOpacity onPress={() => {
                    this.done()
                }}
                >
                    <Text style={style.buttonNextTxt} />
                    <View style={[style.buttonSpacing, style.button, style.buttonFinish]}>
                        <Text style={style.buttonFinishTxt}>Finish</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}
