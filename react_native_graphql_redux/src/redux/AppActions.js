import { SET_AUTH_TOKEN, SET_USER } from './types'
import { graphqlServer } from '../config/servers'
import { request, GraphQLClient } from 'graphql-request'
import {  GQL_LOGIN, 
          GQL_COMPLETE_LOGIN, 
          GQL_CREATE_USER,
          GQL_LOGOFF, GQL_TERMINATE } from '../graphQL/mutation'
import { GQL_GETUSER } from '../graphQL/query'
export const login = (email, password) => {
  const vars = { email, password, provider: 'UEP' }
  return dispatch => {
    return request(graphqlServer, GQL_LOGIN, vars).then(res =>
      dispatch({
        type: SET_AUTH_TOKEN,
        payload: {
          data: res.login
        }
      }))
      .catch(ex =>
        dispatch({
          type: SET_AUTH_TOKEN,
          payload: {
            error: ex
          }
        }))
  }
}
export const completeLogin = (userid, code) => {
  const vars = { userid, code }
  return dispatch => {
    return request(graphqlServer, GQL_COMPLETE_LOGIN, vars).then(res =>
      dispatch({
        type: SET_AUTH_TOKEN,
        payload: {
          data: res.completeLogin
        }
      }))
      .catch(ex =>
        dispatch({
          type: SET_AUTH_TOKEN,
          payload: {
            error: ex
          }
        }))
  }
}
export const createUser = (userVars) => {
  const vars = {
    dob: userVars.dob,
    email: userVars.email,
    firstName: userVars.firstName,
    gender: userVars.gender,
    lastName: userVars.lastName,
    password: userVars.password,
    phone: userVars.phone,
    picture: userVars.picture
  }
  return dispatch => {
    return request(graphqlServer, GQL_CREATE_USER, vars).then(res =>
      dispatch({
        type: SET_AUTH_TOKEN,
        payload: {
          data: res.createUser
        }
      }))
      .catch(ex =>
        dispatch({
          type: SET_AUTH_TOKEN,
          payload: {
            error: ex
          }
        }))
  }
}
export const getUser = (authToken) => {
  const graphQLClient = new GraphQLClient(graphqlServer, {
    headers: {
      Authorization: 'Bearer ' + authToken
    }
  })
  return dispatch => {
    return graphQLClient.request(GQL_GETUSER).then(res =>
      dispatch({
        type: SET_USER,
        payload: {
          data: res.getUser
        }
      })
    )
      .catch(ex =>
        dispatch({
          type: SET_USER,
          payload: {
            error: ex
          }
        }))
  }
}
export const logoff = (authToken, terminate) => {
  const graphQLClient = new GraphQLClient(graphqlServer, {
    headers: {
      Authorization: 'Bearer ' + authToken
    }
  })
  return dispatch => {
    return graphQLClient.request(terminate ? GQL_TERMINATE : GQL_LOGOFF).then(() =>
      dispatch({
        type: SET_USER,
        payload: {
          data: undefined
        }
      })
    )
      .catch(ex =>
        dispatch({
          type: SET_USER,
          payload: {
            error: ex
          }
        }))
  }
}
