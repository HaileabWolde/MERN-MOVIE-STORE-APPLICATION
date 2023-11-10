import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core"
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
const Input = ({name, type, label, half, handleChange, handleShowPassword, marginRight})=> {
    return(
        <Grid item xs={12} sm={half ? 6 : 12} >
             <TextField 
        variant="outlined"
        label={label}
        required
        name={name}
        type={type}
        fullWidth
        onChange={handleChange}
        InputProps={name === 'password' && {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                  {type === 'password' ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          } }
          style={{ backgroundColor: '#FFF' }}
        />
        </Grid>
       
    )

}
export default Input