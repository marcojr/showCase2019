export const GQL_GETUSER = ` 
query GetUser {
    getUser {
      id
    }
  }
`
export const GQL_COUNT_USER = `
query 
  CountUser($email: String, $phone: String) 
    {
      countUsers
      (
        email: $email,
        phone : $phone
      ) 
      { emailFound, phoneFound }
    }
`