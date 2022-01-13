import { Typography } from '@mui/material';
import ModeratorCard from '../cards/ModeratorCard';

function ModeratorList(props){

    return (
      <div>
        <Typography align="center" variant="h5">Moderators:</Typography>
        <ul>
          {props.friends.map((friend) => (
            <ModeratorCard
              userId={props.userId}
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

export default ModeratorList;