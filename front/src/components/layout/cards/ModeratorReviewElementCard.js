import { Link } from 'react-router-dom';

import { Button, Card, CardActions, CardContent, Typography, CardMedia } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function ModeratorReviewElementCard(props) {


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
          <Typography  variant="h5" sx={{color:"black", textDecoration:"none"}} component={Link} to={'/moderatedReviewElement/'+ props.id}>
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