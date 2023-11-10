import * as api from '../api'
import { FETCH_ALL, CREATE, EDIT, DELETE, 
    LIKE, Set_Current_Id, Clear_Id, 
    FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_Movie, COMMENT } from '../constants/actionType'

//actionCreators
export const getMovies = (page)=>async(dispatch)=>  {
    try{
        dispatch({type: START_LOADING})
        const {data: {data, currentPage, numberofPages}}  = await api.fetchMovies(page)
       dispatch({type: FETCH_ALL, payload: {data, currentPage, numberofPages}})
       dispatch({type: END_LOADING})
    }
    catch(error){
        console.log(error)
    }
}
export const getMovie = (id)=> async(dispatch)=> {
    try{
        dispatch({type: START_LOADING})
        const {data: {Movie}} = await api.fetchMovie(id)
       dispatch({type: FETCH_Movie, payload: Movie})
      dispatch({type: END_LOADING})
      
    }
    catch(error){

    }
}
export const searchPost = (search)=>async(dispatch)=> {
    try{
        dispatch({type: START_LOADING})
        const {data} = await api.fetchMovies_by_search(search)
        const {posts} = data
        dispatch({type:  FETCH_BY_SEARCH, payload: posts})
        dispatch({type: END_LOADING})
        
    }
    catch(error){
        console.log(error)
    }
}

export const createMovie = (recievedData)=> async(dispatch)=> {
    try{
        dispatch({type: START_LOADING})
        const {data} = await api.createMovie(recievedData)
        dispatch({type: CREATE, payload: data})
        dispatch({type: END_LOADING})
    }
    catch(error){
        console.log(error)
    }
}
export const  handleAllComment = (comment, id)=> async(dispatch)=> {
    try{
        const {data} = await api.handleComment(comment, id)
      
        dispatch({type: COMMENT, payload: data})
        return data.comments
    }
    catch(error){
        console.log(error)
    }
}

export const editMovie = (recievedData, Id)=> async(dispatch)=> {
    try{
        dispatch({type: START_LOADING})
        const {data} = await api.editMovie(recievedData, Id)
        dispatch({type: EDIT, payload: data})
        dispatch({type: END_LOADING})
    }
    catch(error){
        console.log(error)
    }
}
export const deleteMovie = (Id)=> async(dispatch)=> {
    try{
        dispatch({type: START_LOADING})
        await api.deleteMovie(Id)
        dispatch({type: DELETE, payload: Id})
        dispatch({type: END_LOADING})
    }
    catch(error){
        console.log(error)
    }
}
export const likeMovie = (Id)=> async(dispatch)=>{
    try{
       
        const {data} = await api.likeMovie(Id)
        dispatch({type: LIKE, payload: data})
    }
    catch(error){
        console.log(error)
    }
}
export const  handleId = (id) => (
    {
        type: Set_Current_Id,
        payload: id
    }
)

export const clearId = (id)=> (
    {
        type: Clear_Id,
        payload: id
    }
)