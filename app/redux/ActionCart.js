import { ActionTypes } from './ActionTypes'

export const ActionCart = {
    set_cart: (data) => {
        return { type: ActionTypes.SET_CART, payload: data }
    }
}