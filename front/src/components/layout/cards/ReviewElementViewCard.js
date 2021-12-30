import UserContext from '../../../store/user-context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import parseJwt from '../../../logic/JWTutil'

import { Grid, Button, Avatar, Card, CardActions, CardContent, CardHeader, Typography, IconButton, CardMedia } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

function ReviewElementViewCard(props) {

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
      <Grid container>
        <Grid item lg={12} md={12}>
        <Card sx={{bgcolor:"#fafafa", marginBottom:"5mm"}}>
          <CardMedia 
          component="img"
          image={props.image}
          alt="element pic"
          />
          <CardHeader
          title= {<Typography gutterBottom variant="h3" component="div">
          {props.name}
          </Typography>}
          />
          <CardContent >
            <Typography variant="body1" color="text.secondary">
              {props.description}
            </Typography>
        </CardContent>
      <CardActions>
        {subscribeButton}
      </CardActions>
      </Card>
      </Grid>
    </Grid>

      );

}


export default ReviewElementViewCard;