import * as actionTypes from '../constants/userinfo'

const initialState = {
  // cityName: '北京',
  // username: "feifei"
}

export default function userinfo (state = initialState, action) {
    switch (action.type) {
        case actionTypes.USERINFO_CITY:
            return action.payload.cityName
        case actionTypes.USERINFO_LOGIN:
            return action.payload.userName
        default:
            return state
    }
}
