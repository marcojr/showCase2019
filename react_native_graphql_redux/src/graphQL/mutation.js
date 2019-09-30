export const GQL_LOGIN = ` 
  mutation 
      Login($email: String!, $password: String!, $provider: String!) 
      {
        login(
          email: $email, 
          password: $password,
          provider: $provider
        )
        { token, expiresOn }
      }     
`

export const GQL_CREATE_PHONE_CHALLENGE = `
mutation 
  CreatePhoneChallenge($phone: String!)
  {
    createPhoneChallenge(
      phone: $phone
    ) 
    { USER_id, expiresOn}
  }
`
export const GQL_COMPLETE_LOGIN = `
mutation
  CompleteLogin($userid: String!, $code: String!) 
  {
    completeLogin
    (
      USER_id: $userid,
      code: $code
    ) 
    { token, expiresOn }
  }
`
export const GQL_CREATE_USER = `
mutation
  CreateUser(
      $email: String!, 
      $password: String!, 
      $picture: String, 
      $firstName: String!, 
      $lastName: String!, 
      $phone: String!, 
      $gender: String!, 
      $dob: String!) 
  {
    createUser(
      email: $email, 
      password: $password, 
      firstName: $firstName,
      lastName: $lastName,
      phone: $phone,
      picture: $picture,
      gender: $gender,
      dob: $dob
    ) 
    { token, expiresOn }
  }
`
