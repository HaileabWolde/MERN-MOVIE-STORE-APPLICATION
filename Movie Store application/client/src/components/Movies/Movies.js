import { useSelector } from 'react-redux'
import { Grid , CircularProgress} from '@material-ui/core'
import Movie from './Movie/Movie'

 const Movies= ()=> {
    const {movies, isloading} = useSelector((state)=> state.Movies)
    return(
      isloading ? <CircularProgress style={{ display: 'flex', justifyContent: 'center', marginTop: '90px', width: '100%', height: '12vh'}}/> : (
         
        <Grid container spacing={2} style={{marginTop: '7rem'}}>
            {movies.map((movie)=> (
                <Grid item xs={12}  md={6} lg={4}  key={movie._id}>
                <Movie movie={movie}/>
                </Grid>
            ))}
        </Grid>
      )
    )
}
export default Movies