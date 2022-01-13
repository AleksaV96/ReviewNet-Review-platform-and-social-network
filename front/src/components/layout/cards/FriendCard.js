import { Avatar, Card, CardHeader, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function FriendCard(props){
    let userLink = "/user/" + props.username;

    return (
      <Card>
        <CardHeader 
        avatar = {<Avatar alt="friend" src={props.image} component={Link} to={userLink}></Avatar>}
        title = {<Typography variant="h6">{props.username}</Typography>}
        subheader = {<Typography sx={{ textDecoration: 'none' }} color="text.secondary" component={Link} to={userLink}>{props.name} {props.surname}
          </Typography>}
        />
      </Card>

      );
}

export default FriendCard;