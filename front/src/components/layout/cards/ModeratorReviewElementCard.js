import UserContext from '../../../store/user-context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { Button, Avatar, Card, CardActions, CardContent, CardHeader, Typography, IconButton, CardMedia } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function ModeratorReviewElementCard(props) {

      const userCtx = useContext(UserContext); 

      var deleteButton = <Button onClick={deleteHandler} color="error" variant="contained">Delete<DeleteIcon/></Button>

      var address = 'http://localhost:8080/reviewElements/reviewElementId/' + props.id + '/remove';




      function deleteHandler() {
        fetch(
          address,
        {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
          credentials: 'include'
          }
        ).then((response) => {
          window.location.reload();
        }
        )};

    

    return (
      <Card>
        <CardMedia 
        component="img"
        height="140"
        image={props.image}
        alt="element pic"
        />
        <CardContent >
          <Typography  variant="h5" sx={{color:"black"}} component={Link} to={'/moderatedReviewElement/'+ props.id}>
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
      </CardContent>
      <CardActions>
          {deleteButton}
      </CardActions>
      </Card>

      );

}

export default ModeratorReviewElementCard;