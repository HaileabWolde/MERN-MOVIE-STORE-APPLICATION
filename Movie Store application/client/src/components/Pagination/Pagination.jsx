import { Link } from 'react-router-dom';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { useDispatch , useSelector} from 'react-redux';
import { useEffect } from 'react';
import { getMovies } from '../../actions/Movies';
const Paginate = ({page}) => {
  const dispatch = useDispatch()
  const {numberofPages} = useSelector((state)=> state.Movies)

  
  return (
    <Pagination 
      count={numberofPages}
      page={Number(page)}
      variant="outlined"
      color='primary'
      renderItem={(item) => (
        <Link to={`/movies?page=${item.page}`}> <PaginationItem
        style={{ color: 'white'}}
         {...item}
      /></Link>
        
      )}
    />
  );
};

export default Paginate;