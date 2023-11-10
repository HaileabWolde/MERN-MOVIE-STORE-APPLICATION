import { FETCH_ALL, CREATE, EDIT, DELETE, LIKE, 
    Set_Current_Id, Clear_Id, FETCH_BY_SEARCH, 
    START_LOADING, END_LOADING, FETCH_Movie, COMMENT } from '../constants/actionType'
export const movieReducer = (state={ isloading: true, movies: []}, action)=> {
    switch(action.type){
        case START_LOADING:
            return {
                ...state,
                isloading: true
            }
        case END_LOADING:
            return {
                ...state,
                isloading: false
            }
        case FETCH_ALL:
            return {
                ...state,
                movies: action.payload.data,
                currentPage: action.payload.currentPage,
                numberofPages: action.payload.numberofPages
            }
        case  FETCH_BY_SEARCH:
            return {
                ...state,
                movies: action.payload
            }
        case COMMENT:
            return{
                ...state,
                movies: state.movies.map((movie)=> movie._id === action.payload._id ? action.payload : movie)
            }
        case FETCH_Movie:
            return {
                ...state,
                movie: action.payload
            }
        case CREATE:
            return {...state, movies: [...state.movies, action.payload]}
        case LIKE:
            return {
                ...state,
                movies: state.movies.map((movie)=> (movie._id === action.payload._id ? action.payload : movie))
            }
        case EDIT:
            return {
                ...state,
                movies: state.movies.map((movie)=> (movie._id === action.payload._id ? action.payload : movie))
            }
        case DELETE:
            return {...state, movies: state.movies.filter((movie)=> movie._id !== action.payload)}
        default:
            return state
    }
}
export const setIdReducer = (currentId=null, action)=> {
    switch(action.type){
        case Set_Current_Id:
            return action.payload
        case Clear_Id:
            return action.payload
        default:
            return currentId
    }
}