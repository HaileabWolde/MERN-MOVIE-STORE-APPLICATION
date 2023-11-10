import { useState } from 'react';
import {Grow, Container, Paper, Avatar, Typography, Grid, Button} from '@material-ui/core'
import {useDispatch } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useTheme } from '@material-ui/core/styles';
import Input from './Input';
import { signIn, signUp } from '../../actions/Users';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };
const Auth = ()=> {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const theme = useTheme();
  const secondaryColorRGB = theme.palette.secondary.main;
  const [sign, isSign] = useState(true)
  const [pass, setPass] = useState(true)
  const [data, setData] = useState(initialState)

const handleSign = ()=> {
isSign((prev)=> !prev)
}
  const handleShowPassword = ()=>{
    setPass((prev)=> !prev)
  }
  const handleChange = (e)=> {
    setData({...data, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e)=> {
   e.preventDefault()
    
    if(sign){
      dispatch(signUp(data, navigate))
    }
    else{
      dispatch(signIn(data, navigate))
    }

  }
    return (
        <Grow in>
             <Container maxWidth="xs">
               <Paper className='flex flex-col items-center justify-center py-4 mb-4 mt-10' >
              <Avatar style={{backgroundColor: secondaryColorRGB  }} className='mb-2'><LockOutlinedIcon /></Avatar>
              <Typography variant="h5" style={{marginBottom:'8px'}}>{sign ? 'SignUp' : 'SignIn'} </Typography>
              <form onSubmit={(e)=> handleSubmit(e)} className='px-4'>
                <Grid container spacing={2}>
                {sign && (
                  <>
                   <Input name="firstName" type="text" label="First Name" half handleChange={handleChange} autoFocus/>
                  <Input name="lastName" type="text" label="Last Name" half handleChange={handleChange}/>
                  </> )}
                  <Input name="email" type="email" label="Email Address" handleChange={handleChange}/>
                  <Input name="password" type= {pass ? 'password' : 'text'} label="Password" handleChange={handleChange} handleShowPassword={handleShowPassword}/>
                  {
                    sign && 
                    <>
                    <Input name="confirmPassword" type="password" label="Repeat Password" handleChange={handleChange}/>
                    </>
                  }
                
               <Button variant='contained' color="primary" fullWidth type="submit">{sign ? 'SIGN UP' : 'SIGN IN'}</Button>
               <Button onClick={handleSign} style={{ margin: 'auto'}}>{sign ? 'Have an account ? Sign In' : `Don't have an account ? Sign Up`}</Button>
               </Grid>
              </form>
               </Paper>
             </Container>
        </Grow>
       
    )
}
export default Auth