import { Avatar, Card, Typography, Button } from '@mui/material';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import { Link } from 'react-router-dom';

function ModeratorFriendCard(props){

    let address = 'http://localhost:8080/reviewElements/userId/' + props.id + "/addModerator/" + props.elementId;
    let userLink = "/user/" + props.username;

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
      <Card sx={{bgcolor:"#f5f5f5", marginBottom:"3px", padding:"3mm"}}>
        <Avatar sx={{height:"65px", width:"65px", marginRight:"5mm", float:"left"}} alt="friend" src={props.image} component={Link} to={userLink}></Avatar>
        <Typography sx={{textDecoration: 'none', color:"black"}} component={Link} to={userLink} variant="h5">{props.username}</Typography>
        <br/>
        <Typography sx={{ marginTop:"1mm", textDecoration: 'none', display:"inline-block" }} color="text.secondary" component={Link} to={userLink}>{props.name} {props.surname}
        </Typography>
        <Button sx={{float:"right", marginTop:"-5mm"}} variant="contained" color="primary" onClick={moderatorAddHandler}>ADD<AddModeratorIcon/></Button>
      </Card>
    );
    }
}

export default ModeratorFriendCard;