import { Avatar, Card, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import UserContext from '../../../store/user-context';
import { useContext } from 'react';
import parseJwt from '../../../logic/JWTutil'

import {Button} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

function FriendCard(props){

    let userLink = "/user/" + props.username;

    const userCtx = useContext(UserContext); 
    let isUser = false;
    let clr = "#f5f5f5";

    let token = localStorage.getItem('Bearer');

    if(token !== null){
        const userId = parseJwt(token).sub;
        if(userId === props.id){
          isUser = true;
          clr = "#ffcdd2";
      }  
        var address2 = 'http://localhost:8080/users/userId/' + userId + '/add-friend/' + props.id;
        var address3 = 'http://localhost:8080/users/userId/' + userId + '/remove-friend/' + props.id;
    }

    if(!isUser){
    var addFriendButton = <Button sx={{float:"right", marginTop:"-5mm"}} onClick={addFriendHandler} variant="contained"><PersonAddIcon/></Button>
      if(!props.settings.addFriend){
        addFriendButton = <Button sx={{float:"right", marginTop:"-5mm"}} disabled variant="contained"><PersonAddIcon/></Button>
      }
    }

    var friends = [];


    if(userCtx.content.friends !== undefined){
      friends = userCtx.content.friends;
    }

    for(let i=0; i<friends.length; i++){
      if(friends[i] === props.id){
          addFriendButton = <Button sx={{float:"right", marginTop:"-5mm"}} onClick={removeFriendHandler} variant="outlined"><PersonRemoveIcon/></Button>
          break;
      }
    }

    function addFriendHandler() {
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

    function removeFriendHandler() {
        fetch(
        address3,
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
      <Card sx={{bgcolor:clr, padding:"3mm", marginBottom:"5px"}}>
        <Avatar sx={{height:"65px", width:"65px", marginRight:"5mm", float:"left"}} alt="friend" src={props.image} component={Link} to={userLink}></Avatar>
        <Typography sx={{textDecoration: 'none', color:"black"}} component={Link} to={userLink} variant="h5">{props.username}</Typography>
        <br/>
        <Typography sx={{ marginTop:"1mm", textDecoration: 'none', display:"inline-block" }} color="text.secondary" component={Link} to={userLink}>{props.name} {props.surname}
        </Typography>
        {addFriendButton}
      </Card>
    );

}

export default FriendCard;