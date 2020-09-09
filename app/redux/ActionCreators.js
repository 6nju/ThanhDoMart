import { ActionTypes } from './ActionTypes'

export const ActionCreators = {
    set_user_login: (data) => {
        return { type: ActionTypes.SET_USER_LOGIN, payload: data }
    },
}