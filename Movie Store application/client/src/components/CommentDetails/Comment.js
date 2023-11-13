import { Typography } from "@material-ui/core"
const Comments = ({AllComments})=> {
    /*
here it will hold the specific movie post array comments and will display them to the user
*/

return (
    <div className="flex flex-wrap md:flex-col md:mx-0 mx-[30px] mt-10 md:mt-0">
        <div>
        <Typography variant="h6" style={{color: 'white' , marginLeft: '50px'}}>Comments</Typography>
        {
        AllComments?.map((comment)=> {
            
            return (
                
                <Typography style={{color: 'white', fontFamily:'Montserrat'}} variant="subtitle1">
                    <strong className="mr-4">{comment?.split(': ')[0]}:</strong>
                {comment?.split(': ')[1]}
                </Typography>
            )
        })
       }
        </div>
      
    </div>
)
}
export default Comments