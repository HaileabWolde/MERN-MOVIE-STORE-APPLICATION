import { useEffect, useState } from "react";
import { Button, Typography, Paper, TextField, MenuItem } from "@material-ui/core";
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from "react-redux";
import { createMovie, editMovie, clearId } from "../../actions/Movies";
const Form = () => {

  const dispatch = useDispatch()
  const Id = useSelector((state)=> state.CurrentId)
  /*
  get The Id of The Current Movie Card
  */
  const Movie = useSelector((state)=> Id ? (state.Movies.movies.find((movie)=> movie._id === Id)): null)
/*
  Select The Movie Card to The Form by finding which of the movie posts id match with the id of the 
  selected movie id*/
  
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))
  

  const [data, setData] = useState({
    title: "",
    genre: "",
    type: "",
    description: "",
    selectedFile: "",
  });

  useEffect(()=> {
    if(Movie){
      setData(Movie)
    }
   
  }, [Movie])
  

  const handleSubmit = (e)=>{
    e.preventDefault();

    if(Movie){
      dispatch(editMovie(data, Id))
    }

    dispatch(createMovie({...data, name: user?.result?.name }))
   clear()
  }

  const clear = ()=> {
    dispatch(clearId(null))
    setData({
      title: "",
      genre: "",
      type: "",
      description: "",
      selectedFile: "",
    })
   
  }
  
  return (
    <Paper style={{ backgroundColor: '#301E67' }} className=" mt-[100px] md:mt-[350px] px-8 pb-10">
      <form autoComplete="off" noValidate className="flex justify-center flex-wrap mmt-12" onSubmit={handleSubmit}>
        <Typography variant="h6" className="text-white" style={{marginTop: '1rem', fontFamily: 'Poppins'}}>Add A Movie Review</Typography>
    
        <TextField
          label="Movie Title" 
          variant="outlined"
          name="title"
          fullWidth
          value={data.title}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          InputProps={{
            style: { backgroundColor: '#FFF' }
          }}
          style={{ marginBottom: '2rem', marginTop: '1rem'}}
        />
        <TextField
          label="Movie Genre"
          variant="outlined"
          fullWidth
          value={data.genre}
          name="genre"
          onChange={(e) => setData({ ...data, genre: e.target.value.split(',')})}
          InputProps={{
            style: { backgroundColor: '#FFF' }
          }}
          style={{ marginBottom: '2rem'}}
        />
        <TextField
          label="Movie Type"
          variant="outlined"
          name="type"
          fullWidth
          select
          value={data.type}
          onChange={(e)=> setData({...data, type: e.target.value})}
          InputProps={{
            style: { backgroundColor: '#FFF' }
          }}
          style={{marginBottom: '2rem'}}
        >
          <MenuItem value="Movies">Movies</MenuItem>
          <MenuItem value="Tvseries">TV Series</MenuItem>
        </TextField>
        <TextField
          label="Movie Description"
          variant="outlined"
          name="description"
          fullWidth
          rows={4}
          multiline
          value={data.description}
          onChange={(e) => setData({ ...data, description: e.target.value })}
          InputProps={{
            style: { backgroundColor: '#FFF' }
          }}
          style={{marginBottom: '2rem'}}
        />
       <FileBase
          type="file"
          multiple={false}
          onDone={({base64})=> setData({...data,  selectedFile: base64})}
          />
          
      <Button 
      color="primary"
      variant="contained"
      fullWidth
      style={{marginTop: '1rem', marginBottom: '1rem'}}
      type="submit"
      size="large"
      >Submit</Button>
      
      <Button 
      color="secondary"
      variant="contained"
      fullWidth
      size="small"
      onClick={()=> clear()}
      >Clear</Button>
      </form>
    </Paper>
  );
};

export default Form;