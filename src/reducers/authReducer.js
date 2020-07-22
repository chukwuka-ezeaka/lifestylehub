import constants from './constants'
// import User from '../middlewares/user.middleware';
// const user = new User();

export const authReducer = (state, action) => {

    switch(action.type){
        case constants.IS_LOGGED_IN:
            localStorage.setItem("user", JSON.stringify(action.data));
            // const payload = await user.getUser(action.data.id);
            // console.log(payload)
            return { 
                ...state,
                isAuthenticated: true,
                data: action.data,
            }
        case constants.IS_LOGGED_OUT:
            localStorage.clear();
            return { 
                ...state,
                isAuthenticated: false,
                data: null
            }
        default:
            return state
    }
}