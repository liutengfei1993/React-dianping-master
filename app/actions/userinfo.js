import * as actionTypes from '../constants/userinfo'

export function update(cityName) {
    return {
        type: actionTypes.USERINFO_CITY,
        payload: {
          cityName: cityName
        }
    }
}
export function login(userName) {
    return {
        type: actionTypes.USERINFO_LOGIN,
        payload: {
          userName: userName
        }
    }
}
