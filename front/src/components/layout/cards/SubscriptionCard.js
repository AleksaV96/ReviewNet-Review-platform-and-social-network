import UserContext from '../../../store/user-context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import parseJwt from '../../../logic/JWTutil'

import { Button, Card, CardActions, CardContent, Typography, CardMedia } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

function SubscriptionCard(props) {
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
      <Card>
          <CardMedia 
          component="img"
          height="140"
          image={props.image}
          alt="element pic"
          />
          <CardContent>
            <Typography sx={{textDecoration:"none"}} variant="h5" color="black" component={Link} to={'/reviewElement/'+ props.id}>
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

      );

}

export default SubscriptionCard;