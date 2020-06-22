import constants from './constants'
export const authReducer = (state, action) => {

    switch(action.type){
        case constants.IS_LOGGED_IN:
            return { 
                ...state,
                ...action.data,
            }
        default:
            return state
    }
}