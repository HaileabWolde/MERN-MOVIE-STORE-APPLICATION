import { AppBar, Avatar, Typography, Button } from "@material-ui/core"
import { useEffect, useState } from "react"
import {useDispatch} from 'react-redux'
import {useLocation, useNavigate } from "react-router-dom"
import {Link} from 'react-router-dom'
import MovieStore from '../images/MovieStore.png'


const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('profile')))
  }, [location])
  
  const LOGOUT = ()=>{
    
    dispatch({type: 'LOGOUT'})
    navigate('/')
    setUser(null)  
    
  }
   
  return (
    <AppBar position='static' style={{ backgroundColor: '#301E67', flexDirection: "row", justifyContent: 'space-between'}} className='rounded-[15px] items-center mt-4 px-10'>
      <div>
        <Link to="/">
        <img src={MovieStore} className="h-20" alt="MovieStore"/>
        </Link>
      </div>
      <div>
        {user ? (
          <div className="flex items-center justify-between space-x-4">
            <Avatar src={user?.result?.imageUrl} alt={user?.result?.name} style={{backgroundColor: '#04293A'}}>
              {user?.result.name.charAt(0)}
            </Avatar> 
            <Typography variant="h6">{user?.result.name}</Typography>
            <Button variant="contained" color="secondary" onClick={()=> LOGOUT()}>
              Logout
            </Button>
          </div>
        ) : (
            <Link to="/auth">
            <Button variant="contained" style={{ backgroundColor: '#150050', color: '#EBC60A', marginTop: '1rem' }}>SIGN IN</Button>
            </Link>
          
        )}
      </div>
    </AppBar>
  );
}

export default Navbar;