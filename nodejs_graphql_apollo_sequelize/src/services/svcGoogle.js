import axios from 'axios'
export default async(token) => {
    const url = 'https://www.googleapis.com/oauth2/v3/userinfo?access_token=' + token
    let response = {
        firstName: undefined,
        lastName: undefined,
        displayName: undefined,
        gender: undefined,
        dob: undefined,
        email: undefined,
        picture: undefined,
        oauth2Id: undefined,
        provider: 'OGO',
        password: undefined,
        successfully: false,
        error: undefined
    }
    let call
    try {    
        call = await axios.get(url)
    } 
    catch(error) {
        response.successfully = false
        response.error = error
        return response
    }
    response.successfully = true
    response.firstName = call.data.given_name
    response.lastName = call.data.family_name
    response.displayName = call.data.name
    response.email = call.data.email
    response.picture = call.data.picture
    response.oauth2Id = call.data.sub 
    if(call.data.gender) {
        let g;
        if(call.data.gender === 'Male') { response.gender = "M"}
        if(call.data.gender === 'Female') { response.gender = "F"}
        if(call.data.gender === 'Unknow') { response.gender = "U"}
    }
    return response
}