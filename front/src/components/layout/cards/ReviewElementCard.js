import UserContext from '../../../store/user-context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import parseJwt from '../../../logic/JWTutil'

import { Button, Avatar, Card, CardActions, CardContent, CardHeader, Typography, IconButton, CardMedia } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

function ReviewElementCard(props) {

      const userCtx = useContext(UserContext); 
      var subscriptions = [];

      var subscribeButton = <Button onClick={subscribeHandler} variant="contained">Subscribe<AddCircleIcon/></Button>

      let token = localStorage.getItem('Bearer');

      if(token !== null){
        const userId = parseJwt(token).sub;
        var address = 'http://localhost:8080/users/userId/' + userId + '/subscribe/' + props.id;
        var address2 = 'http://localhost:8080/users/userId/' + userId + '/unsubscribe/' + props.id;
      }

      if(userCtx.content.subscribed !== undefined){
        subscriptions = userCtx.content.subscribed;
      }

      for(let i=0; i<subscriptions.length; i++){
        if(subscriptions[i] === props.id){
          subscribeButton = <Button onClick={unsubscribeHandler} variant="outlined">Unsubscribe<RemoveCircleIcon/></Button>
            break;
        }
      }

      function subscribeHandler() {
        fetch(
          address,
        {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          credentials: 'include'
          }
        ).then((response) => {
          window.location.reload();
        }
        )};

    function unsubscribeHandler() {
        fetch(
        address2,
        {
        method: 'POST',
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
      <Card sx={{ maxWidth: 345, marginBottom: 5 }}>
        <CardMedia 
        component="img"
        height="140"
        image={props.image}
        alt="element pic"
        />
        <CardContent >
          <Typography gutterBottom variant="h5" component="div" component={Link} to={'/reviewElements/'+ props.id}>
            {props.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
      </CardContent>
      <CardActions>
          {subscribeButton}
      </CardActions>
      </Card>


      /*
        <li className={classes.item} key={props.id} id={props.id}>
          <Card>
            
            <div className={classes.image}>
              <img src={props.image} alt={props.title} />
            </div>
            <div className={classes.content}>
              <h3>{props.name}</h3>
              <p>{props.description}</p>
            </div>
          </Card>
        </li>
      */
      );

}

export default ReviewElementCard;