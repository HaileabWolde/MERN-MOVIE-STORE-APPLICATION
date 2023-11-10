import mongoose from 'mongoose'

const MovieSchema = mongoose.Schema({
    title: String,
    type: String,
    name: String,
    creator: String,
    genre: [String],
    description: String,
    selectedFile: String,
    comments: {
        type: [String],
        default: []
    },
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }

})

const movieSchema = mongoose.model('MovieStore', MovieSchema)
export default movieSchema