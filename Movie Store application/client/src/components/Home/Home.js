import { useState , useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Grow, Container, Grid , Paper, AppBar, TextField, Button, Divider} from "@material-ui/core"
import { useDispatch, useSelector} from "react-redux"
import {searchPost, getMovies} from '../../actions/Movies'
import Movies from '../Movies/Movies'
import Form from '../Form/Form'
import Paginate from '../Pagination/Pagination'
import ButtonCompo from '../ButtonCompo/ButtonCompo'

function useQuery(){
  return new URLSearchParams(useLocation().search)
}

const Home = ()=> {
  
    const {isloading} = useSelector((state)=> state.Movies)
    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const query = useQuery()
    const page = query.get('page') || 1
    const [search, setSearch] = useState('')
    const [series, setSeries] = useState('')
    const [movies, setMovie] = useState('')

    const  handlekeyPress = (e)=> {
      if(e.keyCode === 13){
        searchMovie()
      }
    }
    const searchMovie = ()=> {
      if(search){
      
        dispatch(searchPost(search))
        Navigate(`/movies/search?${search}`)
      }
      else{
        Navigate('/')
      }
     
    }
    useEffect(()=>{
      if(page){
       
        dispatch(getMovies(page))
      }
      
    }, [dispatch, page])
    return(
        <Grow in>
    <Container maxWidth="xl">
    <Grid container className=" flex flex-col-reverse md:flex-row" justify="space-between" alignItems="stretch" spacing={3}>
  
         <Grid item xs={12} sm={6} md={9}>
         <div className=' w-[80%] md:w-screen flex justify-center mt-20'>
          <div className='md-[30%] flex '>
          <TextField
                    variant='outlined'
                 label="Search By Memories"
                    name="Search"
                    fullWidth 
                    onKeyDown={handlekeyPress}
                    value={search}
                    onChange={(e)=> setSearch(e.target.value)}
                    style={{backgroundColor: '#f7f8fc' , borderRadius: '15px 0 0 15px' }}
                  
                    />
                  
                    <Button 
                    color="primary"
                    variant="contained"
                    onClick={()=> searchMovie()}
                     >Search</Button>
          </div>
         
         </div>
       
        
         <ButtonCompo  searchPost={searchPost}  setSeries={ setSeries} setMovie={setMovie} movies={movies} series={series}/>
         <Divider  className='w-screen' style={{backgroundColor: '#009CC5', opacity:'80%', marginBottom:'10px'}}></Divider>
           <Movies/>
           {  ( !isloading && !search && !series && !movies) &&
            <div className='flex justify-center w-screen'>
            <Paper style={{backgroundColor: '#1A1A1A'}}  className="flex justify-center">
            <Paginate page={page}/>
            </Paper>
            </div> 
           }        
         </Grid>
         <Grid item xs={12} md={3}>
           <Form/>
           
         </Grid>
       </Grid>
    </Container> 
   </Grow> 
    )
    
}
export default Home