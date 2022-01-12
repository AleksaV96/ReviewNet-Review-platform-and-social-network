import { Link } from 'react-router-dom';
import { Avatar, Card, CardActions, CardContent, CardHeader, Typography, IconButton, Button } from '@mui/material';
import ModeratorFriendCard from '../cards/ModeratorFriendCard';

function ModeratorFriendList(props){

    

    return (
        <div>
          <Typography align="center" variant="h5">Friends with premium account:</Typography>
          <ul>
            {props.friends.map((friend) => (
              <ModeratorFriendCard
                key={friend.id}
                id={friend.id}
                username={friend.username}
                name={friend.name}
                surname={friend.surname}
                image={friend.imgUrl}
                elementId={props.elementId}
                moderatorsIds={props.moderatorsIds}
              />
            ))}
          </ul>
          </div>
        );

}

export default ModeratorFriendList;