import { Avatar, Card, CardActions, CardContent, CardHeader, Typography, IconButton, Button } from '@mui/material';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import { Link } from 'react-router-dom';

function ModeratorFriendCard(props){

    let address = 'http://localhost:8080/reviewElements/userId/' + props.id + "/removeModerator/" + props.elementId;
    let removeButton = "";
    let color = "#ffcc80";

    function moderatorRemoveHandler() {
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

    if(props.moderatorsIds.length > 1){
        removeButton = <Button variant="contained" color="error" onClick={moderatorRemoveHandler}>Remove<RemoveModeratorIcon/></Button>
        color = "#90caf9";
    }

    if(props.id === props.userId){
        color = "#b39ddb";
    }
    
    return (
      <Card sx={{bgcolor:color, marginBottom:"3px", padding:"3px"}}>
        <CardHeader 
        avatar = {<Avatar alt="friend" src={props.imgUrl} component={Link} to={"/user/" + props.username}></Avatar>}
        title = {<Typography  variant="h6">{props.username}</Typography>}
        subheader = {<Typography color="text.secondary" component={Link} to={"/user/" + props.username}>{props.name} {props.surname}
        </Typography>}
        />
        {removeButton}
      </Card>
    );
}

export default ModeratorFriendCard;