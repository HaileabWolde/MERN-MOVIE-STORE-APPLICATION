import { AUTH, LOGOUT } from "../constants/actionType";

 const authReducer = (user={authData: null}, action)=>{
    switch(action.type){
        case AUTH:
            localStorage.setItem('profile', JSON.stringify({...action?.payload}))
            return{...user, authData: action.payload}
        case LOGOUT:
            localStorage.clear()
            return{...user, authData: null}
        default:
            return user
    }
}
export default authReducer