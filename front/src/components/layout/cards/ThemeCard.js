import { Button, Avatar, Card, CardActions, CardContent, CardHeader, Typography, IconButton, CardMedia } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import ReviewsIcon from '@mui/icons-material/Reviews';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import MapIcon from '@mui/icons-material/Map';
import { Link } from 'react-router-dom';
import parseJwt from '../../../logic/JWTutil'

function ThemeCard(props) {
    const bcolor = "white";
    const icon = <ForumIcon/>
    var deleteButton = "";

    let token = localStorage.getItem('Bearer');
    if(token !== null){
      var userId = parseJwt(token).sub;
    }

    function removeHandler() {
      fetch(
        'http://localhost:8080/reviewElement/postSpace/theme/' + props.id + '/remove',
      {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
        }
      ).then((response) => {
        window.location.reload()
      }
      )};  

      if(props.moderators.includes(userId)) {
        deleteButton = <Button sx={{display:"inline", position:"relative", right:"-11.5cm"}} variant="contained" color="warning" onClick={removeHandler}>X</Button>
      }

    return (
        <Card sx={{bgcolor:bcolor}}>
          <CardHeader 
            title={<Typography sx={{color:"black"}} variant="h5" component={Link}
            to={'/reviewElement/' + props.elementName + '/domain/theme/'+ props.id}>{props.name}</Typography>}
            subheader={<Typography color="text.secondary" component="div">Posts: {props.posts.length} {deleteButton}</Typography>}
            avatar={<Avatar sx={{bgcolor:"black"}}>{icon}</Avatar>}
          />
        
        </Card>
    );
}

export default ThemeCard;