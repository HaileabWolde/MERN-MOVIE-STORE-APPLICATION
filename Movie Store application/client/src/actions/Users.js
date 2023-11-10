import * as api from '../api'
import { AUTH } from '../constants/actionType'
export const signUp = (info, navigate)=>async(dispatch)=>{
    try{
       
        const {data} = await api.signUp(info)
        console.log(data)
        dispatch({type: AUTH, payload: data })
        navigate('/')
    }
    catch(error){
        console.log(error)
    }
    
}

export const signIn = (info, navigate)=> async(dispatch)=>{
    try{
      
        const {data} = await api.signIn(info)
        dispatch({type: AUTH, payload: data})
        navigate('/')
    }
    catch(error){
        console.log(error)
    }
   
}