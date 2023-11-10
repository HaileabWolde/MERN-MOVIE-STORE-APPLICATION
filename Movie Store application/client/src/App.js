import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import {Container} from '@material-ui/core'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import PostDetails from './components/MovieDetails/MovieDetails'
const App = ()=> {
  const user = JSON.parse(localStorage.getItem('profile'))
  return (
    <BrowserRouter>
      <Container maxWidth="xl" >
        <Navbar/>
        <Routes>
        <Route path="/" element={<Navigate to="/movies"/>} />
        <Route path="/movies" element={<Home/>}/>
        <Route path="/movies/search" element={<Home/>}/>
        <Route path="/movies/:id" element={<PostDetails/>}/>
        <Route path="/auth" element={user ? <Navigate to='/'/> : <Auth/>}/>
        </Routes>
    </Container>
    </BrowserRouter>
  
    
  )
}

export default App;