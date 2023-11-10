import { combineReducers } from "redux";

import { movieReducer, setIdReducer } from "./Movies";
import  authReducer  from "./auth"

export default combineReducers({
    Movies: movieReducer,
    CurrentId: setIdReducer,
    auth: authReducer
})