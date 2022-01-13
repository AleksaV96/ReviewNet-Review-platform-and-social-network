import { Avatar, Card, CardHeader, Typography, Button } from '@mui/material';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import { Link } from 'react-router-dom';

function ModeratorFriendCard(props){

    let address = 'http://localhost:8080/reviewElements/userId/' + props.id + "/addModerator/" + props.elementId;

    function moderatorAddHandler() {
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
    
    if(props.moderatorsIds.includes(props.id)){
        return(<div></div>);
    }
    else{
    return (
      <Card sx={{bgcolor:"#f5f5f5", marginBottom:"3px", padding:"3px"}}>
        <CardHeader 
        avatar = {<Avatar alt="friend" src={props.imgUrl} component={Link} to={"/user/" + props.username}></Avatar>}
        title = {<Typography  variant="h6">{props.username}</Typography>}
        subheader = {<Typography sx={{ textDecoration: 'none' }} color="text.secondary" component={Link} to={"/user/" + props.username}>{props.name} {props.surname}
        </Typography>}
        />
        <Button variant="contained" color="primary" onClick={moderatorAddHandler}>ADD<AddModeratorIcon/></Button>
      </Card>
    );
    }
}

export default ModeratorFriendCard;