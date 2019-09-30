import axios from 'axios'
export default async(token) => {
    const url = 'https://graph.facebook.com/106387220745073?fields=id,first_name,last_name,name,email,gender,picture&access_token=' + token
    let response = {
        firstName: undefined,
        lastName: undefined,
        displayName: undefined,
        gender: undefined,
        dob: undefined,
        email: undefined,
        picture: undefined,
        oauth2Id: undefined,
        provider: 'OFB',
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
    response.firstName = call.data.first_name
    response.lastName = call.data.last_name
    response.displayName = call.data.name
    response.email = call.data.email
    response.picture = call.data.picture.data.url
    response.oauth2Id = call.data.id
    if(call.data.gender) {
        let g;
        if(call.data.gender === 'male') { response.gender = "M"}
        if(call.data.gender === 'female') { response.gender = "F"}
    }
    return response
}