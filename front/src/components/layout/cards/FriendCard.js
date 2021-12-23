import { Avatar, Card, CardActions, CardContent, CardHeader, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

function FriendCard(props){
    let userLink = "/user/" + props.username;

    return (
      <Card>
        <CardHeader 
        avatar = {<Avatar alt="firend" src={props.image} component={Link} to={userLink}></Avatar>}
        title = {<Typography  variant="h6">{props.username}</Typography>}
        subheader = {<Typography color="text.secondary" component={Link} to={userLink}>{props.name} {props.surname}
          </Typography>}
        />
      </Card>

      /*
        <li key={props.id} id={props.id}>        
            <div>
              <img src={props.image} alt={props.title} />
            </div>
            <div >
              <p>{props.name}</p>
              <p>{props.surname}</p>
              <p>{props.username}</p>
            </div>
        </li>
      */
      );
}

export default FriendCard;