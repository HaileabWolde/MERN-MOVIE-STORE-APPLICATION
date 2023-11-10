import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, makeStyles } from "@material-ui/core";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
    backgroundColor: "#1A1A1A",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#009CC5",
    },
    height: "40px",
  },
}));

const ButtonCompo = ({ searchPost, setSeries, setMovie, movies, series }) => {
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(false);
  const classes = useStyles();

  const handleTvSeriesClick = () => {
    setSeries("TvSeries");
    setClicked(true);
  };

  const handleMoviesClick = () => {
    setMovie("movies");
    setClicked(true);
  };
/*
the first click = series state changed from nothing to "series"
clicked changed from false to true
*/
  useEffect(() => {
    if (clicked && series) {
      dispatch(searchPost(series));
      setClicked(false);
     setSeries('')
     setMovie('movies')
    }
  }, [dispatch, searchPost, series, clicked]);

  useEffect(() => {
    if (clicked && movies) {
      dispatch(searchPost(movies));
      setClicked(false);
      setMovie('')
      setSeries('series')
    }
  }, [dispatch, searchPost, movies, clicked]);

  return (
    <div className="mt-24 flex w-screen">
      <Link to="/">
        <Button
          color="primary"
          variant="contained"
          className={classes.button}
        >
          Home
        </Button>
      </Link>

      <Button
        color="primary"
        variant="contained"
        onClick={handleTvSeriesClick}
        className={classes.button}
        
      >
        TV Series
      </Button>
      <Button
        color="primary"
        variant="contained"
        onClick={handleMoviesClick}
        className={classes.button}
      >
        Movies
      </Button>
    </div>
  );
};

export default ButtonCompo;