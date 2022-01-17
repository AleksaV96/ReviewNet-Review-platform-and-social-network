import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Card, CardActions, CardHeader, Typography, Button } from '@mui/material';

function UserCard(props) {

    const deleteButton = <Button sx={{display:"inline"}} size="small"
     variant="contained" color="warning" onClick={removeHandler}>X</Button>

    const link = '/dashboard/user/'+ props.id

    let activeStat = "";
    let clr = "";
    let roleTxt = "";

    if(props.activeStatus===true){
      activeStat = <Typography  sx={{display:'inline', fontWeight:"bold"}} variant="h6" color="red"> INACTIVE</Typography>
    }
    else if(props.activeStatus===false){
      activeStat = <Typography  sx={{display:'inline', fontWeight:"bold"}} variant="h6" color="green"> ACTIVE</Typography>
    }

    if(props.role === "ROLE_SUBSCRIBER"){
      clr = "#f5f5f5";
      roleTxt = "SUBSCRIBER";
    }
    else if(props.role === "ROLE_MODERATOR"){
      clr = "#e0f2f1";
      roleTxt = "MODERATOR";
    }
    else if(props.role === "ROLE_ADMIN"){
      clr = "#c5cae9";
      roleTxt = "ADMIN";
    }

    function removeHandler() {
      fetch(
        'http://localhost:8080/users/userId/' + props.id + '/remove',
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
    
    return (
      <Card sx={{marginBottom:"3px", bgcolor:clr}}>
        <CardHeader 
            avatar =  {<Avatar alt="user" component={Link} to={link} src={props.imgUrl}  sx={{ width: 75, height: 75 }} variant="square"></Avatar>}
            title = {<div><Typography color="black" component={Link} to={link} 
            sx={{display:'inline', fontWeight:'bolder', textDecoration:'none'}} variant="h5">{props.username}</Typography>{activeStat}
            <Typography color="red" sx={{fontWeight:"bolder"}}>{roleTxt}</Typography></div>}
            subheader = {<div><Typography >{props.name} {props.surname}</Typography>
            <Typography  ><span style={{color:"black"}}>email:</span> {props.email}</Typography></div>}
            />
        <CardActions>
        {deleteButton}
      </CardActions>
      </Card>
      );

}

export default UserCard;