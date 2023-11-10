import express from 'express'
import {getMovies, getMovie, createMovie, 
    deleteMovie, updateMovie, likeMovie, 
    getMovies_BySearch, AddComment} from '../controllers/movies.js'
import Auth from '../middlewares/auth.js'
const router = express.Router()

router.get('/', getMovies)
router.get('/search', getMovies_BySearch)
router.get('/:id', getMovie)
router.post('/', Auth, createMovie)
router.post('/:id/addComment', AddComment)
router.patch('/:id', Auth,  updateMovie)
router.patch('/:id/likePost', Auth,  likeMovie)
router.delete('/:id', Auth,  deleteMovie)


export default router;