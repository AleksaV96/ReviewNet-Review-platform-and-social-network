import { Avatar, Card, Typography, Button } from '@mui/material';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import { Link } from 'react-router-dom';

function ModeratorFriendCard(props){

    let userLink = "/user/" + props.username;
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
        removeButton = <Button sx={{float:"right", marginTop:"-5mm"}} variant="contained" color="error" onClick={moderatorRemoveHandler}>Remove<RemoveModeratorIcon/></Button>
        color = "#90caf9";
    }

    if(props.id === props.userId){
        color = "#b39ddb";
    }
    
    return (
      <Card sx={{bgcolor:color, marginBottom:"3px", padding:"3mm"}}>

        <Avatar sx={{height:"65px", width:"65px", marginRight:"5mm", float:"left"}} alt="friend" src={props.image} component={Link} to={userLink}></Avatar>
        <Typography sx={{textDecoration: 'none', color:"black"}} component={Link} to={userLink} variant="h5">{props.username}</Typography>
        <br/>
        <Typography sx={{ marginTop:"1mm", textDecoration: 'none', display:"inline-block" }} color="text.secondary" component={Link} to={userLink}>{props.name} {props.surname}
        </Typography>
        {removeButton}
      </Card>
    );
}

export default ModeratorFriendCard;