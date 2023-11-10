import { useState } from "react"
import { TextField, Typography, Button} from "@material-ui/core"

const CommentDetails = ({handleComment, comment, setComment})=> {
   
    const [user, setUser]  = useState(JSON.parse(localStorage.getItem('profile')))  
    return(
        <div className="">
            {
                user?.result?.name &&
                <div className="md:flex md:flex-col">
                    
                <Typography variant="h6" style={{color: 'white', marginLeft: '100px'}}>Write a comment</Typography>
                <TextField
                label="write a comment"      
                name="comment"
                rows={4}
                multiline
                InputProps={{
                    style: { backgroundColor: '#D9D9D9', width: '400px'}
                  }}
                  value={comment}
                  onChange={(e)=> setComment(e.target.value)}
                />
                <Button 
              variant="contained"
              color="primary"
              style={{width: '400px', marginTop: '0.3rem'}}
              onClick={handleComment}
                >Comment</Button>
                </div>        
            }
            
        </div>
       
    )
}
export default CommentDetails