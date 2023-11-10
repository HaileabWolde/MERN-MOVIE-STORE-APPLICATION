import {useEffect, useState, useRef} from 'react'
import { Link } from 'react-router-dom'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Paper, CircularProgress, Typography, Divider} from '@material-ui/core/'
import { getMovie, searchPost, handleAllComment} from '../../actions/Movies'
import CommentDetails from '../CommentDetails/CommentDetails'
import Comments from '../CommentDetails/Comment'
const PostDetails = ()=> {
    const dispatch = useDispatch()
    const {id} = useParams()
    const commentsRef = useRef(null)
    const {movie, movies, isloading} = useSelector((state)=> state.Movies)
    const [user, setUser]  = useState(JSON.parse(localStorage.getItem('profile')))
    const [comment, setComment] = useState('')
    const [AllComments, setAllComments] = useState([])

    useEffect(()=>{
        dispatch(getMovie(id))
    }, [id])

    useEffect(()=>{
        if(movie){
            dispatch(searchPost(movie.genre.join(',')))
        }
        setAllComments(movie?.comments)
       
    }, [movie])

    if(!movie) return null;

   if(isloading){
    return ( 
              <CircularProgress style={{ display: 'flex', justifyContent: 'center', marginTop: '80px', width: '100%', height: '12vh'}}/>
    )
   }
   const handleComment = async ()=> {
    const AllComment = `${user?.result?.name}: ${comment}`
    setAllComments(await dispatch(handleAllComment(AllComment, movie._id))) 
    setComment('')
    commentsRef.current.scrollIntoView({ behavior: 'smooth'})
}
   const recommendPost = movies.filter(({_id})=> _id !== movie._id)
   
   return (
    <Paper className="mt-12 pt-8" style={{backgroundColor: '#03001C',  borderRadius: '10px'}}>
        <div className='md:flex'>
        <div className='ml-[60px] md:ml-0 mb-8'>
        <Typography variant="h3"  style={{color: 'white', fontFamily: 'Montserrat', letterSpacing: '-0.1rem'  , marginLeft: '25px', marginBottom: '7px', lineHeight: '3rem'}}>{movie.title}</Typography>
        <Typography variant="subtitle2" style={{color: 'white', fontFamily: 'Poppins', marginLeft: '45px', letterSpacing: '0.08rem'}}>{movie.genre.map((each)=> `#${each} `)}</Typography>
       <img  className=' w-[350px] h-[350px]  mt-6 md:mb-10 rounded-[10px] ml-5  transition-opacity hover:opacity-75  border-2 border-gray-800'  src={movie.selectedFile} alt={movie.name}/>
        </div>
        <div className='border-[1.2px] border-[#009CC5] ml-14 mb-4 hidden md:flex' style={{ borderColor: 'rgba(0, 156, 197, 0.3)' }}></div>
        <div className='mb-[100px]'> 
            <div className='flex justify-center'>
            <Typography variant="h4" gutterBottom style={{color: 'white',  fontFamily: 'sans', letterSpacing: '-0.01rem' }}> About This Movie</Typography>
            </div>
           
            <Typography variant="body1" style={{color: 'white', marginLeft: '40px', letterSpacing: '0.04rem', lineHeight: '1.6rem'}}>{movie.description}</Typography>
           
        </div>
        </div>
        <div className='flex justify-between flex-col-reverse md:flex md:flex-row'>
            <div>
            <Comments movie={movie} AllComments={AllComments}/>
            </div>
            <div ref={commentsRef}/>
            <div>
            <CommentDetails movie={movie} handleComment={handleComment} commentsRef={commentsRef} comment={comment} setComment={setComment}/>
            </div>
       
      
        </div>
        <Typography variant="h5" style={{color: 'white', marginLeft: '25px', marginTop: '100px', fontFamily: 'Montserrat'}}>You Might also Like:</Typography>
        <Divider style={{backgroundColor: '#009CC5', opacity:'50%', marginTop: '10px', marginBottom:'10px'}}></Divider>
        <div className='flex justify-between flex-wrap'>
        {recommendPost.map(({selectedFile, title, likes, name, _id: id})=>{
        return(    
                <Link to={`/movies/${id}`}>
                 <div className='mx-8 my-4'>
                    <Typography variant="h4" style={{color: 'white', fontFamily: 'Montserrat'}}>{title}</Typography>
                    <Typography variant="body1" style={{color: 'white', fontFamily: 'Montserrat'}}>CreatedBy: {name}</Typography>
                    <Typography variant="h6" style={{color: 'white', marginBottom: '10px'}}>Likes: {likes.length}</Typography>
                    <img style={{ width: '250px', height: '250px' }} className='rounded-[10px] transition-opacity hover:opacity-75  border-2 border-gray-800'  src={selectedFile} alt={name}/>
                    </div>
                </Link>
                
        )
       })}
        </div>
      
        
    </Paper>
   )
}
export default PostDetails