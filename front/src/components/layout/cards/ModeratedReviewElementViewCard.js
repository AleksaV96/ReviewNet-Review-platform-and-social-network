import UserContext from '../../../store/user-context';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import parseJwt from '../../../logic/JWTutil'

import { Grid, Button, Card, CardActions, CardContent, CardHeader, Typography, CardMedia } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

function ModeratedReviewElementViewCard(props) {

      const userCtx = useContext(UserContext); 
      var subscriptions = [];
      var subscribersNumb = 0;

      try{
        subscribersNumb = props.subscribers.length;
      }
      catch(e){
        console.log(e);
      }

      var subscribeButton = <Button onClick={subscribeHandler} variant="contained">Track<VisibilityIcon/></Button>

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
          subscribeButton = <Button onClick={unsubscribeHandler} variant="outlined">Untrack<VisibilityOffIcon/></Button>
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
            <Typography variant="h6" sx={{fontWeight:"400"}} color="text.secondary">
              {props.description}
            </Typography>
        </CardContent>
      <CardActions>
        {subscribeButton}
        <Button component={Link} sx={{marginLeft:"2mm"}} variant="outlined" to={'/reviewElement/'+props.name+"/"+props.id+"/subscribers"}><PersonOutlineIcon/>subscribers: {subscribersNumb}</Button>
        <Button sx={{marginLeft:"3px"}} variant="contained" color="success" 
        component={Link} to={"/reviewElement/"+props.name+"/moderators/"+props.id}>Moderators<AdminPanelSettingsIcon/>: {props.moderators.length}</Button>
        <Button variant="contained" color="warning" 
        component={Link} to={"/reviewElement/"+props.name+"/analytics/"+props.id}>Statistics<EqualizerIcon/></Button>
      </CardActions>
      </Card>
      </Grid>
    </Grid>

      );

}


export default ModeratedReviewElementViewCard;