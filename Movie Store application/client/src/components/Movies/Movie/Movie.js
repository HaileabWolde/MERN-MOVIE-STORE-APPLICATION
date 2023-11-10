import { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import {useLocation } from "react-router-dom"
import { Card, CardActions, CardContent, CardMedia, Button, Typography} from "@material-ui/core/"
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import { useDispatch } from "react-redux"
import { handleId, deleteMovie, likeMovie } from "../../../actions/Movies"
 const Movie = ({movie})=> {
   
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    
    const location = useLocation()
    const dispatch = useDispatch()

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('profile')))
       
      }, [location]);
    const Likes = ()=>{
        if(movie.likes.length > 0){
            return movie.likes.find((like) => like === user?.result?._id) ?
            (
                <><ThumbUpAltIcon fontSize="small" />&nbsp;{movie.likes.length > 2 ? `You and ${movie.likes.length - 1} others` : `${movie.likes.length} like${movie.likes.length > 1 ? 's' : ''}` }</>
              ) : (
                <><ThumbUpAltOutlined fontSize="small" />&nbsp;{movie.likes.length} {movie.likes.length === 1 ? 'Like' : 'Likes'}</>
              );
        }
        return <><ThumbUpAltOutlined fontSize="small"/>&nbsp;Like</>;
    }
    const handleEditClick = (event) => {
        event.preventDefault()
        event.stopPropagation();
        dispatch(handleId(movie._id));
      };
    return(
        <Card className="relative mx-2 my-2" style={{backgroundColor: '#04293A', borderRadius: '15px'}} >
            <Link to={`/movies/${movie._id}`}>
            <CardMedia className="py-[35%]"
                image={movie.selectedFile}
                title={movie.title}
            />
            <div className="absolute top-5 left-5">
                <Typography variant="h6" style={{color: 'white'}}>{movie.name} </Typography>
                <Typography variant="body2" style={{color: 'white'}}>{moment(movie.createdAt).fromNow()}</Typography>
            </div>
            
            {(user?.result?._id === movie.creator) && 
            
           <div className="absolute top-5 right-5">  
                <Button style={{color: 'white'}} onClick={handleEditClick}> 
             
                <MoreHorizIcon/>
                </Button> 
                
            </div>
            }
            <Typography variant="body2" component="h2" style={{color: '#A7C7E7', fontFamily: 'Montserrat',  letterSpacing: "0.05rem"}} className="pl-4 pt-2 ">{movie.genre.map((tag)=> `#${tag} `)}</Typography>
            <CardContent>
            <Typography variant="h4" style={{color: '#A7C7E7',  letterSpacing: "-0.05rem", fontFamily: 'Poppins' }}> {movie.title}</Typography>
            </CardContent>

            </Link>
         
            <CardActions className="flex justify-between" >
                <Button size="large" style={{color: '#4CAF50'}} disabled={!user?.result} onClick={()=> dispatch(likeMovie(movie._id))}>
                    <Likes/>
                </Button>
                {(user?.result?._id === movie.creator) &&
                <Button size="large" style={{color: '#FF5722'}} onClick={()=> dispatch(deleteMovie(movie._id))}>
                    <DeleteIcon fontSize="small"/>
                    </Button> 
                }
                
            </CardActions>
        </Card>
    )
}
export default Movie