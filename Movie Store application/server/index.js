import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {config} from 'dotenv'
import connectDB from './config/dbConnect.mjs'
import movieRoutes from './routes/movies.js'
import userRoutes from './routes/users.js'
config()

const app = express()
const PORT = process.env.PORT || 8000;

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors({
    origin: ["https://moviereviewmern.netlify.app", "http://localhost:4000"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"], // Add any other headers you need
  }));
app.get('/', (req, res)=>{
    res.json('Hello')
})
app.use('/movies', movieRoutes)
app.use('/users', userRoutes)

const start = async()=> {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, ()=>{
            console.log(`Server is listening on port ${PORT}`)
        })

    }
    catch(error){
        console.log(error)
    }
}
start()