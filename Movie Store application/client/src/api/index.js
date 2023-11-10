import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:4000' });

API.interceptors.request.use((req)=> {
    if (localStorage.getItem('profile')){
        const token = JSON.parse(localStorage.getItem('profile')).token
        req.headers.authorization = `Bearer ${token}`;
    }
    return req;
})


export const fetchMovies = (page) => API.get(`/movies?page=${page}`)
export const fetchMovies_by_search = (search)=> API.get(`/movies/search?searchInfo=${search || 'none'}`)
export const fetchMovie = (id)=>API.get(`/movies/${id}`)
export const createMovie = (data) => API.post('/movies', data)
export const handleComment = (comment, id)=> API.post(`/movies/${id}/addComment`, {comment})
export const likeMovie = (Id)=> API.patch(`/movies/${Id}/likePost`)
export const editMovie = (data, Id)=> API.patch(`/movies/${Id}`, data)
export const deleteMovie = (Id)=> API.delete(`/movies/${Id}`)
export const signUp = (data)=> API.post(`/users/signup`, data)
export const signIn = (data)=> API.post('/users/signin', data)
