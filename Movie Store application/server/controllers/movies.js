import movieSchema from "../model/movieSchema.js"
import escapeStringRegexp from 'escape-string-regexp';

export const getMovies = async(req, res)=> {
  const {page} = req.query
    try{
      
       const LIMIT = 6
       const startIndex = (Number(page) - 1) * LIMIT
       const TotalPageNumber = await movieSchema.countDocuments({})
       const Movies = await movieSchema.find().limit(LIMIT).skip(startIndex)
       res.json({data: Movies, currentPage: Number(page), numberofPages: Math.ceil(TotalPageNumber/LIMIT)})
    }
    catch(error){
        res.status(400).json({message: error})
    }
}
export const  getMovie = async (req, res)=> {
  const {id} = req.params
  try{
    const Movie = await movieSchema.findById(id)
    res.status(200).json({Movie})
  }
  catch(error){
    res.status(400).json({message: error})
  }
}
export const getMovies_BySearch = async (req, res) => {
  try {
    const { searchInfo } = req.query;
    const searchQuery = escapeStringRegexp(searchInfo);
    const genres = searchQuery.split(',').map((genre) => genre.trim());
    const genreQueries = genres.map((genre) => new RegExp(genre, 'i'));
    const posts = await movieSchema.find({
      $or: [
        { title: { $regex: new RegExp(searchQuery, 'i') } },
        { genre: { $in: genreQueries } },
        {type: { $regex: new RegExp(searchQuery, 'i') }}
      
      ],
    });
    res.json({ posts });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createMovie = async(req, res)=>{
    const movie = req.body
    const loginUserId = req.userId
    const createdMovie = new movieSchema({...movie, creator:loginUserId})
    try{
       await createdMovie.save()
       res.status(201).json(createdMovie)
    }
    catch(error){
        res.status(400).json({message: error})
    }
}
export const AddComment = async(req, res)=> {
  const {comment} = req.body
  const {id} = req.params
  try{
    const movie = await movieSchema.findById(id)
    movie.comments.push(comment)
    const Movie = await movieSchema.findByIdAndUpdate(id, movie, {new: true})
    res.status(200).json(Movie)
  }
  catch(error){
    res.status(201).json({message: error.message})
  }
}
export const updateMovie = async (req, res)=> {
    const {id:_id} = req.params
    try{
        const updatedMovie = await movieSchema.findByIdAndUpdate(_id, req.body, {new: true})
        res.status(201).json(updatedMovie)
    }
    catch(error){
        res.status(400).json({message: error})
    }
}

export const likeMovie = async(req, res)=> {
    const {id: _id} = req.params
    const loginUserId = req?.userId
    try{
        const Movie = await movieSchema.findById(_id)
    const index =  Movie.likes.findIndex((id)=> id === String(loginUserId))

    if (index >= 0) {
        // User has already liked the post, remove the like
        Movie.likes = Movie.likes.filter((id) => id !== String(loginUserId));
      } else {
        // User has not liked the post, add the like
        Movie.likes.push(loginUserId);
      }
    const likedMovie = await movieSchema.findByIdAndUpdate(_id, Movie,  { new: true})
    res.json(likedMovie)
    }
    catch(error){
        console.log(error)
    }
  
}
export const deleteMovie = async (req, res)=> {
    const {id:_id} = req.params
    try{
        const deletedMovie = await movieSchema.findByIdAndDelete(_id)
        res.status(201).json(deletedMovie)
    }
    catch(error){
        res.status(400).json({message: error})
    }
}
